import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Search, Bell, Heart, User, Settings, LogOut } from 'lucide-react';
import { CATEGORIES } from '../services/mockDb';
import LogoutConfirmationModal from './LogoutConfirmationModal';

export default function PublicNavbar() {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
    setIsProfileMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, fontFamily: 'var(--font-sans)' }}>
      {/* ─── Top Tier (Dark Header) ─── */}
      <header className="public-navbar" style={{
        background: '#1C1D1F',
        padding: '0.85rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Left: Brand & "Cursos" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}>
            <BookOpen size={26} style={{ color: 'var(--primary)' }} />
            <span style={{ color: 'var(--primary)' }}>Kalandula</span>Learning
          </Link>

          <Link to="/" style={{ color: '#FFFFFF', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}>
            Cursos
          </Link>
        </div>

        {/* Center: Search Bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '700px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#A1A5B3' }} />
          <input 
            type="text" 
            placeholder="Pesquisar cursos" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: '#3E4143',
              border: '1px solid #1C1D1F',
              borderRadius: '999px',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.border = '1px solid #FFFFFF'}
            onBlur={(e) => e.target.style.border = '1px solid #1C1D1F'}
          />
        </form>

        {/* Right: Actions & User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {user ? (
            <>
              <Link to="/my-courses" style={{ color: '#FFFFFF', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}>
                Meus cursos
              </Link>
              <button onClick={() => navigate('/favorites')} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}>
                <Heart size={20} />
              </button>
              <button onClick={() => navigate('/notifications')} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}>
                <Bell size={20} />
              </button>
              
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#3E4143', overflow: 'hidden', border: '1px solid #2D2F31', cursor: 'pointer', padding: 0 }}
                >
                  <img src={user.avatarUrl || "https://i.pravatar.cc/150?img=11"} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
                
                {isProfileMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '200px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 100
                  }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B', margin: 0 }}>{user.name}</p>
                      <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, marginTop: '2px' }}>{user.email}</p>
                    </div>
                    <button onClick={() => { setIsProfileMenuOpen(false); navigate('/settings'); }} style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', textAlign: 'left', fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <Settings size={16} /> Definições
                    </button>
                    <button onClick={handleLogoutClick} style={{ padding: '0.75rem 1rem', background: 'none', border: 'none', textAlign: 'left', fontSize: '0.9rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#FFFFFF', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}>
                Entrar
              </Link>
              <Link to="/login?mode=register" style={{ 
                background: 'var(--primary)', 
                color: '#FFFFFF', 
                padding: '0.5rem 1.25rem', 
                borderRadius: '999px', 
                fontSize: '0.9rem', 
                fontWeight: 600, 
                textDecoration: 'none', 
                transition: 'background 0.2s' 
              }} onMouseEnter={e => e.currentTarget.style.background = '#E85D2A'} onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}>
                Registar
              </Link>
            </>
          )}
        </div>
      </header>

      {/* ─── Bottom Tier (Category Sub-nav) ─── */}
      <div style={{
        background: '#2D2F31',
        padding: '0.75rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
      }}>
        {CATEGORIES.map((category) => (
          <Link 
            key={category.id}
            to={`/?c=${category.id}`}
            style={{ 
              color: searchParams.get('c') === category.id ? '#FFFFFF' : '#D1D7DC', 
              fontSize: '0.85rem', 
              textDecoration: 'none',
              fontWeight: searchParams.get('c') === category.id ? 600 : 400,
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = searchParams.get('c') === category.id ? '#FFFFFF' : '#D1D7DC'}
          >
            {category.label}
          </Link>
        ))}
      </div>
      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </div>
  );
}
