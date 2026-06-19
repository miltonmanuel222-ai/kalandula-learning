import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import { Bell, Trash2, ArrowLeft, CheckCircle2, Award, BookOpen, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useFavoritesAndNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) return null;

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => n && !n.read)
    : notifications.filter(n => n);

  const unreadCount = notifications.filter(n => n && !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course_completed':
        return <CheckCircle2 size={24} style={{ color: '#10B981' }} />;
      case 'certificate_available':
        return <Award size={24} style={{ color: '#F59E0B' }} />;
      case 'new_course':
        return <BookOpen size={24} style={{ color: 'var(--primary)' }} />;
      case 'course_update':
        return <AlertCircle size={24} style={{ color: '#3B82F6' }} />;
      default:
        return <Bell size={24} style={{ color: 'var(--text-muted)' }} />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'course_completed':
        return 'Curso Concluído';
      case 'certificate_available':
        return 'Certificado Disponível';
      case 'new_course':
        return 'Novo Curso';
      case 'course_update':
        return 'Atualização do Curso';
      case 'course_reset':
        return 'Progresso Reiniciado';
      default:
        return 'Notificação';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data desconhecida';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));

      if (diffMinutes < 1) return 'Agora mesmo';
      if (diffMinutes < 60) return `${diffMinutes}m atrás`;
      if (diffHours < 24) return `${diffHours}h atrás`;
      if (diffDays < 30) return `${diffDays}d atrás`;

      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--bg-secondary)' }}>
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
          fontWeight: 600
        }}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
              Notificações
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
              Total de {filteredNotifications.length} notificação{filteredNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredNotifications.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {filteredNotifications.some(n => !n.read) && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Marcar tudo como lido
                </button>
              )}
              <button
                onClick={clearNotifications}
                style={{
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Trash2 size={18} /> Limpar tudo
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              color: filter === 'all' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: filter === 'all' ? 600 : 400,
              borderBottom: filter === 'all' ? '2px solid var(--primary)' : 'none',
              paddingBottom: '0.5rem',
              transition: 'color 0.2s'
            }}
          >
            Todas ({notifications.filter(n => n).length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              color: filter === 'unread' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: filter === 'unread' ? 600 : 400,
              borderBottom: filter === 'unread' ? '2px solid var(--primary)' : 'none',
              paddingBottom: '0.5rem',
              transition: 'color 0.2s'
            }}
          >
            Não Lidas ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="card" style={{
            padding: '3rem',
            textAlign: 'center',
            background: '#FFFDF9',
            borderColor: '#FDF1EC'
          }}>
            <Bell size={48} style={{ color: 'var(--primary)', margin: '0 auto 1rem', opacity: 0.3 }} />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {filter === 'unread' ? 'Sem notificações não lidas' : 'Sem notificações'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {filter === 'unread'
                ? 'Você marcou todas as notificações como lidas'
                : 'Você receberá notificações aqui quando fizer progresso em seus cursos'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id || Math.random()}
                onClick={() => !notification.read && markAsRead(notification.id)}
                style={{
                  background: notification.read ? 'var(--bg-secondary)' : '#FFFDF9',
                  border: `2px solid ${notification.read ? 'var(--border)' : '#FDF1EC'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  cursor: notification.read ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: notification.read ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!notification.read) {
                    e.currentTarget.style.background = '#FDF1EC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!notification.read) {
                    e.currentTarget.style.background = '#FFFDF9';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flex: 1 }}>
                  <div style={{ paddingTop: '0.25rem' }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontWeight: 600
                      }}>
                        {getNotificationTypeLabel(notification.type)}
                      </span>
                      {!notification.read && (
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: 'var(--primary)'
                        }}></div>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontWeight: 600 }}>
                      {notification.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>
                      {notification.message}
                    </p>
                    {notification.courseName && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--primary)', margin: 0, fontWeight: 500 }}>
                        📚 {notification.courseName}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {formatDate(notification.timestamp)}
                  </span>
                  {notification.courseId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${notification.courseId}`);
                      }}
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Ver Curso
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
