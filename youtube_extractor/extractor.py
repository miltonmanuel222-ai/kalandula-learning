"""
extractor.py — CLI principal do sistema de extração de cursos do YouTube
Uso:
    python extractor.py --category programação --max-courses 10
    python extractor.py --category design --max-courses 5 --no-quiz
    python extractor.py --list-categories
"""

import argparse
import json
import os
import sys
import time

from config import (
    CATEGORY_QUERIES, TRUSTED_CHANNELS,
    MIN_VIDEOS_IN_PLAYLIST, MAX_VIDEOS_IN_PLAYLIST,
    MIN_TOTAL_DURATION_MIN, MAX_COURSES_PER_QUERY,
    OUTPUT_DIR, OUTPUT_FILE,
)
from youtube_client import (
    search_playlists, get_playlist_details,
    get_playlist_videos, enrich_videos_with_details,
)
from ai_classifier import classify_playlist
from course_builder import build_course, build_platform_json
from deduplicator import deduplicate_courses, sort_by_difficulty


# ═══════════════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════════════

def parse_args():
    parser = argparse.ArgumentParser(
        description="🎓 Kalandula Learning — Extrator de Cursos do YouTube",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python extractor.py --category programação --max-courses 10
  python extractor.py --category design --max-courses 5 --no-quiz
  python extractor.py --category tecnologia --trusted-only
  python extractor.py --list-categories
        """
    )
    parser.add_argument(
        "--category", "-c",
        type=str,
        help="Categoria a pesquisar (ex: programação, design, marketing)"
    )
    parser.add_argument(
        "--max-courses", "-n",
        type=int, default=10,
        help="Número máximo de cursos a extrair (padrão: 10)"
    )
    parser.add_argument(
        "--no-quiz",
        action="store_true",
        help="Não gerar quizzes para os cursos extraídos"
    )
    parser.add_argument(
        "--trusted-only",
        action="store_true",
        help="Pesquisar apenas em canais de confiança definidos na config"
    )
    parser.add_argument(
        "--output", "-o",
        type=str, default=None,
        help="Ficheiro de output (padrão: output/courses_output.json)"
    )
    parser.add_argument(
        "--list-categories",
        action="store_true",
        help="Lista todas as categorias disponíveis e os termos de busca"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Mostrar detalhes de cada playlist processada"
    )
    return parser.parse_args()


# ═══════════════════════════════════════════════════════════════════════════════
# PIPELINE PRINCIPAL
# ═══════════════════════════════════════════════════════════════════════════════

def run_extraction(
    category: str,
    max_courses: int = 10,
    generate_quiz: bool = True,
    trusted_only: bool = False,
    output_path: str | None = None,
    verbose: bool = False,
) -> dict:
    """Pipeline completo de extração para uma categoria."""

    print(f"\n{'='*60}")
    print(f"  🎓 Kalandula Learning — Extrator YouTube")
    print(f"  Categoria: {category} | Máx. cursos: {max_courses}")
    print(f"{'='*60}\n")

    # Determinar queries de busca
    queries = _resolve_queries(category)
    if not queries:
        print(f"❌ Categoria '{category}' não reconhecida.")
        print(f"   Categorias disponíveis: {', '.join(CATEGORY_QUERIES.keys())}")
        sys.exit(1)

    all_candidates: list[dict] = []
    courses_built: list[dict] = []

    # ── FASE 1: Pesquisa no YouTube ──────────────────────────────────────────
    print("📡 FASE 1 — Pesquisando playlists no YouTube...\n")

    for query in queries:
        if len(all_candidates) >= max_courses * 3:
            break  # Já temos candidatos suficientes

        print(f"  🔍 Query: \"{query}\"")
        playlists = search_playlists(query, max_results=MAX_COURSES_PER_QUERY * 2)

        for pl in playlists:
            # Se trusted_only, ignorar canais não verificados
            if trusted_only and pl.get("channel_id") not in TRUSTED_CHANNELS:
                continue
            # Evitar duplicados na lista de candidatos
            if any(c.get("playlist_id") == pl["playlist_id"] for c in all_candidates):
                continue
            all_candidates.append(pl)

        print(f"     → {len(playlists)} playlists encontradas | Total acumulado: {len(all_candidates)}")
        time.sleep(0.5)  # Rate limiting suave

    print(f"\n  Total de candidatos únicos: {len(all_candidates)}\n")

    # ── FASE 2: Filtro primário e detalhes ───────────────────────────────────
    print("🔎 FASE 2 — Filtrando candidatos e carregando detalhes...\n")

    valid_candidates = []
    for pl in all_candidates:
        details = get_playlist_details(pl["playlist_id"])
        if not details:
            continue

        video_count = details.get("video_count", 0)
        privacy = details.get("privacy", "public")

        # Filtros básicos
        if privacy != "public":
            _log_skip(pl["title"], "privada/não pública", verbose)
            continue
        if video_count < MIN_VIDEOS_IN_PLAYLIST:
            _log_skip(pl["title"], f"poucos vídeos ({video_count} < {MIN_VIDEOS_IN_PLAYLIST})", verbose)
            continue
        if video_count > MAX_VIDEOS_IN_PLAYLIST:
            _log_skip(pl["title"], f"playlist muito grande ({video_count} vídeos)", verbose)
            continue

        is_trusted = details.get("channel_id", "") in TRUSTED_CHANNELS
        details["is_trusted_channel"] = is_trusted
        valid_candidates.append(details)

        if is_trusted:
            print(f"  ⭐ {details['title'][:55]} ({video_count} vídeos) [canal confiança]")
        else:
            print(f"  ✅ {details['title'][:55]} ({video_count} vídeos)")

        if len(valid_candidates) >= max_courses * 2:
            break

    print(f"\n  Candidatos válidos após filtro primário: {len(valid_candidates)}\n")

    # ── FASE 3: Carregar vídeos + enriquecimento ─────────────────────────────
    print("📥 FASE 3 — Carregando vídeos e metadados...\n")

    enriched_playlists = []
    for details in valid_candidates:
        pid = details["playlist_id"]
        print(f"  ↳ {details['title'][:50]}...")

        videos = get_playlist_videos(pid, max_videos=MAX_VIDEOS_IN_PLAYLIST)
        if not videos:
            print(f"     [IGNORADO] Sem vídeos acessíveis")
            continue

        video_ids = [v["video_id"] for v in videos]
        video_detail_map = enrich_videos_with_details(video_ids)

        # Calcular duração total
        total_min = sum(
            video_detail_map.get(v["video_id"], {}).get("duration_min", 0)
            for v in videos
        )

        if total_min < MIN_TOTAL_DURATION_MIN:
            _log_skip(details["title"], f"duração total curta ({total_min:.0f} min)", verbose)
            continue

        print(f"     → {len(videos)} vídeos | {total_min:.0f} min total")
        enriched_playlists.append({
            "meta": details,
            "videos": videos,
            "video_details": video_detail_map,
            "total_min": total_min,
        })
        time.sleep(0.3)

    print(f"\n  Playlists enriquecidas: {len(enriched_playlists)}\n")

    # ── FASE 4: Classificação com Gemini AI ──────────────────────────────────
    print("🤖 FASE 4 — Classificando com Gemini AI...\n")

    accepted = []
    rejected_count = 0

    for item in enriched_playlists:
        meta = item["meta"]
        videos = item["videos"]
        titles = [v["title"] for v in videos]

        print(f"  🧠 Avaliando: {meta['title'][:50]}...")

        ai_result = classify_playlist(
            playlist_title=meta["title"],
            playlist_description=meta.get("description", ""),
            channel_name=meta.get("channel_title", ""),
            video_titles=titles,
            total_duration_min=item["total_min"],
            is_trusted_channel=meta.get("is_trusted_channel", False),
        )

        score = ai_result.get("educational_score", 0)
        is_course = ai_result.get("is_complete_course", False)

        if is_course:
            print(f"     ✅ ACEITE | Score: {score}/10 | Nível: {ai_result['level']} | Cat: {ai_result['kalandula_category']}")
            accepted.append({**item, "ai_result": ai_result})
        else:
            reason = ai_result.get("reject_reason", "?")
            print(f"     ❌ REJEITADO | Score: {score}/10 | Motivo: {reason}")
            rejected_count += 1

        # Pausa para respeitar rate limits Gemini
        time.sleep(1)

        if len(accepted) >= max_courses:
            break

    print(f"\n  Cursos aceites pela AI: {len(accepted)} | Rejeitados: {rejected_count}\n")

    # ── FASE 5: Construção dos cursos ────────────────────────────────────────
    print("🏗️  FASE 5 — Construindo schema dos cursos...\n")

    for item in accepted:
        print(f"  📚 Montando: {item['ai_result']['cleaned_title'][:50]}...")
        built = build_course(
            playlist_meta=item["meta"],
            videos=item["videos"],
            video_details=item["video_details"],
            ai_result=item["ai_result"],
            generate_quiz=(generate_quiz and not args_no_quiz_global),
        )
        if built and built.get("course"):
            courses_built.append(built)
            print(f"     ✅ {len(built['course']['lessons'])} aulas | Quiz: {'sim' if built.get('quiz') else 'não'}")

    # ── FASE 6: Deduplicação e ordenação ─────────────────────────────────────
    print(f"\n🔀 FASE 6 — Deduplicação e ordenação...\n")

    courses_only = [b["course"] for b in courses_built if b.get("course")]
    deduplicated = deduplicate_courses(courses_only)
    sorted_courses = sort_by_difficulty(deduplicated)

    # Reassociar quizzes
    course_id_to_quiz = {
        b["course"]["id"]: b["quiz"]
        for b in courses_built
        if b.get("course") and b.get("quiz")
    }
    final_items = [
        {"course": c, "quiz": course_id_to_quiz.get(c["id"])}
        for c in sorted_courses
    ]

    print(f"  Após deduplicação: {len(final_items)} cursos únicos")

    # ── FASE 7: Output ───────────────────────────────────────────────────────
    print(f"\n💾 FASE 7 — Gravando output...\n")

    output_data = build_platform_json(final_items)
    out_path = output_path or os.path.join(OUTPUT_DIR, OUTPUT_FILE)
    os.makedirs(os.path.dirname(out_path) if os.path.dirname(out_path) else ".", exist_ok=True)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"  ✅ Output gravado em: {out_path}")
    print(f"\n{'='*60}")
    print(f"  🎉 CONCLUÍDO!")
    print(f"  📊 {output_data['total_courses']} cursos | {output_data['total_quizzes']} quizzes")
    print(f"  📁 Ficheiro: {out_path}")
    print(f"{'='*60}\n")

    return output_data


# ═══════════════════════════════════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

args_no_quiz_global = False  # Setado pelo main


def _resolve_queries(category: str) -> list[str]:
    """
    Resolve queries de busca para a categoria fornecida.
    Suporta nome exato da categoria ou termo livre.
    """
    # Match exato
    if category.lower() in CATEGORY_QUERIES:
        return CATEGORY_QUERIES[category.lower()]

    # Match parcial
    for key, queries in CATEGORY_QUERIES.items():
        if category.lower() in key or key in category.lower():
            return queries

    # Fallback: usar a categoria como query direta
    return [
        f"curso {category} completo playlist",
        f"curso {category} do zero playlist",
        f"{category} para iniciantes playlist completo",
    ]


def _log_skip(title: str, reason: str, verbose: bool):
    if verbose:
        print(f"  ⏭️  IGNORADO: {title[:45]} → {reason}")


# ═══════════════════════════════════════════════════════════════════════════════
# ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    args = parse_args()

    if args.list_categories:
        print("\n📚 Categorias disponíveis:\n")
        for cat, queries in CATEGORY_QUERIES.items():
            print(f"  🏷️  {cat}")
            for q in queries[:2]:
                print(f"      • {q}")
        print()
        sys.exit(0)

    if not args.category:
        print("❌ Especifica uma categoria com --category")
        print("   Usa --list-categories para ver as opções disponíveis")
        sys.exit(1)

    args_no_quiz_global = args.no_quiz

    run_extraction(
        category=args.category,
        max_courses=args.max_courses,
        generate_quiz=not args.no_quiz,
        trusted_only=args.trusted_only,
        output_path=args.output,
        verbose=args.verbose,
    )
