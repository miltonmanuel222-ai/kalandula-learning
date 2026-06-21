import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Course, Enrollment } from '../types';
import {
  CheckCircle, Circle, PlayCircle, FileText, ArrowLeft, ArrowRight,
  Lock, Settings, BookOpen, Trophy, SkipForward,
  Share2, Star, MessageCircle, MoreVertical, Square, ChevronDown, X
} from 'lucide-react';
import QuizModal from '../components/QuizModal';

// ── YouTube IFrame API global types ──────────────────────────────────────────
declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: YTOpts) => YTPlayerInstance;
      PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
interface YTOpts {
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (e: { target: YTPlayerInstance }) => void;
    onStateChange?: (e: { data: number }) => void;
    onError?: (e: { data: number }) => void;
  };
}
interface YTPlayerInstance {
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const RESUME_KEY    = (uid: string, cid: string) => `kal_resume_${uid}_${cid}`;
const SEQ_LOCK_KEY  = 'kal_sequential_lock';
const COUNTDOWN_SEC = 5;
const YT_PLAYER_ID  = 'yt-player-mount';

// ─────────────────────────────────────────────────────────────────────────────
export default function LearningRoom() {
  const { courseId }  = useParams<{ courseId: string }>();
  const navigate      = useNavigate();
  const { user }      = useAuth();
  const { addNotification } = useFavoritesAndNotifications();

  const [course,       setCourse]       = useState<Course | null>(null);
  const [enrollment,   setEnrollment]   = useState<Enrollment | null>(null);
  const [currentIdx,   setCurrentIdx]   = useState(0);
  const [ytReady,      setYtReady]      = useState(false);
  const [countdown,    setCountdown]    = useState<number | null>(null);
  const [seqLock,      setSeqLock]      = useState(() => localStorage.getItem(SEQ_LOCK_KEY) !== 'false');
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [copied,       setCopied]       = useState(false);
  const [playerError,  setPlayerError]  = useState(false);
  const [activeTab,    setActiveTab]    = useState('overview');

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCourseCompleteModal, setShowCourseCompleteModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [ratingStep, setRatingStep] = useState<1 | 2 | 3>(1);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState('');

  const handleRatingSubmit = () => {
    setRatingStep(3);
    if (user && course) {
      addNotification({
        userId: user.id,
        type: 'course_update',
        title: 'Classificação Enviada',
        message: 'A sua classificação foi enviada com sucesso. Obrigado!',
        courseId: course.id,
        courseName: course.title
      });
    }
  };

  const getRatingText = (val: number) => {
    switch (val) {
      case 1: return 'Péssimo';
      case 2: return 'Ruim';
      case 3: return 'Razoável';
      case 4: return 'Bom, era o que eu esperava';
      case 5: return 'Excelente, superou expectativas';
      default: return 'Selecionar classificação';
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Refs to always have latest state inside YT callbacks (avoid stale closures)
  const playerRef   = useRef<YTPlayerInstance | null>(null);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef    = useRef({ enrollment, course, currentIdx, user, seqLock });
  stateRef.current  = { enrollment, course, currentIdx, user, seqLock };

  // ── 1. Load course & set resume position ─────────────────────────────────
  useEffect(() => {
    if (!courseId || !user) return;
    const c = db.getCourse(courseId);
    const e = db.getEnrollment(user.id, courseId);
    if (!c || !e) { navigate('/'); return; }
    setCourse(c);
    setEnrollment(e);

    // Resume: last watched lesson
    const saved = parseInt(localStorage.getItem(RESUME_KEY(user.id, courseId)) || '-1');
    if (saved >= 0 && saved < c.lessons.length) {
      setCurrentIdx(saved);
    } else {
      // Fallback: first incomplete lesson
      const firstIncomplete = c.lessons.findIndex(l => !e.completedLessons.includes(l.id));
      setCurrentIdx(firstIncomplete !== -1 ? firstIncomplete : 0);
    }
  }, [courseId, user, navigate]);

  // ── 2. Load YouTube IFrame API ───────────────────────────────────────────
  useEffect(() => {
    if (window.YT?.Player) { setYtReady(true); return; }
    window.onYouTubeIframeAPIReady = () => setYtReady(true);
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
  }, []);

  // ── 3. Create / update player when lesson or ytReady changes ────────────
  useEffect(() => {
    if (!ytReady || !course) return;
    const lesson = course.lessons[currentIdx];
    if (!lesson) return;

    clearCountdown();
    setPlayerError(false);

    // Persist resume
    if (user && courseId) {
      localStorage.setItem(RESUME_KEY(user.id, courseId), String(currentIdx));
    }

    if (!ytUrl(lesson.contentUrl)) {
      destroyPlayer();
      return;
    }

    const vid = extractVideoId(lesson.contentUrl);
    if (!vid) { setPlayerError(true); return; }

    if (playerRef.current) {
      // Smooth swap: cue new video (no autoplay on manual navigation)
      try { playerRef.current.cueVideoById(vid); return; } catch { playerRef.current = null; }
    }

    // Mount new player
    const el = document.getElementById(YT_PLAYER_ID);
    if (!el) return;

    playerRef.current = new window.YT.Player(el, {
      videoId: vid,
      playerVars: { 
        rel: 0, 
        modestbranding: 1, 
        fs: 1, 
        iv_load_policy: 3,
        origin: window.location.origin 
      },
      events: {
        onStateChange: (evt: { data: number }) => {
          if (evt.data === 0) handleVideoEnded();
        },
        onError: () => setPlayerError(true),
      },
    });
  }, [ytReady, currentIdx, course]); // eslint-disable-line

  // ── 4. Cleanup on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => { clearCountdown(); destroyPlayer(); };
  }, []); // eslint-disable-line

  // ── Video state change handler (Local & YouTube) ───────────────────────
  const handleVideoEnded = useCallback(() => {
    const { enrollment, course, currentIdx, user } = stateRef.current;
    if (!enrollment || !course || !user) return;

    const lesson = course.lessons[currentIdx];
    if (!lesson) return;

    // Auto-mark current lesson complete
    if (!enrollment.completedLessons.includes(lesson.id)) {
      db.markLessonComplete(user.id, course.id, lesson.id);
      const updated = db.getEnrollment(user.id, course.id);
      if (updated) {
        setEnrollment(updated);
        stateRef.current.enrollment = updated;
        if (updated.progress === 100 && enrollment.progress < 100) {
          setShowCourseCompleteModal(true);
          addNotification({
            userId: user.id,
            type: 'course_completed',
            title: 'Curso concluído',
            message: `Você concluiu "${course.title}". Avaliação final disponível.`,
            courseName: course.title,
            courseId: course.id,
          });
        }
      }
    }

    // Start auto-advance countdown if next lesson exists
    const nextIdx = currentIdx + 1;
    if (nextIdx < course.lessons.length) {
      startCountdown(nextIdx);
    }
  }, [addNotification]);

  // ── Countdown helpers ────────────────────────────────────────────────────
  function startCountdown(targetIdx: number) {
    clearCountdown();
    let secs = COUNTDOWN_SEC;
    setCountdown(secs);
    timerRef.current = setInterval(() => {
      secs--;
      if (secs <= 0) {
        clearCountdown();
        // Auto-advance: use loadVideoById (with autoplay) for smooth transition
        const { course, seqLock, enrollment } = stateRef.current;
        if (!course || !enrollment) return;
        const nextLesson = course.lessons[targetIdx];
        const canAccess = !seqLock || isAccessible(targetIdx, enrollment, course);
        if (canAccess) {
          setCurrentIdx(targetIdx);
          // For auto-advance, load (with autoplay) instead of cue
          const vid = extractVideoId(nextLesson?.contentUrl || '');
          if (vid && playerRef.current) {
            try { playerRef.current.loadVideoById(vid); } catch {}
          }
        }
      } else {
        setCountdown(secs);
      }
    }, 1000);
  }

  function clearCountdown() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setCountdown(null);
  }

