"""
config.py — Configuração central do extrator Kalandula Learning
"""
import os
from dotenv import load_dotenv

load_dotenv()

# ── Chaves API ──────────────────────────────────────────────────────────────
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# ── Canais educativos de confiança (PT/BR) ──────────────────────────────────
# O script dará prioridade a playlists destes canais
TRUSTED_CHANNELS = {
    "UCVGAZGdMRSJDLFKe84GOhqg": "Curso em Vídeo",           # cursoem vídeo
    "UCtYt6BNrZDrFB9biMVcuJag": "Rocketseat",                # rocketseat
    "UCU5JicSrEM5A63jkJ2QvGYw": "Filipe Deschamps",          # filipe deschamps
    "UC8butISFwT-Wl7EV0hUK0BQ": "freeCodeCamp.org",          # fcc (tem conteúdo PT)
    "UCon_lADOlRiu7f6Uw_TCFRA": "Gustavo Guanabara",         # guanabara (cursoem vídeo host)
    "UC_aEa8K-EOJ3D6gOs7HcyNg": "Alura Cursos",              # alura
    "UC0RhatS1pyxInC00YKjjBqQ": "Bonieky Lacerda",
    "UCGj_0fTMi0Mz51Ot_0YNGjA": "Código Fonte TV",
    "UCi7Jqbg5TD_3dq9njRHfpWA": "Traversy Media (PT dub)",
}

# ── Mapeamento de categoria → termos de busca YouTube ──────────────────────
CATEGORY_QUERIES = {
    "tecnologia": [
        "curso programação completo playlist",
        "curso python completo playlist",
        "curso javascript completo playlist",
        "curso react completo playlist",
        "curso desenvolvimento web completo",
        "curso lógica de programação completo",
        "curso banco de dados completo playlist",
    ],
    "design": [
        "curso design gráfico completo playlist",
        "curso figma completo playlist",
        "curso ui ux design completo",
        "curso photoshop completo playlist",
        "curso illustrator completo playlist",
    ],
    "negocios": [
        "curso marketing digital completo playlist",
        "curso gestão de negócios completo",
        "curso empreendedorismo completo playlist",
        "curso vendas e negociação completo",
        "curso excel avançado completo playlist",
    ],
    "ciencias": [
        "curso matemática completo playlist",
        "curso física completo playlist",
        "curso química completo playlist",
        "curso estatística completo playlist",
        "curso cálculo completo playlist",
    ],
    "comunicacao": [
        "curso inglês completo playlist",
        "curso oratória completo playlist",
        "curso comunicação profissional completo",
        "curso redação completo playlist",
        "curso produção de conteúdo completo",
    ],
    "desenvolvimento": [
        "curso inteligência emocional completo playlist",
        "curso produtividade completo playlist",
        "curso liderança completo playlist",
        "curso mindfulness completo playlist",
        "curso desenvolvimento pessoal completo",
    ],
}

# ── Kalandula categories (platform IDs) ────────────────────────────────────
KALANDULA_CATEGORIES = ["tecnologia", "design", "negocios", "ciencias", "comunicacao", "desenvolvimento"]

# ── Filtros de qualidade ────────────────────────────────────────────────────
MIN_VIDEOS_IN_PLAYLIST = 4          # Mínimo de vídeos para ser considerado "curso"
MAX_VIDEOS_IN_PLAYLIST = 80         # Máximo (evita playlists gigantes e genéricas)
MIN_EDUCATIONAL_SCORE  = 6          # Score mínimo Gemini (0–10) para aceitar
MIN_TOTAL_DURATION_MIN = 20         # Duração total mínima em minutos
MAX_COURSES_PER_QUERY  = 5          # Máximo de cursos por query de busca
SIMILARITY_THRESHOLD   = 0.85       # Limiar de similaridade para deduplicação (0–1)

# ── Língua da busca ─────────────────────────────────────────────────────────
SEARCH_LANGUAGE = "pt"              # pt = português
SEARCH_REGION   = "BR"             # BR = Brasil (mais conteúdo PT disponível)

# ── Output ──────────────────────────────────────────────────────────────────
OUTPUT_DIR = "output"
OUTPUT_FILE = "courses_output.json"
