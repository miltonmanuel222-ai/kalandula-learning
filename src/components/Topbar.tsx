import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Use the shared context for real-time notification updates
  const { notifications, unreadCount } = useFavoritesAndNotifications();
  const recentNotifications = notifications.slice(0, 3);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotificationOpen]);

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="mobile-menu-btn"
          onClick={onMenuClick}
          style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.5rem', display: 'none' }}
        >
          <Menu size={24} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="topbar-search">
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search here..." />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
          <button style={{ background: 'none', color: 'inherit', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <MessageSquare size={20} />
          </button>
          
          <div style={{ position: 'relative' }} ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              style={{
                background: 'none',
                color: 'inherit',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                padding: 0
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </button>

            {isNotificationOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                minWidth: '360px',
                maxHeight: '500px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100
              }}>
                {/* Header */}
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      Notificações
                    </h3>
                    {unreadCount > 0 && (
                      <span style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                {recentNotifications.length === 0 ? (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div>
                      <Bell size={32} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                      <p style={{ margin: 0 }}>Nenhuma notificação</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, overflowY: 'auto', maxHeight: '350px' }}>
                    {recentNotifications.map((notification: any) => notification && (
                      <div
                        key={notification.id || Math.random()}
                        style={{
                          padding: '1rem',
                          borderBottom: '1px solid var(--border)',
                          background: notification.read ? 'transparent' : '#FFFDF9',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = notification.read ? 'transparent' : '#FFFDF9'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                              {notification.title}
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                              {notification.message}
                            </p>
                            {notification.courseName && (
                              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
                                📚 {notification.courseName}
                              </p>
                            )}
                          </div>
                          {!notification.read && (
                            <div style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: 'var(--primary)',
                              flexShrink: 0,
                              marginTop: '0.5rem'
                            }}></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                {recentNotifications.length > 0 && (
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setIsNotificationOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: 'none',
                      background: 'var(--bg-secondary)',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      borderTop: '1px solid var(--border)',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  >
                    Ver Todas as Notificações →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estudante</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', overflow: 'hidden' }}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserIcon size={20} />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
