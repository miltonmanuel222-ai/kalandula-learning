# 🎓 Kalandula Learning — Extrator de Cursos YouTube

Sistema de IA que faz varredura no YouTube, identifica playlists educativas completas e exporta JSON pronto a importar na plataforma Kalandula Learning.

---

## 🚀 Configuração

### Passo 1 — Obter a YouTube Data API v3

1. Vai a https://console.cloud.google.com/
2. Cria um novo projeto (ex: "Kalandula Extractor")
3. No menu lateral: **APIs e Serviços → Biblioteca**
4. Pesquisa **"YouTube Data API v3"** e ativa-a
5. Em **Credenciais → Criar Credenciais → Chave de API**
6. Copia a chave gerada

### Passo 2 — Obter a Gemini API Key

1. Vai a https://aistudio.google.com/app/apikey
2. Clica em **"Create API Key"**
3. Copia a chave gerada

### Passo 3 — Configurar o ficheiro .env

```bash
# Na pasta youtube_extractor/, copia o exemplo:
copy .env.example .env
```

Edita o ficheiro `.env` com as tuas chaves:
```
YOUTUBE_API_KEY=AIza...
GEMINI_API_KEY=AIza...
```

### Passo 4 — Instalar dependências Python

```bash
# Requer Python 3.11+
pip install -r requirements.txt
```

---

## 🎯 Uso

### Extrair cursos de uma categoria
```bash
python extractor.py --category programação --max-courses 10
python extractor.py --category design --max-courses 5
python extractor.py --category negocios --max-courses 8
```

### Opções disponíveis
```
--category / -c     Categoria a pesquisar (obrigatório)
--max-courses / -n  Máximo de cursos (padrão: 10)
--no-quiz           Não gerar quizzes automáticos
--trusted-only      Pesquisar só em canais de confiança
--output / -o       Caminho do ficheiro de saída
--verbose / -v      Mostrar detalhes do processamento
--list-categories   Listar categorias disponíveis
```

### Listar categorias disponíveis
```bash
python extractor.py --list-categories
```

### Apenas canais de confiança (mais rápido, mais qualidade)
```bash
python extractor.py --category tecnologia --trusted-only --max-courses 5
```

---

## 📦 Output

O script gera `output/courses_output.json` com a estrutura:

```json
{
  "generated_at": "2026-06-16T12:00:00Z",
  "total_courses": 8,
  "total_quizzes": 8,
  "courses": [...],
  "quizzes": [...]
}
```

Cada curso segue o schema da plataforma Kalandula:
```json
{
  "id": "yt_PLxxxxxx",
  "title": "Python do Zero ao Avançado",
  "description": "Aprenda Python desde os fundamentos...",
  "imageUrl": "https://i.ytimg.com/vi/xxx/maxresdefault.jpg",
  "category": "tecnologia",
  "level": "Iniciante",
  "rating": 4.7,
  "students": 12400,
  "lessons": [
    {
      "id": "yt_videoId",
      "courseId": "yt_PLxxxxxx",
      "title": "Aula 1 - Introdução ao Python",
      "contentUrl": "https://www.youtube.com/watch?v=...",
      "type": "video",
      "duration": "18 min"
    }
  ]
}
```

---

## 🔗 Importar na Plataforma

Após gerar o JSON, tens duas opções:

### Opção A — Manual (rápida)
1. Abre `output/courses_output.json`
2. Copia o array `courses` para `src/services/mockDb.ts` dentro de `INITIAL_COURSES`
3. Copia o array `quizzes` para `INITIAL_QUIZZES`
4. Reinicia o servidor (`npm run dev`)

### Opção B — Script de importação (automática)
```bash
# Próximamente disponível
node import_courses.js output/courses_output.json
```

---

## ⚡ Quotas da YouTube API

| Operação | Custo (unidades) |
|---|---|
| search.list (1 query) | 100 |
| playlists.list (por playlist) | 1 |
| playlistItems.list (por página 50 vídeos) | 1 |
| videos.list (batch 50 vídeos) | 1 |

Com 10.000 unidades/dia (quota gratuita):
- ~80 queries de busca por dia
- ~800 leituras de detalhes de playlist

Recomendação: extrair no máximo 20–30 cursos por execução.

---

## 🏷️ Categorias Disponíveis

| ID Kalandula | Termos de Busca |
|---|---|
| `tecnologia` | programação, python, javascript, react, web... |
| `design` | design gráfico, figma, ui/ux, photoshop... |
| `negocios` | marketing digital, gestão, excel, vendas... |
| `ciencias` | matemática, física, química, estatística... |
| `comunicacao` | inglês, oratória, redação, comunicação... |
| `desenvolvimento` | inteligência emocional, produtividade, liderança... |

---

## ⭐ Canais de Confiança Pré-configurados

- Curso em Vídeo (Gustavo Guanabara)
- Rocketseat
- Filipe Deschamps
- freeCodeCamp.org (PT)
- Alura Cursos
- Bonieky Lacerda
- Código Fonte TV
