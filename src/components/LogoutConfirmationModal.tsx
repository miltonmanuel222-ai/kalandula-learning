import React, { useState } from 'react';
import { LogOut, X, Loader2 } from 'lucide-react';

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }: LogoutConfirmationModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) {
    if (isLoggingOut) setIsLoggingOut(false);
    return null;
  }

  const handleConfirmClick = async () => {
    setIsLoggingOut(true);
    // Yield to the browser to paint the loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    await Promise.resolve(onConfirm());
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.15s ease-out'
    }}>
      <div 
        className="animate-scale-in"
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '90%',
          maxWidth: '420px',
          padding: '2.5rem 2rem',
          position: 'relative',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isLoggingOut}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: isLoggingOut ? 'not-allowed' : 'pointer',
            padding: '0.25rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
            opacity: isLoggingOut ? 0.5 : 1
          }}
          onMouseEnter={e => { if(!isLoggingOut) e.currentTarget.style.backgroundColor = 'var(--surface-light)' }}
          onMouseLeave={e => { if(!isLoggingOut) e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <X size={20} />
        </button>

        {/* Warning Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#FEF2F2',
          color: '#EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 4px 10px rgba(239, 68, 68, 0.1)'
        }}>
          <LogOut size={28} />
        </div>

        {/* Message */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Sair da plataforma
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          Tem a certeza que deseja sair da plataforma?
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={onClose}
            disabled={isLoggingOut}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              transition: 'var(--transition)',
              opacity: isLoggingOut ? 0.6 : 1
            }}
            onMouseEnter={e => {
              if(!isLoggingOut) e.currentTarget.style.background = 'var(--surface-light)';
            }}
            onMouseLeave={e => {
              if(!isLoggingOut) e.currentTarget.style.background = 'var(--surface)';
            }}
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirmClick}
            disabled={isLoggingOut}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: '#EF4444',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: isLoggingOut ? 'not-allowed' : 'pointer',
              transition: 'var(--transition)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isLoggingOut ? 0.8 : 1
            }}
            onMouseEnter={e => {
              if(!isLoggingOut) {
                e.currentTarget.style.background = '#DC2626';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={e => {
              if(!isLoggingOut) {
                e.currentTarget.style.background = '#EF4444';
                e.currentTarget.style.transform = 'none';
              }
            }}
          >
            {isLoggingOut ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                A sair...
              </>
            ) : (
              'Sair'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
