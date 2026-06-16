"""
ai_classifier.py — Classificação e enriquecimento de playlists com Gemini AI
Determina se uma playlist é um "curso completo" e qual a sua categoria/nível.
"""

import json
import re
import google.generativeai as genai
from config import GEMINI_API_KEY, KALANDULA_CATEGORIES, MIN_EDUCATIONAL_SCORE


def _setup_gemini():
    """Configura o cliente Gemini."""
    if not GEMINI_API_KEY:
        raise ValueError(
            "GEMINI_API_KEY não está definida. "
            "Copia o ficheiro .env.example para .env e adiciona a tua chave."
        )
    genai.configure(api_key=GEMINI_API_KEY)
    return genai.GenerativeModel("gemini-2.0-flash")


def classify_playlist(
    playlist_title: str,
    playlist_description: str,
    channel_name: str,
    video_titles: list[str],
    total_duration_min: float,
    is_trusted_channel: bool = False,
) -> dict:
    """
    Usa Gemini para avaliar se uma playlist é um curso educativo completo.

    Retorna dict com:
    {
        "is_complete_course": bool,
        "educational_score": int (0-10),
        "level": "Iniciante" | "Intermédio" | "Avançado",
        "kalandula_category": str,
        "description_pt": str,
        "reject_reason": str | None,
        "cleaned_title": str
    }
    """
    model = _setup_gemini()

    # Limitar lista de títulos para não exceder tokens
    titles_sample = video_titles[:20]
    titles_str = "\n".join(f"  {i+1}. {t}" for i, t in enumerate(titles_sample))
    if len(video_titles) > 20:
        titles_str += f"\n  ... (+{len(video_titles) - 20} aulas adicionais)"

    categories_str = " | ".join(KALANDULA_CATEGORIES)

    prompt = f"""Analisa esta playlist do YouTube e avalia se é um curso educativo completo em PORTUGUÊS (PT/BR).

DADOS DA PLAYLIST:
- Título: {playlist_title}
- Canal: {channel_name}
- Descrição: {playlist_description[:300] if playlist_description else "(sem descrição)"}
- Duração total: {total_duration_min:.0f} minutos
- Nº de vídeos: {len(video_titles)}
- Canal de confiança: {"SIM" if is_trusted_channel else "NÃO"}

TÍTULOS DAS AULAS:
{titles_str}

TAREFA: Responde APENAS com um objeto JSON válido, sem texto adicional, markdown ou formatação:

{{
  "is_complete_course": <true ou false>,
  "educational_score": <número inteiro de 0 a 10>,
  "level": "<Iniciante ou Intermédio ou Avançado>",
  "kalandula_category": "<uma de: {categories_str}>",
  "description_pt": "<descrição do curso em português, máximo 200 caracteres, clara e atrativa>",
  "cleaned_title": "<título limpo e profissional em português, sem emojis ou caracteres especiais excessivos>",
  "reject_reason": <"motivo breve em português" ou null se aceitar>
}}

CRITÉRIOS DE AVALIAÇÃO:
- educational_score 8-10: Curso estruturado com progressão clara, conteúdo profissional
- educational_score 6-7: Bom conteúdo mas estrutura menos organizada
- educational_score 4-5: Conteúdo misto, não é claramente um curso
- educational_score 0-3: Não é um curso (compilação aleatória, clickbait, etc.)
- is_complete_course = true apenas se educational_score >= 6 E tiver sequência pedagógica
- Se o conteúdo for predominantemente em inglês, educational_score máximo = 4
"""

    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.1,
                max_output_tokens=512,
            ),
        )
        raw_text = response.text.strip()

        # Limpar markdown se presente
        raw_text = re.sub(r"```json\s*", "", raw_text)
        raw_text = re.sub(r"```\s*", "", raw_text)
        raw_text = raw_text.strip()

        data = json.loads(raw_text)

        # Validação e normalização dos campos
        result = {
            "is_complete_course": bool(data.get("is_complete_course", False)),
            "educational_score": min(10, max(0, int(data.get("educational_score", 0)))),
            "level": _normalize_level(data.get("level", "Iniciante")),
            "kalandula_category": _normalize_category(data.get("kalandula_category", "tecnologia")),
            "description_pt": str(data.get("description_pt", ""))[:220],
            "cleaned_title": str(data.get("cleaned_title", playlist_title))[:120],
            "reject_reason": data.get("reject_reason"),
        }

        # Override: se score abaixo do mínimo, marcar como rejeitado
        if result["educational_score"] < MIN_EDUCATIONAL_SCORE:
            result["is_complete_course"] = False
            if not result["reject_reason"]:
                result["reject_reason"] = f"Score educativo baixo ({result['educational_score']}/10)"

        return result

    except (json.JSONDecodeError, Exception) as e:
        print(f"  [AVISO AI] Erro ao classificar '{playlist_title[:50]}': {e}")
        return {
            "is_complete_course": False,
            "educational_score": 0,
            "level": "Iniciante",
            "kalandula_category": "tecnologia",
            "description_pt": "",
            "cleaned_title": playlist_title,
            "reject_reason": f"Erro na classificação AI: {str(e)[:60]}",
        }


