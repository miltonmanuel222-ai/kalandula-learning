import type { Notification } from '../contexts/FavoritesAndNotificationsContext';

export function initializeDemoNotifications(userId: string): Notification[] {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  const demoNotifications: Notification[] = [
    {
      id: '1',
      userId,
      type: 'course_completed',
      title: 'Curso concluído',
      message: 'Curso concluído',
      courseName: 'Introdução à Programação com React',
      courseId: 'c1',
      timestamp: now.toISOString(),
      read: false
    },
    {
      id: '2',
      userId,
      type: 'certificate_available',
      title: '📜 Certificado Disponível',
      message: 'Seu certificado está pronto para download.',
      courseName: 'Introdução à Programação com React',
      courseId: 'c1',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '3',
      userId,
      type: 'course_update',
      title: '📚 Novo Conteúdo',
      message: 'Novas lições foram adicionadas a um de seus cursos.',
      courseName: 'Fundamentos de Redes e Internet',
      courseId: 'c2',
      timestamp: yesterday.toISOString(),
      read: true
    },
    {
      id: '4',
      userId,
      type: 'new_course',
      title: '✨ Novo Curso Recomendado',
      message: 'Um novo curso foi recomendado para você baseado em seus interesses.',
      courseName: 'Cibersegurança para Iniciantes',
      courseId: 'c3',
      timestamp: twoDaysAgo.toISOString(),
      read: true
    },
    {
      id: '5',
      userId,
      type: 'course_update',
      title: '🔄 Atualização do Curso',
      message: 'O instrutor adicionou novos materiais ao seu curso em andamento.',
      courseName: 'UI/UX Design Essencial',
      courseId: 'c4',
      timestamp: threeDaysAgo.toISOString(),
      read: true
    }
  ];

  return demoNotifications;
}

export function hasInitializedNotifications(userId: string): boolean {
  const key = `notifications_initialized_${userId}`;
  return localStorage.getItem(key) === 'true';
}

export function markNotificationsInitialized(userId: string): void {
  const key = `notifications_initialized_${userId}`;
  localStorage.setItem(key, 'true');
}
