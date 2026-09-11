import type { Locale } from "./config";

export interface Dictionary {
  nav: {
    services: string;
    about: string;
    skills: string;
    work: string;
    testimonials: string;
    contact: string;
    cta: string;
    languageLabel: string;
    primaryLabel: string;
  };
  reach: {
    eyebrow: string;
    title: string;
    intro: string;
    americas: string;
    europe: string;
    asiaPacific: string;
    brazil: string;
    spain: string;
    mexico: string;
    unitedStates: string;
    canada: string;
    argentina: string;
    uruguay: string;
    chile: string;
    peru: string;
    colombia: string;
    unitedKingdom: string;
    germany: string;
    denmark: string;
    poland: string;
    japan: string;
    australia: string;
  };
  hero: {
    availability: string;
    headline1: string;
    headline2: string;
    headline3: string;
    promiseLabel: string;
    promiseTime: string;
    promiseDeadlines: string;
    promiseComms: string;
    ctaWork: string;
    ctaContact: string;
    intro: string;
  };
  heroVisual: {
    agent: string;
    active: string;
    newLead: string;
    channel: string;
    justNow: string;
    intent: string;
    match: string;
    systems: string;
    synced: string;
    connected: string;
    healthy: string;
    run: string;
    executed: string;
    stepClassify: string;
    stepMatch: string;
    stepSync: string;
    stepNotify: string;
    caption: string;
  };
  stats: {
    projects: string;
    years: string;
    customers: string;
    countries: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    intro: string;
    coreFocus: string;
    backendTitle: string;
    backendBody: string;
    frontendTitle: string;
    frontendBody: string;
    aiTitle: string;
    aiBody: string;
    businessTitle: string;
    businessBody: string;
    mobileTitle: string;
    mobileBody: string;
    cloudTitle: string;
    cloudBody: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    aiTitle: string;
    aiBody: string;
    webTitle: string;
    webBody: string;
    mobileTitle: string;
    mobileBody: string;
    backendTitle: string;
    backendBody: string;
    odooTitle: string;
    odooBody: string;
    nocodeTitle: string;
    nocodeBody: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    portraitAlt: string;
    role: string;
    workHeading: string;
    work1Title: string;
    work1Body: string;
    work2Title: string;
    work2Body: string;
    work3Title: string;
    work3Body: string;
    work4Title: string;
    work4Body: string;
  };
  work: {
    eyebrow: string;
    title: string;
    filterAll: string;
    companySite: string;
    playStore: string;
    projectFiles: string;
    tryBot: string;
    prevProject: string;
    nextProject: string;
  };
  categories: {
    ai: string;
    web: string;
    mobile: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    emailLabel: string;
    whatsappLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    hintIdle: string;
    hintSent: string;
    hintFailed: string;
    failedAction: string;
    /** "{name}" is substituted with whatever the visitor typed. */
    mailSubject: string;
  };
  footer: {
    builtWith: string;
  };
  meta: {
    title: string;
  };
}

