import type { Locale, Localized } from "@/i18n/config";

export interface Testimonial {
  /** The review in each language. */
  quote: Localized;
  /**
   * The locale holding the client's verbatim wording. The other two are translations of it.
   * Nothing is lost: a visitor reading in the client's own language sees exactly what they wrote.
   */
  originalLocale: Locale;
  name: string;
  role: string;
  source: string;
  rating: number;
  /** Filename expected in /public/testimonials/. Drop a real, permitted photo in with this name. */
  avatarFile: string;
}

// Names/quotes below are only included where a name, quote and rating could be verified
// together against an actual platform review screenshot. Everything else is credited
// generically rather than guessed.
export const testimonials: Testimonial[] = [
  {
    quote: {
      pt: "É muito profissional e talentoso, e com certeza estaríamos trabalhando novamente aqui no Workana, tivemos uma experiência ótima com seu trabalho pontual e eficiente.",
      en: "He is very professional and talented, and we would certainly work with him again here on Workana. We had a great experience with his punctual and efficient work.",
      es: "Es muy profesional y talentoso, y sin duda volveríamos a trabajar con él aquí en Workana. Tuvimos una experiencia excelente con su trabajo puntual y eficiente.",
    },
    originalLocale: "pt",
    name: "Visão Na Web BR",
    role: "Fullstack Marketplace Project",
    source: "Workana",
    rating: 5,
    avatarFile: "marcos.jpg",
  },
  {
    quote: {
      es: "Completó correctamente el primer hito del proyecto, incluyendo la configuración del repositorio, estructura inicial del backend y frontend, configuración del entorno y transferencia del código a mi repositorio. La comunicación fue excelente.",
      en: "He correctly completed the first milestone of the project, including repository setup, the initial backend and frontend structure, environment configuration and transferring the code to my repository. Communication was excellent.",
      pt: "Concluiu corretamente o primeiro marco do projeto, incluindo a configuração do repositório, a estrutura inicial do backend e do frontend, a configuração do ambiente e a transferência do código para o meu repositório. A comunicação foi excelente.",
    },
    originalLocale: "es",
    name: "Gabriel Londero",
    role: "Marketplace Architecture Project",
    source: "Workana",
    rating: 5,
    avatarFile: "inigo-toledo.jpg",
  },
  {
    quote: {
      es: "Excelente trabajo, muy recomendable. Demostró conocimiento en el área. Cumplió con todos los plazos.",
      en: "Excellent work, highly recommended. He demonstrated real expertise in the area and met every deadline.",
      pt: "Excelente trabalho, muito recomendável. Demonstrou conhecimento na área e cumpriu todos os prazos.",
    },
    originalLocale: "es",
    name: "Agustín Quintana",
    role: "Real Estate Automation Project",
    source: "Workana",
    rating: 5,
    avatarFile: "agustin-quintana.jpg",
  },
  {
    quote: {
      en: "The best programmer in the world by far.",
      pt: "De longe, o melhor programador do mundo.",
      es: "De lejos, el mejor programador del mundo.",
    },
    originalLocale: "en",
    name: "Julian",
    role: "Upwork",
    source: "Upwork",
    rating: 5,
    avatarFile: "julian.jpg",
  },
  {
    quote: {
      en: "Excellent professional! He developed a complete financial agent system integrating n8n, Supabase and WhatsApp with artificial intelligence. The work was very well structured, with functional workflows, an optimized database and a professional dashboard. Clear communication, respected deadlines, and a great ability to solve complex problems.",
      pt: "Excelente profissional! Desenvolveu um sistema completo de agente financeiro integrando n8n, Supabase e WhatsApp com inteligência artificial. O trabalho foi muito bem estruturado, com fluxos funcionais, um banco de dados otimizado e um dashboard profissional. Comunicação clara, prazos respeitados e uma grande capacidade de resolver problemas complexos.",
      es: "¡Excelente profesional! Desarrolló un sistema completo de agente financiero integrando n8n, Supabase y WhatsApp con inteligencia artificial. El trabajo estuvo muy bien estructurado, con flujos funcionales, una base de datos optimizada y un panel profesional. Comunicación clara, plazos respetados y una gran capacidad para resolver problemas complejos.",
    },
    originalLocale: "en",
    name: "Daniel",
    role: "AI Automation Project",
    source: "Upwork",
    rating: 5,
    avatarFile: "daniel.jpg",
  },
  {
    quote: {
      en: "Perfectionist. He fully understands the work he has to do and improves upon it.",
      pt: "Perfeccionista. Entende completamente o trabalho que precisa fazer e ainda o aprimora.",
      es: "Perfeccionista. Entiende por completo el trabajo que tiene que hacer y además lo mejora.",
    },
    originalLocale: "en",
    name: "Pablo",
    role: "Upwork",
    source: "Upwork",
    rating: 5,
    avatarFile: "pablo.jpg",
  },
];