  function destroyPlayer() {
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
  }

  // ── Access control ───────────────────────────────────────────────────────
  function isAccessible(idx: number, enr: Enrollment, c: Course): boolean {
    if (idx === 0) return true;
    const prev = c.lessons[idx - 1];
    return prev ? enr.completedLessons.includes(prev.id) : false;
  }

  function canGoto(idx: number): boolean {
    if (!enrollment || !course) return false;
    if (!seqLock) return true;
    return isAccessible(idx, enrollment, course) || enrollment.completedLessons.includes(course.lessons[idx]?.id || '');
  }

  function gotoLesson(idx: number) {
    if (!canGoto(idx)) return;
    clearCountdown();
    setCurrentIdx(idx);
  }

  function handleMarkComplete() {
    if (!user || !course || !enrollment) return;
    const lesson = course.lessons[currentIdx];
    if (enrollment.completedLessons.includes(lesson.id)) return;
    db.markLessonComplete(user.id, course.id, lesson.id);
    const updated = db.getEnrollment(user.id, course.id);
    if (updated) {
      setEnrollment(updated);
      stateRef.current.enrollment = updated;
      if (updated.progress === 100 && enrollment.progress < 100) {
        setShowCourseCompleteModal(true);
        addNotification({
          userId: user.id,
          type: 'course_completed',
          title: 'Curso concluído',
          message: `Você concluiu "${course.title}". Avaliação final disponível.`,
          courseName: course.title,
          courseId: course.id,
        });
      }
    }
  }