const en: Dictionary = {
  nav: {
    services: "Services",
    about: "About",
    skills: "Skills",
    work: "Work",
    testimonials: "Testimonials",
    contact: "Contact",
    cta: "Let's talk",
    languageLabel: "Change language",
    primaryLabel: "Sections",
  },
  reach: {
    eyebrow: "Where I work",
    title: "Clients on four continents.",
    intro:
      "I work directly in English, Portuguese and Spanish, so briefs, calls and handover documents happen in whichever one the client is comfortable with.",
    americas: "Americas",
    europe: "Europe",
    asiaPacific: "Asia & Pacific",
    brazil: "Brazil",
    spain: "Spain",
    mexico: "Mexico",
    unitedStates: "United States",
    canada: "Canada",
    argentina: "Argentina",
    uruguay: "Uruguay",
    chile: "Chile",
    peru: "Peru",
    colombia: "Colombia",
    unitedKingdom: "United Kingdom",
    germany: "Germany",
    denmark: "Denmark",
    poland: "Poland",
    japan: "Japan",
    australia: "Australia",
  },
  hero: {
    availability: "Available for new projects",
    headline1: "I build [complex]",
    headline2: "software systems",
    headline3: "to last [and] [scale]",
    promiseLabel: "I promise to you",
    promiseTime: "Your time saved",
    promiseDeadlines: "Tech issues fixed",
    promiseComms: "Your business grows",
    ctaWork: "See my work",
    ctaContact: "Get in touch",
    intro: "Full-stack and AI engineer with twelve years behind me. I build AI agents, automation, SaaS platforms, backends and mobile apps, and the integrations that hold them together.",
  },
  heroVisual: {
    agent: "AI Lead Agent",
    active: "Active",
    newLead: "New lead received",
    channel: "WhatsApp",
    justNow: "just now",
    intent: "Intent score",
    match: "Property match",
    systems: "Connected systems",
    synced: "Synced",
    connected: "Connected",
    healthy: "Healthy",
    run: "Automation run",
    executed: "Executed",
    stepClassify: "Classify intent",
    stepMatch: "Match inventory",
    stepSync: "Sync to CRM",
    stepNotify: "Notify agent",
    caption: "Illustration: an AI agent qualifying a WhatsApp enquiry and syncing it to a CRM",
  },
  stats: {
    projects: "Completed Projects",
    years: "Years of Experience",
    customers: "Global Customers",
    countries: "Countries Clients Served",
  },
  skills: {
    eyebrow: "Tech stack",
    title: "Skills.",
    intro:
      "The tools I reach for, grouped by the part of the build they belong to.",
    coreFocus: "Core focus",
    backendTitle: "Backend",
    backendBody:
      "APIs, databases, queues and the services behind them, in Node.js and Python, built to stay predictable as the load grows.",
    frontendTitle: "Frontend",
    frontendBody:
      "Responsive interfaces in React and Next.js, typed end to end, styled in Tailwind or Sass, and pushed further with WebGL where a page needs to do more than sit still.",
    aiTitle: "AI Agents & Automation",
    aiBody:
      "Agents that hold a real conversation, call your own tools, answer from your data with retrieval, and pass a hot lead to a person at the right moment.",
    businessTitle: "Business & Delivery",
    businessBody:
      "ERP implementation, no-code builds and the tools a project is actually run and tracked in day to day.",
    mobileTitle: "Mobile",
    mobileBody:
      "Cross-platform apps for iOS and Android from one codebase, in React Native or Flutter, from the first screen to the store listing.",
    cloudTitle: "Cloud & Data",
    cloudBody:
      "Hosting, storage and the managed services that keep it all running, on AWS, Azure or Google Cloud depending on where you already are.",
  },
  services: {
    eyebrow: "What I do",
    title: "Services.",
    intro:
      "Over 150 projects delivered for founders and teams who needed something built properly the first time.",
    aiTitle: "AI Agents & Automation",
    aiBody:
      "WhatsApp and chat agents, document and OCR pipelines, lead scoring and outbound automation, built on OpenAI, Gemini and Claude.",
    webTitle: "Full-Stack Web Development",
    webBody:
      "React, Next.js and TypeScript on the surface, Node.js and Django underneath, delivered as one product rather than two halves.",
    mobileTitle: "Mobile App Development",
    mobileBody:
      "React Native and Flutter apps for iOS and Android, taken from the first screen through to the store listing.",
    backendTitle: "Backend & API Engineering",
    backendBody:
      "REST APIs, PostgreSQL, Redis and queue-driven services that stay predictable as the load grows.",
    odooTitle: "Odoo ERP Implementation",
    odooBody:
      "Sales, purchasing, inventory and invoicing configured as a single flow, with your existing customer and billing data migrated in.",
    nocodeTitle: "No-Code MVPs",
    nocodeBody:
      "Bubble.io builds for when reaching the market first matters more than a custom stack, ready to rebuild later.",
  },
  about: {
    eyebrow: "Introduction",
    title: "Overview.",
    paragraph1:
      "I'm a full-stack and AI automation developer. Over the past several years I've worked across SaaS platforms, marketplaces, mobile apps and AI-agent systems. I usually join as the engineer who turns a manual, messy process into something automated, reliable and easy to operate.",
    portraitAlt: "Lucas Marley",
    role: "Full-stack and AI automation developer",
    workHeading: "How I work",
    work1Title: "One person, start to finish",
    work1Body:
      "No account manager and no handover. Whoever you brief is the person who writes the code.",
    work2Title: "Scope and dates agreed up front",
    work2Body:
      "You know what you are getting and when. If either has to move, you hear it from me early rather than on the day.",
    work3Title: "You always know where it stands",
    work3Body:
      "Regular updates while the work is running, in English, Portuguese or Spanish.",
    work4Title: "Yours to run at the end",
    work4Body:
      "Code, documentation and access handed over, so your team can run it and change it without me.",
  },
  work: {
    eyebrow: "Selected projects",
    title: "Work.",
    filterAll: "All",
    companySite: "Company site ->",
    playStore: "View on Google Play ->",
    projectFiles: "View project files ->",
    tryBot: "Try the bot",
    prevProject: "Previous project",
    nextProject: "Next project",
  },
  categories: {
    ai: "AI & Automation",
    web: "Web",
    mobile: "Mobile",
  },
  testimonials: {
    eyebrow: "What clients say",
    title: "Testimonials.",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Contact.",
    intro:
      "Have a project in mind, whether an AI agent, an automation, a web platform or a mobile app? Send a few details and I'll get back to you.",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    nameLabel: "Your Name*",
    namePlaceholder: "Jane Doe",
    emailFieldLabel: "Your Email*",
    emailPlaceholder: "jane@email.com",
    messageLabel: "Your Message*",
    messagePlaceholder: "Tell me a bit about your project...",
    send: "Send",
    sending: "Sending...",
    hintFailed: "That did not go through. Please try again, or write to me directly:",
    failedAction: "Open your email app instead",
    hintIdle: "I usually reply within a day. Your message comes straight to my inbox.",
    hintSent: "Thank you, your message is on its way. I will reply to the address you gave.",
    mailSubject: "Project inquiry from {name}",
  },
  footer: {
    builtWith: "Built with Next.js, TypeScript & Tailwind CSS",
  },
  meta: {
    title: "Lucas Marley | AI Agents, Web & Mobile Developer",
  },
};

