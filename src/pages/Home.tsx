import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { db, CATEGORIES } from '../services/mockDb';
import { Search, BookOpen, Clock, Star, ArrowRight, Users, X, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import { handleImageError } from '../services/imageHelper';

function CategoryIcon({ name, size = 18, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const defaultStyle = { color: 'var(--text-muted)', ...style };
  return <BookOpen size={size} style={defaultStyle} />;
}

function StudyIllustration() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }}>
      {/* ── Background blob / desk surface ── */}
      <ellipse cx="240" cy="310" rx="200" ry="28" fill="rgba(0,0,0,0.08)" />

      {/* ── Monitor body ── */}
      <rect x="60" y="60" width="300" height="200" rx="14" ry="14" fill="#1E293B" />
      <rect x="72" y="72" width="276" height="176" rx="8" ry="8" fill="#F8FAFC" />

      {/* ── Monitor screen content (e-learning UI mockup) ── */}
      {/* Header bar inside screen */}
      <rect x="72" y="72" width="276" height="28" rx="8" ry="8" fill="#E2E8F0" />
      <circle cx="90" cy="86" r="5" fill="#EF4444" />
      <circle cx="104" cy="86" r="5" fill="#F59E0B" />
      <circle cx="118" cy="86" r="5" fill="#22C55E" />
      {/* Nav items in screen */}
      <rect x="150" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />
      <rect x="198" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />
      <rect x="246" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />

      {/* Video / content area inside screen */}
      <rect x="80" y="108" width="170" height="130" rx="6" fill="#E8F4FE" />
      {/* Play icon */}
      <circle cx="165" cy="173" r="22" fill="rgba(255,107,53,0.15)" />
      <polygon points="158,164 158,182 180,173" fill="#FF6B35" />

      {/* Sidebar panel inside screen */}
      <rect x="258" y="108" width="82" height="130" rx="6" fill="#F1F5F9" />
      <rect x="266" y="118" width="66" height="8" rx="4" fill="#CBD5E1" />
      {/* Avatar circle */}
      <circle cx="290" cy="148" r="14" fill="#E2E8F0" />
      <circle cx="290" cy="141" r="6" fill="#94A3B8" />
      <path d="M277,158 Q290,152 303,158" fill="#94A3B8" />
      {/* Progress bar */}
      <rect x="266" y="170" width="66" height="5" rx="3" fill="#E2E8F0" />
      <rect x="266" y="170" width="45" height="5" rx="3" fill="#FF6B35" />
      {/* Dots at bottom */}
      <circle cx="272" cy="200" r="3" fill="#FF6B35" />
      <circle cx="282" cy="200" r="3" fill="#CBD5E1" />
      <circle cx="292" cy="200" r="3" fill="#CBD5E1" />
      <circle cx="302" cy="200" r="3" fill="#CBD5E1" />

      {/* ── Monitor stand ── */}
      <rect x="218" y="260" width="44" height="22" rx="4" fill="#334155" />
      <rect x="190" y="278" width="100" height="8" rx="4" fill="#475569" />

      {/* ── Desk surface ── */}
      <rect x="40" y="286" width="400" height="12" rx="6" fill="#475569" />

      {/* ── Woman figure (sitting, using laptop) ── */}
      {/* Body / torso */}
      <ellipse cx="390" cy="252" rx="26" ry="34" fill="#FF6B35" />
      {/* Shirt detail */}
      <ellipse cx="390" cy="248" rx="18" ry="24" fill="#E85D2A" />

      {/* Head */}
      <circle cx="390" cy="200" r="26" fill="#8B5E3C" />
      {/* Hair — natural afro */}
      <ellipse cx="390" cy="186" rx="28" ry="24" fill="#1a0a00" />
      <ellipse cx="370" cy="195" rx="10" ry="14" fill="#1a0a00" />
      <ellipse cx="410" cy="195" rx="10" ry="14" fill="#1a0a00" />
      <ellipse cx="390" cy="180" rx="22" ry="18" fill="#1a0a00" />
      {/* Face details */}
      <ellipse cx="382" cy="204" rx="3.5" ry="4" fill="#6B4226" />
      <ellipse cx="398" cy="204" rx="3.5" ry="4" fill="#6B4226" />
      {/* Smile */}
      <path d="M383,214 Q390,220 397,214" stroke="#6B4226" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Ear */}
      <ellipse cx="364" cy="205" rx="5" ry="7" fill="#8B5E3C" />
      {/* Earring */}
      <circle cx="364" cy="213" r="2.5" fill="#FF6B35" />

      {/* Left arm (reaching to laptop) */}
      <path d="M370,240 Q348,260 332,275" stroke="#8B5E3C" strokeWidth="12" fill="none" strokeLinecap="round"/>
      {/* Right arm */}
      <path d="M410,240 Q428,256 435,270" stroke="#8B5E3C" strokeWidth="12" fill="none" strokeLinecap="round"/>

      {/* Laptop on lap/desk */}
      <rect x="315" y="268" width="120" height="72" rx="8" fill="#1E293B" />
      <rect x="322" y="274" width="106" height="60" rx="5" fill="#E8F4FE" />
      {/* Laptop screen mini UI */}
      <rect x="328" y="280" width="50" height="6" rx="3" fill="#CBD5E1" />
      <rect x="328" y="290" width="90" height="5" rx="3" fill="#E2E8F0" />
      <rect x="328" y="299" width="70" height="5" rx="3" fill="#E2E8F0" />
      <rect x="328" y="308" width="40" height="10" rx="5" fill="#FF6B35" />
      {/* Laptop keyboard strip */}
      <rect x="310" y="340" width="130" height="6" rx="3" fill="#334155" />

      {/* Legs */}
      <ellipse cx="375" cy="305" rx="14" ry="12" fill="#2D1B0E" />
      <ellipse cx="405" cy="305" rx="14" ry="12" fill="#2D1B0E" />
      {/* Shoes */}
      <ellipse cx="368" cy="318" rx="16" ry="7" fill="#FF6B35" />
      <ellipse cx="408" cy="318" rx="14" ry="6" fill="#1a0a00" />

      {/* ── Stool ── */}
      <rect x="372" y="318" width="8" height="28" rx="2" fill="#8B6914" />
      <rect x="400" y="318" width="8" height="28" rx="2" fill="#8B6914" />
      <ellipse cx="390" cy="318" rx="26" ry="7" fill="#A07818" />

      {/* ── Decorative plant left ── */}
      <rect x="48" y="270" width="10" height="30" rx="3" fill="#5B4200" />
      <ellipse cx="53" cy="252" rx="20" ry="24" fill="#2D6A4F" />
      <ellipse cx="38" cy="260" rx="12" ry="16" fill="#40916C" />
      <ellipse cx="68" cy="258" rx="12" ry="16" fill="#40916C" />
      <ellipse cx="53" cy="240" rx="10" ry="18" fill="#52B788" />

      {/* ── Decorative plant right (small) ── */}
      <rect x="450" y="285" width="6" height="20" rx="2" fill="#5B4200" />
      <ellipse cx="453" cy="272" rx="12" ry="14" fill="#40916C" />
      <ellipse cx="445" cy="278" rx="7" ry="10" fill="#52B788" />
      <ellipse cx="461" cy="278" rx="7" ry="10" fill="#2D6A4F" />

      {/* ── Speech bubble with lock icon ── */}
      <rect x="408" y="165" width="44" height="34" rx="10" fill="white" opacity="0.92"/>
      <polygon points="420,199 430,199 425,210" fill="white" opacity="0.92"/>
      {/* Lock icon inside bubble */}
      <rect x="418" y="174" width="14" height="10" rx="3" fill="#FF6B35" />
      <path d="M421,174 Q425,166 429,174" stroke="#FF6B35" strokeWidth="2.5" fill="none" />
      <circle cx="425" cy="180" r="2" fill="white" />

      {/* ── Floating geometric shapes / sparkles top right (gray/white tones) ── */}
      <rect x="440" y="70" width="8" height="8" fill="rgba(255,255,255,0.6)" transform="rotate(45 444 74)" />
      <rect x="42" y="50" width="6" height="6" fill="rgba(255,255,255,0.4)" transform="rotate(45 45 53)" />
      <rect x="460" y="195" width="5" height="5" fill="rgba(255,255,255,0.35)" transform="rotate(45 462.5 197.5)" />
    </svg>
  );
}

