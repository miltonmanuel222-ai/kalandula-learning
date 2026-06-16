import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer style={{
      background: '#1E293B',
      color: '#94A3B8',
      padding: '4rem 3rem 2rem 3rem',
      fontFamily: 'var(--font-sans)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <BookOpen size={26} style={{ color: 'var(--primary)' }} />
            <span style={{ color: 'var(--primary)' }}>Kalandula</span>Learning
          </Link>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#64748B' }}>
            Transformando vidas através do ensino gratuito e acessível para todos.
          </p>
        </div>

        {/* Column 1: Navegação */}
        <div>
          <h4 style={{ color: '#FFFFFF', marginBottom: '1.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Navegação
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <li><Link to="/" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Cursos</Link></li>
            <li><Link to="/login" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Criar Conta</Link></li>
          </ul>
        </div>

        {/* Column 2: Sobre */}
        <div>
          <h4 style={{ color: '#FFFFFF', marginBottom: '1.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sobre
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <li><a href="#about" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Quem Somos</a></li>
            <li><a href="#terms" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Termos e Condições</a></li>
            <li><a href="#privacy" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Column 3: Links Úteis */}
        <div>
          <h4 style={{ color: '#FFFFFF', marginBottom: '1.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Links Úteis
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <li><Link to="/" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Centro de Ajuda</Link></li>
            <li><Link to="/" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Sobre Nós</Link></li>
            <li><Link to="/" style={{ color: '#94A3B8', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>Termos de Uso</Link></li>
          </ul>
        </div>

        {/* Contato & Redes */}
        <div>
          <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Contato</h4>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            geral@kalandula.ao
          </p>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Luanda, Angola
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              LinkedIn
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem'
      }}>
        <span>© {new Date().getFullYear()} Kalandula Learning. Todos os direitos reservados.</span>
        <span>Criado com ❤️ em Angola</span>
      </div>
    </footer>
  );
}
