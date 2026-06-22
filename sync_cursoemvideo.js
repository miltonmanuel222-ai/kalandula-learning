import fs from 'fs';
import path from 'path';
import youtubedl from 'youtube-dl-exec';

const mockDbPath = path.join(process.cwd(), 'src', 'services', 'mockDb.ts');

const CHANNEL_URL = 'https://www.youtube.com/@cursoemvideo/playlists';
const INSTRUCTOR_NAME = 'Gustavo Guanabara (Curso em Vídeo)';

// We will map youtube-dl extracted metadata into our Course structure
function formatDuration(seconds) {
  if (!seconds) return '0 min';
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

// Helper to determine the "Module" from the video title.
function extractModuleFromTitle(title) {
  // Common patterns in Curso em Video: "Curso de Python 3 - Mundo 1: Fundamentos", "Módulo 1", etc.
  const lowerTitle = title.toLowerCase();
  
  const matchMundo = title.match(/(Mundo\s*\d+)/i);
  if (matchMundo) return matchMundo[1];

  const matchModulo = title.match(/(M[óo]dulo\s*\d+)/i);
  if (matchModulo) return matchModulo[1];

  return 'Geral'; // Fallback
}

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

async function syncChannelPlaylists() {
  console.log(`Buscando playlists do canal: ${CHANNEL_URL}...`);
  
  let playlistsData;
  try {
    // We use flat-playlist to get just the list of playlists first
    playlistsData = await youtubedl(CHANNEL_URL, {
      dumpSingleJson: true,
      flatPlaylist: true,
      noWarnings: true
    });
  } catch (error) {
    console.error("Erro ao buscar o canal:", error.message);
    return;
  }

  const entries = playlistsData.entries || [];
  if (entries.length === 0) {
    console.log("Nenhuma playlist encontrada.");
    return;
  }

  console.log(`Encontradas ${entries.length} playlists.`);
  
  // Read existing DB
  let dbContent = fs.readFileSync(mockDbPath, 'utf-8');
  
  // Read existing courses to avoid duplicate processing if not needed, or merge
  // Since mockDb.ts is a TS file, we'll try to do regex or simple AST modification.
  // The easiest way to incrementally sync is to append NEW courses to INITIAL_COURSES array.
  // For safety, let's look for `const INITIAL_COURSES: Course[] = [` and inject after it,
  // or better, find existing courses by youtubePlaylistId to avoid duplicates.
  
  // Let's just process the first 3 playlists for now to avoid long run times, 
  // or we can process all if we skip existing ones.
  let newCoursesAdded = 0;

  for (let i = 0; i < entries.length; i++) {
    // Parar após adicionar 4 cursos nesta fase
    if (newCoursesAdded >= 4) {
      console.log('Limite de 4 cursos atingido nesta fase.');
      break;
    }

    const pl = entries[i];
    if (!pl.url) continue;

    const playlistId = pl.id;
    if (dbContent.includes(`youtubePlaylistId: '${playlistId}'`)) {
      console.log(`[Ignorado] Playlist já existe no mockDb.ts: ${pl.title}`);
      continue;
    }

    console.log(`Processando playlist: ${pl.title}...`);
    try {
      const plDetails = await youtubedl(pl.url, {
        dumpSingleJson: true,
        flatPlaylist: true,
        noWarnings: true
      });

      const courseId = `cv_${playlistId}`;
      const videos = plDetails.entries || [];
      
      if (videos.length === 0) continue;

      const lessons = [];
      let order = 1;

      for (const v of videos) {
        if (v.title === '[Deleted video]' || v.title === '[Private video]') continue;

        lessons.push({
          id: `l_${v.id}`,
          courseId: courseId,
          title: v.title.replace(/'/g, "\\'"),
          contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
          youtubeVideoId: v.id,
          imageUrl: v.thumbnails && v.thumbnails.length > 0 ? v.thumbnails[v.thumbnails.length - 1].url : '',
          description: (v.description || '').substring(0, 200).replace(/'/g, "\\'") + '...',
          module: extractModuleFromTitle(v.title),
          order: order,
          type: 'video',
          duration: formatDuration(v.duration)
        });
        order++;
      }

      const courseObj = {
        id: courseId,
        title: plDetails.title.replace(/'/g, "\\'"),
        description: (plDetails.description || pl.title).replace(/'/g, "\\'").replace(/\n/g, "\\n"),
        imageUrl: pl.thumbnails && pl.thumbnails.length > 0 ? pl.thumbnails[pl.thumbnails.length - 1].url : '',
        category: 'tecnologia', // Defaulting to tech for Curso em Video
        level: 'Iniciante',
        instructor: INSTRUCTOR_NAME,
        youtubePlaylistId: playlistId,
        rating: 5.0,
        students: 0,
        lessons: lessons
      };

      // Convert to string format that fits mockDb.ts
      let lessonsStr = '[\n';
      courseObj.lessons.forEach(l => {
        lessonsStr += `      { id: '${l.id}', courseId: '${l.courseId}', title: '${l.title}', contentUrl: '${l.contentUrl}', youtubeVideoId: '${l.youtubeVideoId}', imageUrl: '${l.imageUrl}', description: '${l.description}', module: '${l.module}', order: ${l.order}, type: '${l.type}', duration: '${l.duration}' },\n`;
      });
      lessonsStr += '    ]';

      const courseStr = `  {
    id: '${courseObj.id}',
    title: '${courseObj.title}',
    description: '${courseObj.description}',
    imageUrl: '${courseObj.imageUrl}',
    category: '${courseObj.category}',
    level: '${courseObj.level}',
    instructor: '${courseObj.instructor}',
    youtubePlaylistId: '${courseObj.youtubePlaylistId}',
    rating: ${courseObj.rating},
    students: ${courseObj.students},
    lessons: ${lessonsStr}
  },
`;

      // Insert into dbContent
      const insertionPoint = 'const INITIAL_COURSES: Course[] = [\n';
      dbContent = dbContent.replace(insertionPoint, insertionPoint + courseStr);
      newCoursesAdded++;
      console.log(`✅ Adicionado curso: ${courseObj.title} com ${lessons.length} aulas.`);
      
      fs.writeFileSync(mockDbPath, dbContent, 'utf-8');

      // Add a tiny delay to not overload youtube-dl or get rate limited
      await new Promise(r => setTimeout(r, 1000));

    } catch (err) {
      console.error(`Erro ao extrair detalhes da playlist ${pl.title}:`, err.message);
    }
  }

  console.log(`\nSincronização concluída! ${newCoursesAdded} novos cursos adicionados.`);
}

syncChannelPlaylists();
