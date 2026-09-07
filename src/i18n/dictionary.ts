import type { Locale } from "./config";

export interface Dictionary {
  nav: {
    about: string;
    work: string;
    testimonials: string;
    contact: string;
    cta: string;
    languageLabel: string;
    menu: string;
    closeMenu: string;
    browseWork: string;
  };
  reach: {
    eyebrow: string;
    title: string;
    intro: string;
    brazil: string;
    spain: string;
    mexico: string;
    unitedStates: string;
    canada: string;
    argentina: string;
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
    paragraph2: string;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    filterAll: string;
    companySite: string;
    playStore: string;
    projectFiles: string;
    tryBot: string;
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
    hintIdle: string;
    hintSent: string;
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
    about: "About",
    work: "Work",
    testimonials: "Testimonials",
    contact: "Contact",
    cta: "Let's talk",
    languageLabel: "Change language",
    menu: "Menu",
    closeMenu: "Close menu",
    browseWork: "Browse the work",
  },
  reach: {
    eyebrow: "Where I work",
    title: "Clients on four continents.",
    intro:
      "I work directly in English, Portuguese and Spanish, so briefs, calls and handover documents happen in whichever one the client is comfortable with.",
    brazil: "Brazil",
    spain: "Spain",
    mexico: "Mexico",
    unitedStates: "United States",
    canada: "Canada",
    argentina: "Argentina",
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
      "The tools I reach for, grouped by the part of the build they belong to. Agent work leads, because it is where most of my time goes.",
    coreFocus: "Core focus",
    backendTitle: "Backend",
    backendBody:
      "APIs, databases, queues and the services behind them. Node.js and Python systems built to stay predictable as the load grows.",
    frontendTitle: "Frontend",
    frontendBody:
      "Responsive interfaces in React and Next.js that hold their shape on every screen.",
    aiTitle: "AI Agents & Automation",
    aiBody:
      "Agents that hold a real conversation, call your own tools, answer from your data with retrieval, and pass a hot lead to a person at the right moment. Behind them, the document, OCR and scoring pipelines that keep the whole thing fed, and the workflows that run without anyone watching.",
    businessTitle: "Business & Delivery",
    businessBody:
      "ERP implementation, no-code builds and the tools a project is actually run and tracked in.",
    mobileTitle: "Mobile",
    mobileBody:
      "Cross-platform apps for iOS and Android from one codebase.",
    cloudTitle: "Cloud & Data",
    cloudBody:
      "Hosting, storage and the managed services that keep it all running.",
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
    paragraph2:
      "On the backend I work mainly in Node.js and Python, with Django, REST APIs, PostgreSQL, Redis and queue-driven architectures. On the AI side I build LLM-integrated workflows: document/OCR pipelines, WhatsApp and chat agents, outbound automation, and classification systems using OpenAI, Gemini and Claude. On the frontend and mobile side I work in React, Next.js, TypeScript, React Native and Flutter, and I've shipped production apps in no-code tools like Bubble.io when speed-to-market mattered more than a custom stack. I also take on Odoo ERP implementations for small and mid-sized businesses: scoping the modules a company actually needs, configuring sales, purchasing, inventory and invoicing as one flow, and migrating historical customer and billing data.",
  },
  work: {
    eyebrow: "Selected projects",
    title: "Work.",
    intro:
      "A mix of AI-agent systems, SaaS platforms and mobile apps from recent freelance and contract engagements. Client codebases are private, so these are summarized case studies rather than public repos.",
    filterAll: "All",
    companySite: "Company site ->",
    playStore: "View on Google Play ->",
    projectFiles: "View project files ->",
    tryBot: "Try the bot",
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
    hintIdle:
      "This opens your email client with the message pre-filled. Nothing is sent from this page.",
    hintSent: "Opening your email client now. If nothing happened, email me directly instead.",
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
    about: "Sobre",
    work: "Projetos",
    testimonials: "Depoimentos",
    contact: "Contato",
    cta: "Vamos conversar",
    languageLabel: "Mudar idioma",
    menu: "Menu",
    closeMenu: "Fechar menu",
    browseWork: "Ver os projetos",
  },
  reach: {
    eyebrow: "Onde eu trabalho",
    title: "Clientes em quatro continentes.",
    intro:
      "Trabalho diretamente em inglês, português e espanhol, então briefings, conversas e documentos de entrega acontecem no idioma em que o cliente se sente à vontade.",
    brazil: "Brasil",
    spain: "Espanha",
    mexico: "México",
    unitedStates: "Estados Unidos",
    canada: "Canadá",
    argentina: "Argentina",
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
      "As ferramentas que eu uso, agrupadas pela parte do projeto a que pertencem. O trabalho com agentes vem primeiro, porque é onde passo a maior parte do tempo.",
    coreFocus: "Foco principal",
    backendTitle: "Backend",
    backendBody:
      "APIs, bancos de dados, filas e os serviços por trás deles. Sistemas em Node.js e Python feitos para continuar previsíveis conforme a carga cresce.",
    frontendTitle: "Frontend",
    frontendBody:
      "Interfaces responsivas em React e Next.js que mantêm a forma em qualquer tela.",
    aiTitle: "Agentes de IA e Automação",
    aiBody:
      "Agentes que conduzem uma conversa de verdade, acionam as suas ferramentas, respondem a partir dos seus dados com busca e passam um lead quente para uma pessoa na hora certa. Por trás deles, os pipelines de documentos, OCR e pontuação que alimentam tudo, e os fluxos que rodam sem ninguém olhando.",
    businessTitle: "Negócio e Entrega",
    businessBody:
      "Implantação de ERP, projetos no-code e as ferramentas em que o trabalho é de fato tocado e acompanhado.",
    mobileTitle: "Mobile",
    mobileBody:
      "Aplicativos multiplataforma para iOS e Android a partir de um só código.",
    cloudTitle: "Cloud e Dados",
    cloudBody:
      "Hospedagem, armazenamento e os serviços gerenciados que mantêm tudo no ar.",
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
    paragraph2:
      "No backend trabalho principalmente com Node.js e Python, além de Django, APIs REST, PostgreSQL, Redis e arquiteturas orientadas a filas. Na parte de IA construo fluxos integrados a LLMs: pipelines de documentos/OCR, agentes de WhatsApp e chat, automação de prospecção e sistemas de classificação usando OpenAI, Gemini e Claude. No frontend e no mobile trabalho com React, Next.js, TypeScript, React Native e Flutter, e já coloquei aplicativos em produção com ferramentas no-code como o Bubble.io quando a velocidade de lançamento importava mais do que uma stack sob medida. Também faço implantações de ERP Odoo para pequenas e médias empresas: defino os módulos que a empresa realmente precisa, configuro vendas, compras, estoque e faturamento como um único fluxo e migro os dados históricos de clientes e cobranças.",
  },
  work: {
    eyebrow: "Projetos selecionados",
    title: "Trabalho.",
    intro:
      "Uma seleção de sistemas de agentes de IA, plataformas SaaS e aplicativos móveis de projetos freelance e contratos recentes. O código dos clientes é privado, então estes são estudos de caso resumidos, e não repositórios públicos.",
    filterAll: "Todos",
    companySite: "Site da empresa ->",
    playStore: "Ver no Google Play ->",
    projectFiles: "Ver arquivos do projeto ->",
    tryBot: "Teste o bot",
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
    hintIdle:
      "Isto abre o seu cliente de e-mail com a mensagem já preenchida. Nada é enviado a partir desta página.",
    hintSent:
      "Abrindo o seu cliente de e-mail. Se nada acontecer, envie um e-mail diretamente para mim.",
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
    about: "Sobre mí",
    work: "Proyectos",
    testimonials: "Testimonios",
    contact: "Contacto",
    cta: "Hablemos",
    languageLabel: "Cambiar idioma",
    menu: "Menú",
    closeMenu: "Cerrar menú",
    browseWork: "Ver los proyectos",
  },
  reach: {
    eyebrow: "Dónde trabajo",
    title: "Clientes en cuatro continentes.",
    intro:
      "Trabajo directamente en inglés, portugués y español, así que los briefings, las conversaciones y la documentación de entrega ocurren en el idioma con el que el cliente se sienta cómodo.",
    brazil: "Brasil",
    spain: "España",
    mexico: "México",
    unitedStates: "Estados Unidos",
    canada: "Canadá",
    argentina: "Argentina",
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
      "Las herramientas que uso, agrupadas por la parte del proyecto a la que pertenecen. El trabajo con agentes va primero, porque es donde pasa la mayor parte de mi tiempo.",
    coreFocus: "Enfoque principal",
    backendTitle: "Backend",
    backendBody:
      "APIs, bases de datos, colas y los servicios que hay detrás. Sistemas en Node.js y Python hechos para seguir siendo predecibles a medida que crece la carga.",
    frontendTitle: "Frontend",
    frontendBody:
      "Interfaces responsivas en React y Next.js que mantienen la forma en cualquier pantalla.",
    aiTitle: "Agentes de IA y Automatización",
    aiBody:
      "Agentes que mantienen una conversación de verdad, invocan tus herramientas, responden desde tus datos con búsqueda y pasan un lead caliente a una persona en el momento justo. Detrás, los pipelines de documentos, OCR y puntuación que lo alimentan todo, y los flujos que funcionan sin que nadie los vigile.",
    businessTitle: "Negocio y Entrega",
    businessBody:
      "Implantación de ERP, proyectos no-code y las herramientas con las que el trabajo se lleva y se sigue de verdad.",
    mobileTitle: "Móvil",
    mobileBody:
      "Aplicaciones multiplataforma para iOS y Android desde un solo código.",
    cloudTitle: "Cloud y Datos",
    cloudBody:
      "Alojamiento, almacenamiento y los servicios gestionados que lo mantienen todo en marcha.",
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
    paragraph2:
      "En el backend trabajo principalmente con Node.js y Python, además de Django, APIs REST, PostgreSQL, Redis y arquitecturas basadas en colas. En el lado de la IA construyo flujos integrados con LLMs: pipelines de documentos/OCR, agentes de WhatsApp y chat, automatización de prospección y sistemas de clasificación con OpenAI, Gemini y Claude. En el frontend y móvil trabajo con React, Next.js, TypeScript, React Native y Flutter, y he lanzado a producción aplicaciones con herramientas no-code como Bubble.io cuando la velocidad de salida al mercado importaba más que un stack a medida. También realizo implantaciones de ERP Odoo para pequeñas y medianas empresas: defino los módulos que la empresa realmente necesita, configuro ventas, compras, inventario y facturación como un solo flujo y migro los datos históricos de clientes y facturación.",
  },
  work: {
    eyebrow: "Proyectos seleccionados",
    title: "Trabajo.",
    intro:
      "Una selección de sistemas de agentes de IA, plataformas SaaS y aplicaciones móviles de proyectos freelance y contratos recientes. El código de los clientes es privado, así que estos son casos de estudio resumidos, no repositorios públicos.",
    filterAll: "Todos",
    companySite: "Sitio de la empresa ->",
    playStore: "Ver en Google Play ->",
    projectFiles: "Ver archivos del proyecto ->",
    tryBot: "Prueba el bot",
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
    hintIdle:
      "Esto abre tu cliente de correo con el mensaje ya escrito. No se envía nada desde esta página.",
    hintSent: "Abriendo tu cliente de correo. Si no ocurre nada, escríbeme directamente.",
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