const pt: Dictionary = {
  nav: {
    services: "Serviços",
    about: "Sobre",
    skills: "Habilidades",
    work: "Projetos",
    testimonials: "Depoimentos",
    contact: "Contato",
    cta: "Vamos conversar",
    languageLabel: "Mudar idioma",
    primaryLabel: "Seções",
  },
  reach: {
    eyebrow: "Onde eu trabalho",
    title: "Clientes em quatro continentes.",
    intro:
      "Trabalho diretamente em inglês, português e espanhol, então briefings, conversas e documentos de entrega acontecem no idioma em que o cliente se sente à vontade.",
    americas: "Américas",
    europe: "Europa",
    asiaPacific: "Ásia e Pacífico",
    brazil: "Brasil",
    spain: "Espanha",
    mexico: "México",
    unitedStates: "Estados Unidos",
    canada: "Canadá",
    argentina: "Argentina",
    uruguay: "Uruguai",
    chile: "Chile",
    peru: "Peru",
    colombia: "Colômbia",
    unitedKingdom: "Reino Unido",
    germany: "Alemanha",
    denmark: "Dinamarca",
    poland: "Polônia",
    japan: "Japão",
    australia: "Austrália",
  },
  hero: {
    availability: "Disponível para novos projetos",
    headline1: "Eu construo sistemas",
    headline2: "de software [complexos]",
    headline3: "feitos para durar [e] [escalar]",
    promiseLabel: "Eu prometo a você",
    promiseTime: "Seu tempo economizado",
    promiseDeadlines: "Problemas técnicos resolvidos",
    promiseComms: "Seu negócio cresce",
    ctaWork: "Veja meu trabalho",
    ctaContact: "Entre em contato",
    intro: "Engenheiro full-stack e de IA com doze anos de estrada. Construo agentes de IA, automações, plataformas SaaS, backends e apps mobile, e as integrações que mantêm tudo isso de pé.",
  },
  heroVisual: {
    agent: "Agente de leads com IA",
    active: "Ativo",
    newLead: "Novo lead recebido",
    channel: "WhatsApp",
    justNow: "agora",
    intent: "Pontuação de intenção",
    match: "Imóvel compatível",
    systems: "Sistemas conectados",
    synced: "Sincronizado",
    connected: "Conectado",
    healthy: "Operacional",
    run: "Execução da automação",
    executed: "Concluída",
    stepClassify: "Classificar intenção",
    stepMatch: "Buscar no estoque",
    stepSync: "Sincronizar com o CRM",
    stepNotify: "Avisar o corretor",
    caption: "Ilustração: um agente de IA qualificando um contato do WhatsApp e sincronizando com o CRM",
  },
  stats: {
    projects: "Projetos concluídos",
    years: "Anos de experiência",
    customers: "Clientes no mundo",
    countries: "Países atendidos",
  },
  skills: {
    eyebrow: "Stack técnica",
    title: "Habilidades.",
    intro:
      "As ferramentas que eu uso, agrupadas pela parte do projeto a que pertencem.",
    coreFocus: "Foco principal",
    backendTitle: "Backend",
    backendBody:
      "APIs, bancos de dados, filas e os serviços por trás deles, em Node.js e Python, feitos para continuar previsíveis conforme a carga cresce.",
    frontendTitle: "Frontend",
    frontendBody:
      "Interfaces responsivas em React e Next.js, tipadas de ponta a ponta, estilizadas com Tailwind ou Sass, e levadas além com WebGL quando a página precisa de mais do que ficar parada.",
    aiTitle: "Agentes de IA e Automação",
    aiBody:
      "Agentes que conduzem uma conversa de verdade, acionam as suas ferramentas, respondem a partir dos seus dados com busca e passam um lead quente para uma pessoa na hora certa.",
    businessTitle: "Negócio e Entrega",
    businessBody:
      "Implantação de ERP, projetos no-code e as ferramentas em que o trabalho é de fato tocado e acompanhado no dia a dia.",
    mobileTitle: "Mobile",
    mobileBody:
      "Aplicativos multiplataforma para iOS e Android a partir de um só código, em React Native ou Flutter, da primeira tela até a publicação na loja.",
    cloudTitle: "Cloud e Dados",
    cloudBody:
      "Hospedagem, armazenamento e os serviços gerenciados que mantêm tudo no ar, na AWS, no Azure ou no Google Cloud, conforme onde você já está.",
  },
  services: {
    eyebrow: "O que eu faço",
    title: "Serviços.",
    intro:
      "Mais de 150 projetos entregues para fundadores e equipes que precisavam de algo bem feito já na primeira vez.",
    aiTitle: "Agentes de IA e Automação",
    aiBody:
      "Agentes de WhatsApp e chat, pipelines de documentos e OCR, pontuação de leads e automação de prospecção, com OpenAI, Gemini e Claude.",
    webTitle: "Desenvolvimento Web Full-Stack",
    webBody:
      "React, Next.js e TypeScript na superfície, Node.js e Django por baixo, entregues como um produto só, e não como duas metades.",
    mobileTitle: "Desenvolvimento de Apps Mobile",
    mobileBody:
      "Aplicativos em React Native e Flutter para iOS e Android, da primeira tela até a publicação na loja.",
    backendTitle: "Backend e Engenharia de APIs",
    backendBody:
      "APIs REST, PostgreSQL, Redis e serviços orientados a filas que continuam previsíveis conforme a carga cresce.",
    odooTitle: "Implantação de ERP Odoo",
    odooBody:
      "Vendas, compras, estoque e faturamento configurados como um único fluxo, com a migração dos seus dados de clientes e cobranças.",
    nocodeTitle: "MVPs em No-Code",
    nocodeBody:
      "Projetos em Bubble.io para quando chegar ao mercado primeiro importa mais do que uma stack sob medida, prontos para serem reconstruídos depois.",
  },
  about: {
    eyebrow: "Introdução",
    title: "Visão geral.",
    paragraph1:
      "Sou desenvolvedor full-stack e de automação com IA. Nos últimos anos trabalhei com plataformas SaaS, marketplaces, aplicativos móveis e sistemas de agentes de IA. Normalmente entro como o engenheiro que transforma um processo manual e confuso em algo automatizado, confiável e fácil de operar.",
    portraitAlt: "Lucas Marley",
    role: "Desenvolvedor full-stack e de automação com IA",
    workHeading: "Como eu trabalho",
    work1Title: "Uma pessoa, do início ao fim",
    work1Body:
      "Sem gerente de contas e sem repasse. Quem recebe o briefing é quem escreve o código.",
    work2Title: "Escopo e prazos combinados no início",
    work2Body:
      "Você sabe o que vai receber e quando. Se algo precisar mudar, fica sabendo cedo, e não no dia da entrega.",
    work3Title: "Você sempre sabe como está",
    work3Body:
      "Atualizações regulares enquanto o trabalho corre, em inglês, português ou espanhol.",
    work4Title: "Seu para operar no final",
    work4Body:
      "Código, documentação e acessos entregues, para a sua equipe rodar e alterar sem depender de mim.",
  },
  work: {
    eyebrow: "Projetos selecionados",
    title: "Trabalho.",
    filterAll: "Todos",
    companySite: "Site da empresa ->",
    playStore: "Ver no Google Play ->",
    projectFiles: "Ver arquivos do projeto ->",
    tryBot: "Teste o bot",
    prevProject: "Projeto anterior",
    nextProject: "Próximo projeto",
  },
  categories: {
    ai: "IA e Automação",
    web: "Web",
    mobile: "Mobile",
  },
  testimonials: {
    eyebrow: "O que os clientes dizem",
    title: "Depoimentos.",
  },
  contact: {
    eyebrow: "Fale comigo",
    title: "Contato.",
    intro:
      "Tem um projeto em mente, seja um agente de IA, uma automação, uma plataforma web ou um aplicativo móvel? Envie alguns detalhes e eu retorno o contato.",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    nameLabel: "Seu nome*",
    namePlaceholder: "Maria Silva",
    emailFieldLabel: "Seu e-mail*",
    emailPlaceholder: "maria@email.com",
    messageLabel: "Sua mensagem*",
    messagePlaceholder: "Conte um pouco sobre o seu projeto...",
    send: "Enviar",
    sending: "Enviando...",
    hintIdle: "Costumo responder em até um dia. Sua mensagem chega direto na minha caixa de entrada.",
    hintSent: "Obrigado, sua mensagem foi enviada. Respondo no endereço que você informou.",
    hintFailed: "Não foi possível enviar. Tente de novo ou escreva direto para mim:",
    failedAction: "Abrir seu aplicativo de e-mail",
    mailSubject: "Contato sobre projeto de {name}",
  },
  footer: {
    builtWith: "Feito com Next.js, TypeScript e Tailwind CSS",
  },
  meta: {
    title: "Lucas Marley | Agentes de IA, Web e Mobile",
  },
};

