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
      { id: 'l1_1', courseId: 'c1', title: 'O que é React e Virtual DOM?', contentUrl: 'React é uma biblioteca JavaScript para criar interfaces. O Virtual DOM é uma representação leve do DOM real que permite atualizações eficientes.', type: 'text', duration: '12 min' },
      { id: 'l1_2', courseId: 'c1', title: 'Criando o seu Primeiro Componente', contentUrl: 'Componentes são blocos de construção reutilizáveis no React. Aprenda a criar componentes funcionais com JSX.', type: 'text', duration: '18 min' },
      { id: 'l1_3', courseId: 'c1', title: 'Estado e Props', contentUrl: 'O estado (state) guarda dados que mudam ao longo do tempo. As props permitem passar dados entre componentes pai e filho.', type: 'text', duration: '20 min' },
      { id: 'l1_4', courseId: 'c1', title: 'Hooks: useState e useEffect', contentUrl: 'Os Hooks revolucionaram o React. useState gere estado local e useEffect lida com efeitos colaterais como chamadas a APIs.', type: 'text', duration: '25 min' },
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
      { id: 'l2_1', courseId: 'c2', title: 'Como a Internet Funciona', contentUrl: 'A internet é uma rede global de computadores interligados. Dados viajam em pacotes através de routers e switches.', type: 'text', duration: '15 min' },
      { id: 'l2_2', courseId: 'c2', title: 'Protocolos HTTP e HTTPS', contentUrl: 'HTTP é o protocolo de comunicação na web. HTTPS adiciona uma camada de segurança usando SSL/TLS para encriptar os dados.', type: 'text', duration: '20 min' },
      { id: 'l2_3', courseId: 'c2', title: 'Endereçamento IP e DNS', contentUrl: 'Cada dispositivo tem um endereço IP único. O DNS funciona como uma agenda telefónica que converte nomes de domínio em endereços IP.', type: 'text', duration: '18 min' },
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
      { id: 'l3_1', courseId: 'c3', title: 'O que é Cibersegurança?', contentUrl: 'Cibersegurança é a prática de proteger sistemas, redes e programas contra ataques digitais, danos e acessos não autorizados.', type: 'text', duration: '10 min' },
      { id: 'l3_2', courseId: 'c3', title: 'Tipos de Ataques Comuns', contentUrl: 'Phishing, Ransomware, SQL Injection e DDoS são alguns dos ataques mais frequentes. Aprenda a identificá-los e preveni-los.', type: 'text', duration: '22 min' },
      { id: 'l3_3', courseId: 'c3', title: 'Boas Práticas de Segurança Digital', contentUrl: 'Use passwords fortes, autenticação de dois fatores, mantenha o software atualizado e faça backups regulares dos seus dados.', type: 'text', duration: '15 min' },
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
      { id: 'l15_1', courseId: 'c15', title: 'Processamento de Texto com Word', contentUrl: 'Aprenda a estruturar documentos, aplicar estilos, margens, tabelas e cabeçalhos profissionais no Microsoft Word.', type: 'text', duration: '15 min' },
      { id: 'l15_2', courseId: 'c15', title: 'Fórmulas e Gráficos no Excel', contentUrl: 'Introdução às folhas de cálculo. Aprenda a utilizar fórmulas matemáticas básicas (SOMA, MÉDIA), tabelas e criação de gráficos explicativos.', type: 'text', duration: '22 min' },
      { id: 'l15_3', courseId: 'c15', title: 'Apresentações Eficazes com PowerPoint', contentUrl: 'Princípios de design de diapositivos. Como estruturar uma apresentação comercial ou académica usando templates, animações discretas e transições.', type: 'text', duration: '18 min' },
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
      { id: 'l17_1', courseId: 'c17', title: 'O que são Algoritmos?', contentUrl: 'Um algoritmo é uma sequência passo-a-passo de instruções para resolver um problema. Entenda a importância da lógica antes do código.', type: 'text', duration: '14 min' },
      { id: 'l17_2', courseId: 'c17', title: 'Estruturas de Decisão e Repetição', contentUrl: 'Domine o uso de blocos condicionais (SE/SENÃO) e ciclos (PARA/ENQUANTO) para controlar o fluxo de execução dos seus programas.', type: 'text', duration: '20 min' },
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
      { id: 'l18_1', courseId: 'c18', title: 'Estruturando a Web com HTML', contentUrl: 'Entenda a estrutura das tags HTML, cabeçalhos, parágrafos, listas, links, imagens e formulários.', type: 'text', duration: '16 min' },
      { id: 'l18_2', courseId: 'c18', title: 'Estilizando e Formatando com CSS', contentUrl: 'Aprenda seletores, modelo de caixa (box model), cores, fontes, alinhamento e as bases de layouts flexíveis com Flexbox.', type: 'text', duration: '20 min' },
      { id: 'l18_3', courseId: 'c18', title: 'Introdução às Variáveis e Funções em JS', contentUrl: 'Como ligar scripts ao HTML, manipular variáveis simples e detetar eventos do utilizador (como cliques de botões) com JS.', type: 'text', duration: '22 min' },
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
      { id: 'l19_1', courseId: 'c19', title: 'O que é Controlo de Versões?', contentUrl: 'Entenda os problemas que o Git resolve. Aprenda a inicializar um repositório, verificar o estado e fazer commits.', type: 'text', duration: '12 min' },
      { id: 'l19_2', courseId: 'c19', title: 'Trabalhando com Branches e GitHub', contentUrl: 'Crie ramificações para novas funcionalidades, resolva conflitos de fusão e envie o seu código local para o GitHub.', type: 'text', duration: '18 min' },
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
      { id: 'l20_1', courseId: 'c20', title: 'Introdução ao Modelo Relacional', contentUrl: 'O que são tabelas, colunas, chaves primárias e estrangeiras. Entenda o papel de um SGBD.', type: 'text', duration: '15 min' },
      { id: 'l20_2', courseId: 'c20', title: 'Escrevendo Consultas com SQL', contentUrl: 'Aprenda a filtrar dados com WHERE, ordenar com ORDER BY e juntar tabelas correlacionadas utilizando INNER JOIN.', type: 'text', duration: '25 min' },
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
      { id: 'l21_1', courseId: 'c21', title: 'Consumo de APIs no Front-end', contentUrl: 'Aprenda a fazer requisições HTTP (GET, POST) assíncronas do navegador para obter dados dinâmicos.', type: 'text', duration: '18 min' },
      { id: 'l21_2', courseId: 'c21', title: 'Estruturação Básica de um Servidor Back-end', contentUrl: 'Entenda como configurar rotas, requisições de clientes e retornar respostas no formato JSON.', type: 'text', duration: '24 min' },
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
      { id: 'l22_1', courseId: 'c22', title: 'Mobile Nativo vs. Híbrido', contentUrl: 'Explore as diferenças de desempenho, custos de desenvolvimento e recursos de acesso ao hardware do smartphone.', type: 'text', duration: '15 min' },
      { id: 'l22_2', courseId: 'c22', title: 'Componentes Visuais de Apps', contentUrl: 'Como renderizar botões, listas com scroll infinito e gerir a navegação entre diferentes ecrãs do app.', type: 'text', duration: '20 min' },
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
      { id: 'l23_1', courseId: 'c23', title: 'Ciclos de Vida de Desenvolvimento (SDLC)', contentUrl: 'Explore o modelo cascata clássico e entenda por que o modelo de desenvolvimento ágil iterativo tornou-se o padrão da indústria.', type: 'text', duration: '16 min' },
      { id: 'l23_2', courseId: 'c23', title: 'Arquitetura e Boas Práticas', contentUrl: 'Conceitos de acoplamento, coesão, clean code, padrões de projeto arquitetónicos e pirâmide de testes de software.', type: 'text', duration: '20 min' },
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
      { id: 'l24_1', courseId: 'c24', title: 'O que é Aprendizagem Automática (Machine Learning)?', contentUrl: 'Entenda a diferença entre programação tradicional baseada em regras e modelos matemáticos de IA que aprendem com dados históricos.', type: 'text', duration: '18 min' },
      { id: 'l24_2', courseId: 'c24', title: 'IA Generativa e Modelos de Linguagem', contentUrl: 'Explore o funcionamento dos Grandes Modelos de Linguagem (LLMs), conceitos de tokens, transformadores e engenharia de prompts.', type: 'text', duration: '22 min' },
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
      { id: 'l25_1', courseId: 'c25', title: 'Fórmulas Avançadas no Excel', contentUrl: 'Automatize tarefas complexas combinando funções lógicas e de procura (SE, PROCV, ÍNDICE, CORRESP).', type: 'text', duration: '20 min' },
      { id: 'l25_2', courseId: 'c25', title: 'Modelagem de Dados e Relatórios no Power BI', contentUrl: 'Carregue bases de dados de múltiplas origens, faça limpezas no Power Query e crie painéis executivos visuais.', type: 'text', duration: '25 min' },
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
      { id: 'l44_1', courseId: 'c44', title: 'Arquitetura de Computadores Simplificada', contentUrl: 'Como a CPU, RAM, barramentos de dados e discos rígidos cooperam para interpretar instruções binárias básicas.', type: 'text', duration: '16 min' },
      { id: 'l44_2', courseId: 'c44', title: 'Compilação e Sistemas Complexos', contentUrl: 'Entenda o ciclo desde a escrita em código de alto nível até a compilação e execução no processador.', type: 'text', duration: '20 min' },
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
      { id: 'l47_1', courseId: 'c47', title: 'Gestão de Processos e Escalonamento', contentUrl: 'Entenda como o CPU executa múltiplos programas fingindo simultaneidade por meio de algoritmos de escalonamento.', type: 'text', duration: '18 min' },
      { id: 'l47_2', courseId: 'c47', title: 'Memória Virtual e Paginação', contentUrl: 'Compreenda como o sistema operativo mapeia espaços de endereços lógicos dos programas para a memória física.', type: 'text', duration: '22 min' },
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
      { id: 'l4_1', courseId: 'c4', title: 'Fundamentos de UI: Contraste, Alinhamento e Espaço', contentUrl: 'Os 4 princípios básicos de design visual: Contraste, Repetição, Alinhamento e Proximidade (C.R.A.P). Aprenda a aplicá-los.', type: 'text', duration: '15 min' },
      { id: 'l4_2', courseId: 'c4', title: 'Tipografia e Hierarquia Visual', contentUrl: 'A tipografia é uma das ferramentas mais poderosas do designer. Aprenda a escolher fontes, definir tamanhos e criar hierarquia visual.', type: 'text', duration: '20 min' },
      { id: 'l4_3', courseId: 'c4', title: 'Teoria das Cores', contentUrl: 'As cores evocam emoções e comunicam mensagens. Compreenda o círculo cromático, complementares e como construir paletas coesas.', type: 'text', duration: '18 min' },
      { id: 'l4_4', courseId: 'c4', title: 'Prototipagem com Figma', contentUrl: 'Figma é a ferramenta de design mais popular. Aprenda a criar wireframes, protótipos clicáveis e sistemas de design colaborativos.', type: 'text', duration: '30 min' },
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
      { id: 'l5_1', courseId: 'c5', title: 'Introdução ao Design Gráfico', contentUrl: 'Design gráfico é a arte de comunicar visualmente. Explore a história, os elementos básicos e as ferramentas do design gráfico moderno.', type: 'text', duration: '12 min' },
      { id: 'l5_2', courseId: 'c5', title: 'Criação de Logótipos', contentUrl: 'Um bom logótipo é simples, memorável e versátil. Aprenda o processo de criação: briefing, esboços, digitalização e refinamento.', type: 'text', duration: '25 min' },
      { id: 'l5_3', courseId: 'c5', title: 'Identidade Visual e Branding', contentUrl: 'A identidade visual vai além do logótipo. Inclui paleta de cores, tipografia, tom de voz e todos os pontos de contacto com o cliente.', type: 'text', duration: '20 min' },
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
      { id: 'l43_1', courseId: 'c43', title: 'Selecionando os Melhores Projetos', contentUrl: 'Curadoria é chave. É preferível mostrar 3 grandes projetos com processos detalhados do que 10 projetos simples.', type: 'text', duration: '14 min' },
      { id: 'l43_2', courseId: 'c43', title: 'Estruturando um Case Study Irresistível', contentUrl: 'Descreva o problema, o seu papel, o processo (pesquisa, rascunhos, protótipos), a solução final e os resultados obtidos.', type: 'text', duration: '20 min' },
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
      { id: 'l6_1', courseId: 'c6', title: 'O Ecossistema do Marketing Digital', contentUrl: 'Marketing digital abrange SEO, SEM, redes sociais, email marketing, marketing de conteúdo e mais. Aprenda como cada canal se complementa.', type: 'text', duration: '15 min' },
      { id: 'l6_2', courseId: 'c6', title: 'SEO: Otimização para Motores de Busca', contentUrl: 'SEO é o conjunto de técnicas para aparecer nos primeiros resultados do Google organicamente. Palavras-chave, conteúdo e backlinks são essenciais.', type: 'text', duration: '25 min' },
      { id: 'l6_3', courseId: 'c6', title: 'Estratégia de Redes Sociais', contentUrl: 'Cada rede social tem um público e formato diferente. Aprenda a criar uma estratégia eficaz para Instagram, LinkedIn e outras plataformas.', type: 'text', duration: '20 min' },
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
      { id: 'l7_1', courseId: 'c7', title: 'Mindset Empreendedor', contentUrl: 'Empreender exige resiliência, foco no cliente e tolerância ao risco. Aprenda a cultivar o mindset certo para os desafios da jornada empreendedora.', type: 'text', duration: '14 min' },
      { id: 'l7_2', courseId: 'c7', title: 'Validação de Ideias e Business Model Canvas', contentUrl: 'Antes de construir, valide. O Business Model Canvas ajuda a mapear os 9 blocos essenciais de qualquer negócio de forma visual e iterativa.', type: 'text', duration: '28 min' },
      { id: 'l7_3', courseId: 'c7', title: 'Criação de um MVP (Produto Mínimo Viável)', contentUrl: 'Um MVP permite lançar mais rápido, com menos recursos. Aprenda a definir as funcionalidades essenciais e recolher feedback real do mercado.', type: 'text', duration: '22 min' },
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
      { id: 'l8_1', courseId: 'c8', title: 'Como Criar o Seu Orçamento Pessoal', contentUrl: 'Um orçamento é a base da saúde financeira. Aprenda o método 50/30/20 e como registar e categorizar as suas despesas mensais.', type: 'text', duration: '16 min' },
      { id: 'l8_2', courseId: 'c8', title: 'A Arte de Poupar: Hábitos e Estratégias', contentUrl: 'Poupar é um hábito, não um luxo. Descubra estratégias práticas para reduzir despesas desnecessárias e criar uma reserva de emergência.', type: 'text', duration: '18 min' },
      { id: 'l8_3', courseId: 'c8', title: 'Introdução ao Investimento', contentUrl: 'Investir faz o seu dinheiro trabalhar para si. Conheça os princípios básicos de ações, obrigações, fundos de investimento e outros instrumentos financeiros.', type: 'text', duration: '24 min' },
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
      { id: 'l26_1', courseId: 'c26', title: 'Estruturação do Scrum: Papéis e Sprints', contentUrl: 'Explore as funções de Product Owner, Scrum Master e Equipa de Desenvolvimento. Aprenda a planear e rever sprints organizados.', type: 'text', duration: '16 min' },
      { id: 'l26_2', courseId: 'c26', title: 'Gestão Visual e Métricas com Kanban', contentUrl: 'Entenda os conceitos de colunas (To Do, Doing, Done), limites de Trabalho em Progresso (WIP) e lead time.', type: 'text', duration: '18 min' },
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
      { id: 'l27_1', courseId: 'c27', title: 'Planeamento Estratégico e SWOT', contentUrl: 'Aprenda a mapear Forças, Fraquezas, Oportunidades e Ameaças para orientar os objetivos de curto e longo prazo de uma empresa.', type: 'text', duration: '18 min' },
      { id: 'l27_2', courseId: 'c27', title: 'Fluxo de Caixa e Finanças de Negócio', contentUrl: 'Compreenda a diferença entre lucro e fluxo de caixa, ponto de equilíbrio financeiro e gestão de despesas fixas.', type: 'text', duration: '22 min' },
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
      { id: 'l28_1', courseId: 'c28', title: 'A Equação Fundamental da Contabilidade', contentUrl: 'Compreenda por que Ativo é sempre igual a Passivo mais Capital Próprio. Noções sobre partidas dobradas.', type: 'text', duration: '15 min' },
      { id: 'l28_2', courseId: 'c28', title: 'Lendo uma Demonstração de Resultados', contentUrl: 'Aprenda a analisar receitas, custos de produtos vendidos, despesas operacionais e cálculo de resultado líquido.', type: 'text', duration: '20 min' },
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
      { id: 'l29_1', courseId: 'c29', title: 'O Papel do Analista de Negócios', contentUrl: 'Compreenda a ponte entre as áreas técnica (TI) e estratégica (Negócio). Métodos de levantamento de requisitos de stakeholders.', type: 'text', duration: '16 min' },
      { id: 'l29_2', courseId: 'c29', title: 'Modelagem de Processos com BPMN', contentUrl: 'Como documentar fluxos de trabalho visuais usando notações padrão para identificar gargalos e otimizar processos.', type: 'text', duration: '22 min' },
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
      { id: 'l42_1', courseId: 'c42', title: 'Precificação e Prospecção de Clientes', contentUrl: 'Aprenda a calcular a sua taxa horária ou preço por projeto e as melhores plataformas para encontrar projetos remotos.', type: 'text', duration: '18 min' },
      { id: 'l42_2', courseId: 'c42', title: 'Organização e Disciplina Remota', contentUrl: 'Como manter o foco em casa, gerir múltiplos clientes e criar barreiras saudáveis entre a vida pessoal e profissional.', type: 'text', duration: '15 min' },
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
      { id: 'l9_1', courseId: 'c9', title: 'Vetores e Espaços Vetoriais', contentUrl: 'Um vetor é uma entidade matemática com magnitude e direção. Os espaços vetoriais são a base da álgebra linear moderna e das suas aplicações.', type: 'text', duration: '20 min' },
      { id: 'l9_2', courseId: 'c9', title: 'Matrizes e Operações', contentUrl: 'Matrizes são tabelas de números que representam transformações lineares. Aprenda adição, subtração, multiplicação e inversão de matrizes.', type: 'text', duration: '28 min' },
      { id: 'l9_3', courseId: 'c9', title: 'Determinantes e Sistemas Lineares', contentUrl: 'O determinante indica se uma matriz é invertível. Resolva sistemas de equações lineares usando eliminação de Gauss e a Regra de Cramer.', type: 'text', duration: '25 min' },
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
      { id: 'l10_1', courseId: 'c10', title: 'Estatística Descritiva: Média, Moda e Mediana', contentUrl: 'As medidas de tendência central (média, moda, mediana) descrevem o centro de uma distribuição de dados. Aprenda quando usar cada uma.', type: 'text', duration: '18 min' },
      { id: 'l10_2', courseId: 'c10', title: 'Distribuições e Probabilidade', contentUrl: 'A probabilidade mede a chance de um evento ocorrer. A distribuição normal (curva de Gauss) é a mais importante em estatística.', type: 'text', duration: '22 min' },
      { id: 'l10_3', courseId: 'c10', title: 'Testes de Hipóteses', contentUrl: 'Testes de hipóteses permitem tirar conclusões sobre populações a partir de amostras. Compreenda o p-valor e os erros tipo I e II.', type: 'text', duration: '26 min' },
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
      { id: 'l32_1', courseId: 'c32', title: 'O Método Científico e Problematização', contentUrl: 'Estruture o seu projeto de pesquisa: defina o problema, objetivos específicos e hipóteses mensuráveis.', type: 'text', duration: '18 min' },
      { id: 'l32_2', courseId: 'c32', title: 'Métodos e Fontes de Coleta de Dados', contentUrl: 'Compreenda a diferença entre estudos empíricos qualitativos e quantitativos e o uso ético de questionários e amostragens.', type: 'text', duration: '22 min' },
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
      { id: 'l45_1', courseId: 'c45', title: 'Cálculo Diferencial de Várias Variáveis', contentUrl: 'Aprenda derivadas parciais, vetor gradiente e como encontrar pontos de máximo e mínimo locais em funções tridimensionais.', type: 'text', duration: '22 min' },
      { id: 'l45_2', courseId: 'c45', title: 'Integrais Duplas e Triplas', contentUrl: 'Entenda como calcular volumes sob superfícies e aplicar coordenadas polares na simplificação de integrais complexas.', type: 'text', duration: '28 min' },
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
      { id: 'l46_1', courseId: 'c46', title: 'Cinemática Tridimensional e Vetorial', contentUrl: 'Aprenda a descrever a posição, velocidade e aceleração de objetos no espaço tridimensional com coordenadas cartesianas.', type: 'text', duration: '16 min' },
      { id: 'l46_2', courseId: 'c46', title: 'Leis de Newton e Forças Comuns', contentUrl: 'Aprofunde as 3 leis de Newton, força gravítica, atrito estático/dinâmico e diagramas de corpo livre.', type: 'text', duration: '20 min' },
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
      { id: 'l11_1', courseId: 'c11', title: 'Vocabulário Profissional em Inglês', contentUrl: 'Domine o vocabulário essencial para ambientes corporativos: reuniões, negociações, relatórios e comunicação com clientes internacionais.', type: 'text', duration: '20 min' },
      { id: 'l11_2', courseId: 'c11', title: 'Emails Formais em Inglês', contentUrl: 'Aprenda a estrutura de um email profissional em inglês: abertura, corpo, fecho e fórmulas de cortesia para diferentes contextos.', type: 'text', duration: '18 min' },
      { id: 'l11_3', courseId: 'c11', title: 'Apresentações e Reuniões em Inglês', contentUrl: 'Como conduzir e participar em reuniões e apresentações em inglês com confiança. Fraseologia útil para diferentes situações profissionais.', type: 'text', duration: '24 min' },
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
      { id: 'l12_1', courseId: 'c12', title: 'Superar o Medo de Falar em Público', contentUrl: 'O medo de falar em público é um dos mais comuns. Aprenda técnicas de respiração, preparação e visualização para ganhar confiança.', type: 'text', duration: '15 min' },
      { id: 'l12_2', courseId: 'c12', title: 'Linguagem Corporal e Postura', contentUrl: 'Mais de 55% da comunicação é não-verbal. A postura, gestos, expressão facial e contacto visual transmitem confiança e credibilidade.', type: 'text', duration: '20 min' },
      { id: 'l12_3', courseId: 'c12', title: 'A Arte do Storytelling', contentUrl: 'As histórias captam a atenção e criam ligações emocionais. Aprenda a estruturar narrativas envolventes para apresentações e discursos.', type: 'text', duration: '22 min' },
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
      { id: 'l31_1', courseId: 'c31', title: 'Estruturação do Texto Académico', contentUrl: 'Introdução, desenvolvimento e conclusão. Aprenda a formular argumentos lógicos e a ligar parágrafos de forma fluida.', type: 'text', duration: '16 min' },
      { id: 'l31_2', courseId: 'c31', title: 'Citações e Referências Bibliográficas', contentUrl: 'Como citar autores diretamente ou indiretamente no corpo do texto para evitar plágio académico.', type: 'text', duration: '18 min' },
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
      { id: 'l34_1', courseId: 'c34', title: 'Etiqueta de E-mails Corporativos', contentUrl: 'Como escrever de forma concisa, definir assuntos claros, escolher o tom certo e utilizar saudações formais adequadas.', type: 'text', duration: '15 min' },
      { id: 'l34_2', courseId: 'c34', title: 'Preparando Relatórios Sintéticos', contentUrl: 'Aprenda a estruturar sumários executivos, destacar dados principais e sugerir recomendações para a administração.', type: 'text', duration: '18 min' },
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
      { id: 'l40_1', courseId: 'c40', title: 'Otimizando o seu Perfil no LinkedIn', contentUrl: 'Aprenda a escrever um título focado em soluções, construir um resumo cativante e destacar as suas experiências de forma estratégica.', type: 'text', duration: '18 min' },
      { id: 'l40_2', courseId: 'c40', title: 'Produção de Conteúdo e Networking', contentUrl: 'Escreva artigos que demonstrem autoridade, interaja com líderes do seu setor e envie mensagens personalizadas de conexão.', type: 'text', duration: '15 min' },
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
      { id: 'l13_1', courseId: 'c13', title: 'A Técnica Pomodoro', contentUrl: 'A técnica Pomodoro consiste em trabalhar 25 minutos em foco total, seguidos de 5 minutos de pausa. Este ciclo melhora a concentração e reduz a fadiga mental.', type: 'text', duration: '12 min' },
      { id: 'l13_2', courseId: 'c13', title: 'A Matriz de Eisenhower: Urgente vs. Importante', contentUrl: 'A matriz de Eisenhower divide as tarefas em 4 quadrantes: urgente/importante, não urgente/importante, urgente/não importante, e o que eliminar.', type: 'text', duration: '16 min' },
      { id: 'l13_3', courseId: 'c13', title: 'GTD: Getting Things Done', contentUrl: 'O método GTD de David Allen ajuda a capturar, clarificar, organizar, rever e executar todas as suas tarefas de forma sistemática e sem stress.', type: 'text', duration: '20 min' },
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
      { id: 'l14_1', courseId: 'c14', title: 'O que é Inteligência Emocional?', contentUrl: 'Inteligência emocional (IE) é a capacidade de reconhecer, compreender e gerir as nossas emoções e as dos outros. Daniel Goleman identificou 5 componentes chave da IE.', type: 'text', duration: '14 min' },
      { id: 'l14_2', courseId: 'c14', title: 'Auto-consciência e Auto-regulação', contentUrl: 'A auto-consciência é o pilar da IE. Aprenda técnicas de mindfulness e reflexão para conhecer os seus gatilhos emocionais e responder em vez de reagir.', type: 'text', duration: '18 min' },
      { id: 'l14_3', courseId: 'c14', title: 'Empatia e Habilidades Sociais', contentUrl: 'A empatia é a capacidade de se colocar no lugar do outro. Desenvolva esta competência para construir relações mais saudáveis e colaborativas.', type: 'text', duration: '20 min' },
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
      { id: 'l16_1', courseId: 'c16', title: 'Armazenamento e Colaboração no Google Drive', contentUrl: 'Aprenda a partilhar pastas, definir privilégios de acesso e colaborar em tempo real em Documentos e Folhas de cálculo Google.', type: 'text', duration: '14 min' },
      { id: 'l16_2', courseId: 'c16', title: 'Criando Espaços e Bancos de Dados no Notion', contentUrl: 'Entenda o conceito de blocos, crie páginas organizadas, listas de tarefas dinâmicas e bases de dados com múltiplas visualizações.', type: 'text', duration: '20 min' },
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
      { id: 'l30_1', courseId: 'c30', title: 'Mapas Mentais e Resumos Ativos', contentUrl: 'Como esquematizar conceitos visualmente para reter ideias complexas de forma associativa e rápida.', type: 'text', duration: '15 min' },
      { id: 'l30_2', courseId: 'c30', title: 'A Técnica de Feynman', contentUrl: 'Aprenda a explicar qualquer assunto complexo numa linguagem extremamente simples para consolidar as suas próprias lacunas de conhecimento.', type: 'text', duration: '18 min' },
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
      { id: 'l33_1', courseId: 'c33', title: 'Evitando Vieses Cognitivos', contentUrl: 'Entenda os principais erros mentais sistemáticos de pensamento (confirmação, heurística de disponibilidade) que afetam as tomadas de decisões.', type: 'text', duration: '16 min' },
      { id: 'l33_2', courseId: 'c33', title: 'Métodos para Análise de Problemas', contentUrl: 'Aplique a técnica dos 5 Porquês para encontrar a causa raiz de um problema e a técnica de brainstorming estruturado.', type: 'text', duration: '18 min' },
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
      { id: 'l35_1', courseId: 'c35', title: 'Segurança Psicológica em Grupos', contentUrl: 'Aprenda a importância de criar um ambiente onde todos se sintam seguros para expor ideias sem receio de retaliação.', type: 'text', duration: '15 min' },
      { id: 'l35_2', courseId: 'c35', title: 'Responsabilidade Compartilhada', contentUrl: 'Como gerir tarefas conjuntas, evitar sobrecarregar colegas e fornecer feedbacks construtivos durante projetos.', type: 'text', duration: '16 min' },
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
      { id: 'l36_1', courseId: 'c36', title: 'Liderança Situacional vs. Autoritária', contentUrl: 'Compreenda os diferentes estilos de liderança e como adaptar a sua postura ao nível de maturidade da equipa.', type: 'text', duration: '18 min' },
      { id: 'l36_2', courseId: 'c36', title: 'Delegação e Empoderamento (Delegating)', contentUrl: 'Aprenda a confiar e delegar tarefas operacionais de forma estruturada para focar no planeamento estratégico.', type: 'text', duration: '20 min' },
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
      { id: 'l37_1', courseId: 'c37', title: 'Identificando Fontes de Conflitos', contentUrl: 'Os conflitos são normais. Podem surgir por falta de recursos, desalinhamento de objetivos ou falha na comunicação. Identifique para tratar.', type: 'text', duration: '16 min' },
      { id: 'l37_2', courseId: 'c37', title: 'Negociação Integradora (Ganha-Ganha)', contentUrl: 'Aprenda a focar nos interesses das partes e não nas posições, criando opções de benefício mútuo em disputas.', type: 'text', duration: '20 min' },
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
      { id: 'l38_1', courseId: 'c38', title: 'Estruturando Seções de Impacto', contentUrl: 'O que incluir nas informações de contacto, resumo, experiência de trabalho e formação académica. A ordem cronológica inversa.', type: 'text', duration: '14 min' },
      { id: 'l38_2', courseId: 'c38', title: 'Palavras-chave e Adequação ao ATS', contentUrl: 'Como ler anúncios de vagas para identificar palavras-chave essenciais e incluí-las no currículo de forma fluida.', type: 'text', duration: '18 min' },
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
      { id: 'l39_1', courseId: 'c39', title: 'Respondendo a Perguntas Comportamentais', contentUrl: 'Aprenda a utilizar o Método STAR (Situação, Tarefa, Ação, Resultado) para estruturar respostas sobre desafios passados.', type: 'text', duration: '18 min' },
      { id: 'l39_2', courseId: 'c39', title: 'Linguagem Corporal e Etiqueta', contentUrl: 'Fatores de impacto em entrevistas online e presenciais: contacto visual, tom de voz, roupas e perguntas inteligentes para o entrevistador.', type: 'text', duration: '16 min' },
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
      { id: 'l41_1', courseId: 'c41', title: 'Onde Procurar Oportunidades', contentUrl: 'Plataformas de recrutamento, feiras de emprego universitárias e portais corporativos de carreiras.', type: 'text', duration: '15 min' },
      { id: 'l41_2', courseId: 'c41', title: 'Envio de Candidatura Espontânea', contentUrl: 'Como redigir uma carta de motivação curta e atraente e abordar recrutadores diretamente por email.', type: 'text', duration: '16 min' },
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
    if (existing) return existing;

    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      completedLessons: [],
      progress: 0,
      completed: false
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

  // Quizzes & Results
  getQuiz(courseId: string): Quiz | undefined {
    const quizzes = JSON.parse(this.getItem('quizzes') || '[]');
    return quizzes.find((q: Quiz) => q.courseId === courseId);
  }

  saveQuizResult(userId: string, courseId: string, score: number) {
    const results = JSON.parse(this.getItem('results') || '[]');
    const passed = score >= 50;
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
