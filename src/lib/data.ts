export type Experience = {
  period: string
  years: string
  company: string
  role: string
  description: string
  highlights: string[]
  stack: string[]
  current?: boolean
}

export const experiences: Experience[] = [
  {
    period: 'Dez 2025 — atual',
    years: '0–1',
    company: 'LEVTY',
    role: 'Engenheiro de Software',
    description:
      'Consultoria de implementação da plataforma SYDLE ONE, transformando fluxos jurídicos e comerciais manuais em um ecossistema digital integrado.',
    highlights: [
      'Traduziu requisitos de negócio em modelos BPMN e especificações técnicas para reestruturar processos jurídicos e comerciais.',
      'Construiu uma camada de computação stateless sobre Elasticsearch, processando mais de 1M de registros para estimativas em tempo real de recuperação de ISSQN cruzando dados municipais e do Banco Central.',
      'Desenvolveu middlewares orientados a eventos em JavaScript e integrações de pagamento via SFTP com o Itaú, automatizando o envio e recebimento de arquivos financeiros.',
      'Parte ativa da equipe que estabeleceu o uso de agentes de IA como prática padrão do time, sugerindo novas aplicações e incorporando IA ao processo de desenvolvimento e à revisão de código.',
    ],
    stack: ['SYDLE ONE', 'JavaScript', 'Elasticsearch', 'BPMN', 'SFTP', 'IA aplicada'],
    current: true,
  },
  {
    period: 'Mai 2024 — Dez 2025',
    years: '1,7',
    company: 'Vetta Tecnologia S.A. (SMSGroup)',
    role: 'Estagiário de Engenharia de Software',
    description:
      'Produtos de simulação industrial (Viridis Dynamics e Viridis Dispatch) para otimização de custos e produção de plantas industriais, com foco em sustentabilidade.',
    highlights: [
      'Substituiu um modelo de monitoramento por polling a cada 5 segundos por comunicação em tempo real com WebSocket e Kafka.',
      'Desenvolveu componentes reutilizáveis para as bibliotecas internas de design system da empresa.',
      'Implementou funcionalidades end-to-end, incluindo validação visual de modelos de simulação com React Flow.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Kafka', 'PostgreSQL', 'RTL', 'Jest'],
  },
  {
    period: 'Jul 2022 — Mai 2024',
    years: '1,10',
    company: 'Amitran Mudanças',
    role: 'Desenvolvedor Fullstack',
    description:
      'Primeira experiência profissional, unindo tecnologia e operação logística real ainda durante a faculdade.',
    highlights: [
      'Desenvolveu um sistema de monitoramento de rotas que aumentou em 15% a reutilização de transportes.',
      'Automatizou processos manuais de planejamento e agendamento logístico.',
      'Traduziu necessidades operacionais complexas em soluções de software escaláveis.',
    ],
    stack: ['React', 'Styled Components', 'Spring Boot', 'Docker', 'MySQL'],
  },
]

export type SkillGroup = {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Styled Components', 'React Flow'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Java', 'Spring Boot', 'Python (básico)'],
  },
  {
    label: 'Dados & Mensageria',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'Kafka'],
  },
  {
    label: 'Infra & Qualidade',
    items: ['Docker', 'Git', 'CI/CD', 'Jest', 'React Testing Library', 'Scrum/Kanban'],
  },
  {
    label: 'IA aplicada',
    items: ['LangChain', 'LangGraph', 'RAG', 'Engenharia de Prompt', 'APIs de LLMs', 'Spec-Driven Development'],
  },
]

export const aiPillars = [
  {
    title: 'Agentes como prática de equipe',
    description:
      'Parte da equipe que estabeleceu o uso de agentes de IA como prática padrão na LEVTY, sugerindo novas aplicações — não como modismo, mas como parte real do fluxo de entrega.',
  },
  {
    title: 'Revisão de código assistida',
    description:
      'Usa IA para elevar a qualidade do código, não só a velocidade: revisão assistida como camada extra antes do merge.',
  },
  {
    title: 'RAG e agentes com LangChain/LangGraph',
    description:
      'Constrói pipelines de recuperação aumentada e orquestração de agentes para automatizar tarefas complexas de negócio.',
  },
  {
    title: 'Spec-Driven Development',
    description:
      'Especificações claras que guiam tanto humanos quanto agentes de IA — a ponte entre engenharia de software sólida e IA aplicada de verdade.',
  },
]

export const beyondCode = [
  {
    title: 'Hackathons & projetos pessoais',
    description:
      'Participa de hackathons e constrói projetos pessoais para explorar tecnologias novas fora do escopo do trabalho diário.',
  },
  {
    title: 'Mentoria',
    description:
      'Ajuda estagiários e desenvolvedores menos experientes a crescer, compartilhando conhecimento e guiando através de problemas desafiadores.',
  },
  {
    title: 'Jiu-jitsu — faixa azul',
    description:
      'Leva a mesma paixão por ensinar para o tatame: treina e ensina iniciantes, ajudando-os a evoluir e ganhar confiança.',
  },
  {
    title: 'Inglês fluente',
    description:
      'Já trabalhou em times 100% em inglês, com fluência tanto para conversas técnicas quanto para documentação.',
  },
]

export const hackathonPhotos = [
  '/hackathon-team.jpg',
  '/hackathon-pitch.jpg',
  '/hackathon-demo.jpg',
  '/hackathon-panel.jpg',
  '/hackathon-audience.jpg',
]

export const contact = {
  email: 'devrebula@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vitor-rebula-nogueira-b80465260/',
  github: 'https://github.com/vitorrebula',
  location: 'Brasil',
}