def generate_quiz_questions(
    course_title: str,
    course_description: str,
    category: str,
    num_questions: int = 3,
) -> list[dict]:
    """
    Gera questões de avaliação para um curso extraído do YouTube.
    Retorna lista de dicts compatível com o schema Quiz da plataforma.
    """
    model = _setup_gemini()

    prompt = f"""Cria {num_questions} questões de avaliação de múltipla escolha para este curso:

Título: {course_title}
Categoria: {category}
Descrição: {course_description}

Responde APENAS com um array JSON válido:
[
  {{
    "text": "<pergunta>",
    "options": ["<opção A>", "<opção B>", "<opção C>", "<opção D>"],
    "correctOptionIndex": <0, 1, 2 ou 3>
  }}
]

Regras:
- Questões em português
- Progressivamente mais difíceis
- Distratores plausíveis mas claramente incorretos
- Foca nos conceitos fundamentais da área"""

    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(temperature=0.3, max_output_tokens=800),
        )
        raw_text = response.text.strip()
        raw_text = re.sub(r"```json\s*", "", raw_text)
        raw_text = re.sub(r"```\s*", "", raw_text)
        questions = json.loads(raw_text.strip())

        # Validação básica
        valid_questions = []
        for q in questions:
            if (
                isinstance(q, dict)
                and "text" in q
                and "options" in q
                and "correctOptionIndex" in q
                and len(q["options"]) == 4
                and 0 <= q["correctOptionIndex"] <= 3
            ):
                valid_questions.append(q)

        return valid_questions[:num_questions]

    except Exception as e:
        print(f"  [AVISO AI] Erro ao gerar quiz para '{course_title[:40]}': {e}")
        return []


# ── Helpers ─────────────────────────────────────────────────────────────────

def _normalize_level(level: str) -> str:
    """Normaliza o nível para os valores aceites pela plataforma."""
    level = str(level).strip()
    if any(k in level.lower() for k in ["avan", "advan", "avançado"]):
        return "Avançado"
    if any(k in level.lower() for k in ["inter", "médio", "medio"]):
        return "Intermédio"
    return "Iniciante"


def _normalize_category(cat: str) -> str:
    """Garante que a categoria é uma das categorias válidas da plataforma."""
    cat = str(cat).strip().lower()
    from config import KALANDULA_CATEGORIES
    if cat in KALANDULA_CATEGORIES:
        return cat
    # Fallback: mapeamento parcial
    mappings = {
        "tech": "tecnologia", "programação": "tecnologia", "programming": "tecnologia",
        "design": "design", "negócio": "negocios", "business": "negocios",
        "ciência": "ciencias", "science": "ciencias", "math": "ciencias",
        "comunicação": "comunicacao", "communication": "comunicacao",
        "desenvolvimento": "desenvolvimento", "personal": "desenvolvimento",
    }
    for key, val in mappings.items():
        if key in cat:
            return val
    return "tecnologia"  # fallback padrão
