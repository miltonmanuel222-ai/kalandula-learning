import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Quiz, Course } from '../types';

export default function QuizPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useFavoritesAndNotifications();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (courseId && user) {
      const c = db.getCourse(courseId);
      const q = db.getQuiz(courseId);
      const e = db.getEnrollment(user.id, courseId);
      
      // Ensure user is 100% completed before taking quiz
      if (c && q && e && e.progress === 100) {
        setCourse(c);
        setQuiz(q);
      } else {
        navigate('/');
      }
    }
  }, [courseId, user, navigate]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!quiz || !user || !course) return;

    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    db.saveQuizResult(user.id, course.id, finalScore);

    // Notify the user about quiz result
    if (finalScore >= 50) {
      addNotification({
        userId: user.id,
        type: 'certificate_available',
        title: '🎓 Aprovado na Avaliação!',
        message: `Parabéns! Você foi aprovado com ${finalScore}% em "${course.title}". O seu certificado já está disponível!`,
        courseName: course.title,
        courseId: course.id
      });
    }
  };

  if (!course || !quiz) return null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Avaliação Final</h1>
        <p style={{ color: 'var(--text-muted)' }}>{course.title}</p>
      </header>

      {!isSubmitted ? (
        <div className="card glass" style={{ padding: '2.5rem' }}>
          {quiz.questions.map((q, qIndex) => (
            <div key={q.id} style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{qIndex + 1}. {q.text}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((option, oIndex) => {
                  const isSelected = answers[q.id] === oIndex;
                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelectOption(q.id, oIndex)}
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        borderRadius: '0.5rem',
                        border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                        background: isSelected ? 'rgba(79, 70, 229, 0.1)' : 'var(--surface-light)',
                        color: 'var(--text-main)',
                        transition: 'var(--transition)'
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < quiz.questions.length}
          >
            Submeter Respostas
          </button>
        </div>
      ) : (
        <div className="card glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: score >= 50 ? 'var(--secondary)' : 'var(--danger)' }}>
            {score >= 50 ? 'Parabéns, foi Aprovado!' : 'Infelizmente, não foi aprovado.'}
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>A sua nota final é: <strong>{score}%</strong></p>
          
          {score >= 50 ? (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => navigate('/')} className="btn btn-outline">Voltar aos Cursos</button>
              <button onClick={() => navigate(`/course/${course.id}/certificate`)} className="btn btn-primary">Ver Certificado</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => navigate('/')} className="btn btn-outline">Voltar aos Cursos</button>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});
                  setScore(0);
                }} 
                className="btn btn-primary"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