type SortOption = 'relevancia' | 'popularidade' | 'avaliacao';
type LevelFilter = '' | 'Iniciante' | 'Intermédio' | 'Avançado';

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  'Iniciante': { bg: '#DCFCE7', text: '#16A34A' },
  'Intermédio': { bg: '#FEF9C3', text: '#CA8A04' },
  'Avançado': { bg: '#FEE2E2', text: '#DC2626' },
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavoritesAndNotifications();
  
  const searchTerm = searchParams.get('q') || '';
  const activeCategory = searchParams.get('c') || '';
  
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');

  const allCourses = db.getCourses();

  const filteredCourses = useMemo(() => {
    let results = [...allCourses];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (activeCategory) {
      results = results.filter(c => c.category === activeCategory);
    }

    // Level filter
    if (activeLevel) {
      results = results.filter(c => c.level === activeLevel);
    }

    // Sort
    if (sortBy === 'popularidade') {
      results.sort((a, b) => (b.students ?? 0) - (a.students ?? 0));
    } else if (sortBy === 'avaliacao') {
      results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return results;
  }, [allCourses, searchTerm, activeCategory, activeLevel, sortBy]);

  const recommendedCourses = useMemo(() => {
    return allCourses.filter(c => ['c1', 'c4', 'c6', 'c11'].includes(c.id));
  }, [allCourses]);

  const shortCourses = useMemo(() => {
    return allCourses.filter(c => ['c2', 'c3', 'c5', 'c8'].includes(c.id));
  }, [allCourses]);

  const popularCourses = useMemo(() => {
    return [...allCourses].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 4);
  }, [allCourses]);

  const bestSellerCourses = useMemo(() => {
    return [...allCourses].sort((a, b) => (b.students ?? 0) - (a.students ?? 0)).slice(0, 4);
  }, [allCourses]);

  const hasActiveFilters = activeCategory || activeLevel || sortBy !== 'relevancia' || searchTerm.trim();

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setActiveLevel('');
    setSortBy('relevancia');
  };

  const renderCourseCard = (course: typeof allCourses[0]) => {
    const catInfo = CATEGORIES.find(c => c.id === course.category);
    const levelColor = LEVEL_COLORS[course.level] ?? { bg: '#F1F5F9', text: '#64748B' };
    const isFav = isFavorite(course.id);
    return (
      <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '185px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={course.imageUrl}
            alt={course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onError={e => handleImageError(e, course.title)}
          />
          {/* Category badge */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', color: 'var(--text-main)', padding: '0.25rem 0.65rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {catInfo && <CategoryIcon name={catInfo.icon} size={14} style={{ color: 'var(--text-main)' }} />} {catInfo?.label}
          </div>
          {/* Level badge */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: levelColor.bg, color: levelColor.text, padding: '0.25rem 0.65rem', borderRadius: '99px', fontSize: '0.73rem', fontWeight: 600 }}>
            {course.level}
          </div>
          {/* Favorite heart button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) {
                navigate('/login');
                return;
              }
              toggleFavorite(course.id);
            }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              border: 'none',
              color: isFav ? '#EF4444' : '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
              zIndex: 2,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          >
            <Heart size={18} fill={isFav ? '#EF4444' : 'none'} style={{ transition: 'fill 0.2s' }} />
          </button>
        </div>

        <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{course.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.55 }}>
            {course.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BookOpen size={14} /> {course.lessons.length} aulas
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#F59E0B', fontWeight: 600 }}>
              <Star size={14} fill="#F59E0B" /> {course.rating ?? 4.5}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({course.students ?? 0})</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> Auto-ritmo
            </span>
          </div>

          <Link
            to={`/course/${course.id}`}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '10px' }}
          >
            Ver Detalhes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ background: 'var(--background)' }}>
      {/* ── Show search/filter results if filters or search are active ── */}
      {hasActiveFilters ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>{filteredCourses.length}</strong> curso(s) encontrado(s)
                {activeCategory && ` em "${CATEGORIES.find(c => c.id === activeCategory)?.label}"`}
                {searchTerm && ` para "${searchTerm}"`}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}>
                  <X size={14} /> Limpar filtros
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <select
                value={activeLevel}
                onChange={e => setActiveLevel(e.target.value as LevelFilter)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-main)', cursor: 'pointer' }}
              >
                <option value="">Todos os Níveis</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermédio">Intermédio</option>
                <option value="Avançado">Avançado</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-main)', cursor: 'pointer' }}
              >
                <option value="relevancia">Relevância</option>
                <option value="popularidade">Mais Populares</option>
                <option value="avaliacao">Melhor Avaliação</option>
              </select>
            </div>
          </div>

          {/* Grid results */}
          {filteredCourses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filteredCourses.map(course => renderCourseCard(course))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Nenhum curso encontrado</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Tente mudar os filtros ou a pesquisa para encontrar o que procura.
              </p>
              <button onClick={clearFilters} className="btn btn-primary" style={{ margin: '0 auto' }}>
                Ver todos os cursos
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Default Rich Landing Page ── */
        <>
          {/* Split Hero inspired by screenshot */}
          <section style={{
            background: '#F8F9FA',
            padding: '4rem 2rem 4rem 2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ maxWidth: '1200px', width: '100%' }} className="hero-grid">
              {/* Left card */}
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  lineHeight: 1.2
                }}>
                  Você tem um desejo?
                </h1>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1.6
                }}>
                  Estudar é o caminho para transformar os seus objetivos em realidade. Adquira novos conhecimentos com os nossos cursos gratuitos e dê o primeiro passo em direção aos seus sonhos.
                </p>
              </div>

              {/* Right illustration */}
              <div className="hero-illustration" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StudyIllustration />
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
              {[
                { icon: <BookOpen size={18} />, value: `${allCourses.length}+`, label: 'Cursos' },
                { icon: <Users size={18} />, value: '5.000+', label: 'Estudantes' },
                { icon: <Star size={18} />, value: '4.8', label: 'Avaliação Média' },
                { icon: <BookOpen size={18} />, value: '100%', label: 'Gratuito' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--primary)' }}>{stat.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.15rem', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Themed Row Sections */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* Section 1: Cursos Recomendados */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Cursos recomendados</h2>
                <button
                  onClick={() => {
                    setSearchParams({ c: 'tecnologia' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="section-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Ver mais <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {recommendedCourses.map(course => renderCourseCard(course))}
              </div>
            </section>

            {/* Section 2: Cursos breves e interessantes para você */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Cursos breves e interessantes para você</h2>
                <button
                  onClick={() => {
                    setSearchParams({ c: 'design' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="section-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Ver mais <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {shortCourses.map(course => renderCourseCard(course))}
              </div>
            </section>

            {/* Section 3: Cursos mais populares */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Cursos mais populares</h2>
                <button
                  onClick={() => {
                    setSortBy('popularidade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="section-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Ver mais <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {popularCourses.map(course => renderCourseCard(course))}
              </div>
            </section>

            {/* Section 4: Cursos mais vendidos */}
            <section>
              <div className="section-header">
                <h2 className="section-title">Cursos mais vendidos</h2>
                <button
                  onClick={() => {
                    setSortBy('popularidade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="section-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Ver mais <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {bestSellerCourses.map(course => renderCourseCard(course))}
              </div>
            </section>

          </div>
        </>
      )}
    </div>
  );
}
