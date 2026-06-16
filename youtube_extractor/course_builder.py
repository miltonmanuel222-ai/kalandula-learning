"""
course_builder.py — Monta o schema Course/Lesson/Quiz da plataforma Kalandula
a partir dos dados brutos do YouTube + classificação Gemini.
"""

import random
import string
from ai_classifier import generate_quiz_questions
from config import TRUSTED_CHANNELS


def build_course(
    playlist_meta: dict,
    videos: list[dict],
    video_details: dict,
    ai_result: dict,
    generate_quiz: bool = True,
) -> dict:
    """
    Constrói um objeto Course completo compatível com o mockDb.ts da plataforma.

    Args:
        playlist_meta: metadados da playlist (youtube_client.get_playlist_details)
        videos: lista de vídeos (youtube_client.get_playlist_videos)
        video_details: detalhes enriquecidos (youtube_client.enrich_videos_with_details)
        ai_result: resultado da classificação Gemini (ai_classifier.classify_playlist)
        generate_quiz: se True, gera quiz com Gemini

    Returns:
        dict com estrutura Course + Quiz compatível com a plataforma
    """
    playlist_id = playlist_meta.get("playlist_id", "")
    course_id = f"yt_{playlist_id}"

    # ── Aulas (Lessons) ──────────────────────────────────────────────────────
    lessons = []
    total_views = 0

    for video in videos:
        vid_id = video.get("video_id", "")
        detail = video_details.get(vid_id, {})

        # Ignora vídeos muito curtos (< 2 min) — provavelmente trailers
        duration_min = detail.get("duration_min", 5)
        if duration_min < 2:
            continue

        # Ignora vídeos sem embed permitido
        if not detail.get("embeddable", True):
            continue

        lesson_id = f"yt_{vid_id}"
        total_views += detail.get("view_count", 0)

        lessons.append({
            "id": lesson_id,
            "courseId": course_id,
            "title": _clean_lesson_title(video.get("title", f"Aula {len(lessons)+1}")),
            "contentUrl": f"https://www.youtube.com/watch?v={vid_id}",
            "type": "video",
            "duration": detail.get("duration_label", "? min"),
            # Campos auxiliares (não estão no schema TypeScript mas úteis para debug)
            "video_id": vid_id,
            "embeddable": detail.get("embeddable", True),
            "view_count": detail.get("view_count", 0),
        })

    if not lessons:
        return {}

    # ── Métricas ─────────────────────────────────────────────────────────────
    avg_views_per_lesson = total_views / len(lessons) if lessons else 0
    # Aproximar "students" com base em views (dividir por 10 para não inflar)
    estimated_students = max(10, int(avg_views_per_lesson / 10))
    # Rating estimado: canais de confiança têm bonus
    is_trusted = playlist_meta.get("channel_id", "") in TRUSTED_CHANNELS
    base_rating = 4.2 if is_trusted else 3.8
    rating = round(min(5.0, base_rating + random.uniform(0, 0.7)), 1)

    # ── Objeto Course ────────────────────────────────────────────────────────
    course = {
        "id": course_id,
        "title": ai_result.get("cleaned_title", playlist_meta.get("title", "Curso")),
        "description": ai_result.get("description_pt", playlist_meta.get("description", ""))[:220],
        "imageUrl": playlist_meta.get("thumbnail", ""),
        "category": ai_result.get("kalandula_category", "tecnologia"),
        "level": ai_result.get("level", "Iniciante"),
        "rating": rating,
        "students": estimated_students,
        "lessons": lessons,
        # Metadados extras (para o JSON de output, não entram no mockDb diretamente)
        "_meta": {
            "source": "youtube",
            "playlist_url": f"https://www.youtube.com/playlist?list={playlist_id}",
            "channel": playlist_meta.get("channel_title", ""),
            "channel_id": playlist_meta.get("channel_id", ""),
            "is_trusted_channel": is_trusted,
            "educational_score": ai_result.get("educational_score", 0),
            "total_lessons": len(lessons),
        }
    }

    # ── Quiz (opcional) ──────────────────────────────────────────────────────
    quiz = None
    if generate_quiz:
        questions_raw = generate_quiz_questions(
            course_title=course["title"],
            course_description=course["description"],
            category=course["category"],
            num_questions=3,
        )
        if questions_raw:
            quiz = {
                "id": f"q_{playlist_id}",
                "courseId": course_id,
                "questions": [
                    {
                        "id": f"q_{playlist_id}_{i}",
                        "text": q["text"],
                        "options": q["options"],
                        "correctOptionIndex": q["correctOptionIndex"],
                    }
                    for i, q in enumerate(questions_raw)
                ]
            }

    return {"course": course, "quiz": quiz}


def build_platform_json(courses_with_quizzes: list[dict]) -> dict:
    """
    Monta o JSON final pronto para importar na plataforma.
    Estrutura compatível com INITIAL_COURSES e INITIAL_QUIZZES do mockDb.ts.
    """
    from datetime import datetime, timezone

    courses_list = []
    quizzes_list = []

    for item in courses_with_quizzes:
        if not item:
            continue
        course = item.get("course")
        quiz = item.get("quiz")
        if course:
            # Limpar campos _meta para o array de courses puro
            course_clean = {k: v for k, v in course.items() if k != "_meta"}
            # Limpar campos extras das lessons
            course_clean["lessons"] = [
                {k: v for k, v in l.items() if k not in ("video_id", "embeddable", "view_count")}
                for l in course_clean.get("lessons", [])
            ]
            courses_list.append(course_clean)
        if quiz:
            quizzes_list.append(quiz)

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_courses": len(courses_list),
        "total_quizzes": len(quizzes_list),
        "courses": courses_list,
        "quizzes": quizzes_list,
        # Formato alternativo com metadados para debug
        "courses_with_meta": courses_with_quizzes,
    }


# ── Helpers ─────────────────────────────────────────────────────────────────

def _clean_lesson_title(title: str) -> str:
    """
    Limpa o título de uma aula removendo prefixos redundantes e caracteres estranhos.
    Ex: "#01 - Introdução ao Python (ATUALIZADO 2024)" → "Introdução ao Python"
    """
    import re
    # Remover timestamps como [10:23]
    title = re.sub(r"\[\d+:\d+\]", "", title)
    # Remover emojis excessivos (manter apenas 1 no máximo)
    title = re.sub(r"[\U0001F300-\U0001FFFF]{2,}", "", title)
    # Remover "ATUALIZADO YYYY", "VERSÃO YYYY" etc.
    title = re.sub(r"\b(atualizado|versão|version|updated?)\s*\d{4}\b", "", title, flags=re.IGNORECASE)
    # Remover parênteses com conteúdo de ano ou versão
    title = re.sub(r"\(\s*\d{4}\s*\)", "", title)
    # Remover múltiplos espaços
    title = re.sub(r"\s{2,}", " ", title).strip()
    return title[:100]


def _generate_id(n: int = 8) -> str:
    """Gera um ID aleatório curto."""
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=n))
