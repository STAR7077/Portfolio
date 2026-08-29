import type { Localized } from "@/i18n/config";

export type ProjectCategory = "ai" | "web" | "mobile";

export interface Project {
  slug: string;
  /** Product names are proper nouns, so they are not translated. */
  title: string;
  tagline: Localized;
  description: Localized;
  categories: ProjectCategory[];
  tech: string[];
  link?: string;
  /** Controls the wording of the link. A company website by default. */
  linkKind?: "site" | "playStore" | "drive";
  /** Filenames expected in /public/projects/. Missing ones are skipped automatically. */
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "swop",
    title: "SWOP",
    tagline: {
      en: "Luxury asset bartering marketplace (iOS/Android)",
      pt: "Marketplace de troca de bens de luxo (iOS/Android)",
      es: "Marketplace de intercambio de bienes de lujo (iOS/Android)",
    },
    description: {
      en: "A barter marketplace for high-value assets such as watches, cars, property, yachts and jets, where members trade directly instead of buying or selling. Supports hybrid deals that pair an asset with cash, offer/counter-offer negotiation, an asset portfolio with live valuations, and a fee-free swap marketplace. Built no-code to move fast, which helped it get early traction and a seed round.",
      pt: "Um marketplace de troca para bens de alto valor como relógios, carros, imóveis, iates e jatos, em que os membros negociam diretamente em vez de comprar ou vender. Suporta negócios híbridos que combinam um bem com dinheiro, negociação por oferta e contraproposta, uma carteira de bens com avaliação em tempo real e um marketplace de trocas sem taxas. Construído em no-code para ganhar velocidade, o que ajudou a conquistar tração inicial e uma rodada seed.",
      es: "Un marketplace de intercambio para bienes de alto valor como relojes, coches, inmuebles, yates y jets, donde los miembros negocian directamente en lugar de comprar o vender. Admite acuerdos híbridos que combinan un bien con efectivo, negociación por oferta y contraoferta, una cartera de bienes con valoración en tiempo real y un marketplace de intercambios sin comisiones. Construida en no-code para ir rápido, lo que ayudó a conseguir tracción inicial y una ronda seed.",
    },
    categories: ["mobile"],
    tech: ["Bubble.io", "BDK Native", "Figma", "Node.js", "API integration"],
    link: "https://play.google.com/store/apps/details?id=com.mycompany.swopmvp",
    linkKind: "playStore",
    images: ["swop-1.png", "swop-2.png", "swop-3.png", "swop-4.png", "swop-5.png"],
  },
  {
    slug: "casefox",
    title: "CaseFox",
    tagline: {
      en: "Legal practice management SaaS",
      pt: "SaaS de gestão para escritórios de advocacia",
      es: "SaaS de gestión para despachos de abogados",
    },
    description: {
      en: "Cloud-based legal billing and case management for law firms and professional service providers, spanning web, mobile and a Chrome extension, covering case/client management, time tracking, LEDES/PDF/Word invoicing, trust accounting and legal calendaring.",
      pt: "Faturamento jurídico e gestão de processos na nuvem para escritórios de advocacia e prestadores de serviços profissionais, cobrindo web, mobile e uma extensão do Chrome, com gestão de casos e clientes, controle de horas, faturamento em LEDES/PDF/Word, contas de custódia e agenda jurídica.",
      es: "Facturación legal y gestión de casos en la nube para despachos de abogados y proveedores de servicios profesionales, con web, móvil y una extensión de Chrome, con gestión de casos y clientes, control de horas, facturación en LEDES/PDF/Word, cuentas de fideicomiso y agenda jurídica.",
    },
    categories: ["web", "mobile"],
    tech: ["React", "Node.js", "React Native", "REST APIs", "PostgreSQL/MySQL", "Chrome Extension"],
    link: "https://www.casefox.com",
    images: ["casefox-1.png", "casefox-2.png", "casefox-3.jpg", "casefox-4.jpg", "casefox-5.jpg", "casefox-6.jpg"],
  },
  {
    slug: "vacation-calendar",
    title: "Vacation Calendar",
    tagline: {
      en: "Team leave management SaaS (Web + Android)",
      pt: "SaaS de gestão de férias e ausências (Web + Android)",
      es: "SaaS de gestión de vacaciones y ausencias (Web + Android)",
    },
    description: {
      en: "A shared team calendar that replaces spreadsheets for tracking vacation and leave. Built REST APIs and real-time sync so employees can request time off and managers can approve it with live conflict detection across web and mobile.",
      pt: "Um calendário compartilhado que substitui planilhas no controle de férias e ausências. Desenvolvi APIs REST e sincronização em tempo real para que os funcionários solicitem folgas e os gestores aprovem, com detecção de conflitos ao vivo na web e no mobile.",
      es: "Un calendario compartido que sustituye a las hojas de cálculo para controlar vacaciones y ausencias. Desarrollé APIs REST y sincronización en tiempo real para que los empleados soliciten días libres y los responsables los aprueben, con detección de conflictos en vivo en web y móvil.",
    },
    categories: ["web", "mobile"],
    tech: ["Flutter", "Firebase", "React", "Node.js", "TypeScript", "PostgreSQL"],
    link: "https://www.thevacationcalendar.com",
    images: ["vacation-calendar-1.jpeg"],
  },
  {
    slug: "faire",
    title: "Faire",
    tagline: {
      en: "B2B wholesale marketplace",
      pt: "Marketplace atacadista B2B",
      es: "Marketplace mayorista B2B",
    },
    description: {
      en: "A large-scale multi-vendor marketplace connecting independent retailers with brands and wholesalers. Worked on backend systems and API-driven architecture for order lifecycle management, pricing logic and payment/commission flows at high transaction volume.",
      pt: "Um marketplace multivendedor de grande porte que conecta varejistas independentes a marcas e atacadistas. Atuei nos sistemas de backend e na arquitetura orientada a APIs para o ciclo de vida dos pedidos, a lógica de preços e os fluxos de pagamento e comissões em alto volume de transações.",
      es: "Un marketplace multivendedor de gran escala que conecta a minoristas independientes con marcas y mayoristas. Trabajé en los sistemas de backend y en la arquitectura orientada a APIs para el ciclo de vida de los pedidos, la lógica de precios y los flujos de pago y comisiones con alto volumen de transacciones.",
    },
    categories: ["web", "mobile"],
    tech: ["TypeScript", "React", "Node.js", "React Native", "PostgreSQL", "Microservices", "REST APIs", "AWS"],
    link: "https://www.faire.com",
    images: ["faire-1.png", "faire-2.jpg", "faire-3.jpeg", "faire-4.jpg", "faire-5.png", "faire-6.jpg"],
  },
  {
    slug: "real-estate-whatsapp-ai-bot",
    title: "Real Estate WhatsApp AI Bot",
    tagline: {
      en: "AI-powered CRM & WhatsApp lead automation",
      pt: "CRM com IA e automação de leads no WhatsApp",
      es: "CRM con IA y automatización de leads en WhatsApp",
    },
    description: {
      en: "An AI real estate CRM that handles incoming WhatsApp conversations end to end: understands what a buyer wants, searches live property inventory, scores lead intent, syncs everything to Airtable, and alerts a human agent when a high-value prospect needs a personal follow-up.",
      pt: "Um CRM imobiliário com IA que conduz as conversas recebidas no WhatsApp de ponta a ponta: entende o que o comprador procura, busca no estoque de imóveis em tempo real, pontua a intenção do lead, sincroniza tudo com o Airtable e avisa um corretor quando um prospect de alto valor precisa de atendimento pessoal.",
      es: "Un CRM inmobiliario con IA que gestiona las conversaciones entrantes de WhatsApp de principio a fin: entiende lo que busca el comprador, consulta el inventario de propiedades en tiempo real, puntúa la intención del lead, sincroniza todo con Airtable y avisa a un agente cuando un prospecto de alto valor necesita atención personal.",
    },
    categories: ["ai"],
    tech: ["Python", "Django", "DRF", "OpenAI API", "Gemini API", "PostgreSQL", "Redis", "Celery", "Django Channels", "Airtable", "WhatsApp Cloud API", "Docker"],
    images: ["real-estate-whatsapp-bot-1.png"],
  },
  {
    slug: "inmatic-ai",
    title: "Inmatic AI",
    tagline: {
      en: "AI-powered accounting automation",
      pt: "Automação contábil com IA",
      es: "Automatización contable con IA",
    },
    description: {
      en: "A SaaS platform that automates bookkeeping with AI. Invoices and receipts are ingested and run through an OCR/AI pipeline, converted into structured accounting entries, then categorized and queued for human review before final posting, turning manual data entry into supervision and approval.",
      pt: "Uma plataforma SaaS que automatiza a contabilidade com IA. Notas fiscais e recibos são captados e processados por um pipeline de OCR/IA, convertidos em lançamentos contábeis estruturados e depois categorizados e enfileirados para revisão humana antes do lançamento final, transformando digitação manual em supervisão e aprovação.",
      es: "Una plataforma SaaS que automatiza la contabilidad con IA. Las facturas y recibos se capturan y pasan por un pipeline de OCR/IA, se convierten en asientos contables estructurados y luego se categorizan y ponen en cola para revisión humana antes del registro final, convirtiendo la carga manual de datos en supervisión y aprobación.",
    },
    categories: ["ai", "web"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "OCR pipelines", "AWS/GCP", "LLM integration", "NLP"],
    link: "https://inmatic.ai",
    images: ["inmatic-ai-1.jpg", "inmatic-ai-2.jpg", "inmatic-ai-3.jpg", "inmatic-ai-4.jpg", "inmatic-ai-5.jpg", "inmatic-ai-6.jpg"],
  },
  {
    slug: "artisan",
    title: "Artisan",
    tagline: {
      en: "AI SDR & outbound automation platform",
      pt: "Plataforma de SDR com IA e automação de prospecção",
      es: "Plataforma de SDR con IA y automatización de prospección",
    },
    description: {
      en: "An AI-driven outbound sales platform where autonomous agents research prospects and generate personalized, multi-channel outreach at scale. Worked on backend architecture, lead-enrichment pipelines and the LLM-based message-generation workflow behind campaign orchestration.",
      pt: "Uma plataforma de vendas outbound movida a IA, em que agentes autônomos pesquisam prospects e geram abordagens personalizadas e multicanal em escala. Atuei na arquitetura de backend, nos pipelines de enriquecimento de leads e no fluxo de geração de mensagens com LLM por trás da orquestração das campanhas.",
      es: "Una plataforma de ventas outbound impulsada por IA en la que agentes autónomos investigan prospectos y generan mensajes personalizados y multicanal a escala. Trabajé en la arquitectura de backend, los pipelines de enriquecimiento de leads y el flujo de generación de mensajes con LLM detrás de la orquestación de campañas.",
    },
    categories: ["ai"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "Queue systems", "LLM integration (OpenAI/Claude)", "Workflow automation"],
    link: "https://www.artisan.co",
    images: ["artisan-1.jpg", "artisan-2.jpg", "artisan-3.jpg", "artisan-4.jpg", "artisan-5.jpg", "artisan-6.jpg"],
  },
  {
    slug: "edraw-ai",
    title: "Edraw AI",
    tagline: {
      en: "AI diagram & process automation platform",
      pt: "Plataforma de diagramas e automação de processos com IA",
      es: "Plataforma de diagramas y automatización de procesos con IA",
    },
    description: {
      en: "A platform that turns unstructured text or uploaded documents into professional flowcharts, mind maps and process diagrams using AI-driven parsing and structured generation, with interactive editing, templates and multi-format export.",
      pt: "Uma plataforma que transforma texto não estruturado ou documentos enviados em fluxogramas, mapas mentais e diagramas de processo profissionais, usando interpretação por IA e geração estruturada, com edição interativa, modelos e exportação em vários formatos.",
      es: "Una plataforma que convierte texto no estructurado o documentos subidos en diagramas de flujo, mapas mentales y diagramas de procesos profesionales, mediante interpretación con IA y generación estructurada, con edición interactiva, plantillas y exportación en varios formatos.",
    },
    categories: ["ai", "web"],
    tech: ["Python", "AI/ML", "API Development", "Interactive editors", "Export pipelines"],
    link: "https://www.edraw.ai",
    images: ["edraw-ai-1.jpg", "edraw-ai-2.jpg", "edraw-ai-3.jpg", "edraw-ai-4.jpg", "edraw-ai-5.jpg", "edraw-ai-6.jpg"],
  },
  {
    slug: "infermedica",
    title: "Infermedica",
    tagline: {
      en: "AI-powered healthcare diagnostic platform",
      pt: "Plataforma de diagnóstico em saúde com IA",
      es: "Plataforma de diagnóstico médico con IA",
    },
    description: {
      en: "Intelligent symptom checking, triage and clinical decision support. Worked on AI-driven workflows and backend/API performance for a dynamic symptom-checking engine that adapts its questions in real time using probabilistic reasoning and medical knowledge graphs.",
      pt: "Verificação inteligente de sintomas, triagem e apoio à decisão clínica. Atuei nos fluxos baseados em IA e no desempenho de backend/APIs de um motor de triagem dinâmico que adapta as perguntas em tempo real usando raciocínio probabilístico e grafos de conhecimento médico.",
      es: "Verificación inteligente de síntomas, triaje y apoyo a la decisión clínica. Trabajé en los flujos basados en IA y en el rendimiento del backend/APIs de un motor de triaje dinámico que adapta sus preguntas en tiempo real mediante razonamiento probabilístico y grafos de conocimiento médico.",
    },
    categories: ["ai", "web"],
    tech: ["Node.js", "Python", "AI/ML integration", "REST APIs", "HIPAA/GDPR-oriented data handling", "Cloud infrastructure"],
    link: "https://infermedica.com",
    images: ["infermedica-1.jpeg", "infermedica-2.jpeg", "infermedica-3.jpeg", "infermedica-4.jpeg", "infermedica-5.jpeg", "infermedica-6.jpeg"],
  },
  {
    slug: "planfy",
    title: "Planfy",
    tagline: {
      en: "Online booking & business management platform",
      pt: "Plataforma de agendamento online e gestão de negócios",
      es: "Plataforma de reservas online y gestión de negocios",
    },
    description: {
      en: "A booking and business-management platform for service businesses, covering staff calendars, automated SMS/email reminders, customer database, QR/NFC booking, and video-call appointments. Used at high transactional volume across salons, clinics and professional services.",
      pt: "Uma plataforma de agendamento e gestão para empresas de serviços, com agendas da equipe, lembretes automáticos por SMS/e-mail, base de clientes, agendamento por QR/NFC e consultas por videochamada. Usada em alto volume transacional por salões, clínicas e serviços profissionais.",
      es: "Una plataforma de reservas y gestión para empresas de servicios, con agendas del equipo, recordatorios automáticos por SMS/correo, base de clientes, reservas por QR/NFC y citas por videollamada. Usada con alto volumen transaccional en salones, clínicas y servicios profesionales.",
    },
    categories: ["web"],
    tech: ["React.js", "Laravel", "Angular JS", "Zoho CRM", "Google Maps"],
    link: "https://www.planfy.com",
    images: ["planfy-1.jpg", "planfy-2.jpg", "planfy-3.jpg", "planfy-4.jpg", "planfy-5.jpg", "planfy-6.jpg"],
  },
  {
    slug: "tooltown",
    title: "ToolTown",
    tagline: {
      en: "B2C hardware e-commerce (Mexico)",
      pt: "E-commerce B2C de ferramentas (México)",
      es: "E-commerce B2C de ferretería (México)",
    },
    description: {
      en: "A Mexican online hardware and tools store with wholesale pricing, installment payments and consumer credit. Focused on usability, product discoverability and conversion, clearly surfacing financing options and a high-volume catalog without slowing checkout down.",
      pt: "Uma loja online mexicana de ferramentas e materiais de construção com preços de atacado, pagamento parcelado e crédito ao consumidor. Foco em usabilidade, descoberta de produtos e conversão, deixando claras as opções de financiamento e exibindo um catálogo extenso sem tornar o checkout lento.",
      es: "Una tienda online mexicana de herramientas y ferretería con precios mayoristas, pagos a plazos y crédito al consumo. Enfocada en usabilidad, descubrimiento de productos y conversión, mostrando con claridad las opciones de financiación y un catálogo amplio sin ralentizar el checkout.",
    },
    categories: ["web"],
    tech: ["React", "Tailwind CSS", "E-commerce UX", "Product catalog structure", "Conversion optimization"],
    link: "https://www.tooltown.mx",
    images: ["tooltown-1.png", "tooltown-2.jpg", "tooltown-3.jpg", "tooltown-4.jpg", "tooltown-5.jpg", "tooltown-6.jpg"],
  },
  {
    slug: "odoo-lift-maintenance-erp",
    title: "Odoo ERP Implementation",
    tagline: {
      en: "Odoo rollout for a lift & escalator maintenance firm",
      pt: "Implantação do Odoo para empresa de manutenção de elevadores",
      es: "Implantación de Odoo para empresa de mantenimiento de ascensores",
    },
    description: {
      en: "A practical Odoo implementation for an SME that repairs, installs and maintains lifts and escalators. Scoped to the modules the business actually needed rather than a heavyweight corporate rollout: quotations, sales and purchasing configured as a single flow, the product and spare-parts catalogue reorganised, historical customer and invoicing records migrated, and work orders with technician assignment set up, plus hands-on support through go-live.",
      pt: "Uma implantação prática do Odoo para uma pequena empresa que repara, monta e mantém elevadores e escadas rolantes. Escopo limitado aos módulos realmente necessários, em vez de uma implantação corporativa pesada: orçamentos, vendas e compras configurados como um único fluxo, catálogo de produtos e peças de reposição reorganizado, dados históricos de clientes e faturamento migrados e ordens de serviço com atribuição de técnicos, além de acompanhamento na entrada em produção.",
      es: "Una implantación práctica de Odoo para una pyme que repara, monta y mantiene ascensores y escaleras mecánicas. Acotada a los módulos que el negocio realmente necesitaba, en lugar de una implantación corporativa pesada: presupuestos, ventas y compras configurados como un solo flujo, el catálogo de productos y repuestos reorganizado, los datos históricos de clientes y facturación migrados y los partes de trabajo con asignación de técnicos, además de acompañamiento durante la puesta en marcha.",
    },
    categories: ["web"],
    tech: ["Odoo", "ERP configuration", "Sales & Purchasing", "Inventory", "Field Service", "Invoicing", "Data migration"],
    // Public, link-shared folder of delivered documentation and walkthrough videos.
    link: "https://drive.google.com/drive/folders/1BpUk7OanJDgOy7NmOA5VBKK2DpliuPCv?usp=sharing",
    linkKind: "drive",
    images: ["odoo-1.png"],
  },
];
