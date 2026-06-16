import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Course, Enrollment } from '../types';
import {
  CheckCircle, Circle, PlayCircle, FileText, ArrowLeft, ArrowRight,
  Lock, Settings, BookOpen, Trophy, SkipForward
} from 'lucide-react';

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
  const [playerError,  setPlayerError]  = useState(false);

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
      playerVars: { rel: 0, modestbranding: 1, fs: 1, iv_load_policy: 3 },
      events: {
        onStateChange: onYTStateChange,
        onError: () => setPlayerError(true),
      },
    });
  }, [ytReady, currentIdx, course]); // eslint-disable-line

  // ── 4. Cleanup on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => { clearCountdown(); destroyPlayer(); };
  }, []); // eslint-disable-line

  // ── YouTube state change handler ─────────────────────────────────────────
  const onYTStateChange = useCallback((evt: { data: number }) => {
    if (evt.data !== 0) return; // 0 = ENDED
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
          addNotification({
            userId: user.id,
            type: 'course_completed',
            title: '🎉 Parabéns! Curso Concluído!',
            message: `Você completou "${course.title}". Realize a avaliação final para obter o certificado!`,
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

  // ── Manual mark complete ─────────────────────────────────────────────────
  function handleMarkComplete() {
    if (!user || !course || !enrollment) return;
    const lesson = course.lessons[currentIdx];
    if (enrollment.completedLessons.includes(lesson.id)) return;
    db.markLessonComplete(user.id, course.id, lesson.id);
    const updated = db.getEnrollment(user.id, course.id);
    if (updated) {
      setEnrollment(updated);
      if (updated.progress === 100 && enrollment.progress < 100) {
        addNotification({
          userId: user.id,
          type: 'course_completed',
          title: '🎉 Parabéns! Curso Concluído!',
          message: `Você completou "${course.title}". Realize a avaliação final para obter o certificado!`,
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
  const isVideo     = lesson.type === 'video' && ytUrl(lesson.contentUrl);
  const hasNext     = currentIdx < course.lessons.length - 1;
  const hasPrev     = currentIdx > 0;
  const allDone     = enrollment.progress === 100;

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>

      {/* ═══════════════════════════ MAIN CONTENT ═══════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {isVideo
              ? <PlayCircle size={17} color="var(--primary)" />
              : <FileText size={17} color="var(--text-muted)" />}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Aula <strong style={{ color: 'var(--text-main)' }}>{currentIdx + 1}</strong> de {course.lessons.length}
            </span>
            {seqLock && (
              <span style={{ background: 'rgba(255,107,53,0.1)', color: 'var(--primary)', padding: '0.18rem 0.55rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.3px' }}>
                🔒 SEQUENCIAL
              </span>
            )}
          </div>
          <button
            onClick={() => setShowSettings(s => !s)}
            style={{ background: showSettings ? 'var(--primary-light)' : 'none', border: '1px solid var(--border)', cursor: 'pointer', color: showSettings ? 'var(--primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 500, transition: 'all 0.15s' }}
          >
            <Settings size={14} /> Configurações
          </button>
        </div>

        {/* Settings drawer */}
        {showSettings && (
          <div style={{ background: '#FFFDF9', border: '1px solid rgba(255,107,53,0.18)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                Bloqueio Sequencial
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Requer concluir cada aula antes de avançar para a seguinte
              </div>
            </div>
            {/* Toggle switch */}
            <button
              onClick={toggleSeqLock}
              aria-label="Ativar/desativar bloqueio sequencial"
              style={{ flexShrink: 0, width: '46px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer', background: seqLock ? 'var(--primary)' : '#CBD5E1', position: 'relative', transition: 'background 0.25s' }}
            >
              <span style={{ position: 'absolute', top: '3px', left: seqLock ? '23px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', display: 'block' }} />
            </button>
          </div>
        )}

        {/* Lesson title */}
        <h2 style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-main)', margin: 0 }}>
          {lesson.title}
        </h2>

        {/* ── Video / Content area ─────────────────────────────────────────── */}
        <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', background: isVideo ? '#000' : 'var(--surface-light)' }}>

          {/* YouTube player container — always in DOM when video, YT API mounts iframe inside */}
          {isVideo && (
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
              <div id={YT_PLAYER_ID} style={{ position: 'absolute', inset: 0 }} />
            </div>
          )}

          {/* Text lesson */}
          {!isVideo && (
            <div style={{ padding: '2.5rem', minHeight: '340px', display: 'flex', alignItems: 'flex-start' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.95', color: 'var(--text-main)', margin: 0 }}>
                {lesson.contentUrl}
              </p>
            </div>
          )}

          {/* Player load error fallback */}
          {isVideo && playerError && (
            <div style={{ position: 'absolute', inset: 0, background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'white' }}>
              <PlayCircle size={40} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Vídeo indisponível neste momento.</p>
              <a
                href={lesson.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'var(--primary)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
              >
                Abrir no YouTube ↗
              </a>
            </div>
          )}

          {/* ── Auto-advance countdown overlay ─────────────────────────────── */}
          {countdown !== null && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>
                <SkipForward size={18} /> A avançar para a próxima aula...
              </div>

              {/* Countdown ring */}
              <div style={{ position: 'relative', width: '88px', height: '88px' }}>
                <svg width="88" height="88" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                  <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                  <circle
                    cx="44" cy="44" r="38" fill="none"
                    stroke="var(--primary)" strokeWidth="5"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - countdown / COUNTDOWN_SEC)}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'white' }}>
                  {countdown}
                </div>
              </div>

              <button
                onClick={clearCountdown}
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.55rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* ── Navigation controls ──────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0' }}>
          <button
            className="btn btn-outline"
            disabled={!hasPrev}
            onClick={() => gotoLesson(currentIdx - 1)}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          {completed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#22C55E', fontWeight: 600, fontSize: '0.875rem' }}>
              <CheckCircle size={17} /> Aula Concluída
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleMarkComplete}
              style={{ fontSize: '0.875rem' }}
            >
              ✓ Marcar como Concluída
            </button>
          )}

          <button
            className="btn btn-outline"
            disabled={!hasNext}
            onClick={() => gotoLesson(currentIdx + 1)}
          >
            Próxima <ArrowRight size={16} />
          </button>
        </div>

        {/* ── Quiz CTA banner ──────────────────────────────────────────────── */}
        {allDone && (
          <div style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', borderRadius: '14px', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', boxShadow: '0 8px 24px rgba(34,197,94,0.25)' }}>
            <div style={{ color: 'white' }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                🏆 Todas as aulas concluídas!
              </div>
              <div style={{ fontSize: '0.82rem', opacity: 0.88 }}>
                Realize a avaliação final e obtenha o seu certificado
              </div>
            </div>
            <button
              onClick={() => navigate(`/course/${course.id}/quiz`)}
              style={{ flexShrink: 0, background: 'white', color: '#16A34A', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Fazer Avaliação →
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════ SIDEBAR ════════════════════════════════ */}
      <div className="card glass" style={{ padding: '1.25rem', alignSelf: 'start', position: 'sticky', top: '90px', maxHeight: 'calc(100vh - 130px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
        
        {/* Course title */}
        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3, margin: 0 }}>
            {course.title}
          </h3>
        </div>

        {/* Lesson list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
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
                  display: 'flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.6rem 0.5rem', borderRadius: '8px', width: '100%',
                  textAlign: 'left',
                  background: isCur ? 'rgba(255,107,53,0.07)' : 'transparent',
                  border: isCur ? '1px solid rgba(255,107,53,0.18)' : '1px solid transparent',
                  color: locked ? 'var(--text-muted)' : isCur ? 'var(--primary)' : 'var(--text-main)',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.45 : 1,
                  transition: 'all 0.12s',
                }}
              >
                {/* Icon */}
                <span style={{ flexShrink: 0, lineHeight: 0 }}>
                  {locked
                    ? <Lock size={14} color="var(--text-muted)" />
                    : done
                      ? <CheckCircle size={14} color="#22C55E" />
                      : <Circle size={14} color={isCur ? 'var(--primary)' : 'var(--text-muted)'} />
                  }
                </span>

                {/* Title */}
                <span style={{
                  flex: 1, fontSize: '0.8rem', lineHeight: 1.35,
                  fontWeight: isCur ? 600 : 400,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {l.title}
                </span>

                {/* Duration */}
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                  {l.duration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress footer */}
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Progresso</span>
            <span style={{ fontWeight: 700, color: allDone ? '#22C55E' : 'var(--text-main)' }}>
              {allDone ? '✅' : ''} {enrollment.progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-light)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${enrollment.progress}%`, height: '100%', borderRadius: '3px',
              background: allDone ? '#22C55E' : 'var(--primary)',
              transition: 'width 0.5s ease',
            }} />
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem', textAlign: 'center' }}>
            {enrollment.completedLessons.length} de {course.lessons.length} aulas concluídas
          </div>

          {allDone && (
            <button
              onClick={() => navigate(`/course/${course.id}/quiz`)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.6rem' }}
            >
              <Trophy size={15} /> Avaliação Final
            </button>
          )}
        </div>
      </div>
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
