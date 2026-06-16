import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import type { Course } from '../types';
import { 
  BookOpen, Clock, CheckCircle, Star, Users, PlayCircle, 
  GraduationCap, Play, ArrowRight, Heart, Award, ShieldCheck, 
  ChevronRight, ChevronDown, User, MessageSquare, X 
} from 'lucide-react';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import { handleImageError } from '../services/imageHelper';

interface RichMockData {
  instructor: { name: string; title: string; bio: string; avatarUrl: string };
  outcomes: string[];
  reviews: { name: string; rating: number; comment: string; date: string; avatarUrl: string }[];
  duration: string;
  lastUpdated: string;
}

function getRichCourseData(course: Course): RichMockData {
  const category = course.category;
  
  // Custom durations based on number of lessons
  const lessonCount = course.lessons.length;
  const duration = `${lessonCount * 3 + 4} horas de conteúdo`;

  const lastUpdated = 'Atualizado em 05/2026';

  const instructors: Record<string, RichMockData['instructor']> = {
    tecnologia: {
      name: 'Eng. Carlos Silva',
      title: 'Arquiteto de Software & Ex-Engenheiro da Google',
      bio: 'Com mais de 15 anos de experiência no desenvolvimento de sistemas distribuídos e web, o Eng. Carlos ensina programação prática focada em empregabilidade.',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80'
    },
    design: {
      name: 'Rita Vasconcelos',
      title: 'Senior UI/UX Designer & Consultora',
      bio: 'Especialista em design de interfaces e design systems. Já colaborou com diversas startups europeias e americanas na criação de produtos digitais intuitivos.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80'
    },
    negocios: {
      name: 'Dra. Maria Antónia',
      title: 'Consultora de Gestão & Especialista em Agile',
      bio: 'Com MBA em Gestão Estratégica, Maria ajuda empresas a adotar mentalidade ágil (Scrum/Kanban) e a otimizar processos de negócios para alta produtividade.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80'
    },
    ciencias: {
      name: 'Dr. Alberto Neto',
      title: 'Doutor em Matemática e Investigador Científico',
      bio: 'Investigador na área de ciências exatas aplicadas. Dedica-se a desmistificar a matemática e a física para estudantes universitários e engenheiros.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    comunicacao: {
      name: 'Prof. João Pedro',
      title: 'Especialista em Linguística & Oratória Corporativa',
      bio: 'Mentor de comunicação para executivos e profissionais. Especialista em escrita académica, oratória persuasiva e preparação de marca pessoal.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
    },
    desenvolvimento: {
      name: 'Dra. Sandra Santos',
      title: 'Master Coach de Produtividade & Psicóloga',
      bio: 'Focada no desenvolvimento de soft skills, inteligência emocional e gestão de rotinas. Ajuda profissionais a alcançar o equilíbrio entre vida e carreira.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
    }
  };

  const outcomes: Record<string, string[]> = {
    tecnologia: [
      'Aprender a estruturar e resolver problemas reais com código limpo.',
      'Dominar as ferramentas e metodologias utilizadas por equipas globais.',
      'Desenvolver projetos práticos para enriquecer o seu portfólio profissional.',
      'Compreender a arquitetura cliente-servidor e segurança de dados.'
    ],
    design: [
      'Criar interfaces visuais equilibradas usando teoria de cores e tipografia.',
      'Compreender as necessidades reais dos utilizadores através de pesquisa de UX.',
      'Dominar o Figma para criar wireframes e protótipos de alta fidelidade.',
      'Estruturar sistemas de design (design systems) escaláveis.'
    ],
    negocios: [
      'Aplicar frameworks ágeis como Scrum e Kanban em qualquer projeto.',
      'Compreender o fluxo de caixa, ponto de equilíbrio e saúde financeira.',
      'Elaborar planos estratégicos e análise de mercado de alto impacto.',
      'Identificar gargalos em processos corporativos e propor soluções.'
    ],
    ciencias: [
      'Dominar as fórmulas e equações que sustentam a engenharia moderna.',
      'Resolver problemas matemáticos e físicos complexos de forma lógica.',
      'Aplicar métodos estatísticos e probabilidade na tomada de decisões.',
      'Estruturar relatórios científicos com rigor metodológico.'
    ],
    comunicacao: [
      'Comunicar com clareza e persuasão em reuniões de negócios.',
      'Redigir relatórios executivos e e-mails formais em inglês e português.',
      'Falar em público com confiança utilizando técnicas de oratória.',
      'Otimizar a sua presença no LinkedIn para atração de oportunidades.'
    ],
    desenvolvimento: [
      'Gerir o seu tempo de forma eficiente com Pomodoro, GTD e matrizes.',
      'Reconhecer, compreender e canalizar as suas próprias emoções.',
      'Elaborar currículos otimizados para sistemas ATS de triagem.',
      'Destacar-se em entrevistas de emprego e negociações salariais.'
    ]
  };

  const defaultInstructor = {
    name: 'Dr. Eduardo Kalandula',
    title: 'Professor Coordenador & Especialista',
    bio: 'Dedicado à educação de excelência e formação profissional com foco em competências modernas exigidas pelo mercado internacional.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
  };

  const defaultOutcomes = [
    'Adquirir conhecimentos práticos e teóricos sólidos sobre a área.',
    'Desenvolver competências críticas valorizadas por empregadores.',
    'Aprender técnica avançada de resolução de problemas do setor.',
    'Concluir o curso apto a aplicar o conteúdo no mercado de trabalho.'
  ];

  const reviews = [
    {
      name: 'Manuel Afonso',
      rating: 5,
      comment: `Excelente curso! Explica tudo de forma muito didática, prática e direta ao assunto. Ajudou-me imenso no meu projeto de faculdade.`,
      date: 'Há 2 semanas',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80'
    },
    {
      name: 'Helena Ndulo',
      rating: 4,
      comment: `Conteúdo de altíssima qualidade. Os módulos estão bem organizados e o instrutor demonstra total domínio. Só peca por ter lições um pouco longas.`,
      date: 'Há 1 mês',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      name: 'Tadeu Lopes',
      rating: 5,
      comment: `Simplesmente fantástico. A metodologia de ensino é inovadora. O certificado agregou imenso valor ao meu currículo.`,
      date: 'Há 2 meses',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
    }
  ];

  return {
    instructor: instructors[category] || defaultInstructor,
    outcomes: outcomes[category] || defaultOutcomes,
    reviews,
    duration,
    lastUpdated
  };
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openLessonIndex, setOpenLessonIndex] = useState<number | null>(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toggleFavorite, isFavorite } = useFavoritesAndNotifications();
  const isFav = course ? isFavorite(course.id) : false;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (id) {
      const c = db.getCourse(id);
      if (c) setCourse(c);
      if (user && c) {
        const enrollment = db.getEnrollment(user.id, c.id);
        if (enrollment) setIsEnrolled(true);
      }
    }
    // Scroll to top when loading a new course detail page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id, user]);

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (course) {
      db.enrollUser(user.id, course.id);
      navigate(`/course/${course.id}/learn`);
    }
  };

  const richData = useMemo(() => {
    return course ? getRichCourseData(course) : null;
  }, [course]);

  const relatedCourses = useMemo(() => {
    if (!course) return [];
    return db.getCoursesByCategory(course.category)
      .filter(c => c.id !== course.id)
      .slice(0, 2);
  }, [course]);

  const recommendations = useMemo(() => {
    if (!course) return [];
    return db.getCourses()
      .filter(c => c.id !== course.id && c.category !== course.category)
      .slice(0, 4);
  }, [course]);

  if (!course || !richData) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
      <BookOpen size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
      <p>Curso não encontrado.</p>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ background: '#F8FAFC', paddingBottom: '4rem' }}>
      
      {/* ══════════ HERO SECTION (Comunicação e negociação style) ══════════ */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        padding: '3.5rem 1.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #334155'
      }}>
        {/* Visual background lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          
          {/* Left Hero Details */}
          <div style={{ flex: '1.5 1 480px', minWidth: '300px' }}>
            
            {/* Category badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: 'rgba(255,107,53,0.15)', 
              color: 'var(--primary)',
              border: '1px solid rgba(255,107,53,0.3)',
              padding: '0.35rem 0.85rem', 
              borderRadius: '99px', 
              fontSize: '0.78rem', 
              fontWeight: 600, 
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <GraduationCap size={14} /> {course.category.toUpperCase()}
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem', lineHeight: 1.2, fontWeight: 800 }}>
              {course.title}
            </h1>
            
            {/* Subtitle / Details info (inspired by the screenshot) */}
            <div style={{ color: '#E2E8F0', fontSize: '0.92rem', marginBottom: '0.75rem', opacity: 0.9 }}>
              Auto-ritmo • {course.lessons.length} aulas • Nível {course.level} • {richData.lastUpdated}
            </div>

            {/* Stars rating panel (inspired by the screenshot) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <div style={{ color: '#F59E0B', display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(course.rating || 4.7) ? '#F59E0B' : 'none'} stroke="#F59E0B" />
                ))}
              </div>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>
                {course.rating || 4.7} <span style={{ color: '#64748B', fontWeight: 400 }}>(120 avaliações)</span>
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleEnroll}
                className="btn"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: '0 4px 14px rgba(255,107,53,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isEnrolled ? (
                  <>
                    <Play size={16} fill="white" /> Continuar Curso
                  </>
                ) : (
                  <>
                    Inscrever-se Gratuitamente <ArrowRight size={16} />
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                    return;
                  }
                  toggleFavorite(course.id);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              >
                <Heart size={20} fill={isFav ? '#FF4A4A' : 'none'} stroke={isFav ? '#FF4A4A' : 'white'} style={{ transition: 'all 0.2s' }} />
              </button>

              {/* Share link (inspired by the screenshot) */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={handleShare}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F59E0B',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: '0.5rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#F59E0B'}
                >
                  Compartilhar
                </button>
                {copied && (
                  <div style={{
                    position: 'absolute',
                    top: '-35px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#22C55E',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}>
                    Link copiado!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Video / Image Preview */}
          <div style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center' }}>
            <div 
              onClick={() => setShowVideoModal(true)}
              style={{ 
                width: '100%',
                maxWidth: '380px',
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)', 
                position: 'relative',
                cursor: 'pointer',
                aspectRatio: '16/9'
              }}
              className="group"
            >
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                onError={(e) => handleImageError(e, course.title)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
              />
              {/* Overlay shadow */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              
              {/* Play Button Overlay */}
              <div style={{ 
                position: 'absolute', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: 'white' 
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                  paddingLeft: '4px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                }}
                >
                  <Play size={26} fill="var(--primary)" />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>assistir prévia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MAIN CONTENT SPLIT LAYOUT ══════════ */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* ────── LEFT COLUMN: Rich Details ────── */}
          <div style={{ flex: '2 1 650px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 1. Descrição do curso */}
            <section className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                Descrição do curso
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                Este curso foi detalhadamente concebido para guiar o estudante passo a passo nas matérias essenciais de {course.title}. Combinando fundamentos conceituais robustos e exemplos reais do cotidiano profissional, a metodologia visa acelerar a sua compreensão do tema com forte sentido prático.
                {"\n\n"}
                Ao longo das lições, exploramos a fundo cada módulo, permitindo-lhe realizar atividades práticas, consultar materiais de leitura e fixar conceitos por meio de avaliações de conhecimento personalizadas. É ideal para preparar o estudante para desafios reais do mercado de trabalho ou reforçar a sua bagagem académica universitária.
              </p>
            </section>

            {/* 2. O que você aprenderá */}
            <section className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                O que você aprenderá
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {richData.outcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} style={{ color: '#22C55E', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.4' }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Certificado Compartilhável */}
            <section className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                Certificado compartilhável
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} style={{ color: 'var(--primary)' }} />
                Conclua todas as aulas e faça o teste final para desbloquear o seu certificado oficial.
              </p>
              
              {/* Certificate Mockup Frame */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  border: '8px double #D4AF37', // Gold border
                  background: '#FCFBF7',
                  padding: '2.5rem 2rem',
                  borderRadius: '6px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '540px'
                }}>
                  {/* Decorative background watermark */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.2rem', color: 'rgba(212, 175, 55, 0.03)', fontWeight: 800, pointerEvents: 'none', userSelect: 'none', width: '100%', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Universidade Kalandula
                  </div>
                  
                  <div style={{ fontSize: '0.72rem', letterSpacing: '2px', color: '#D4AF37', fontWeight: 600, marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                    Kalandula Learning Academy
                  </div>
                  
                  <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', color: '#1E293B', margin: '0 0 1.25rem 0', fontWeight: 400 }}>
                    Certificado de Conclusão
                  </h4>
                  
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 0.5rem 0' }}>
                    Certificamos com distinção que o estudante
                  </p>
                  
                  <h5 style={{ fontSize: '1.25rem', color: '#1E293B', margin: '0.4rem 0 0.8rem 0', fontWeight: 700, textDecoration: 'underline', textDecorationColor: '#D4AF37' }}>
                    {user ? user.name : 'Estudante Concluinte'}
                  </h5>
                  
                  <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.5', margin: '0 0 1.8rem 0' }}>
                    concluiu com êxito e aproveitamento máximo a formação estruturada no curso de
                    <strong style={{ color: '#1E293B', display: 'block', marginTop: '0.4rem', fontSize: '0.85rem' }}>{course.title}</strong>
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ borderBottom: '1px solid #E2E8F0', width: '100px', margin: '0 auto 0.4rem', height: '16px' }}></div>
                      <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Reitor</div>
                    </div>
                    
                    {/* Stamp */}
                    <div style={{ 
                      width: '46px', 
                      height: '46px', 
                      borderRadius: '50%', 
                      border: '2px solid rgba(212,175,55,0.7)', 
                      color: '#D4AF37', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: '0.55rem', 
                      transform: 'rotate(-12deg)', 
                      background: 'white',
                      boxShadow: 'inset 0 0 4px rgba(212,175,55,0.2)'
                    }}>
                      SELO OK
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ borderBottom: '1px solid #E2E8F0', width: '100px', margin: '0 auto 0.4rem', height: '16px' }}></div>
                      <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Coordenador</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Instrutor */}
            <section className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                Instrutor
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <img 
                  src={richData.instructor.avatarUrl} 
                  alt={richData.instructor.name}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border)' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.2rem 0' }}>
                    {richData.instructor.name}
                  </h3>
                  <div style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {richData.instructor.title}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                    {richData.instructor.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Avaliações dos Estudantes */}
            <section className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '0.5rem' }}>
                Avaliação de alunos
              </h2>
              
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Score panel */}
                <div style={{ textAlign: 'center', paddingRight: '2.5rem', borderRight: '1px solid #E2E8F0', minWidth: '150px' }} className="rating-score-box">
                  <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                    {course.rating || 4.7}
                  </div>
                  <div style={{ color: '#F59E0B', margin: '0.5rem 0' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(course.rating || 4.7) ? '#F59E0B' : 'none'} style={{ display: 'inline-block', marginRight: '2px' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Média de avaliações
                  </div>
                </div>
                
                {/* Rating bars */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '240px' }}>
                  {[
                    { stars: 5, pct: 75 },
                    { stars: 4, pct: 15 },
                    { stars: 3, pct: 8 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 1 }
                  ].map((row) => (
                    <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem' }}>
                      <span style={{ width: '60px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        {row.stars} <Star size={12} fill="var(--text-muted)" />
                      </span>
                      {/* Bar bg */}
                      <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.pct}%`, height: '100%', background: '#F59E0B', borderRadius: '4px' }}></div>
                      </div>
                      <span style={{ width: '30px', color: 'var(--text-muted)', textAlign: 'right' }}>
                        {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments list */}
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <MessageSquare size={18} /> Comentários
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {richData.reviews.map((rev, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.2rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <img 
                          src={rev.avatarUrl} 
                          alt={rev.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>{rev.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</div>
                        </div>
                        <div style={{ color: '#F59E0B', display: 'flex', gap: '1px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={11} fill={i < rev.rating ? '#F59E0B' : 'none'} />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => alert('Esta funcionalidade de avaliação estará disponível após a conclusão do primeiro módulo.')}
                    style={{
                      background: 'none',
                      border: '1px solid var(--primary)',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'none';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                  >
                    Escrever um Comentário
                  </button>
                  <button 
                    onClick={() => alert('Todas as avaliações deste curso já foram carregadas.')}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      color: '#475569',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
                  >
                    Ver Mais Avaliações
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* ────── RIGHT COLUMN: Syllabus and Related ────── */}
          <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
            
            {/* 1. Conteúdo Programático (Accordion) */}
            <section className="card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} style={{ color: 'var(--primary)' }} /> Conteúdo do Curso
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {course.lessons.map((lesson, index) => {
                  const isOpen = openLessonIndex === index;
                  return (
                    <div 
                      key={lesson.id} 
                      style={{ 
                        border: '1px solid #E2E8F0', 
                        borderRadius: '8px', 
                        overflow: 'hidden', 
                        background: isOpen ? '#FCFDFE' : 'white',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => setOpenLessonIndex(isOpen ? null : index)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '1rem',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          gap: '0.75rem'
                        }}
                      >
                        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: isOpen ? 'var(--primary)' : 'var(--text-main)', flex: 1, pr: '0.5rem', lineHeight: 1.4 }}>
                          {index + 1}. {lesson.title}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                          {isOpen ? <ChevronDown size={16} style={{ color: 'var(--primary)' }} /> : <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />}
                        </div>
                      </button>
                      
                      {/* Accordion Content Panel */}
                      {isOpen && (
                        <div style={{
                          padding: '0 1rem 1rem',
                          borderTop: '1px solid #F1F5F9',
                          background: 'white'
                        }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.75rem', marginBottom: '0.35rem' }}>
                            Tipo: {lesson.type === 'video' ? 'Vídeo Aula' : 'Texto Didático'}
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                            {lesson.contentUrl.length > 180 ? `${lesson.contentUrl.substring(0, 180)}...` : lesson.contentUrl}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={handleEnroll}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem', borderRadius: '8px', fontWeight: 700 }}
              >
                {isEnrolled ? 'Continuar o Estudo' : 'Fazer Inscrição Agora'}
              </button>
            </section>

            {/* 2. Cursos Relacionados */}
            {relatedCourses.length > 0 && (
              <section className="card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem' }}>
                  Cursos relacionados
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedCourses.map((rel) => {
                    const isRelFav = isFavorite(rel.id);
                    return (
                      <div 
                        key={rel.id} 
                        onClick={() => navigate(`/course/${rel.id}`)}
                        style={{ 
                          display: 'flex', 
                          gap: '0.85rem', 
                          cursor: 'pointer', 
                          background: '#F8FAFC', 
                          border: '1px solid #E2E8F0', 
                          borderRadius: '8px',
                          padding: '0.65rem',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                      >
                        <div style={{ width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                          <img 
                            src={rel.imageUrl} 
                            alt={rel.title}
                            onError={(e) => handleImageError(e, rel.title)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ 
                            fontSize: '0.8rem', 
                            fontWeight: 700, 
                            color: 'var(--text-main)', 
                            margin: '0 0 0.25rem 0',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {rel.title}
                          </h4>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {rel.lessons.length} aulas • Auto-ritmo
                          </div>
                        </div>
                        {/* Inline heart to quick toggle */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!user) {
                              navigate('/login');
                              return;
                            }
                            toggleFavorite(rel.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isRelFav ? '#EF4444' : '#94A3B8',
                            padding: '0.2rem'
                          }}
                        >
                          <Heart size={14} fill={isRelFav ? '#EF4444' : 'none'} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* ══════════ RECOMENDADOS SECTION (Outros cursos) ══════════ */}
        {recommendations.length > 0 && (
          <section style={{ marginTop: '4rem', borderTop: '1px solid #E2E8F0', paddingTop: '3rem' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.45rem', 
              fontWeight: 800, 
              color: 'var(--text-main)', 
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              Outros cursos que podem ser do seu interesse
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {recommendations.map((recCourse) => {
                const isRecFav = isFavorite(recCourse.id);
                return (
                  <div 
                    key={recCourse.id} 
                    className="card" 
                    onClick={() => navigate(`/course/${recCourse.id}`)}
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
                    <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={recCourse.imageUrl} 
                        alt={recCourse.title} 
                        onError={(e) => handleImageError(e, recCourse.title)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!user) {
                            navigate('/login');
                            return;
                          }
                          toggleFavorite(recCourse.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          color: isRecFav ? '#EF4444' : '#64748B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          zIndex: 2
                        }}
                      >
                        <Heart size={14} fill={isRecFav ? '#EF4444' : 'none'} />
                      </button>
                      
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
                        {recCourse.level}
                      </div>
                    </div>
                    
                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ 
                        fontSize: '0.92rem', 
                        fontWeight: 700, 
                        color: 'var(--text-main)', 
                        marginBottom: '0.4rem',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {recCourse.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '0.8rem', 
                        marginBottom: '1rem', 
                        flex: 1, 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.45
                      }}>
                        {recCourse.description}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                        <span>{recCourse.lessons.length} aulas</span>
                        <span style={{ color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Star size={12} fill="#F59E0B" /> {recCourse.rating || 4.7}
                        </span>
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
                      Quero ver
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ══════════ PREMIUM VIDEO PREVIEW MODAL ══════════ */}
      {showVideoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#0F172A',
            border: '1px solid #334155',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            {/* Header / Close button */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #1E293B',
              color: 'white'
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Pré-visualização: {course.title}</span>
              <button 
                onClick={() => setShowVideoModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Video player body */}
            <div style={{ position: 'relative', width: '100%', background: 'black', aspectRatio: '16/9' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Ke90Tje7VS0?autoplay=1"
                title="Course Preview Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
