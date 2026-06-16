import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/mockDb';
import { BookOpen, ArrowLeft, Play, Award, CheckCircle } from 'lucide-react';
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

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all user enrollments and pair them with Course objects
  const enrolledCourses = useMemo(() => {
    if (!user) return [];
    const enrollments = db.getEnrollments(user.id);
    const courses = db.getCourses();

    return enrollments.map(e => {
      const course = courses.find(c => c.id === e.courseId);
      return {
        enrollment: e,
        course
      };
    }).filter(item => item.course !== undefined);
  }, [user]);

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
        
        {/* Page title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            Meus <span style={{ color: 'var(--primary)' }}>Cursos</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0, fontWeight: 500 }}>
            Você está inscrito em {enrolledCourses.length} {enrolledCourses.length === 1 ? 'curso' : 'cursos'}
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="card" style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <BookOpen size={56} style={{ color: 'var(--primary)', margin: '0 auto 1.25rem', opacity: 0.2 }} />
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Nenhuma inscrição ativa
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              Inscreva-se em qualquer um de nossos cursos gratuitos para começar o seu aprendizado profissional.
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
              Explorar Catálogo
            </button>
          </div>
        ) : (
          /* Grid of dynamic user enrolled courses */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.75rem' }}>
            {enrolledCourses.map(({ enrollment, course }) => {
              if (!course) return null;
              const instructorName = getInstructorName(course.category);
              return (
                <div 
                  key={course.id} 
                  className="card" 
                  onClick={() => navigate(`/course/${course.id}/learn`)}
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
                  {/* Image cover */}
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      onError={e => handleImageError(e, course.title)} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    
                    {/* Badge type indicators */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(255,107,53,0.92)',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {course.category}
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(15,23,42,0.85)',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
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
                    
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>
                      Instrutor: {instructorName}
                    </div>
                    
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <BookOpen size={14} /> {course.lessons.length} aulas
                    </div>

                    {/* Progress tracking section */}
                    <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        <span>Progresso</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{enrollment.progress}%</span>
                      </div>
                      
                      {/* Custom Progress Bar */}
                      <div style={{ width: '100%', height: '6px', background: '#F1F3F5', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${enrollment.progress}%`, 
                          height: '100%', 
                          background: enrollment.completed ? '#22C55E' : 'var(--primary)', 
                          borderRadius: '3px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Wide brand orange button at bottom */}
                  <button 
                    style={{
                      width: '100%',
                      background: enrollment.completed ? '#22C55E' : 'var(--primary)',
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = enrollment.completed ? '#1E9E4C' : 'var(--primary-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = enrollment.completed ? '#22C55E' : 'var(--primary)'}
                  >
                    {enrollment.completed ? (
                      <>
                        <CheckCircle size={15} /> Curso Concluído
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="white" /> Continuar Aula
                      </>
                    )}
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
