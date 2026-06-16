"""
youtube_client.py — Wrapper da YouTube Data API v3
Gerencia pesquisa de playlists, detalhes e listas de vídeos.
"""

import re
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from config import YOUTUBE_API_KEY, SEARCH_LANGUAGE, SEARCH_REGION


def _build_service():
    """Cria o cliente da YouTube Data API v3."""
    if not YOUTUBE_API_KEY:
        raise ValueError(
            "YOUTUBE_API_KEY não está definida. "
            "Copia o ficheiro .env.example para .env e adiciona a tua chave."
        )
    return build("youtube", "v3", developerKey=YOUTUBE_API_KEY)


def search_playlists(query: str, max_results: int = 20) -> list[dict]:
    """
    Pesquisa playlists no YouTube pelo query fornecido.
    Retorna lista de dicts com id e snippet.
    """
    service = _build_service()
    results = []

    try:
        request = service.search().list(
            q=query,
            part="id,snippet",
            type="playlist",
            maxResults=min(max_results, 50),
            relevanceLanguage=SEARCH_LANGUAGE,
            regionCode=SEARCH_REGION,
            safeSearch="strict",
        )
        response = request.execute()

        for item in response.get("items", []):
            if item["id"]["kind"] == "youtube#playlist":
                results.append({
                    "playlist_id": item["id"]["playlistId"],
                    "title": item["snippet"]["title"],
                    "description": item["snippet"].get("description", ""),
                    "channel_id": item["snippet"]["channelId"],
                    "channel_title": item["snippet"]["channelTitle"],
                    "thumbnail": _best_thumbnail(item["snippet"].get("thumbnails", {})),
                    "published_at": item["snippet"].get("publishedAt", ""),
                })
    except HttpError as e:
        print(f"  [ERRO YouTube API] search_playlists: {e}")

    return results


def get_playlist_details(playlist_id: str) -> dict | None:
    """
    Obtém detalhes de uma playlist específica, incluindo contagem de vídeos.
    """
    service = _build_service()
    try:
        response = service.playlists().list(
            part="snippet,contentDetails,status",
            id=playlist_id,
        ).execute()

        items = response.get("items", [])
        if not items:
            return None

        item = items[0]
        return {
            "playlist_id": playlist_id,
            "title": item["snippet"]["title"],
            "description": item["snippet"].get("description", ""),
            "channel_id": item["snippet"]["channelId"],
            "channel_title": item["snippet"]["channelTitle"],
            "thumbnail": _best_thumbnail(item["snippet"].get("thumbnails", {})),
            "video_count": item["contentDetails"]["itemCount"],
            "privacy": item["status"]["privacyStatus"],
        }
    except HttpError as e:
        print(f"  [ERRO YouTube API] get_playlist_details({playlist_id}): {e}")
        return None


def get_playlist_videos(playlist_id: str, max_videos: int = 80) -> list[dict]:
    """
    Retorna a lista de vídeos de uma playlist, com metadados básicos.
    Faz paginação automática até max_videos.
    """
    service = _build_service()
    videos = []
    next_page_token = None

    while len(videos) < max_videos:
        try:
            response = service.playlistItems().list(
                part="snippet,contentDetails",
                playlistId=playlist_id,
                maxResults=min(50, max_videos - len(videos)),
                pageToken=next_page_token,
            ).execute()
        except HttpError as e:
            print(f"  [ERRO YouTube API] get_playlist_videos({playlist_id}): {e}")
            break

        for item in response.get("items", []):
            snippet = item["snippet"]
            video_id = snippet.get("resourceId", {}).get("videoId", "")
            if not video_id:
                continue

            videos.append({
                "video_id": video_id,
                "title": snippet.get("title", ""),
                "description": snippet.get("description", "")[:500],
                "position": snippet.get("position", len(videos)),
                "thumbnail": _best_thumbnail(snippet.get("thumbnails", {})),
                "channel_title": snippet.get("channelTitle", ""),
            })

        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break

    return videos


def enrich_videos_with_details(video_ids: list[str]) -> dict[str, dict]:
    """
    Dado uma lista de video IDs, obtém duração, view count e flag embeddable.
    Retorna dict {video_id: {duration_min, view_count, embeddable}}.
    """
    service = _build_service()
    result = {}

    # API aceita no máximo 50 IDs por chamada
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        try:
            response = service.videos().list(
                part="contentDetails,statistics,status",
                id=",".join(batch),
            ).execute()
        except HttpError as e:
            print(f"  [ERRO YouTube API] enrich_videos_with_details: {e}")
            continue

        for item in response.get("items", []):
            vid_id = item["id"]
            duration_str = item.get("contentDetails", {}).get("duration", "PT0S")
            view_count = int(item.get("statistics", {}).get("viewCount", 0))
            like_count = int(item.get("statistics", {}).get("likeCount", 0))
            embeddable = item.get("status", {}).get("embeddable", True)

            result[vid_id] = {
                "duration_min": _iso8601_to_minutes(duration_str),
                "duration_label": _iso8601_to_label(duration_str),
                "view_count": view_count,
                "like_count": like_count,
                "embeddable": embeddable,
            }

    return result


def get_channel_stats(channel_id: str) -> dict:
    """Obtém estatísticas básicas de um canal."""
    service = _build_service()
    try:
        response = service.channels().list(
            part="statistics,snippet",
            id=channel_id,
        ).execute()
        items = response.get("items", [])
        if items:
            stats = items[0].get("statistics", {})
            return {
                "subscriber_count": int(stats.get("subscriberCount", 0)),
                "video_count": int(stats.get("videoCount", 0)),
            }
    except HttpError:
        pass
    return {"subscriber_count": 0, "video_count": 0}


# ── Helpers internos ────────────────────────────────────────────────────────

def _best_thumbnail(thumbnails: dict) -> str:
    """Retorna a URL da melhor thumbnail disponível."""
    for quality in ["maxres", "standard", "high", "medium", "default"]:
        if quality in thumbnails:
            return thumbnails[quality]["url"]
    return ""


def _iso8601_to_minutes(duration: str) -> float:
    """Converte duração ISO 8601 (PT1H23M45S) para minutos float."""
    match = re.match(
        r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", duration
    )
    if not match:
        return 0.0
    hours = int(match.group(1) or 0)
    minutes = int(match.group(2) or 0)
    seconds = int(match.group(3) or 0)
    return round(hours * 60 + minutes + seconds / 60, 1)


def _iso8601_to_label(duration: str) -> str:
    """Converte duração ISO 8601 para string legível (ex: '23 min', '1h 15min')."""
    total_min = _iso8601_to_minutes(duration)
    if total_min < 1:
        return "< 1 min"
    if total_min < 60:
        return f"{int(total_min)} min"
    hours = int(total_min // 60)
    mins = int(total_min % 60)
    return f"{hours}h {mins}min" if mins > 0 else f"{hours}h"
