import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  userId: string;
  type: 'course_completed' | 'certificate_available' | 'new_course' | 'course_update';
  title: string;
  message: string;
  courseId?: string;
  courseName?: string;
  timestamp: string; // Store as ISO string, convert on read
  read: boolean;
}

interface FavoritesAndNotificationsContextType {
  favorites: Set<string>;
  toggleFavorite: (courseId: string) => void;
  isFavorite: (courseId: string) => boolean;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  clearNotifications: () => void;
}

const FavoritesAndNotificationsContext = createContext<FavoritesAndNotificationsContextType | undefined>(undefined);

export function FavoritesAndNotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage when user changes
  useEffect(() => {
    if (!user) {
      setFavorites(new Set());
      setNotifications([]);
      setIsInitialized(false);
      return;
    }

    try {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } else {
        setFavorites(new Set());
      }

      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        } else {
          setNotifications([]);
        }
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error loading favorites/notifications:', error);
      setFavorites(new Set());
      setNotifications([]);
    }
    
    setIsInitialized(true);
  }, [user?.id]);

  // Save favorites to localStorage
  useEffect(() => {
    if (user && isInitialized) {
      try {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(Array.from(favorites)));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, user?.id, isInitialized]);

  // Save notifications to localStorage
  useEffect(() => {
    if (user && isInitialized) {
      try {
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
      } catch (error) {
        console.error('Error saving notifications:', error);
      }
    }
  }, [notifications, user?.id, isInitialized]);

  const toggleFavorite = useCallback((courseId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId);
      } else {
        newFavorites.add(courseId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((courseId: string) => {
    return favorites.has(courseId);
  }, [favorites]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: FavoritesAndNotificationsContextType = {
    favorites,
    toggleFavorite,
    isFavorite,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    clearNotifications
  };

  return (
    <FavoritesAndNotificationsContext.Provider value={value}>
      {children}
    </FavoritesAndNotificationsContext.Provider>
  );
}

export function useFavoritesAndNotifications() {
  const context = useContext(FavoritesAndNotificationsContext);
  if (context === undefined) {
    throw new Error('useFavoritesAndNotifications must be used within FavoritesAndNotificationsProvider');
  }
  return context;
}