  function toggleSeqLock() {
    const next = !seqLock;
    setSeqLock(next);
    localStorage.setItem(SEQ_LOCK_KEY, String(next));
  }

  // ── Guard ────────────────────────────────────────────────────────────────
  if (!course || !enrollment) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <BookOpen size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
        <p>A carregar curso...</p>
      </div>
    </div>
  );

  const lesson      = course.lessons[currentIdx];
  const completed   = enrollment.completedLessons.includes(lesson.id);
  const isYouTube   = ytUrl(lesson.contentUrl);
  const isLocalVid  = !isYouTube;
  const hasNext     = currentIdx < course.lessons.length - 1;
  const hasPrev     = currentIdx > 0;
  const allDone     = enrollment.progress === 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', background: '#fff' }}>
      
      {/* ── HEADER (Dark Navbar) ── */}
      <header style={{ height: '56px', background: '#1c1d1f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', flexShrink: 0, fontFamily: '"Udemy Sans", "SF Pro Text", -apple-system, sans-serif' }}>
         {/* Left: Logo/Back & Title */}
         <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: 0 }}>
           <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, padding: 0 }}>
             Kalandula<span style={{ color: 'var(--primary)' }}>.</span>
           </button>
           <div style={{ width: '1px', height: '24px', background: '#3e4143' }} />
           <h1 style={{ fontSize: '1rem', fontWeight: 500, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
             {course.title}
           </h1>
         </div>

         {/* Right: Actions */}
         <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
           <button 
             onClick={() => { setShowRatingModal(true); setRatingStep(1); setRatingValue(0); setHoverRating(0); setRatingFeedback(''); }}
             style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}
           >
             <Star size={16} fill="transparent" /> Deixe uma classificação
           </button>
           
           {/* Progress Button with Popover */}
           <div 
             style={{ position: 'relative' }} 
             onMouseEnter={() => setShowProgress(true)} 
             onMouseLeave={() => setShowProgress(false)}
           >
             <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
               <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <svg width="32" height="32" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                   <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
                   <circle
                     cx="16" cy="16" r="14" fill="none"
                     stroke={allDone ? '#22C55E' : '#A855F7'} strokeWidth="2.5"
                     strokeDasharray={`${2 * Math.PI * 14}`}
                     strokeDashoffset={`${2 * Math.PI * 14 * (1 - enrollment.progress / 100)}`}
                     strokeLinecap="round"
                   />
                 </svg>
                 <Trophy size={14} color={allDone ? '#22C55E' : '#fff'} />
               </div>
               Seu progresso <ChevronDown size={14} />
             </button>

             {/* Popover */}
             {showProgress && (
               <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: '0', background: '#fff', color: '#1c1d1f', padding: '1.25rem', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '300px', zIndex: 110, border: '1px solid #d1d7dc' }}>
                 {/* Triangle Arrow */}
                 <div style={{ position: 'absolute', top: '-6px', right: '40px', width: '12px', height: '12px', background: '#fff', transform: 'rotate(45deg)', borderLeft: '1px solid #d1d7dc', borderTop: '1px solid #d1d7dc' }} />
                 
                 <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1c1d1f' }}>
                   {enrollment.completedLessons.length} de {course.lessons.length} concluído.
                 </div>
                 <div style={{ fontSize: '0.85rem', color: '#6a6f73', lineHeight: 1.4 }}>
                   {allDone ? 'Parabéns! Você concluiu este curso.' : 'Conclua o curso para obter o seu certificado'}
                 </div>
               </div>
             )}
           </div>
           <div style={{ position: 'relative' }}>
             <button onClick={handleShare} style={{ background: 'none', border: '1px solid #fff', borderRadius: '4px', padding: '0.4rem 0.8rem', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s', backgroundColor: copied ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
               {copied ? 'Link Copiado' : 'Compartilhar'} <Share2 size={14} />
             </button>
           </div>
           <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'none', border: '1px solid #fff', borderRadius: '4px', padding: '0.4rem', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
             <Settings size={16} />
           </button>
         </div>
      </header>

      {/* ── MAIN BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* Settings Drawer Overlay */}
        {showSettings && (
          <div style={{ position: 'absolute', top: '1rem', right: '420px', zIndex: 100, background: '#fff', border: '1px solid #d1d7dc', borderRadius: '8px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '320px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1c1d1f', marginBottom: '0.3rem' }}>
                  Bloqueio Sequencial
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6a6f73', lineHeight: 1.4 }}>
                  Requer concluir cada aula antes de avançar para a seguinte.
                </div>
              </div>
              <button
                onClick={toggleSeqLock}
                aria-label="Ativar/desativar bloqueio sequencial"
                style={{ flexShrink: 0, width: '40px', height: '22px', borderRadius: '11px', border: 'none', cursor: 'pointer', background: seqLock ? '#1c1d1f' : '#d1d7dc', position: 'relative', transition: 'background 0.2s' }}
              >
                <span style={{ position: 'absolute', top: '2px', left: seqLock ? '20px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>
        )}

        {/* Left Area (Video + Tabs) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#fff', position: 'relative' }}>
          
          {/* Video Container */}
          <div style={{ width: '100%', background: '#1c1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', position: 'relative', paddingTop: '56.25%' }}>
              
              {isYouTube && (
                <div id={YT_PLAYER_ID} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              )}

              {isLocalVid && (
                <video
                  key={lesson.contentUrl}
                  src={lesson.contentUrl}
                  controls
                  autoPlay={currentIdx > 0}
                  onEnded={handleVideoEnded}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}

              {/* Player Error */}
              {isYouTube && playerError && (
                <div style={{ position: 'absolute', inset: 0, background: '#1c1d1f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'white', zIndex: 5 }}>
                  <PlayCircle size={40} style={{ opacity: 0.3 }} />
                  <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Vídeo indisponível neste momento.</p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={lesson.contentUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#1c1d1f', padding: '0.6rem 1.25rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700 }}>
                      Abrir no YouTube ↗
                    </a>
                    {!enrollment?.completedLessons.includes(lesson.id) && (
                      <button onClick={handleMarkComplete} style={{ background: '#22C55E', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>
                        Marcar como Concluída
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Countdown overlay */}
              {countdown !== null && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                   <div style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Avançando para a próxima aula...</div>
                   
                   <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '1.5rem' }}>
                     <svg width="80" height="80" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                       <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                       <circle
                         cx="40" cy="40" r="36" fill="none"
                         stroke="#fff" strokeWidth="4"
                         strokeDasharray={`${2 * Math.PI * 36}`}
                         strokeDashoffset={`${2 * Math.PI * 36 * (1 - countdown / COUNTDOWN_SEC)}`}
                         strokeLinecap="round"
                         style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                       />
                     </svg>
                     <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>
                       {countdown}
                     </div>
                   </div>

                   <button onClick={clearCountdown} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', borderRadius: '4px' }}>
                     Cancelar
                   </button>
                </div>
              )}

            </div>
          </div>

          {/* Tabs Navigation */}
          <div style={{ borderBottom: '1px solid #d1d7dc', padding: '0 2rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
               {['Visão geral', 'Perguntas e respostas', 'Observações', 'Anúncios'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   style={{
                     background: 'none', border: 'none', padding: '1rem 0', fontWeight: 700, fontSize: '0.95rem',
                     color: activeTab === tab ? '#1c1d1f' : '#6a6f73',
                     borderBottom: activeTab === tab ? '2px solid #1c1d1f' : '2px solid transparent',
                     cursor: 'pointer'
                   }}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '2rem', maxWidth: '900px' }}>
            {activeTab === 'Visão geral' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1c1d1f' }}>{lesson.title}</h2>
                <div style={{ fontSize: '1rem', lineHeight: 1.6, color: '#3e4143', background: '#f7f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d1d7dc' }}>
                  <p style={{ color: '#6a6f73', fontSize: '0.95rem', marginBottom: '0' }}>Esta é uma aula em vídeo. Assista até ao fim para que a plataforma marque a aula como concluída automaticamente.</p>
                </div>
              </div>
            )}
            {activeTab !== 'Visão geral' && (
               <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6a6f73' }}>
                 <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Conteúdo não disponível</p>
                 <p style={{ fontSize: '0.9rem' }}>Esta secção estará disponível numa atualização futura.</p>
               </div>
            )}
          </div>

        </div>

        {/* Right Area (Sidebar) */}
        <div style={{ width: '400px', borderLeft: '1px solid #d1d7dc', display: 'flex', flexDirection: 'column', background: '#fff', flexShrink: 0 }}>
          
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #d1d7dc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: '#1c1d1f' }}>
            Conteúdo do curso
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Fake Section Header */}
            <div style={{ padding: '1rem 1.25rem', background: '#f7f9fa', borderBottom: '1px solid #d1d7dc' }}>
              <div style={{ fontWeight: 700, color: '#1c1d1f', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                Seção 1: Apresentação do curso
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6a6f73' }}>
                {enrollment.completedLessons.length} / {course.lessons.length} aulas
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {course.lessons.map((l, i) => {
                const done       = enrollment.completedLessons.includes(l.id);
                const isCur      = i === currentIdx;
                const accessible = canGoto(i);
                const locked     = seqLock && !accessible;

                return (
                  <button
                    key={l.id}
                    onClick={() => gotoLesson(i)}
                    disabled={locked}
                    title={locked ? 'Conclua a aula anterior para desbloquear' : l.title}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
                      padding: '1rem 1.25rem', width: '100%',
                      textAlign: 'left',
                      background: isCur ? '#d1d7dc' : 'transparent',
                      border: 'none', borderBottom: '1px solid #d1d7dc',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.6 : 1,
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => { if (!isCur && !locked) e.currentTarget.style.background = '#f7f9fa'; }}
                    onMouseLeave={e => { if (!isCur && !locked) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Checkbox (Udemy uses a square) */}
                    <span style={{ flexShrink: 0, marginTop: '2px', display: 'flex' }}>
                      {done
                        ? <CheckCircle size={18} fill="#1c1d1f" color="#fff" />
                        : <Square size={18} color="#6a6f73" />
                      }
                    </span>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9rem', lineHeight: 1.4, color: '#1c1d1f', fontWeight: 400 }}>
                        {i + 1}. {l.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', fontSize: '0.75rem', color: '#6a6f73' }}>
                        {l.type === 'video' ? <PlayCircle size={14} /> : <FileText size={14} />}
                        {l.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom quiz section if all done */}
            {allDone && (
              <div style={{ padding: '1.5rem', background: '#f7f9fa', borderTop: '1px solid #d1d7dc', marginTop: 'auto' }}>
                <div style={{ fontWeight: 700, color: '#1c1d1f', marginBottom: '0.5rem' }}>🎉 Curso Concluído!</div>
                <div style={{ fontSize: '0.85rem', color: '#6a6f73', marginBottom: '1rem' }}>Faça a avaliação final para obter o seu certificado.</div>
                <button
                  onClick={() => setShowQuizModal(true)}
                  style={{ width: '100%', background: '#1c1d1f', color: '#fff', border: 'none', padding: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Fazer Avaliação
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── COURSE COMPLETE MODAL ── */}
      {showCourseCompleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCourseCompleteModal(false)} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '8px', width: '90%', maxWidth: '500px', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <button onClick={() => setShowCourseCompleteModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#1c1d1f' }}>
              <X size={20} />
            </button>
            <Trophy size={64} color="#F59E0B" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem' }}>
              Parabéns! Você concluiu o curso!
            </h2>
            <p style={{ fontSize: '1rem', color: '#6a6f73', marginBottom: '2rem', lineHeight: 1.5 }}>
              Você finalizou todas as aulas de <strong>{course.title}</strong>. Agora você já pode fazer a avaliação final para testar os seus conhecimentos e obter o seu certificado.
            </p>
            <button
              onClick={() => {
                setShowCourseCompleteModal(false);
                setShowQuizModal(true);
              }}
              style={{ width: '100%', background: 'var(--primary)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Fazer Avaliação Agora
            </button>
            <button
              onClick={() => setShowCourseCompleteModal(false)}
              style={{ marginTop: '1rem', background: 'none', color: '#6a6f73', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              Mais Tarde
            </button>
          </div>
        </div>
      )}

      {/* ── RATING MODAL ── */}
      {showRatingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowRatingModal(false)} />
          
          {/* Modal content */}
          <div style={{ position: 'relative', background: '#fff', borderRadius: '8px', width: '90%', maxWidth: '600px', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Close btn */}
            <button onClick={() => setShowRatingModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#1c1d1f' }}>
              <X size={20} />
            </button>

            {ratingStep === 1 && (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem', textAlign: 'center' }}>
                  Como você classificaria este curso?
                </h2>
                <p style={{ fontSize: '1rem', color: '#1c1d1f', fontWeight: 600, marginBottom: '1.5rem' }}>
                  {getRatingText(hoverRating || ratingValue)}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => { setRatingValue(star); setRatingStep(2); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.1s' }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Star size={48} fill={(hoverRating || ratingValue) >= star ? '#F59E0B' : 'transparent'} stroke="#F59E0B" strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </>
            )}

            {ratingStep === 2 && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={() => setRatingStep(1)} style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Voltar
                </button>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem', textAlign: 'center' }}>
                  Por que deixou esta classificação?
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#1c1d1f', fontWeight: 600, marginBottom: '1rem' }}>
                  {getRatingText(ratingValue)}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={28} fill={ratingValue >= star ? '#F59E0B' : 'transparent'} stroke="#F59E0B" strokeWidth={1.5} />
                  ))}
                </div>
                <textarea
                  value={ratingFeedback}
                  onChange={(e) => setRatingFeedback(e.target.value)}
                  placeholder="Conte-nos sobre sua experiência pessoal neste curso. Era o que você esperava?"
                  style={{ width: '100%', minHeight: '120px', padding: '1rem', border: '1px solid #d1d7dc', borderRadius: '4px', fontSize: '0.95rem', resize: 'vertical', marginBottom: '1.5rem', fontFamily: 'inherit', color: '#1c1d1f' }}
                />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleRatingSubmit} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Salvar e continuar
                  </button>
                </div>
              </div>
            )}

            {ratingStep === 3 && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Trophy size={64} color="#F59E0B" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem', textAlign: 'center' }}>
                  Obrigado pela sua avaliação!
                </h2>
                <p style={{ fontSize: '1rem', color: '#6a6f73', marginBottom: '2rem', textAlign: 'center' }}>
                  O seu certificado já está disponível para impressão.
                </p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button onClick={() => setShowRatingModal(false)} style={{ background: 'none', border: '1px solid #d1d7dc', color: '#1c1d1f', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                    Fechar
                  </button>
                  <button onClick={() => { setShowRatingModal(false); navigate(`/course/${course.id}/certificate`); }} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                    Imprimir Certificado
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── QUIZ MODAL ── */}
      {showQuizModal && (
        <QuizModal
          courseId={course.id}
          onClose={() => setShowQuizModal(false)}
          onResetCourse={() => {
            setShowQuizModal(false);
            const resetEnrollment = db.getEnrollment(user.id, course.id);
            if (resetEnrollment) {
              setEnrollment(resetEnrollment);
              stateRef.current.enrollment = resetEnrollment;
              setCurrentIdx(0);
              addNotification({
                userId: user.id,
                type: 'course_reset',
                title: 'Progresso Reiniciado',
                message: `Você esgotou as suas 3 tentativas. O curso "${course.title}" foi reiniciado.`,
                courseName: course.title,
                courseId: course.id
              });
            }
          }}
          onCertificate={() => {
            setShowQuizModal(false);
            navigate(`/course/${course.id}/certificate`);
          }}
          onEvaluateCourse={() => {
            setShowQuizModal(false);
            setShowRatingModal(true);
            setRatingStep(1);
            setRatingValue(0);
            setHoverRating(0);
            setRatingFeedback('');
          }}
        />
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ytUrl(url: string): boolean {
  return url.includes('youtube.com/watch') || url.includes('youtu.be/') || url.includes('youtube.com/embed/');
}

function extractVideoId(url: string): string {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /[?&]v=([^?&\s]+)/,
    /embed\/([^?&\s]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return '';
}
