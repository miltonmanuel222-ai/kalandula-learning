import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Compass, Award, Settings, LogOut } from 'lucide-react';
import LogoutConfirmationModal from './LogoutConfirmationModal';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-brand">
        <BookOpen className="w-8 h-8" style={{ color: 'var(--primary)' }} />
        <span>Kalandula</span>
      </Link>

      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '1rem', marginTop: '1rem', letterSpacing: '0.05em' }}>
        MENU
      </div>

      <nav className="sidebar-menu">
        <Link to="/" className={`sidebar-link ${isActive('/') ? 'active' : ''}`}>
          <Compass size={20} />
          Explorar Cursos
        </Link>
        {user && (
          <>
            <Link to="/my-courses" className={`sidebar-link ${isActive('/my-courses') ? 'active' : ''}`}>
              <BookOpen size={20} />
              Meus Cursos
            </Link>
            <Link to="/certificates" className={`sidebar-link ${isActive('/certificates') ? 'active' : ''}`}>
              <Award size={20} />
              Certificados
            </Link>
          </>
        )}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {user ? (
          <>
            <div style={{ background: 'linear-gradient(145deg, #FF6B35, #E85D2A)', padding: '1.5rem', borderRadius: '16px', color: 'white', textAlign: 'center', marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
              <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Get Premium Now!</h4>
              <p style={{ fontSize: '0.75rem', marginBottom: '1rem', opacity: 0.9 }}>Reach our special features by subscribing to our plan.</p>
              <button className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}>
                Upgrade Now &uarr;
              </button>
            </div>
            
            <button className="sidebar-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}>
              <Settings size={20} /> Definições
            </button>
            <button onClick={handleLogoutClick} className="sidebar-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', color: 'var(--danger)' }}>
              <LogOut size={20} /> Sair
            </button>
          </>
        ) : (
          <div style={{ background: 'linear-gradient(145deg, #FF6B35, #E85D2A)', padding: '1.5rem', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Crie uma conta!</h4>
            <p style={{ fontSize: '0.8rem', marginBottom: '1rem', opacity: 0.9 }}>Comece a sua jornada de aprendizagem.</p>
            <Link to="/login" className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%', fontSize: '0.85rem' }}>
              Registar Agora
            </Link>
          </div>
        )}
      </div>
      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </aside>
  );
}
