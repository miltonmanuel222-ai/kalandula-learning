import type { Course, Quiz, User, Enrollment, QuizResult, Certificate } from '../types';

export const CATEGORIES = [
  { id: 'tecnologia', label: 'Tecnologia', icon: 'laptop' },
  { id: 'design', label: 'Design', icon: 'palette' },
  { id: 'negocios', label: 'Negócios', icon: 'trending-up' },
  { id: 'ciencias', label: 'Ciências Exatas', icon: 'microscope' },
  { id: 'comunicacao', label: 'Comunicação', icon: 'message-square' },
  { id: 'desenvolvimento', label: 'Desenvolvimento Pessoal', icon: 'rocket' },
];

const INITIAL_COURSES: Course[] = [
  {
    id: 'cv_mock_1',
    title: 'Curso de Python 3 - Mundo 1',
    description: 'Neste curso, o professor Gustavo Guanabara vai te ensinar os primeiros passos com a linguagem Python.',
    imageUrl: 'https://i.ytimg.com/vi/S9uPNppGsGo/maxresdefault.jpg',
    category: 'tecnologia',
    level: 'Iniciante',
    instructor: 'Gustavo Guanabara (Curso em Vídeo)',
    youtubePlaylistId: 'PLvE-ZAWIdP',
    rating: 5.0,
    students: 15200,
    lessons: [
      { id: 'l_mock_1', courseId: 'cv_mock_1', title: 'Seja Programador', contentUrl: 'https://www.youtube.com/watch?v=S9uPNppGsGo', youtubeVideoId: 'S9uPNppGsGo', module: 'Apresentação', order: 1, type: 'video', duration: '28 min' },
      { id: 'l_mock_2', courseId: 'cv_mock_1', title: 'Para que serve o Python?', contentUrl: 'https://www.youtube.com/watch?v=Mp0vhMDI7fA', youtubeVideoId: 'Mp0vhMDI7fA', module: 'Apresentação', order: 2, type: 'video', duration: '34 min' },
      { id: 'l_mock_3', courseId: 'cv_mock_1', title: 'Instalando o Python3 e o IDLE', contentUrl: 'https://www.youtube.com/watch?v=VuKvR1J2LQE', youtubeVideoId: 'VuKvR1J2LQE', module: 'Fundamentos', order: 3, type: 'video', duration: '20 min' },
      { id: 'l_mock_4', courseId: 'cv_mock_1', title: 'Primeiros comandos em Python3', contentUrl: 'https://www.youtube.com/watch?v=31llNGKWDvI', youtubeVideoId: '31llNGKWDvI', module: 'Fundamentos', order: 4, type: 'video', duration: '25 min' }
    ]
  },
  // ─── TECNOLOGIA ───
  {
    id: 'c1',
    title: 'Introdução à Programação com React',
    description: 'Aprenda os fundamentos do React, hooks e componentização para criar interfaces modernas e interativas para a web.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.8,
    students: 320,
    lessons: [
      { id: 'l1_1', courseId: 'c1', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l1_2', courseId: 'c1', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l1_3', courseId: 'c1', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l1_4', courseId: 'c1', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l1_5', courseId: 'c1', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c2',
    title: 'Fundamentos de Redes e Internet',
    description: 'Compreenda como a internet funciona, os protocolos de rede, arquitetura cliente-servidor e conceitos essenciais de infraestrutura.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.6,
    students: 210,
    lessons: [
      { id: 'l2_1', courseId: 'c2', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l2_2', courseId: 'c2', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l2_3', courseId: 'c2', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l2_4', courseId: 'c2', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l2_5', courseId: 'c2', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c3',
    title: 'Cibersegurança para Iniciantes',
    description: 'Aprenda os conceitos fundamentais de segurança digital, como proteger dados, evitar ataques e navegar com segurança online.',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.9,
    students: 450,
    lessons: [
      { id: 'l3_1', courseId: 'c3', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l3_2', courseId: 'c3', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l3_3', courseId: 'c3', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l3_4', courseId: 'c3', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l3_5', courseId: 'c3', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c15',
    title: 'Informática Básica (Word, Excel, PowerPoint)',
    description: 'Domine as principais ferramentas de escritório da Microsoft: crie documentos profissionais no Word, organize dados e fórmulas no Excel e faça apresentações impactantes no PowerPoint.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.6,
    students: 350,
    lessons: [
      { id: 'l15_1', courseId: 'c15', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l15_2', courseId: 'c15', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l15_3', courseId: 'c15', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l15_4', courseId: 'c15', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l15_5', courseId: 'c15', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c17',
    title: 'Lógica de Programação',
    description: 'A base essencial de todo desenvolvedor. Aprenda algoritmos, fluxogramas, variáveis, operadores, estruturas condicionais e de repetição.',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.8,
    students: 420,
    lessons: [
      { id: 'l17_1', courseId: 'c17', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l17_2', courseId: 'c17', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l17_3', courseId: 'c17', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l17_4', courseId: 'c17', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l17_5', courseId: 'c17', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c18',
    title: 'Introdução à Programação Web (HTML, CSS, JavaScript)',
    description: 'Dê os seus primeiros passos na criação de sites. Aprenda a estruturar páginas com HTML5, estilizar com CSS3 e adicionar interatividade básica com JavaScript.',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.7,
    students: 510,
    lessons: [
      { id: 'l18_1', courseId: 'c18', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l18_2', courseId: 'c18', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l18_3', courseId: 'c18', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l18_4', courseId: 'c18', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l18_5', courseId: 'c18', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c19',
    title: 'Git e GitHub',
    description: 'Aprenda a controlar versões de código e colabore em projetos de software. Domine comandos Git como commit, branch, merge, pull request e repositórios remotos.',
    imageUrl: 'https://images.unsplash.com/photo-1556075798-482a14361545?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.8,
    students: 390,
    lessons: [
      { id: 'l19_1', courseId: 'c19', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l19_2', courseId: 'c19', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l19_3', courseId: 'c19', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l19_4', courseId: 'c19', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l19_5', courseId: 'c19', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c20',
    title: 'Noções de Bases de Dados (SQL Básico)',
    description: 'Compreenda bases de dados relacionais e aprenda a linguagem SQL. Crie tabelas, insira dados e faça consultas (SELECT, WHERE, JOIN).',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.6,
    students: 310,
    lessons: [
      { id: 'l20_1', courseId: 'c20', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l20_2', courseId: 'c20', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l20_3', courseId: 'c20', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l20_4', courseId: 'c20', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l20_5', courseId: 'c20', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c21',
    title: 'Desenvolvimento Web (Front-end e Back-end)',
    description: 'Visão geral da engenharia web full-stack. Conecte interfaces SPA modernas (front-end) a servidores e bases de dados robustos (back-end).',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    category: 'tecnologia',
    level: 'Intermédio',
    rating: 4.8,
    students: 430,
    lessons: [
      { id: 'l21_1', courseId: 'c21', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l21_2', courseId: 'c21', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l21_3', courseId: 'c21', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l21_4', courseId: 'c21', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l21_5', courseId: 'c21', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c22',
    title: 'Desenvolvimento Mobile Básico',
    description: 'Aprenda os caminhos do desenvolvimento de aplicativos para smartphones. Conheça as abordagens nativas e frameworks híbridos como React Native e Flutter.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.5,
    students: 290,
    lessons: [
      { id: 'l22_1', courseId: 'c22', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l22_2', courseId: 'c22', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l22_3', courseId: 'c22', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l22_4', courseId: 'c22', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l22_5', courseId: 'c22', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c23',
    title: 'Engenharia de Software (Fundamentos)',
    description: 'Compreenda o ciclo de vida do desenvolvimento de software, metodologias, padrões de projeto, arquitetura de sistemas e testes de qualidade.',
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80',
    category: 'tecnologia',
    level: 'Intermédio',
    rating: 4.7,
    students: 260,
    lessons: [
      { id: 'l23_1', courseId: 'c23', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l23_2', courseId: 'c23', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l23_3', courseId: 'c23', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l23_4', courseId: 'c23', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l23_5', courseId: 'c23', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c24',
    title: 'Introdução à Inteligência Artificial',
    description: 'Explore o fascinante campo da IA. Compreenda Machine Learning, Redes Neuronais, Inteligência Artificial Generativa e os impactos éticos da tecnologia.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.9,
    students: 680,
    lessons: [
      { id: 'l24_1', courseId: 'c24', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l24_2', courseId: 'c24', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l24_3', courseId: 'c24', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l24_4', courseId: 'c24', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l24_5', courseId: 'c24', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c25',
    title: 'Análise de Dados (Excel Avançado e Power BI)',
    description: 'Transforme dados brutos em decisões inteligentes. Domine tabelas dinâmicas, PROCV, lógica DAX e crie dashboards interativos no Power BI.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'tecnologia',
    level: 'Intermédio',
    rating: 4.8,
    students: 370,
    lessons: [
      { id: 'l25_1', courseId: 'c25', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l25_2', courseId: 'c25', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l25_3', courseId: 'c25', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l25_4', courseId: 'c25', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l25_5', courseId: 'c25', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c44',
    title: 'Introdução à Engenharia Informática',
    description: 'Uma introdução completa sobre o percurso académico e profissional em Engenharia Informática. Entenda hardware, compiladores, algoritmos e as áreas de atuação.',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    category: 'tecnologia',
    level: 'Iniciante',
    rating: 4.7,
    students: 330,
    lessons: [
      { id: 'l44_1', courseId: 'c44', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l44_2', courseId: 'c44', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l44_3', courseId: 'c44', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l44_4', courseId: 'c44', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l44_5', courseId: 'c44', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c47',
    title: 'Sistemas Operativos',
    description: 'Aprenda os conceitos fundamentais de funcionamento dos sistemas operativos: processos, threads, gestão de memória e sistemas de ficheiros.',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80',
    category: 'tecnologia',
    level: 'Intermédio',
    rating: 4.7,
    students: 280,
    lessons: [
      { id: 'l47_1', courseId: 'c47', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=ErjWNvP6mko', type: 'video', duration: '20 min' },
      { id: 'l47_2', courseId: 'c47', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=8mei6uVttho', type: 'video', duration: '20 min' },
      { id: 'l47_3', courseId: 'c47', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=kM1K9LpX_84', type: 'video', duration: '20 min' },
      { id: 'l47_4', courseId: 'c47', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ', type: 'video', duration: '20 min' },
      { id: 'l47_5', courseId: 'c47', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=ZtMzB5CoekE', type: 'video', duration: '20 min' },
    ]
  },

  // ─── DESIGN ───
  {
    id: 'c4',
    title: 'UI/UX Design Essencial',
    description: 'Princípios fundamentais de design de interfaces e experiência do utilizador. Da pesquisa ao protótipo de alta fidelidade com Figma.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'design',
    level: 'Iniciante',
    rating: 4.7,
    students: 380,
    lessons: [
      { id: 'l4_1', courseId: 'c4', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=9U151Z9tZJk', type: 'video', duration: '20 min' },
      { id: 'l4_2', courseId: 'c4', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5U-EWCAJq-Q', type: 'video', duration: '20 min' },
      { id: 'l4_3', courseId: 'c4', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=2eR5k9t7Sqk', type: 'video', duration: '20 min' },
      { id: 'l4_4', courseId: 'c4', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=8V-wN7Qx6E8', type: 'video', duration: '20 min' },
      { id: 'l4_5', courseId: 'c4', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=oM3nZfE6T_E', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c5',
    title: 'Design Gráfico do Zero',
    description: 'Domine as ferramentas e princípios do design gráfico. Crie logótipos, cartazes, identidades visuais e materiais de comunicação.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    category: 'design',
    level: 'Iniciante',
    rating: 4.5,
    students: 290,
    lessons: [
      { id: 'l5_1', courseId: 'c5', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=9U151Z9tZJk', type: 'video', duration: '20 min' },
      { id: 'l5_2', courseId: 'c5', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5U-EWCAJq-Q', type: 'video', duration: '20 min' },
      { id: 'l5_3', courseId: 'c5', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=2eR5k9t7Sqk', type: 'video', duration: '20 min' },
      { id: 'l5_4', courseId: 'c5', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=8V-wN7Qx6E8', type: 'video', duration: '20 min' },
      { id: 'l5_5', courseId: 'c5', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=oM3nZfE6T_E', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c43',
    title: 'Criação de Portfólio',
    description: 'Apresente os seus melhores projetos para conquistar clientes ou vagas de emprego. Aprenda a organizar cases, estruturar depoimentos e criar um site portfólio atraente.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    category: 'design',
    level: 'Iniciante',
    rating: 4.8,
    students: 410,
    lessons: [
      { id: 'l43_1', courseId: 'c43', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=9U151Z9tZJk', type: 'video', duration: '20 min' },
      { id: 'l43_2', courseId: 'c43', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5U-EWCAJq-Q', type: 'video', duration: '20 min' },
      { id: 'l43_3', courseId: 'c43', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=2eR5k9t7Sqk', type: 'video', duration: '20 min' },
      { id: 'l43_4', courseId: 'c43', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=8V-wN7Qx6E8', type: 'video', duration: '20 min' },
      { id: 'l43_5', courseId: 'c43', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=oM3nZfE6T_E', type: 'video', duration: '20 min' },
    ]
  },

  // ─── NEGÓCIOS ───
  {
    id: 'c6',
    title: 'Marketing Digital para Iniciantes',
    description: 'Aprenda as estratégias essenciais de marketing digital: SEO, redes sociais, email marketing e criação de conteúdo para crescer online.',
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
    category: 'negocios',
    level: 'Iniciante',
    rating: 4.8,
    students: 560,
    lessons: [
      { id: 'l6_1', courseId: 'c6', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l6_2', courseId: 'c6', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l6_3', courseId: 'c6', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l6_4', courseId: 'c6', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l6_5', courseId: 'c6', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c7',
    title: 'Empreendedorismo e Criação de Startups',
    description: 'Do conceito à execução: aprenda a validar uma ideia de negócio, criar um MVP, captar investimento e escalar uma startup.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    category: 'negocios',
    level: 'Intermédio',
    rating: 4.9,
    students: 720,
    lessons: [
      { id: 'l7_1', courseId: 'c7', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l7_2', courseId: 'c7', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l7_3', courseId: 'c7', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l7_4', courseId: 'c7', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l7_5', courseId: 'c7', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c8',
    title: 'Gestão Financeira Pessoal',
    description: 'Tome o controlo das suas finanças pessoais. Orçamento, poupança, investimento e liberdade financeira ao alcance de todos.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    category: 'negocios',
    level: 'Iniciante',
    rating: 4.7,
    students: 430,
    lessons: [
      { id: 'l8_1', courseId: 'c8', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l8_2', courseId: 'c8', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l8_3', courseId: 'c8', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l8_4', courseId: 'c8', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l8_5', courseId: 'c8', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c26',
    title: 'Gestão de Projetos (Scrum e Kanban)',
    description: 'Conheça metodologias ágeis fundamentais para organizar e acelerar o desenvolvimento de projetos. Entenda papéis, sprints, backlogs e fluxo de tarefas.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    category: 'negocios',
    level: 'Iniciante',
    rating: 4.7,
    students: 340,
    lessons: [
      { id: 'l26_1', courseId: 'c26', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l26_2', courseId: 'c26', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l26_3', courseId: 'c26', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l26_4', courseId: 'c26', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l26_5', courseId: 'c26', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c27',
    title: 'Gestão Empresarial',
    description: 'Uma introdução abrangente sobre a gestão de negócios, planeamento estratégico, controlo financeiro, marketing básico e gestão de pessoas.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    category: 'negocios',
    level: 'Intermédio',
    rating: 4.6,
    students: 220,
    lessons: [
      { id: 'l27_1', courseId: 'c27', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l27_2', courseId: 'c27', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l27_3', courseId: 'c27', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l27_4', courseId: 'c27', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l27_5', courseId: 'c27', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c28',
    title: 'Contabilidade Básica',
    description: 'Desmistifique a contabilidade financeira. Entenda ativos, passivos, capital próprio, demonstrações de resultados e balanços patrimoniais.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    category: 'negocios',
    level: 'Iniciante',
    rating: 4.5,
    students: 190,
    lessons: [
      { id: 'l28_1', courseId: 'c28', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l28_2', courseId: 'c28', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l28_3', courseId: 'c28', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l28_4', courseId: 'c28', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l28_5', courseId: 'c28', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c29',
    title: 'Análise de Negócios (Business Analysis)',
    description: 'Aprenda a analisar problemas, levantar requisitos, modelar processos de negócio e propor soluções de valor para as organizações.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    category: 'negocios',
    level: 'Intermédio',
    rating: 4.6,
    students: 210,
    lessons: [
      { id: 'l29_1', courseId: 'c29', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l29_2', courseId: 'c29', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l29_3', courseId: 'c29', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l29_4', courseId: 'c29', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l29_5', courseId: 'c29', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c42',
    title: 'Freelancing e Trabalho Remoto',
    description: 'Aprenda a trabalhar por conta própria e a colaborar à distância de forma profissional. Prospecção de clientes, precificação e gestão de rotina.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    category: 'negocios',
    level: 'Iniciante',
    rating: 4.6,
    students: 340,
    lessons: [
      { id: 'l42_1', courseId: 'c42', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=k8v5X0k6y_A', type: 'video', duration: '20 min' },
      { id: 'l42_2', courseId: 'c42', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=aG3m4YnE1H4', type: 'video', duration: '20 min' },
      { id: 'l42_3', courseId: 'c42', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1F2bA7Z2E8Y', type: 'video', duration: '20 min' },
      { id: 'l42_4', courseId: 'c42', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=t-L2C2x_1mU', type: 'video', duration: '20 min' },
      { id: 'l42_5', courseId: 'c42', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=QyO0w2G_Z04', type: 'video', duration: '20 min' },
    ]
  },

  // ─── CIÊNCIAS EXATAS ───
  {
    id: 'c9',
    title: 'Álgebra Linear Aplicada',
    description: 'Compreenda vetores, matrizes, transformações lineares e as suas aplicações em IA, gráficos 3D e resolução de sistemas.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    category: 'ciencias',
    level: 'Intermédio',
    rating: 4.6,
    students: 185,
    lessons: [
      { id: 'l9_1', courseId: 'c9', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=7h2Y9rW6gL0', type: 'video', duration: '20 min' },
      { id: 'l9_2', courseId: 'c9', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=4Ym4A9_Fw5g', type: 'video', duration: '20 min' },
      { id: 'l9_3', courseId: 'c9', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1Z2X_a6Z9a8', type: 'video', duration: '20 min' },
      { id: 'l9_4', courseId: 'c9', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=Z7D8W8VwL7k', type: 'video', duration: '20 min' },
      { id: 'l9_5', courseId: 'c9', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=5y2sQ8t0uV0', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c10',
    title: 'Estatística e Probabilidade',
    description: 'Aprenda a recolher, analisar e interpretar dados. Fundamentos de estatística descritiva e inferencial para tomada de decisões.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'ciencias',
    level: 'Iniciante',
    rating: 4.7,
    students: 260,
    lessons: [
      { id: 'l10_1', courseId: 'c10', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=7h2Y9rW6gL0', type: 'video', duration: '20 min' },
      { id: 'l10_2', courseId: 'c10', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=4Ym4A9_Fw5g', type: 'video', duration: '20 min' },
      { id: 'l10_3', courseId: 'c10', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1Z2X_a6Z9a8', type: 'video', duration: '20 min' },
      { id: 'l10_4', courseId: 'c10', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=Z7D8W8VwL7k', type: 'video', duration: '20 min' },
      { id: 'l10_5', courseId: 'c10', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=5y2sQ8t0uV0', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c32',
    title: 'Metodologia de Pesquisa Científica',
    description: 'Conceba investigações académicas com rigor. Aprenda a definir hipóteses, escolher metodologias quantitativas/qualitativas e citar fontes.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    category: 'ciencias',
    level: 'Intermédio',
    rating: 4.7,
    students: 310,
    lessons: [
      { id: 'l32_1', courseId: 'c32', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=7h2Y9rW6gL0', type: 'video', duration: '20 min' },
      { id: 'l32_2', courseId: 'c32', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=4Ym4A9_Fw5g', type: 'video', duration: '20 min' },
      { id: 'l32_3', courseId: 'c32', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1Z2X_a6Z9a8', type: 'video', duration: '20 min' },
      { id: 'l32_4', courseId: 'c32', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=Z7D8W8VwL7k', type: 'video', duration: '20 min' },
      { id: 'l32_5', courseId: 'c32', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=5y2sQ8t0uV0', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c45',
    title: 'Matemática Aplicada à Engenharia',
    description: 'Domine os conceitos matemáticos essenciais exigidos nas engenharias: funções de múltiplas variáveis, derivadas parciais e cálculo integral.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    category: 'ciencias',
    level: 'Avançado',
    rating: 4.6,
    students: 195,
    lessons: [
      { id: 'l45_1', courseId: 'c45', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=7h2Y9rW6gL0', type: 'video', duration: '20 min' },
      { id: 'l45_2', courseId: 'c45', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=4Ym4A9_Fw5g', type: 'video', duration: '20 min' },
      { id: 'l45_3', courseId: 'c45', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1Z2X_a6Z9a8', type: 'video', duration: '20 min' },
      { id: 'l45_4', courseId: 'c45', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=Z7D8W8VwL7k', type: 'video', duration: '20 min' },
      { id: 'l45_5', courseId: 'c45', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=5y2sQ8t0uV0', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c46',
    title: 'Física Básica para Engenharias',
    description: 'Estude as leis da física que sustentam a mecânica clássica: cinemática linear, dinâmica (leis de Newton), trabalho e energia.',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80',
    category: 'ciencias',
    level: 'Iniciante',
    rating: 4.5,
    students: 210,
    lessons: [
      { id: 'l46_1', courseId: 'c46', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=7h2Y9rW6gL0', type: 'video', duration: '20 min' },
      { id: 'l46_2', courseId: 'c46', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=4Ym4A9_Fw5g', type: 'video', duration: '20 min' },
      { id: 'l46_3', courseId: 'c46', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=1Z2X_a6Z9a8', type: 'video', duration: '20 min' },
      { id: 'l46_4', courseId: 'c46', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=Z7D8W8VwL7k', type: 'video', duration: '20 min' },
      { id: 'l46_5', courseId: 'c46', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=5y2sQ8t0uV0', type: 'video', duration: '20 min' },
    ]
  },

  // ─── COMUNICAÇÃO ───
  {
    id: 'c11',
    title: 'Inglês para o Mercado de Trabalho',
    description: 'Desenvolva o seu inglês profissional: vocabulário corporativo, comunicação em reuniões, emails formais e apresentações em inglês.',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
    category: 'comunicacao',
    level: 'Intermédio',
    rating: 4.8,
    students: 640,
    lessons: [
      { id: 'l11_1', courseId: 'c11', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=6v4Y5U6Z2pA', type: 'video', duration: '20 min' },
      { id: 'l11_2', courseId: 'c11', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5x6H7Z8x8y0', type: 'video', duration: '20 min' },
      { id: 'l11_3', courseId: 'c11', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6V_c9H7a9x4', type: 'video', duration: '20 min' },
      { id: 'l11_4', courseId: 'c11', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=9H7X9a6Z8y0', type: 'video', duration: '20 min' },
      { id: 'l11_5', courseId: 'c11', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=8Y7H7X9a6Z8', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c12',
    title: 'Oratória e Comunicação Eficaz',
    description: 'Supere o medo de falar em público. Aprenda técnicas de comunicação persuasiva, linguagem corporal e storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    category: 'comunicacao',
    level: 'Iniciante',
    rating: 4.9,
    students: 810,
    lessons: [
      { id: 'l12_1', courseId: 'c12', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=6v4Y5U6Z2pA', type: 'video', duration: '20 min' },
      { id: 'l12_2', courseId: 'c12', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5x6H7Z8x8y0', type: 'video', duration: '20 min' },
      { id: 'l12_3', courseId: 'c12', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6V_c9H7a9x4', type: 'video', duration: '20 min' },
      { id: 'l12_4', courseId: 'c12', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=9H7X9a6Z8y0', type: 'video', duration: '20 min' },
      { id: 'l12_5', courseId: 'c12', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=8Y7H7X9a6Z8', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c31',
    title: 'Escrita Académica',
    description: 'Aprenda a estruturar trabalhos científicos, teses e artigos. Domine as regras de formatação (APA, ABNT), coerência textual e redação neutra.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    category: 'comunicacao',
    level: 'Iniciante',
    rating: 4.5,
    students: 240,
    lessons: [
      { id: 'l31_1', courseId: 'c31', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=6v4Y5U6Z2pA', type: 'video', duration: '20 min' },
      { id: 'l31_2', courseId: 'c31', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5x6H7Z8x8y0', type: 'video', duration: '20 min' },
      { id: 'l31_3', courseId: 'c31', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6V_c9H7a9x4', type: 'video', duration: '20 min' },
      { id: 'l31_4', courseId: 'c31', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=9H7X9a6Z8y0', type: 'video', duration: '20 min' },
      { id: 'l31_5', courseId: 'c31', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=8Y7H7X9a6Z8', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c34',
    title: 'Comunicação Profissional',
    description: 'Domine a arte de redigir e-mails formais, criar relatórios de impacto e participar ativamente em reuniões de negócios.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    category: 'comunicacao',
    level: 'Iniciante',
    rating: 4.7,
    students: 390,
    lessons: [
      { id: 'l34_1', courseId: 'c34', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=6v4Y5U6Z2pA', type: 'video', duration: '20 min' },
      { id: 'l34_2', courseId: 'c34', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5x6H7Z8x8y0', type: 'video', duration: '20 min' },
      { id: 'l34_3', courseId: 'c34', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6V_c9H7a9x4', type: 'video', duration: '20 min' },
      { id: 'l34_4', courseId: 'c34', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=9H7X9a6Z8y0', type: 'video', duration: '20 min' },
      { id: 'l34_5', courseId: 'c34', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=8Y7H7X9a6Z8', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c40',
    title: 'LinkedIn e Marca Pessoal',
    description: 'Construa uma presença digital marcante. Aprenda a otimizar o seu perfil de LinkedIn, produzir conteúdos relevantes e expandir a sua rede de contactos profissional.',
    imageUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80',
    category: 'comunicacao',
    level: 'Iniciante',
    rating: 4.7,
    students: 490,
    lessons: [
      { id: 'l40_1', courseId: 'c40', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=6v4Y5U6Z2pA', type: 'video', duration: '20 min' },
      { id: 'l40_2', courseId: 'c40', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=5x6H7Z8x8y0', type: 'video', duration: '20 min' },
      { id: 'l40_3', courseId: 'c40', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6V_c9H7a9x4', type: 'video', duration: '20 min' },
      { id: 'l40_4', courseId: 'c40', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=9H7X9a6Z8y0', type: 'video', duration: '20 min' },
      { id: 'l40_5', courseId: 'c40', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=8Y7H7X9a6Z8', type: 'video', duration: '20 min' },
    ]
  },

  // ─── DESENVOLVIMENTO PESSOAL ───
  {
    id: 'c13',
    title: 'Produtividade e Gestão do Tempo',
    description: 'Aprenda a gerir o seu tempo de forma eficaz com técnicas comprovadas como Pomodoro, GTD, a matriz de Eisenhower e muito mais.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 920,
    lessons: [
      { id: 'l13_1', courseId: 'c13', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l13_2', courseId: 'c13', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l13_3', courseId: 'c13', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l13_4', courseId: 'c13', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l13_5', courseId: 'c13', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c14',
    title: 'Inteligência Emocional na Prática',
    description: 'Desenvolva a sua inteligência emocional para melhorar as suas relações, lidar com o stress e tomar decisões mais conscientes.',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.9,
    students: 1050,
    lessons: [
      { id: 'l14_1', courseId: 'c14', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l14_2', courseId: 'c14', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l14_3', courseId: 'c14', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l14_4', courseId: 'c14', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l14_5', courseId: 'c14', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c16',
    title: 'Internet e Ferramentas de Produtividade (Google Drive, Notion)',
    description: 'Organize seu fluxo de trabalho e projetos online. Crie espaços de colaboração inteligentes e armazene informações com o Google Workspace e o Notion.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.7,
    students: 280,
    lessons: [
      { id: 'l16_1', courseId: 'c16', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l16_2', courseId: 'c16', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l16_3', courseId: 'c16', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l16_4', courseId: 'c16', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l16_5', courseId: 'c16', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c30',
    title: 'Técnicas de Estudo e Aprendizagem',
    description: 'Aprenda a aprender de forma eficiente. Estude métodos de memorização, mapas mentais, técnica de Feynman e a prática distribuída.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.9,
    students: 580,
    lessons: [
      { id: 'l30_1', courseId: 'c30', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l30_2', courseId: 'c30', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l30_3', courseId: 'c30', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l30_4', courseId: 'c30', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l30_5', courseId: 'c30', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c33',
    title: 'Pensamento Crítico e Resolução de Problemas',
    description: 'Desenvolva a capacidade de questionar premissas, avaliar dados de forma neutra e resolver problemas complexos com lógica estruturada.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 430,
    lessons: [
      { id: 'l33_1', courseId: 'c33', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l33_2', courseId: 'c33', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l33_3', courseId: 'c33', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l33_4', courseId: 'c33', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l33_5', courseId: 'c33', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c35',
    title: 'Trabalho em Equipa',
    description: 'Aprenda a colaborar e alcançar objetivos comuns em equipas multidisciplinares. Princípios de empatia profissional, divisão de tarefas e apoio mútuo.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 480,
    lessons: [
      { id: 'l35_1', courseId: 'c35', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l35_2', courseId: 'c35', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l35_3', courseId: 'c35', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l35_4', courseId: 'c35', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l35_5', courseId: 'c35', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c36',
    title: 'Liderança',
    description: 'Descubra como inspirar equipas e orientar projetos para o sucesso. Aprenda liderança situacional, delegação eficaz e comunicação inspiradora.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Intermédio',
    rating: 4.9,
    students: 510,
    lessons: [
      { id: 'l36_1', courseId: 'c36', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l36_2', courseId: 'c36', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l36_3', courseId: 'c36', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l36_4', courseId: 'c36', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l36_5', courseId: 'c36', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c37',
    title: 'Resolução de Conflitos',
    description: 'Aprenda a lidar com divergências em contextos profissionais e pessoais de forma calma, construtiva e focada em soluções ganha-ganha.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Intermédio',
    rating: 4.6,
    students: 270,
    lessons: [
      { id: 'l37_1', courseId: 'c37', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l37_2', courseId: 'c37', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l37_3', courseId: 'c37', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l37_4', courseId: 'c37', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l37_5', courseId: 'c37', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c38',
    title: 'Criação de CV Profissional',
    description: 'Aprenda a escrever e desenhar um currículo moderno e otimizado que chame a atenção dos recrutadores e passe em sistemas automáticos ATS.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 640,
    lessons: [
      { id: 'l38_1', courseId: 'c38', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l38_2', courseId: 'c38', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l38_3', courseId: 'c38', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l38_4', courseId: 'c38', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l38_5', courseId: 'c38', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c39',
    title: 'Preparação para Entrevistas',
    description: 'Supere a ansiedade nas entrevistas de emprego. Aprenda a estruturar respostas usando o método STAR e simule cenários comuns.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 580,
    lessons: [
      { id: 'l39_1', courseId: 'c39', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l39_2', courseId: 'c39', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l39_3', courseId: 'c39', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l39_4', courseId: 'c39', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l39_5', courseId: 'c39', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
  {
    id: 'c41',
    title: 'Como Conseguir Estágio',
    description: 'Um guia prático para entrar no mercado. Aprenda a pesquisar oportunidades, abordar empresas por iniciativa própria e destacar potencial acadêmico.',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    category: 'desenvolvimento',
    level: 'Iniciante',
    rating: 4.8,
    students: 520,
    lessons: [
      { id: 'l41_1', courseId: 'c41', title: 'Aula 1 do curso', contentUrl: 'https://www.youtube.com/watch?v=2x8X6Y7Z9H0', type: 'video', duration: '20 min' },
      { id: 'l41_2', courseId: 'c41', title: 'Aula 2 do curso', contentUrl: 'https://www.youtube.com/watch?v=7H8X9Y7Z6a4', type: 'video', duration: '20 min' },
      { id: 'l41_3', courseId: 'c41', title: 'Aula 3 do curso', contentUrl: 'https://www.youtube.com/watch?v=6Z8X7Y9H5a4', type: 'video', duration: '20 min' },
      { id: 'l41_4', courseId: 'c41', title: 'Aula 4 do curso', contentUrl: 'https://www.youtube.com/watch?v=5Y6Z8X7Y9H4', type: 'video', duration: '20 min' },
      { id: 'l41_5', courseId: 'c41', title: 'Aula 5 do curso', contentUrl: 'https://www.youtube.com/watch?v=4X5Y6Z8X7Y9', type: 'video', duration: '20 min' },
    ]
  },
];

const INITIAL_QUIZZES: Quiz[] = [
  { id: 'q1', courseId: 'c1', questions: [
    { id: 'q1_1', text: 'O que é o Virtual DOM?', options: ['Uma cópia leve do DOM real', 'Um novo navegador', 'Uma linguagem de programação', 'Uma base de dados'], correctOptionIndex: 0 },
    { id: 'q1_2', text: 'Qual hook usamos para gerir estado local?', options: ['useEffect', 'useState', 'useContext', 'useRef'], correctOptionIndex: 1 },
    { id: 'q1_3', text: 'O que são props no React?', options: ['Dados internos do componente', 'Dados passados de pai para filho', 'Funções especiais do React', 'Estilos CSS'], correctOptionIndex: 1 },
  ]},
  { id: 'q2', courseId: 'c2', questions: [
    { id: 'q2_1', text: 'O que faz o DNS?', options: ['Encripta dados', 'Converte domínios em IPs', 'Aumenta a velocidade da internet', 'Bloqueia vírus'], correctOptionIndex: 1 },
    { id: 'q2_2', text: 'Qual protocolo adiciona segurança ao HTTP?', options: ['FTP', 'SMTP', 'HTTPS', 'TCP'], correctOptionIndex: 2 },
  ]},
  { id: 'q3', courseId: 'c3', questions: [
    { id: 'q3_1', text: 'O que é phishing?', options: ['Um virus', 'Uma tentativa de roubar dados por engano', 'Um tipo de firewall', 'Um protocolo de rede'], correctOptionIndex: 1 },
    { id: 'q3_2', text: 'O que é autenticação de dois fatores (2FA)?', options: ['Duas passwords', 'Verificação com dois métodos diferentes', 'Login em dois dispositivos', 'Encriptação dupla'], correctOptionIndex: 1 },
  ]},
  { id: 'q4', courseId: 'c4', questions: [
    { id: 'q4_1', text: 'Quais são os 4 princípios CRAP do design?', options: ['Contraste, Repetição, Alinhamento, Proximidade', 'Cor, Ritmo, Arte, Perspetiva', 'Criatividade, Realismo, Arte, Padrão', 'Clareza, Ritmo, Ação, Proporção'], correctOptionIndex: 0 },
    { id: 'q4_2', text: 'O que é UX?', options: ['Design visual de uma interface', 'Experiência geral do utilizador com um produto', 'Programação de interfaces', 'Sistema de grelhas'], correctOptionIndex: 1 },
  ]},
  { id: 'q5', courseId: 'c5', questions: [
    { id: 'q5_1', text: 'O que caracteriza um bom logótipo?', options: ['Ser complexo e detalhado', 'Ser simples, memorável e versátil', 'Ter muitas cores', 'Ser sempre quadrado'], correctOptionIndex: 1 },
  ]},
  { id: 'q6', courseId: 'c6', questions: [
    { id: 'q6_1', text: 'O que é SEO?', options: ['Software de edição de vídeo', 'Otimização para motores de busca', 'Publicidade paga online', 'Uma rede social'], correctOptionIndex: 1 },
    { id: 'q6_2', text: 'Qual é o objetivo do email marketing?', options: ['Enviar spam', 'Comunicar com a audiência de forma direta e personalizada', 'Criar anúncios pagos', 'Aumentar o SEO'], correctOptionIndex: 1 },
  ]},
  { id: 'q7', courseId: 'c7', questions: [
    { id: 'q7_1', text: 'O que é um MVP?', options: ['O melhor produto do mercado', 'Produto Mínimo Viável para validação', 'Produto mais caro', 'Versão final do produto'], correctOptionIndex: 1 },
    { id: 'q7_2', text: 'Para que serve o Business Model Canvas?', options: ['Gerir finanças', 'Mapear os 9 blocos essenciais de um negócio', 'Criar campanhas de marketing', 'Recrutar colaboradores'], correctOptionIndex: 1 },
  ]},
  { id: 'q8', courseId: 'c8', questions: [
    { id: 'q8_1', text: 'O que é o método 50/30/20?', options: ['Taxa de juro', 'Distribuição do orçamento: necessidades/desejos/poupança', 'Percentagem de imposto', 'Regra de investimento'], correctOptionIndex: 1 },
  ]},
  { id: 'q9', courseId: 'c9', questions: [
    { id: 'q9_1', text: 'O que é uma matriz?', options: ['Um tipo de vetor', 'Uma tabela de números que representa uma transformação linear', 'Um conjunto de equações', 'Um número complexo'], correctOptionIndex: 1 },
  ]},
  { id: 'q10', courseId: 'c10', questions: [
    { id: 'q10_1', text: 'O que é a média aritmética?', options: ['O valor mais frequente', 'O valor central ordenado', 'A soma dividida pelo número de elementos', 'O maior valor menos o menor'], correctOptionIndex: 2 },
    { id: 'q10_2', text: 'O que mede o p-valor num teste de hipóteses?', options: ['A média dos dados', 'A probabilidade de obter os dados se a hipótese nula for verdadeira', 'O desvio padrão', 'O tamanho da amostra'], correctOptionIndex: 1 },
  ]},
  { id: 'q11', courseId: 'c11', questions: [
    { id: 'q11_1', text: 'Qual é uma fórmula de abertura formal em inglês?', options: ['Hey there!', 'Dear Sir/Madam,', 'What\'s up?', 'Hello friend,'], correctOptionIndex: 1 },
  ]},
  { id: 'q12', courseId: 'c12', questions: [
    { id: 'q12_1', text: 'Que percentagem da comunicação é não-verbal?', options: ['7%', '25%', 'mais de 55%', '100%'], correctOptionIndex: 2 },
    { id: 'q12_2', text: 'O que é storytelling?', options: ['Contar histórias para captar atenção e criar ligação emocional', 'Técnica de memorização', 'Tipo de discurso formal', 'Método de escrita académica'], correctOptionIndex: 0 },
  ]},
  { id: 'q13', courseId: 'c13', questions: [
    { id: 'q13_1', text: 'Quanto tempo tem um bloco de trabalho na técnica Pomodoro?', options: ['10 minutos', '25 minutos', '45 minutos', '1 hora'], correctOptionIndex: 1 },
    { id: 'q13_2', text: 'O que é a Matriz de Eisenhower?', options: ['Uma ferramenta de memorização', 'Uma técnica de respiração', 'Uma ferramenta para priorizar tarefas por urgência e importância', 'Um método de tomada de notas'], correctOptionIndex: 2 },
  ]},
  { id: 'q14', courseId: 'c14', questions: [
    { id: 'q14_1', text: 'Quem popularizou o conceito de Inteligência Emocional?', options: ['Sigmund Freud', 'Albert Einstein', 'Daniel Goleman', 'Stephen Covey'], correctOptionIndex: 2 },
    { id: 'q14_2', text: 'O que é empatia?', options: ['Controlar as emoções', 'Colocar-se no lugar do outro e compreender as suas emoções', 'Ser sempre positivo', 'Ignorar as emoções negativas'], correctOptionIndex: 1 },
  ]},
  { id: 'q15', courseId: 'c15', questions: [
    { id: 'q15_1', text: 'Qual destas é a folha de cálculo da Microsoft?', options: ['Word', 'PowerPoint', 'Excel', 'Access'], correctOptionIndex: 2 },
    { id: 'q15_2', text: 'Para que serve o Word?', options: ['Fazer contas', 'Escrever textos/documentos', 'Criar slides', 'Desenhar imagens'], correctOptionIndex: 1 },
  ]},
  { id: 'q17', courseId: 'c17', questions: [
    { id: 'q17_1', text: 'O que é um algoritmo?', options: ['Uma linguagem de programação', 'Uma sequência de passos ordenados para resolver um problema', 'Um tipo de computador', 'Uma base de dados'], correctOptionIndex: 1 },
  ]},
  { id: 'q18', courseId: 'c18', questions: [
    { id: 'q18_1', text: 'Qual tag define a estrutura principal de um documento HTML?', options: ['<body>', '<head>', '<html>', '<p>'], correctOptionIndex: 2 },
  ]},
  { id: 'q19', courseId: 'c19', questions: [
    { id: 'q19_1', text: 'Qual comando cria commits salvando as alterações localmente?', options: ['git add', 'git push', 'git commit', 'git pull'], correctOptionIndex: 2 },
  ]},
  { id: 'q20', courseId: 'c20', questions: [
    { id: 'q20_1', text: 'Qual comando SQL busca dados numa tabela?', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], correctOptionIndex: 2 },
  ]},
  { id: 'q21', courseId: 'c21', questions: [
    { id: 'q21_1', text: 'O que é o Front-end?', options: ['A base de dados', 'A parte visível do site com a qual o utilizador interage', 'O código do servidor', 'A configuração de rede'], correctOptionIndex: 1 },
  ]},
  { id: 'q22', courseId: 'c22', questions: [
    { id: 'q22_1', text: 'O React Native é um framework para que tipo de desenvolvimento?', options: ['Web', 'Mobile Híbrido', 'Desktop', 'Back-end'], correctOptionIndex: 1 },
  ]},
  { id: 'q23', courseId: 'c23', questions: [
    { id: 'q23_1', text: 'Qual destas é uma metodologia ágil?', options: ['Cascata', 'Espiral', 'Scrum', 'V-Model'], correctOptionIndex: 2 },
  ]},
  { id: 'q24', courseId: 'c24', questions: [
    { id: 'q24_1', text: 'O que é aprendizagem supervisionada em Machine Learning?', options: ['Treino sem dados históricos', 'Treino usando dados previamente rotulados', 'IA programada manualmente', 'Algoritmo de rede de internet'], correctOptionIndex: 1 },
  ]},
  { id: 'q25', courseId: 'c25', questions: [
    { id: 'q25_1', text: 'Onde fazemos a modelagem visual avançada de dados?', options: ['Power BI', 'Word', 'PowerPoint', 'Notepad'], correctOptionIndex: 0 },
  ]},
  { id: 'q26', courseId: 'c26', questions: [
    { id: 'q26_1', text: 'No Scrum, quem gere o Product Backlog?', options: ['Scrum Master', 'Product Owner', 'Developers', 'Diretoria'], correctOptionIndex: 1 },
  ]},
  { id: 'q27', courseId: 'c27', questions: [
    { id: 'q27_1', text: 'O que avalia a Análise SWOT?', options: ['O código fonte', 'Forças, Fraquezas, Oportunidades e Ameaças', 'O lucro diário', 'O número de clientes por hora'], correctOptionIndex: 1 },
  ]},
  { id: 'q28', courseId: 'c28', questions: [
    { id: 'q28_1', text: 'Qual destas é a equação básica da contabilidade?', options: ['Ativo = Passivo - Capital', 'Ativo = Passivo + Capital Próprio', 'Passivo = Ativo + Capital', 'Ativo = Capital Próprio - Passivo'], correctOptionIndex: 1 },
  ]},
  { id: 'q29', courseId: 'c29', questions: [
    { id: 'q29_1', text: 'O que significa BPMN?', options: ['Business Project Management Network', 'Business Process Model and Notation', 'Basic Program Model Network', 'Business Plan Model Notation'], correctOptionIndex: 1 },
  ]},
  { id: 'q30', courseId: 'c30', questions: [
    { id: 'q30_1', text: 'Qual o princípio básico da Técnica de Feynman?', options: ['Decorar o livro', 'Explicar o conceito de forma simples para consolidar a aprendizagem', 'Fazer resumos extensos', 'Estudar à noite'], correctOptionIndex: 1 },
  ]},
  { id: 'q31', courseId: 'c31', questions: [
    { id: 'q31_1', text: 'O que serve para creditar autores no texto?', options: ['Metáfora', 'Citação académica', 'Nota de rodapé informal', 'Parágrafo solto'], correctOptionIndex: 1 },
  ]},
  { id: 'q32', courseId: 'c32', questions: [
    { id: 'q32_1', text: 'O que define a hipótese numa pesquisa?', options: ['A conclusão final', 'Uma resposta provisória ao problema da pesquisa', 'O orçamento gasto', 'A introdução teórica'], correctOptionIndex: 1 },
  ]},
  { id: 'q33', courseId: 'c33', questions: [
    { id: 'q33_1', text: 'O que é o viés de confirmação?', options: ['Pesquisa neutra de dados', 'Procurar e valorizar informação que confirme as nossas próprias opiniões', 'Aprender lógica de computadores', 'Resolução racional de conflitos'], correctOptionIndex: 1 },
  ]},
  { id: 'q34', courseId: 'c34', questions: [
    { id: 'q34_1', text: 'Como deve ser o tom de um email profissional?', options: ['Informal e gírias', 'Formal, claro e respeitoso', 'Agressivo para cobrar respostas', 'Muito longo e com detalhes desnecessários'], correctOptionIndex: 1 },
  ]},
  { id: 'q35', courseId: 'c35', questions: [
    { id: 'q35_1', text: 'Qual o pilar do trabalho em equipa?', options: ['Isolamento individual', 'Comunicação e colaboração mútua', 'Competição destrutiva', 'Dividir sem partilhar feedback'], correctOptionIndex: 1 },
  ]},
  { id: 'q36', courseId: 'c36', questions: [
    { id: 'q36_1', text: 'Delegar tarefas significa:', options: ['Ignorar o projeto', 'Distribuir responsabilidades de forma clara e orientada', 'Fazer tudo sozinho', 'Culpar a equipa por erros'], correctOptionIndex: 1 },
  ]},
  { id: 'q37', courseId: 'c37', questions: [
    { id: 'q37_1', text: 'Na resolução integradora de conflitos, procura-se:', options: ['Que um ganhe e outro perca', 'Uma solução ganha-ganha baseada em interesses', 'Ignorar a outra parte', 'Adiar a conversa para sempre'], correctOptionIndex: 1 },
  ]},
  { id: 'q38', courseId: 'c38', questions: [
    { id: 'q38_1', text: 'O que é ATS no recrutamento?', options: ['Uma rede social', 'Sistemas automáticos de triagem de currículos', 'Um teste de lógica', 'Uma folha de cálculo'], correctOptionIndex: 1 },
  ]},
  { id: 'q39', courseId: 'c39', questions: [
    { id: 'q39_1', text: 'O que significa o S no Método STAR?', options: ['Segurança', 'Situação', 'Solução', 'Sucesso'], correctOptionIndex: 1 },
  ]},
  { id: 'q40', courseId: 'c40', questions: [
    { id: 'q40_1', text: 'Qual é o foco principal da rede LinkedIn?', options: ['Entretenimento e vídeos engraçados', 'Carreira, marca pessoal e conexões profissionais', 'Venda direta de produtos de consumo', 'Partilha de fotos pessoais'], correctOptionIndex: 1 },
  ]},
  { id: 'q41', courseId: 'c41', questions: [
    { id: 'q41_1', text: 'O que é uma candidatura espontânea?', options: ['Candidatar-se a uma vaga aberta', 'Abordar uma empresa demonstrando interesse mesmo sem vagas públicas abertas', 'Um estágio obrigatório', 'Um processo de entrevista de emprego coletivo'], correctOptionIndex: 1 },
  ]},
  { id: 'q42', courseId: 'c42', questions: [
    { id: 'q42_1', text: 'Trabalho remoto refere-se a:', options: ['Trabalhar apenas no escritório', 'Trabalhar à distância usando ferramentas digitais', 'Trabalhar por turnos', 'Estágio sem remuneração'], correctOptionIndex: 1 },
  ]},
  { id: 'q43', courseId: 'c43', questions: [
    { id: 'q43_1', text: 'Qual o objetivo principal do portfólio?', options: ['Listar certificados', 'Apresentar processos e soluções reais de projetos desenvolvidos', 'Mostrar fotos pessoais', 'Escrever um currículo de texto longo'], correctOptionIndex: 1 },
  ]},
  { id: 'q44', courseId: 'c44', questions: [
    { id: 'q44_1', text: 'Quais os dois componentes centrais para processamento e execução?', options: ['Fones de ouvido e teclado', 'CPU e Memória RAM', 'Monitor e Rato', 'Impressora e Scanner'], correctOptionIndex: 1 },
  ]},
  { id: 'q45', courseId: 'c45', questions: [
    { id: 'q45_1', text: 'Derivada parcial analisa a variação de uma função em relação a:', options: ['Todas as variáveis simultaneamente', 'Uma única variável, mantendo as outras constantes', 'Nenhuma variável', 'Constante absoluta'], correctOptionIndex: 1 },
  ]},
  { id: 'q46', courseId: 'c46', questions: [
    { id: 'q46_1', text: 'Qual das Leis de Newton trata do Princípio da Ação e Reação?', options: ['1ª Lei', '2ª Lei', '3ª Lei', 'Lei da Gravitação'], correctOptionIndex: 2 },
  ]},
  { id: 'q47', courseId: 'c47', questions: [
    { id: 'q47_1', text: 'Qual a função da paginação na gestão de memória?', options: ['Organizar arquivos em pastas', 'Mapear endereços lógicos dos programas em blocos na memória física', 'Acelerar o processador', 'Fazer backups automáticos do sistema'], correctOptionIndex: 1 },
  ]},
];

class MockDBService {
  private isStorageAvailable = false;
  private memoryStorage: Record<string, string> = {};

  constructor() {
    try {
      localStorage.setItem('__storage_test__', 'test');
      localStorage.removeItem('__storage_test__');
      this.isStorageAvailable = true;
    } catch (e) {
      console.warn('LocalStorage is disabled or blocked. Falling back to memory storage.', e);
      this.isStorageAvailable = false;
    }
    this.init();
  }

  private getItem(key: string): string | null {
    if (this.isStorageAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return this.memoryStorage[key] || null;
      }
    }
    return this.memoryStorage[key] || null;
  }

  private setItem(key: string, value: string): void {
    if (this.isStorageAvailable) {
      try {
        localStorage.setItem(key, value);
        return;
      } catch (e) {
        // Fall back to memory on error (e.g. quota exceeded)
      }
    }
    this.memoryStorage[key] = value;
  }

  private init() {
    // Always refresh courses and quizzes to latest data
    this.setItem('courses', JSON.stringify(INITIAL_COURSES));
    this.setItem('quizzes', JSON.stringify(INITIAL_QUIZZES));
    if (!this.getItem('users')) this.setItem('users', JSON.stringify([]));
    if (!this.getItem('enrollments')) this.setItem('enrollments', JSON.stringify([]));
    if (!this.getItem('results')) this.setItem('results', JSON.stringify([]));
    if (!this.getItem('certificates')) this.setItem('certificates', JSON.stringify([]));
  }

  // Courses
  getCourses(): Course[] {
    return JSON.parse(this.getItem('courses') || '[]');
  }

  getCourse(id: string): Course | undefined {
    return this.getCourses().find(c => c.id === id);
  }

  getCoursesByCategory(category: string): Course[] {
    return this.getCourses().filter(c => c.category === category);
  }

  // Enrollments
  getEnrollments(userId: string): Enrollment[] {
    return JSON.parse(this.getItem('enrollments') || '[]').filter((e: Enrollment) => e.userId === userId);
  }

  getEnrollment(userId: string, courseId: string): Enrollment | undefined {
    return this.getEnrollments(userId).find(e => e.courseId === courseId);
  }

  enrollUser(userId: string, courseId: string): Enrollment {
    const enrollments = JSON.parse(this.getItem('enrollments') || '[]');
    const existing = enrollments.find((e: Enrollment) => e.userId === userId && e.courseId === courseId);
    if (existing) {
      if (existing.quizAttempts === undefined) {
        existing.quizAttempts = 0;
        this.setItem('enrollments', JSON.stringify(enrollments));
      }
      return existing;
    }

    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      completedLessons: [],
      progress: 0,
      completed: false,
      quizAttempts: 0
    };
    enrollments.push(newEnrollment);
    this.setItem('enrollments', JSON.stringify(enrollments));
    return newEnrollment;
  }

  markLessonComplete(userId: string, courseId: string, lessonId: string) {
    const enrollments = JSON.parse(this.getItem('enrollments') || '[]');
    const course = this.getCourse(courseId);
    if (!course) return;

    const index = enrollments.findIndex((e: Enrollment) => e.userId === userId && e.courseId === courseId);
    if (index !== -1) {
      const enrollment = enrollments[index];
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }
      enrollment.progress = Math.round((enrollment.completedLessons.length / course.lessons.length) * 100);
      if (enrollment.progress === 100) enrollment.completed = true;
      this.setItem('enrollments', JSON.stringify(enrollments));
    }
  }

  incrementQuizAttempts(userId: string, courseId: string): number {
    const enrollments = JSON.parse(this.getItem('enrollments') || '[]');
    const index = enrollments.findIndex((e: Enrollment) => e.userId === userId && e.courseId === courseId);
    if (index !== -1) {
      const enrollment = enrollments[index];
      enrollment.quizAttempts = (enrollment.quizAttempts || 0) + 1;
      this.setItem('enrollments', JSON.stringify(enrollments));
      return enrollment.quizAttempts;
    }
    return 0;
  }

  resetCourseProgress(userId: string, courseId: string) {
    const enrollments = JSON.parse(this.getItem('enrollments') || '[]');
    const index = enrollments.findIndex((e: Enrollment) => e.userId === userId && e.courseId === courseId);
    if (index !== -1) {
      const enrollment = enrollments[index];
      enrollment.completedLessons = [];
      enrollment.progress = 0;
      enrollment.completed = false;
      enrollment.quizAttempts = 0;
      this.setItem('enrollments', JSON.stringify(enrollments));
    }
  }

  // Quizzes & Results
  getQuiz(courseId: string): Quiz | undefined {
    const quizzes = JSON.parse(this.getItem('quizzes') || '[]');
    let quiz = quizzes.find((q: Quiz) => q.courseId === courseId);
    
    // Auto-generate up to 15 questions if needed for the new UI
    if (quiz) {
      if (quiz.questions && quiz.questions.length > 0 && quiz.questions.length < 15) {
         const baseQuestion = quiz.questions[0];
         for (let i = quiz.questions.length; i < 15; i++) {
           quiz.questions.push({
             id: `${quiz.id}_q${i+1}`,
             text: `${baseQuestion?.text || 'Pergunta'} (Variante ${i+1})`,
             options: baseQuestion?.options || ['A', 'B', 'C', 'D'],
             correctOptionIndex: baseQuestion?.correctOptionIndex || 0
           });
         }
      }
      return quiz;
    }
    return undefined;
  }

  saveQuizResult(userId: string, courseId: string, score: number) {
    const results = JSON.parse(this.getItem('results') || '[]');
    const passed = score === 100;
    const result: QuizResult = {
      id: Math.random().toString(36).substr(2, 9),
      userId, courseId, score, passed
    };
    // Replace any old result for same course
    const filtered = results.filter((r: QuizResult) => !(r.userId === userId && r.courseId === courseId));
    filtered.push(result);
    this.setItem('results', JSON.stringify(filtered));
    if (passed) this.generateCertificate(userId, courseId);
    return result;
  }

  getQuizResult(userId: string, courseId: string): QuizResult | undefined {
    const results = JSON.parse(this.getItem('results') || '[]');
    return results.find((r: QuizResult) => r.userId === userId && r.courseId === courseId);
  }

  // Certificates
  generateCertificate(userId: string, courseId: string) {
    const certs = JSON.parse(this.getItem('certificates') || '[]');
    const existing = certs.find((c: Certificate) => c.userId === userId && c.courseId === courseId);
    if (existing) return;
    const cert: Certificate = {
      id: Math.random().toString(36).substr(2, 9),
      userId, courseId,
      issueDate: new Date().toISOString()
    };
    certs.push(cert);
    this.setItem('certificates', JSON.stringify(certs));
  }

  getCertificate(userId: string, courseId: string): Certificate | undefined {
    const certs = JSON.parse(this.getItem('certificates') || '[]');
    return certs.find((c: Certificate) => c.userId === userId && c.courseId === courseId);
  }

  getUserCertificates(userId: string): Certificate[] {
    return JSON.parse(this.getItem('certificates') || '[]').filter((c: Certificate) => c.userId === userId);
  }
}

export const db = new MockDBService();






