import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavoritesAndNotificationsProvider } from './contexts/FavoritesAndNotificationsContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import PublicNavbar from './components/PublicNavbar';
import PublicFooter from './components/PublicFooter';

import Home from './pages/Home';
import Login from './pages/Login';
import CourseDetails from './pages/CourseDetails';
import LearningRoom from './pages/LearningRoom';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import FavoritesPage from './pages/FavoritesPage';
import NotificationsPage from './pages/NotificationsPage';
import MyCourses from './pages/MyCourses';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when route changes on mobile
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Login is fully standalone (no navbar, no wrapper)
  const isLoginPage = location.pathname === '/login';

  // Other public pages: home and course details (without /learn, /quiz, /certificate)
  const isPublicPage =
    location.pathname === '/' ||
    isLoginPage ||
    (location.pathname.startsWith('/course/') &&
      !location.pathname.includes('/learn') &&
      !location.pathname.includes('/quiz') &&
      !location.pathname.includes('/certificate'));

  const showSidebar = !!user && !isPublicPage && !location.pathname.startsWith('/favorites') && !location.pathname.startsWith('/notifications') && !location.pathname.startsWith('/my-courses');

  // Login page renders fully standalone — no layout wrapper at all
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  // Learning Room renders fully standalone
  const isLearnPage = location.pathname.includes('/learn');
  if (isLearnPage) {
    return (
      <Routes>
        <Route path="/course/:courseId/learn" element={<ProtectedRoute><LearningRoom /></ProtectedRoute>} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {showSidebar && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      <main className={showSidebar ? 'main-content' : 'main-content-full'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {showSidebar && <Topbar onMenuClick={() => setIsSidebarOpen(true)} />}
        {!showSidebar && <PublicNavbar />}
        <div className="" style={showSidebar ? {} : { flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetails />} />


            <Route path="/favorites" element={
              <ProtectedRoute><FavoritesPage /></ProtectedRoute>
            } />
            <Route path="/my-courses" element={
              <ProtectedRoute><MyCourses /></ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute><NotificationsPage /></ProtectedRoute>
            } />
            <Route path="/course/:courseId/quiz" element={
              <ProtectedRoute><QuizPage /></ProtectedRoute>
            } />
            <Route path="/course/:courseId/certificate" element={
              <ProtectedRoute><CertificatePage /></ProtectedRoute>
            } />
          </Routes>
        </div>
        {!showSidebar && <PublicFooter />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesAndNotificationsProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FavoritesAndNotificationsProvider>
    </AuthProvider>
  );
}

export default App;

