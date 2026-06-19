import React, { useState, useEffect } from 'react';
import { db } from '../services/mockDb';
import { useAuth } from '../contexts/AuthContext';
import { useFavoritesAndNotifications } from '../contexts/FavoritesAndNotificationsContext';
import type { Quiz, Course } from '../types';
import { X, Trophy, AlertCircle } from 'lucide-react';

interface QuizModalProps {
  courseId: string;
  onClose: () => void;
  onResetCourse: () => void;
  onCertificate: () => void;
}

export default function QuizModal({ courseId, onClose, onResetCourse, onCertificate }: QuizModalProps) {
  const { user } = useAuth();
  const { addNotification } = useFavoritesAndNotifications();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // Status: 'playing' | 'failed' | 'passed' | 'fatal_fail'
  const [status, setStatus] = useState<'playing' | 'failed' | 'passed' | 'fatal_fail'>('playing');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  
  useEffect(() => {
    if (courseId && user) {
      const c = db.getCourse(courseId);
      const q = db.getQuiz(courseId);
      const e = db.getEnrollment(user.id, courseId);
      
      if (c && q && e) {
        setCourse(c);
        setQuiz(q);
        setAttemptsLeft(Math.max(0, 3 - (e.quizAttempts || 0)));
      }
    }
  }, [courseId, user]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (status !== 'playing') return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
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
    
    // User must get 100% (15/15 correct)
    if (finalScore === 100) {
      setStatus('passed');
      db.saveQuizResult(user.id, course.id, finalScore);
      
      addNotification({
        userId: user.id,
        type: 'certificate_available',
        title: '🎓 Aprovado na Avaliação!',
        message: `Parabéns! Você foi aprovado em "${course.title}". O seu certificado já está disponível!`,
        courseName: course.title,
        courseId: course.id
      });
    } else {
      const newAttempts = db.incrementQuizAttempts(user.id, course.id);
      const remaining = Math.max(0, 3 - newAttempts);
      setAttemptsLeft(remaining);
      
      if (remaining === 0) {
        setStatus('fatal_fail');
        db.resetCourseProgress(user.id, course.id);
      } else {
        setStatus('failed');
      }
    }
  };

  const handleRetry = () => {
    setStatus('playing');
    setCurrentStep(1);
    setAnswers({});
  };

  if (!course || !quiz) return null;

  const currentQuestions = quiz.questions.slice((currentStep - 1) * 5, currentStep * 5);
  const answeredInStep = currentQuestions.filter(q => answers[q.id] !== undefined).length;
  const canProceed = answeredInStep === currentQuestions.length;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={status === 'playing' ? onClose : undefined} />
      
      <div style={{ position: 'relative', background: '#fff', borderRadius: '8px', width: '90%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        
        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #d1d7dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1d1f' }}>Avaliação Final</h2>
            <p style={{ fontSize: '0.9rem', color: '#6a6f73' }}>{course.title}</p>
          </div>
          {status === 'playing' && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1d1f' }}>
              <X size={24} />
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {status === 'playing' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1d1f' }}>
                  Passo {currentStep} de 3
                </div>
                <div style={{ fontSize: '0.9rem', color: '#eab308', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={16} /> Tentativas restantes: {attemptsLeft}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {currentQuestions.map((q, idx) => {
                  const globalIdx = (currentStep - 1) * 5 + idx + 1;
                  return (
                    <div key={q.id}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', color: '#1c1d1f' }}>
                        {globalIdx}. {q.text}
                      </h3>
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
                                borderRadius: '4px',
                                border: `1px solid ${isSelected ? '#1c1d1f' : '#d1d7dc'}`,
                                background: isSelected ? '#f7f9fa' : '#fff',
                                color: '#1c1d1f',
                                fontWeight: isSelected ? 600 : 400,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {status === 'passed' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Trophy size={80} color="#22c55e" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem' }}>Aprovado!</h2>
              <p style={{ fontSize: '1.1rem', color: '#6a6f73', marginBottom: '2rem' }}>
                Você acertou todas as 15 perguntas. Parabéns, o seu certificado já está disponível.
              </p>
            </div>
          )}

          {status === 'failed' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <AlertCircle size={80} color="#f59e0b" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem' }}>Não foi desta vez</h2>
              <p style={{ fontSize: '1.1rem', color: '#6a6f73', marginBottom: '1rem' }}>
                Para ser aprovado precisa de acertar as 15 perguntas de forma correta.
              </p>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444', marginBottom: '2rem' }}>
                Tentativas restantes: {attemptsLeft}
              </p>
            </div>
          )}

          {status === 'fatal_fail' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <X size={80} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1d1f', marginBottom: '1rem' }}>Avaliação Reprovada</h2>
              <p style={{ fontSize: '1.1rem', color: '#6a6f73', marginBottom: '1rem' }}>
                Infelizmente, você esgotou as suas 3 tentativas.
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ef4444', marginBottom: '2rem', background: '#fee2e2', padding: '1rem', borderRadius: '8px' }}>
                O seu progresso neste curso foi reiniciado. Você precisará de assistir a todas as aulas novamente para poder refazer a avaliação.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #d1d7dc', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {status === 'playing' && (
            <>
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!canProceed}
                  style={{
                    background: canProceed ? '#1c1d1f' : '#d1d7dc',
                    color: canProceed ? '#fff' : '#6a6f73',
                    border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700,
                    cursor: canProceed ? 'pointer' : 'not-allowed'
                  }}
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed}
                  style={{
                    background: canProceed ? 'var(--primary)' : '#d1d7dc',
                    color: canProceed ? '#fff' : '#6a6f73',
                    border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700,
                    cursor: canProceed ? 'pointer' : 'not-allowed'
                  }}
                >
                  Submeter Respostas
                </button>
              )}
            </>
          )}

          {status === 'passed' && (
            <>
              <button onClick={onClose} style={{ background: 'none', border: '1px solid #1c1d1f', color: '#1c1d1f', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                Fechar
              </button>
              <button onClick={onCertificate} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                Imprimir Certificado
              </button>
            </>
          )}

          {status === 'failed' && (
            <>
              <button onClick={onClose} style={{ background: 'none', border: '1px solid #1c1d1f', color: '#1c1d1f', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                Estudar Mais
              </button>
              <button onClick={handleRetry} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                Tentar Novamente
              </button>
            </>
          )}

          {status === 'fatal_fail' && (
            <button onClick={onResetCourse} style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              Repetir Curso
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
}