const es: Dictionary = {
  nav: {
    services: "Servicios",
    about: "Sobre mí",
    skills: "Habilidades",
    work: "Proyectos",
    testimonials: "Testimonios",
    contact: "Contacto",
    cta: "Hablemos",
    languageLabel: "Cambiar idioma",
    primaryLabel: "Secciones",
  },
  reach: {
    eyebrow: "Dónde trabajo",
    title: "Clientes en cuatro continentes.",
    intro:
      "Trabajo directamente en inglés, portugués y español, así que los briefings, las conversaciones y la documentación de entrega ocurren en el idioma con el que el cliente se sienta cómodo.",
    americas: "Américas",
    europe: "Europa",
    asiaPacific: "Asia y Pacífico",
    brazil: "Brasil",
    spain: "España",
    mexico: "México",
    unitedStates: "Estados Unidos",
    canada: "Canadá",
    argentina: "Argentina",
    uruguay: "Uruguay",
    chile: "Chile",
    peru: "Perú",
    colombia: "Colombia",
    unitedKingdom: "Reino Unido",
    germany: "Alemania",
    denmark: "Dinamarca",
    poland: "Polonia",
    japan: "Japón",
    australia: "Australia",
  },
  hero: {
    availability: "Disponible para nuevos proyectos",
    headline1: "Construyo sistemas",
    headline2: "de software [complejos]",
    headline3: "hechos para durar [y] [escalar]",
    promiseLabel: "Yo te prometo",
    promiseTime: "Tu tiempo ahorrado",
    promiseDeadlines: "Problemas técnicos resueltos",
    promiseComms: "Tu negocio crece",
    ctaWork: "Ver mi trabajo",
    ctaContact: "Contáctame",
    intro: "Ingeniero full-stack y de IA con doce años de experiencia. Construyo agentes de IA, automatizaciones, plataformas SaaS, backends y apps móviles, y las integraciones que lo sostienen todo.",
  },
  heroVisual: {
    agent: "Agente de leads con IA",
    active: "Activo",
    newLead: "Nuevo lead recibido",
    channel: "WhatsApp",
    justNow: "ahora",
    intent: "Puntuación de intención",
    match: "Inmueble compatible",
    systems: "Sistemas conectados",
    synced: "Sincronizado",
    connected: "Conectado",
    healthy: "Operativo",
    run: "Ejecución de la automatización",
    executed: "Completada",
    stepClassify: "Clasificar intención",
    stepMatch: "Buscar en inventario",
    stepSync: "Sincronizar con el CRM",
    stepNotify: "Avisar al agente",
    caption: "Ilustración: un agente de IA calificando un contacto de WhatsApp y sincronizándolo con el CRM",
  },
  stats: {
    projects: "Proyectos completados",
    years: "Años de experiencia",
    customers: "Clientes globales",
    countries: "Países atendidos",
  },
  skills: {
    eyebrow: "Stack técnico",
    title: "Habilidades.",
    intro:
      "Las herramientas que uso, agrupadas por la parte del proyecto a la que pertenecen.",
    coreFocus: "Enfoque principal",
    backendTitle: "Backend",
    backendBody:
      "APIs, bases de datos, colas y los servicios que hay detrás, en Node.js y Python, hechos para seguir siendo predecibles a medida que crece la carga.",
    frontendTitle: "Frontend",
    frontendBody:
      "Interfaces responsivas en React y Next.js, tipadas de principio a fin, con Tailwind o Sass, y llevadas más lejos con WebGL cuando la página necesita algo más que quedarse quieta.",
    aiTitle: "Agentes de IA y Automatización",
    aiBody:
      "Agentes que mantienen una conversación de verdad, invocan tus herramientas, responden desde tus datos con búsqueda y pasan un lead caliente a una persona en el momento justo.",
    businessTitle: "Negocio y Entrega",
    businessBody:
      "Implantación de ERP, proyectos no-code y las herramientas con las que el trabajo se lleva y se sigue de verdad cada día.",
    mobileTitle: "Móvil",
    mobileBody:
      "Aplicaciones multiplataforma para iOS y Android desde un solo código, en React Native o Flutter, desde la primera pantalla hasta la tienda.",
    cloudTitle: "Cloud y Datos",
    cloudBody:
      "Alojamiento, almacenamiento y los servicios gestionados que lo mantienen todo en marcha, en AWS, Azure o Google Cloud según donde ya estés.",
  },
  services: {
    eyebrow: "Lo que hago",
    title: "Servicios.",
    intro:
      "Más de 150 proyectos entregados para fundadores y equipos que necesitaban algo bien hecho a la primera.",
    aiTitle: "Agentes de IA y Automatización",
    aiBody:
      "Agentes de WhatsApp y chat, pipelines de documentos y OCR, puntuación de leads y automatización de prospección, con OpenAI, Gemini y Claude.",
    webTitle: "Desarrollo Web Full-Stack",
    webBody:
      "React, Next.js y TypeScript en la superficie, Node.js y Django por debajo, entregados como un solo producto y no como dos mitades.",
    mobileTitle: "Desarrollo de Apps Móviles",
    mobileBody:
      "Aplicaciones en React Native y Flutter para iOS y Android, desde la primera pantalla hasta la publicación en la tienda.",
    backendTitle: "Backend e Ingeniería de APIs",
    backendBody:
      "APIs REST, PostgreSQL, Redis y servicios basados en colas que siguen siendo predecibles a medida que crece la carga.",
    odooTitle: "Implantación de ERP Odoo",
    odooBody:
      "Ventas, compras, inventario y facturación configurados como un solo flujo, con la migración de tus datos de clientes y facturación.",
    nocodeTitle: "MVPs en No-Code",
    nocodeBody:
      "Proyectos en Bubble.io para cuando llegar antes al mercado importa más que un stack a medida, listos para reconstruirse después.",
  },
  about: {
    eyebrow: "Introducción",
    title: "Resumen.",
    paragraph1:
      "Soy desarrollador full-stack y de automatización con IA. Durante los últimos años he trabajado en plataformas SaaS, marketplaces, aplicaciones móviles y sistemas de agentes de IA. Normalmente me incorporo como el ingeniero que convierte un proceso manual y desordenado en algo automatizado, fiable y fácil de operar.",
    portraitAlt: "Lucas Marley",
    role: "Desarrollador full-stack y de automatización con IA",
    workHeading: "Cómo trabajo",
    work1Title: "Una sola persona, de principio a fin",
    work1Body:
      "Sin gestor de cuentas ni traspasos. Quien recibe el briefing es quien escribe el código.",
    work2Title: "Alcance y fechas acordados desde el principio",
    work2Body:
      "Sabes qué vas a recibir y cuándo. Si algo tiene que cambiar, te enteras pronto y no el día de la entrega.",
    work3Title: "Siempre sabes cómo va",
    work3Body:
      "Actualizaciones periódicas mientras avanza el trabajo, en inglés, portugués o español.",
    work4Title: "Tuyo para operarlo al final",
    work4Body:
      "Código, documentación y accesos entregados, para que tu equipo lo mantenga y lo cambie sin depender de mí.",
  },
  work: {
    eyebrow: "Proyectos seleccionados",
    title: "Trabajo.",
    filterAll: "Todos",
    companySite: "Sitio de la empresa ->",
    playStore: "Ver en Google Play ->",
    projectFiles: "Ver archivos del proyecto ->",
    tryBot: "Prueba el bot",
    prevProject: "Proyecto anterior",
    nextProject: "Proyecto siguiente",
  },
  categories: {
    ai: "IA y Automatización",
    web: "Web",
    mobile: "Móvil",
  },
  testimonials: {
    eyebrow: "Lo que dicen los clientes",
    title: "Testimonios.",
  },
  contact: {
    eyebrow: "Ponte en contacto",
    title: "Contacto.",
    intro:
      "¿Tienes un proyecto en mente, ya sea un agente de IA, una automatización, una plataforma web o una aplicación móvil? Envía algunos detalles y te respondo.",
    emailLabel: "Correo",
    whatsappLabel: "WhatsApp",
    nameLabel: "Tu nombre*",
    namePlaceholder: "Ana García",
    emailFieldLabel: "Tu correo*",
    emailPlaceholder: "ana@email.com",
    messageLabel: "Tu mensaje*",
    messagePlaceholder: "Cuéntame un poco sobre tu proyecto...",
    send: "Enviar",
    sending: "Enviando...",
    hintIdle: "Suelo responder en un día. Tu mensaje llega directo a mi bandeja de entrada.",
    hintSent: "Gracias, tu mensaje ya está en camino. Te responderé a la dirección que indicaste.",
    hintFailed: "No se pudo enviar. Inténtalo de nuevo o escríbeme directamente:",
    failedAction: "Abrir tu aplicación de correo",
    mailSubject: "Consulta de proyecto de {name}",
  },
  footer: {
    builtWith: "Hecho con Next.js, TypeScript y Tailwind CSS",
  },
  meta: {
    title: "Lucas Marley | Agentes de IA, Web y Móvil",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };
