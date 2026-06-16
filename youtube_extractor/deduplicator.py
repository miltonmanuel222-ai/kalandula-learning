"""
deduplicator.py — Remoção de cursos duplicados ou muito similares
Usa similaridade de texto (SequenceMatcher) para detectar e eliminar duplicações.
"""

from difflib import SequenceMatcher
from config import SIMILARITY_THRESHOLD


def deduplicate_courses(courses: list[dict]) -> list[dict]:
    """
    Remove cursos duplicados da lista.
    Critérios de duplicação:
    1. Mesmo playlist_id (duplicação exata)
    2. Título muito similar (>= SIMILARITY_THRESHOLD) E mesmo canal
    3. Sobreposição de ≥85% dos vídeos (mesmo conteúdo em playlists diferentes)

    Quando encontra duplicados, mantém o que tem maior view_count total.
    """
    if not courses:
        return []

    # 1. Remover por playlist_id duplicado
    seen_ids: set[str] = set()
    unique_by_id: list[dict] = []
    for course in courses:
        pid = course.get("id", "")
        if pid not in seen_ids:
            seen_ids.add(pid)
            unique_by_id.append(course)

    # 2. Remover por título similar + mesmo canal
    kept: list[dict] = []
    for candidate in unique_by_id:
        is_dup = False
        for existing in kept:
            # Mesmo canal + título similar?
            if candidate.get("channel") == existing.get("channel"):
                sim = _title_similarity(
                    candidate.get("title", ""),
                    existing.get("title", "")
                )
                if sim >= SIMILARITY_THRESHOLD:
                    # Manter o com mais alunos/views
                    if _total_views(candidate) > _total_views(existing):
                        kept.remove(existing)
                        kept.append(candidate)
                    is_dup = True
                    break

            # Sobreposição de vídeos entre canais diferentes?
            if _video_overlap(candidate, existing) >= SIMILARITY_THRESHOLD:
                if _total_views(candidate) > _total_views(existing):
                    kept.remove(existing)
                    kept.append(candidate)
                is_dup = True
                break

        if not is_dup:
            kept.append(candidate)

    return kept


def sort_by_difficulty(courses: list[dict]) -> list[dict]:
    """
    Ordena cursos do mais fácil para o mais avançado dentro de cada categoria.
    Dentro do mesmo nível, ordena por rating (maior primeiro).
    """
    level_order = {"Iniciante": 0, "Intermédio": 1, "Avançado": 2}

    def sort_key(c: dict):
        level = c.get("level", "Iniciante")
        rating = c.get("rating", 0.0)
        return (level_order.get(level, 0), -rating)

    return sorted(courses, key=sort_key)


def filter_embeddable(courses: list[dict]) -> tuple[list[dict], list[dict]]:
    """
    Separa cursos onde TODOS os vídeos têm embed permitido.
    Retorna (embeddable_courses, restricted_courses).
    """
    embeddable = []
    restricted = []

    for course in courses:
        lessons = course.get("lessons", [])
        all_embeddable = all(
            lesson.get("embeddable", True) for lesson in lessons
        )
        if all_embeddable:
            embeddable.append(course)
        else:
            restricted.append(course)

    return embeddable, restricted


# ── Helpers ─────────────────────────────────────────────────────────────────

def _title_similarity(a: str, b: str) -> float:
    """Calcula similaridade entre dois títulos (0.0 a 1.0)."""
    a = a.lower().strip()
    b = b.lower().strip()
    return SequenceMatcher(None, a, b).ratio()


def _total_views(course: dict) -> int:
    """Retorna o view count total estimado do curso."""
    return course.get("students", 0)


def _video_overlap(course_a: dict, course_b: dict) -> float:
    """
    Calcula a proporção de vídeos sobrepostos entre dois cursos.
    Compara os video IDs das aulas.
    """
    ids_a = {
        l.get("video_id", l.get("id", ""))
        for l in course_a.get("lessons", [])
    }
    ids_b = {
        l.get("video_id", l.get("id", ""))
        for l in course_b.get("lessons", [])
    }

    if not ids_a or not ids_b:
        return 0.0

    intersection = ids_a & ids_b
    union = ids_a | ids_b
    return len(intersection) / len(union) if union else 0.0
