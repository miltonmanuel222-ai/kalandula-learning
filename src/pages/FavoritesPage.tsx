import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/mockDb';
import { Star, Heart, ArrowLeft, User, BookOpen } from 'lucide-react';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import { handleImageError } from '../services/imageHelper';

const getInstructorName = (category: string) => {
  const instructors: Record<string, string> = {
    tecnologia: 'Eng. Carlos Silva',
    design: 'Rita Vasconcelos',
    negocios: 'Dra. Maria Antónia',
    ciencias: 'Dr. Alberto Neto',
    comunicacao: 'Prof. João Pedro',
    desenvolvimento: 'Dra. Sandra Santos',
  };
  return instructors[category] || 'Dr. Eduardo Kalandula';
};

export default function FavoritesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoritesAndNotifications();

  // Compute favorite courses using useMemo
  const favoriteCourses = useMemo(() => {
    if (!user) return [];
    const allCourses = db.getCourses();
    return allCourses.filter(c => favorites.has(c.id));
  }, [user, favorites]);

  if (!user) return null;

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', padding: '2rem', background: '#F8F9FA' }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          marginBottom: '2rem',
          fontWeight: 600,
          padding: 0
        }}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ══════════ WATERMARK LOGO HEADER (Meus Desejos style) ══════════ */}
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 1rem', 
          marginBottom: '3rem', 
          position: 'relative',
          background: 'radial-gradient(circle at center, #FFF5F1 0%, #FFFFFF 70%)',
          borderRadius: '16px',
          border: '1px solid #FFF0EB',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(255,107,53,0.03)'
        }}>
          {/* Watermark book icons */}
          <div style={{ position: 'absolute', top: '20px', left: '8%', opacity: 0.03, transform: 'rotate(-15deg)', color: 'var(--primary)' }}><BookOpen size={64} /></div>
          <div style={{ position: 'absolute', bottom: '20px', right: '10%', opacity: 0.03, transform: 'rotate(20deg)', color: 'var(--primary)' }}><BookOpen size={72} /></div>
          <div style={{ position: 'absolute', top: '40px', right: '15%', opacity: 0.02, transform: 'rotate(-5deg)', color: 'var(--primary)' }}><BookOpen size={48} /></div>
          <div style={{ position: 'absolute', bottom: '30px', left: '15%', opacity: 0.02, transform: 'rotate(10deg)', color: 'var(--primary)' }}><BookOpen size={56} /></div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#1E293B', fontFamily: 'var(--font-heading)' }}>
            Meus <span style={{ color: 'var(--primary)' }}>Desejos</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0, fontWeight: 500 }}>
            {favoriteCourses.length} {favoriteCourses.length === 1 ? 'curso favoritado' : 'cursos favoritados'} na sua lista
          </p>
        </div>

        {/* ══════════ TABBED NAVIGATION (Todos os cursos / Meus desejos) ══════════ */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #E2E8F0', marginBottom: '2.5rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '1rem',
              color: '#64748B',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
          >
            Todos os cursos
          </button>
          
          <button 
            style={{
              background: 'none',
              border: 'none',
              paddingBottom: '1rem',
              color: 'var(--text-main)',
              fontWeight: 700,
              fontSize: '1rem',
              borderBottom: '3px solid var(--primary)',
              cursor: 'default'
            }}
          >
            Meus desejos
          </button>
        </div>

        {favoriteCourses.length === 0 ? (
          <div className="card" style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <Heart size={56} style={{ color: 'var(--primary)', margin: '0 auto 1.25rem', opacity: 0.2 }} />
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Sua lista de desejos está vazia
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              Navegue pelos nossos cursos e clique no ícone de coração para adicioná-los aqui.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              Explorar Cursos
            </button>
          </div>
        ) : (
          /* Grid of beautiful wishlist cards */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {favoriteCourses.map((course) => {
              const instructorName = getInstructorName(course.category);
              const isFav = favorites.has(course.id);
              return (
                <div 
                  key={course.id} 
                  className="card" 
                  onClick={() => navigate(`/course/${course.id}`)}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Card Cover */}
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      onError={e => handleImageError(e, course.title)} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(15,23,42,0.85)',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}>
                      {course.level}
                    </div>
                  </div>

                  {/* Card Content body */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, lineHeight: '1.35', color: 'var(--text-main)' }}>
                      {course.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-muted)', 
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.45'
                    }}>
                      {course.description}
                    </p>
                    
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>
                      Um curso de {instructorName}
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <User size={14} style={{ color: '#94A3B8' }} /> {course.students || 240}
                      </span>
                      
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: 600 }}>
                        {course.rating || 4.5} 
                        <span style={{ display: 'flex', gap: '1px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={11} fill={i < Math.floor(course.rating || 4.5) ? '#F59E0B' : 'none'} stroke="#F59E0B" />
                          ))}
                        </span>
                      </span>
                    </div>

                    {/* Price & Heart Button wrapper */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      borderTop: '1px solid #F1F5F9', 
                      paddingTop: '0.75rem', 
                      marginTop: 'auto' 
                    }}>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.75rem', marginRight: '0.4rem' }}>
                          KZ 15.000
                        </span>
                        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.92rem' }}>
                          Gratuito
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(course.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#FF6B35',
                          padding: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Heart size={18} fill={isFav ? '#FF6B35' : 'none'} stroke="#FF6B35" />
                      </button>
                    </div>
                  </div>

                  {/* Wide brand orange button at bottom */}
                  <button 
                    style={{
                      width: '100%',
                      background: 'var(--primary)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      padding: '0.8rem 1.25rem',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}
                  >
                    Ver detalhes
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
