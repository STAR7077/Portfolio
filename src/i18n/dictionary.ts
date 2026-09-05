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
  };
  hero: {
    availability: string;
    headline1: string;
    headline2: string;
    headline3: string;
    subtitle: string;
    ctaWork: string;
    ctaContact: string;
  };
  stats: {
    projects: string;
    reviews: string;
    languages: string;
    platforms: string;
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
    title: "Clients across three languages.",
    intro:
      "I work directly in English, Portuguese and Spanish, so briefs, calls and handover documents happen in whichever one the client is comfortable with.",
    brazil: "Brazil",
    spain: "Spain",
    mexico: "Mexico",
  },
  hero: {
    availability: "Available for new projects",
    headline1: "AI agents, web",
    headline2: "and mobile apps,",
    headline3: "built to ship.",
    subtitle:
      "I turn manual, messy processes into automated systems a team can actually run. Node.js, Python, React, Next.js, LLMs and Odoo.",
    ctaWork: "See my work",
    ctaContact: "Get in touch",
  },
  stats: {
    projects: "Projects delivered",
    reviews: "Five-star reviews",
    languages: "Languages spoken",
    platforms: "AI, web and mobile",
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
    companySite: "Company site ↗",
    playStore: "View on Google Play ↗",
    projectFiles: "View project files ↗",
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
    title: "Lucas Marley | Developer",
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
    title: "Clientes em três idiomas.",
    intro:
      "Trabalho diretamente em inglês, português e espanhol, então briefings, conversas e documentos de entrega acontecem no idioma em que o cliente se sente à vontade.",
    brazil: "Brasil",
    spain: "Espanha",
    mexico: "México",
  },
  hero: {
    availability: "Disponível para novos projetos",
    headline1: "Agentes de IA, web",
    headline2: "e aplicativos móveis,",
    headline3: "prontos para produção.",
    subtitle:
      "Transformo processos manuais e confusos em sistemas automatizados que a equipe consegue operar de verdade. Node.js, Python, React, Next.js, LLMs e Odoo.",
    ctaWork: "Veja meu trabalho",
    ctaContact: "Entre em contato",
  },
  stats: {
    projects: "Projetos entregues",
    reviews: "Avaliações cinco estrelas",
    languages: "Idiomas falados",
    platforms: "IA, web e mobile",
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
    companySite: "Site da empresa ↗",
    playStore: "Ver no Google Play ↗",
    projectFiles: "Ver arquivos do projeto ↗",
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
    title: "Lucas Marley | Desenvolvedor",
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
    title: "Clientes en tres idiomas.",
    intro:
      "Trabajo directamente en inglés, portugués y español, así que los briefings, las conversaciones y la documentación de entrega ocurren en el idioma con el que el cliente se sienta cómodo.",
    brazil: "Brasil",
    spain: "España",
    mexico: "México",
  },
  hero: {
    availability: "Disponible para nuevos proyectos",
    headline1: "Agentes de IA, web",
    headline2: "y aplicaciones móviles,",
    headline3: "listos para producción.",
    subtitle:
      "Convierto procesos manuales y desordenados en sistemas automatizados que un equipo puede operar de verdad. Node.js, Python, React, Next.js, LLMs y Odoo.",
    ctaWork: "Ver mi trabajo",
    ctaContact: "Contáctame",
  },
  stats: {
    projects: "Proyectos entregados",
    reviews: "Reseñas de cinco estrellas",
    languages: "Idiomas hablados",
    platforms: "IA, web y móvil",
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
    companySite: "Sitio de la empresa ↗",
    playStore: "Ver en Google Play ↗",
    projectFiles: "Ver archivos del proyecto ↗",
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
    title: "Lucas Marley | Desarrollador",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };
