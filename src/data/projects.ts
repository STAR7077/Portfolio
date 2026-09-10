import type { Localized } from "@/i18n/config";

export type ProjectCategory = "ai" | "web" | "mobile";

export interface Project {
  slug: string;
  /** Product names are proper nouns, so they are not translated. */
  title: string;
  tagline: Localized;
  description: Localized;
  categories: ProjectCategory[];
  /**
   * Technologies only. Capabilities belong in the description: a chip reading
   * "Conversion optimization" or "Interactive editors" tells a technical buyer
   * nothing about what was built with.
   */
  tech: string[];
  link?: string;
  /** Controls the wording of the link. A company website by default. */
  linkKind?: "site" | "playStore" | "drive";
  /** A live number visitors can message to try the bot themselves. */
  demoWhatsApp?: string;
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
    images: ["swop-1.webp", "swop-2.webp", "swop-3.webp", "swop-4.webp", "swop-5.webp"],
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
      en: "Cloud-based legal billing and case management for law firms and professional service providers, spanning web, mobile and a Chrome extension. Covers case and client records, background timers for billable and non-billable hours, expenses and vendor payments, LEDES and UTBMS invoicing with recurring and bulk runs, and trust accounting kept IOLTA-compliant. Around that sits a client portal for sharing bills and taking retainers, conflict checking at intake, document storage with templates, legal calendaring, and reporting on firm cash flow and staff utilisation.",
      pt: "Faturamento jurídico e gestão de processos na nuvem para escritórios de advocacia e prestadores de serviços profissionais, cobrindo web, mobile e uma extensão do Chrome. Abrange registros de casos e clientes, cronômetros em segundo plano para horas faturáveis e não faturáveis, despesas e pagamentos a fornecedores, faturamento em LEDES e UTBMS com emissões recorrentes e em lote, e contas de custódia mantidas em conformidade com o IOLTA. Em torno disso ficam um portal do cliente para enviar faturas e receber honorários antecipados, verificação de conflitos na entrada, armazenamento de documentos com modelos, agenda jurídica e relatórios de fluxo de caixa e de aproveitamento da equipe.",
      es: "Facturación legal y gestión de casos en la nube para despachos de abogados y proveedores de servicios profesionales, con web, móvil y una extensión de Chrome. Cubre expedientes de casos y clientes, cronómetros en segundo plano para horas facturables y no facturables, gastos y pagos a proveedores, facturación en LEDES y UTBMS con emisiones recurrentes y masivas, y cuentas de fideicomiso conformes con IOLTA. Alrededor se suman un portal del cliente para enviar facturas y cobrar provisiones de fondos, verificación de conflictos en la alta, almacenamiento documental con plantillas, agenda jurídica e informes de flujo de caja y aprovechamiento del equipo.",
    },
    categories: ["web", "mobile"],
    tech: ["React", "Node.js", "React Native", "REST APIs", "PostgreSQL/MySQL", "Chrome Extension"],
    link: "https://www.casefox.com",
    images: ["casefox-1.webp", "casefox-2.webp", "casefox-3.webp", "casefox-4.webp", "casefox-5.webp", "casefox-6.webp"],
  },
  {
    slug: "vacation-calendar",
    title: "Vacation Calendar",
    tagline: {
      en: "Shared calendar for a co-owned holiday home (Web + iOS/Android)",
      pt: "Calendário compartilhado para casa de férias em copropriedade (Web + iOS/Android)",
      es: "Calendario compartido para casa de vacaciones en copropiedad (Web + iOS/Android)",
    },
    description: {
      en: "A private site and shared calendar for families who co-own a holiday home, replacing the group chat and the spreadsheet. Members book their stays against scheduling windows, maximum-stay limits and overlap rules, with administrator approval before a booking lands and an automatic email once it does. Rooms are assigned per stay, external bookings import from Airbnb and VRBO by iCal and export to Google, Apple and Outlook, and shared costs are logged with receipts and exported for settling up. Document storage, a photo album, house blog, bulletin board and guest book sit alongside, with Administrator, Scheduler and Guest roles across web, iPhone and Android.",
      pt: "Um site privado e calendário compartilhado para famílias que dividem uma casa de férias, no lugar do grupo de mensagens e da planilha. Os membros reservam suas estadias respeitando janelas de agendamento, limites de duração e regras de sobreposição, com aprovação do administrador antes de a reserva entrar e e-mail automático assim que entra. Os quartos são atribuídos por estadia, reservas externas são importadas do Airbnb e do VRBO por iCal e exportadas para Google, Apple e Outlook, e as despesas comuns são registradas com comprovantes e exportadas para o acerto de contas. Armazenamento de documentos, álbum de fotos, blog da casa, mural de avisos e livro de visitas completam o conjunto, com perfis de Administrador, Organizador e Convidado na web, no iPhone e no Android.",
      es: "Un sitio privado y calendario compartido para familias que comparten una casa de vacaciones, en lugar del grupo de mensajes y la hoja de cálculo. Los miembros reservan sus estancias respetando ventanas de reserva, límites de duración y reglas de solapamiento, con aprobación del administrador antes de que la reserva entre y correo automático en cuanto lo hace. Las habitaciones se asignan por estancia, las reservas externas se importan de Airbnb y VRBO por iCal y se exportan a Google, Apple y Outlook, y los gastos comunes se registran con recibos y se exportan para ajustar cuentas. Almacenamiento de documentos, álbum de fotos, blog de la casa, tablón de anuncios y libro de visitas completan el conjunto, con perfiles de Administrador, Organizador e Invitado en web, iPhone y Android.",
    },
    categories: ["web", "mobile"],
    tech: ["Flutter", "Firebase", "React", "Node.js", "TypeScript", "PostgreSQL"],
    link: "https://www.thevacationcalendar.com",
    images: ["vacation-calendar-1.webp"],
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
      en: "A large-scale multi-vendor marketplace connecting independent retailers with brands and wholesalers. Worked on backend systems and API-driven architecture: the order lifecycle from basket to fulfilment, wholesale pricing and terms, and the payment and commission flows that split every transaction between the platform and the seller. Built for high transaction volume across a large catalogue and a long tail of independent brands, where payout correctness matters as much as throughput.",
      pt: "Um marketplace multivendedor de grande porte que conecta varejistas independentes a marcas e atacadistas. Atuei nos sistemas de backend e na arquitetura orientada a APIs: o ciclo de vida do pedido do carrinho à entrega, os preços e condições de atacado e os fluxos de pagamento e comissões que dividem cada transação entre a plataforma e o vendedor. Construído para alto volume transacional em um catálogo extenso e uma cauda longa de marcas independentes, onde a exatidão dos repasses pesa tanto quanto a vazão.",
      es: "Un marketplace multivendedor de gran escala que conecta a minoristas independientes con marcas y mayoristas. Trabajé en los sistemas de backend y en la arquitectura orientada a APIs: el ciclo de vida del pedido desde el carrito hasta la entrega, los precios y condiciones mayoristas y los flujos de pago y comisiones que reparten cada transacción entre la plataforma y el vendedor. Construido para alto volumen transaccional sobre un catálogo amplio y una cola larga de marcas independientes, donde la exactitud de las liquidaciones importa tanto como el rendimiento.",
    },
    categories: ["web", "mobile"],
    tech: ["TypeScript", "React", "Node.js", "React Native", "PostgreSQL", "Microservices", "REST APIs", "AWS"],
    link: "https://www.faire.com",
    images: ["faire-1.webp", "faire-2.webp", "faire-3.webp", "faire-4.webp", "faire-5.webp", "faire-6.webp"],
  },
  {
    slug: "real-estate-whatsapp-ai-bot",
    title: "Real Estate WhatsApp AI Bot",
    demoWhatsApp: "+598 99 114 872",
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
    images: ["real-estate-whatsapp-bot-1.webp"],
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
      en: "A SaaS platform that automates bookkeeping for Spanish accountancy and audit practices. Invoices, delivery notes and till receipts are ingested in any format, handwritten included, and run through an OCR/AI pipeline that produces structured accounting entries and works out the tax treatment without templates: VAT and IGIC, intra-community and import operations, reverse charge, equivalence surcharge and withholdings. Around that sit bank reconciliation against configurable rules, duplicate detection, Veri*Factu-compliant electronic invoicing, and a traceable document repository, with entries queued for human review before final posting. Connects to more than twenty accounting systems including Sage, Odoo, Holded and A3.",
      pt: "Uma plataforma SaaS que automatiza a contabilidade para escritórios contábeis e de auditoria na Espanha. Notas fiscais, guias de remessa e cupons são captados em qualquer formato, inclusive manuscritos, e passam por um pipeline de OCR/IA que gera lançamentos contábeis estruturados e determina o tratamento tributário sem modelos: IVA e IGIC, operações intracomunitárias e de importação, inversão do sujeito passivo, regime de equivalência e retenções. Em torno disso ficam a conciliação bancária com regras configuráveis, a detecção de duplicidades, o faturamento eletrônico em conformidade com o Veri*Factu e um repositório documental rastreável, com os lançamentos enfileirados para revisão humana antes do registro final. Conecta-se a mais de vinte sistemas contábeis, entre eles Sage, Odoo, Holded e A3.",
      es: "Una plataforma SaaS que automatiza la contabilidad para asesorías y firmas de auditoría en España. Facturas, albaranes y tickets se capturan en cualquier formato, incluidos los manuscritos, y pasan por un pipeline de OCR/IA que genera asientos contables estructurados y resuelve el tratamiento fiscal sin plantillas: IVA e IGIC, operaciones intracomunitarias y de importación, inversión del sujeto pasivo, recargo de equivalencia y retenciones. Alrededor se suman la conciliación bancaria con reglas configurables, la detección de duplicados, la facturación electrónica conforme a Veri*Factu y un repositorio documental trazable, con los asientos en cola para revisión humana antes del registro final. Se integra con más de veinte sistemas contables, entre ellos Sage, Odoo, Holded y A3.",
    },
    categories: ["ai", "web"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "OCR pipelines", "AWS/GCP", "LLM integration", "NLP"],
    link: "https://inmatic.ai",
    images: ["inmatic-ai-1.webp", "inmatic-ai-2.webp", "inmatic-ai-3.webp", "inmatic-ai-4.webp", "inmatic-ai-5.webp", "inmatic-ai-6.webp"],
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
      en: "An AI-driven outbound sales platform whose agent runs prospecting end to end: sourcing and enriching B2B leads, writing and sending personalised outreach across channels, handling the replies and booking the meeting, consolidating what is normally six separate tools into one. Worked on backend architecture, the lead-enrichment pipelines and the LLM-based message-generation workflow behind campaign orchestration, including the intent signals that decide who gets contacted and when.",
      pt: "Uma plataforma de vendas outbound movida a IA cujo agente conduz a prospecção de ponta a ponta: encontra e enriquece leads B2B, escreve e envia abordagens personalizadas em vários canais, trata as respostas e agenda a reunião, reunindo em um só lugar o que normalmente são seis ferramentas. Atuei na arquitetura de backend, nos pipelines de enriquecimento de leads e no fluxo de geração de mensagens com LLM por trás da orquestração das campanhas, incluindo os sinais de intenção que definem quem é contatado e quando.",
      es: "Una plataforma de ventas outbound impulsada por IA cuyo agente lleva la prospección de principio a fin: encuentra y enriquece leads B2B, escribe y envía mensajes personalizados en varios canales, gestiona las respuestas y agenda la reunión, reuniendo en una sola lo que suelen ser seis herramientas. Trabajé en la arquitectura de backend, los pipelines de enriquecimiento de leads y el flujo de generación de mensajes con LLM detrás de la orquestación de campañas, incluidas las señales de intención que deciden a quién se contacta y cuándo.",
    },
    categories: ["ai"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "Queue systems", "LLM integration (OpenAI/Claude)", "Workflow automation"],
    link: "https://www.artisan.co",
    images: ["artisan-1.webp", "artisan-2.webp", "artisan-3.webp", "artisan-4.webp", "artisan-5.webp", "artisan-6.webp"],
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
      en: "A platform that turns text, source code, uploaded documents or images into professional diagrams through AI-driven parsing and structured generation. It covers more than 210 diagram types, from flowcharts and mind maps to ER, class, network topology and Gantt charts, backed by 700 templates and 26,000 symbols. On top of generation sit a browser-based editor, real-time collaborative editing with comments so a team can work one canvas at once, AI chat, generated SWOT and PEST analyses, and export in a dozen formats.",
      pt: "Uma plataforma que transforma texto, código-fonte, documentos enviados ou imagens em diagramas profissionais, com interpretação por IA e geração estruturada. Cobre mais de 210 tipos de diagrama, de fluxogramas e mapas mentais a diagramas ER, de classes, de topologia de rede e gráficos de Gantt, apoiados por 700 modelos e 26.000 símbolos. Sobre a geração ficam um editor no navegador, edição colaborativa em tempo real com comentários para a equipe trabalhar na mesma tela, chat com IA, análises SWOT e PEST geradas automaticamente e exportação em uma dezena de formatos.",
      es: "Una plataforma que convierte texto, código fuente, documentos subidos o imágenes en diagramas profesionales mediante interpretación con IA y generación estructurada. Abarca más de 210 tipos de diagrama, desde diagramas de flujo y mapas mentales hasta ER, de clases, de topología de red y diagramas de Gantt, con 700 plantillas y 26.000 símbolos detrás. Sobre la generación se suman un editor en el navegador, edición colaborativa en tiempo real con comentarios para que un equipo trabaje sobre un mismo lienzo, chat con IA, análisis SWOT y PEST generados y exportación en una docena de formatos.",
    },
    categories: ["ai", "web"],
    tech: ["Python", "REST APIs"],
    link: "https://www.edraw.ai",
    images: ["edraw-ai-1.webp", "edraw-ai-2.webp", "edraw-ai-3.webp", "edraw-ai-4.webp", "edraw-ai-5.webp", "edraw-ai-6.webp"],
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
      en: "Intelligent symptom checking, triage and clinical decision support. Worked on AI-driven workflows and backend/API performance for a dynamic symptom-checking engine that adapts its questions in real time using probabilistic reasoning and medical knowledge graphs, under the HIPAA and GDPR constraints that govern how patient data is stored, logged and passed between services.",
      pt: "Verificação inteligente de sintomas, triagem e apoio à decisão clínica. Atuei nos fluxos baseados em IA e no desempenho de backend/APIs de um motor de triagem dinâmico que adapta as perguntas em tempo real usando raciocínio probabilístico e grafos de conhecimento médico, sob as exigências de HIPAA e GDPR que regem como os dados do paciente são armazenados, registrados e trafegados entre serviços.",
      es: "Verificación inteligente de síntomas, triaje y apoyo a la decisión clínica. Trabajé en los flujos basados en IA y en el rendimiento del backend/APIs de un motor de triaje dinámico que adapta sus preguntas en tiempo real mediante razonamiento probabilístico y grafos de conocimiento médico, bajo las exigencias de HIPAA y GDPR que rigen cómo se almacenan, registran y transmiten los datos del paciente entre servicios.",
    },
    categories: ["ai", "web"],
    tech: ["Node.js", "Python", "REST APIs"],
    link: "https://infermedica.com",
    images: ["infermedica-1.webp", "infermedica-2.webp", "infermedica-3.webp", "infermedica-4.webp", "infermedica-5.webp", "infermedica-6.webp"],
  },
  {
    slug: "planfy",
    title: "Planfy",
    tagline: {
      en: "Booking, CRM & business management platform",
      pt: "Plataforma de agendamento, CRM e gestão de negócios",
      es: "Plataforma de reservas, CRM y gestión de negocios",
    },
    description: {
      en: "A booking and business-management platform for service businesses. Clients see real-time availability and book themselves in around the clock, by link, QR/NFC or video call, while the business runs staff calendars, the services each person offers and their working hours behind it. Payment is taken online or at the counter, with deposits or full prepayment where no-shows are costly, and automated SMS and email reminders cut them further. A built-in CRM holds the customer database and history, and drives repeat bookings, testimonial requests and SMS and email campaigns, with automated reporting on how the business is performing. Used at high transactional volume across salons, clinics and professional services.",
      pt: "Uma plataforma de agendamento e gestão para empresas de serviços. Os clientes veem a disponibilidade em tempo real e se agendam sozinhos a qualquer hora, por link, QR/NFC ou videochamada, enquanto o negócio administra as agendas da equipe, os serviços que cada pessoa presta e seus horários. O pagamento é feito online ou no balcão, com sinal ou pagamento antecipado integral quando o não comparecimento custa caro, e lembretes automáticos por SMS e e-mail reduzem ainda mais as faltas. Um CRM integrado mantém a base de clientes e seu histórico e impulsiona novos agendamentos, pedidos de depoimento e campanhas por SMS e e-mail, com relatórios automáticos sobre o desempenho do negócio. Usada em alto volume transacional por salões, clínicas e serviços profissionais.",
      es: "Una plataforma de reservas y gestión para empresas de servicios. Los clientes ven la disponibilidad en tiempo real y se reservan solos a cualquier hora, por enlace, QR/NFC o videollamada, mientras el negocio gestiona las agendas del equipo, los servicios que presta cada persona y sus horarios. El cobro se hace online o en mostrador, con señal o pago íntegro por adelantado cuando las ausencias salen caras, y los recordatorios automáticos por SMS y correo las reducen aún más. Un CRM integrado guarda la base de clientes y su historial e impulsa nuevas reservas, solicitudes de reseña y campañas por SMS y correo, con informes automáticos sobre el rendimiento del negocio. Usada con alto volumen transaccional en salones, clínicas y servicios profesionales.",
    },
    categories: ["web"],
    tech: ["React.js", "Laravel", "Angular JS", "Zoho CRM", "Google Maps"],
    link: "https://www.planfy.com",
    images: ["planfy-1.webp", "planfy-2.webp", "planfy-3.webp", "planfy-4.webp", "planfy-5.webp", "planfy-6.webp"],
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
      en: "A Mexican online hardware and tools store selling at wholesale prices across twelve categories, from hand tools to concrete mixers and floor sanders. The work went into product discoverability and conversion: surfacing a large multi-brand catalogue without slowing checkout down, and making the financing legible, since that is what closes the sale in this market. Buy-now-pay-later through Kueski Pay and Aplazo lets customers pay fortnightly with no credit card, cardholders get three, six or nine months interest-free, and delivery is free above a threshold with click-and-collect at the branches.",
      pt: "Uma loja online mexicana de ferramentas e materiais de construção com preços de atacado em doze categorias, de ferramentas manuais a betoneiras e lixadeiras de piso. O trabalho foi em descoberta de produtos e conversão: exibir um catálogo extenso e multimarcas sem tornar o checkout lento e deixar o financiamento claro, porque é ele que fecha a venda nesse mercado. O compre agora e pague depois com Kueski Pay e Aplazo permite pagar quinzenalmente sem cartão de crédito, quem usa cartão tem três, seis ou nove meses sem juros, e o frete é grátis acima de um valor, com retirada na loja.",
      es: "Una tienda online mexicana de herramientas y ferretería con precios mayoristas en doce categorías, desde herramienta manual hasta revolvedoras y pulidoras de piso. El trabajo se centró en el descubrimiento de producto y la conversión: mostrar un catálogo amplio y multimarca sin ralentizar el checkout y dejar clara la financiación, porque es lo que cierra la venta en este mercado. El compra ahora y paga después con Kueski Pay y Aplazo permite pagar de forma quincenal sin tarjeta de crédito, con tarjeta hay tres, seis o nueve meses sin intereses, y el envío es gratis a partir de cierto importe, con recogida en tienda.",
    },
    categories: ["web"],
    tech: ["React", "Tailwind CSS"],
    link: "https://www.tooltown.mx",
    images: ["tooltown-1.webp", "tooltown-2.webp", "tooltown-3.webp", "tooltown-4.webp", "tooltown-5.webp", "tooltown-6.webp"],
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
    images: ["odoo-1.webp"],
  },
];
