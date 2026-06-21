export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  contentUrl: string; // URL do vídeo (ex: YouTube)
  type: 'video';
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  lessons: Lesson[];
  rating?: number;
  students?: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  completedLessons: string[]; // IDs of completed lessons
  progress: number; // 0 to 100
  completed: boolean;
  quizAttempts: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  questions: Question[];
}

export interface QuizResult {
  id: string;
  userId: string;
  courseId: string;
  score: number; // 0 to 100
  passed: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issueDate: string;
}
