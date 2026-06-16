import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl-exec';

const mockDbPath = path.join(process.cwd(), 'src', 'services', 'mockDb.ts');
const videosDir = path.join(process.cwd(), 'public', 'videos');

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Helper to extract YouTube video ID
function extractVideoId(url) {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /[?&]v=([^?&\s]+)/,
    /embed\/([^?&\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

async function syncVideos() {
  console.log('A iniciar a sincronização de vídeos...');
  
  let content = fs.readFileSync(mockDbPath, 'utf-8');
  const urlRegex = /contentUrl:\s*'((?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/[^']+)'/g;
  
  let match;
  let matches = [];
  while ((match = urlRegex.exec(content)) !== null) {
    matches.push({ fullMatch: match[0], url: match[1] });
  }

  if (matches.length === 0) {
    console.log('Nenhum vídeo do YouTube encontrado para sincronizar.');
    return;
  }

  console.log(`Encontrados ${matches.length} vídeos para descarregar.`);

  for (const item of matches) {
    const videoId = extractVideoId(item.url);
    if (!videoId) continue;

    const outputPath = path.join(videosDir, `${videoId}.mp4`);
    const relativeUrl = `/videos/${videoId}.mp4`;

    if (!fs.existsSync(outputPath)) {
      console.log(`[Baixando] ${videoId}... (Isso pode demorar dependendo do tamanho)`);
      try {
        await youtubedl(item.url, {
          format: 'bestvideo[height<=720]+bestaudio/best[height<=720]',
          mergeOutputFormat: 'mp4',
          output: outputPath,
          noCheckCertificates: true,
          noWarnings: true,
          preferFreeFormats: true,
        });
        console.log(`✅ [Concluído] ${videoId}`);
      } catch (err) {
        console.error(`❌ [Erro] Falha ao baixar ${videoId}:`, err.message);
        continue;
      }
    } else {
      console.log(`⏩ [Ignorado] ${videoId} já existe.`);
    }

    // Replace the URL in the mockDb content
    const replacement = `contentUrl: '${relativeUrl}'`;
    content = content.replace(item.fullMatch, replacement);
  }

  // Save the updated mockDb
  fs.writeFileSync(mockDbPath, content, 'utf-8');
  console.log('Base de dados (mockDb.ts) atualizada com caminhos locais.');
}

syncVideos().catch(console.error);
