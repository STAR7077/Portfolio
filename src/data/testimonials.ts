import type { Locale, Localized } from "@/i18n/config";

/**
 * Countries appear in the reach dictionary already, translated into all three
 * languages for the globe. Pointing at those keys rather than storing a plain
 * string means a Spanish visitor reads "Dinamarca", not "Denmark".
 */
export type CountryKey =
  | "brazil"
  | "spain"
  | "argentina"
  | "uruguay"
  | "denmark"
  | "unitedStates";

export interface Testimonial {
  /** The review in each language. */
  quote: Localized;
  /**
   * The locale holding the client's verbatim wording. The other two are translations of it.
   * Nothing is lost: a visitor reading in the client's own language sees exactly what they wrote.
   */
  originalLocale: Locale;
  name: string;
  /** Job title and company, for the clients who gave one. */
  role?: string;
  country: CountryKey;
  /** The platform the review was left on, where it is known. */
  source?: string;
  rating: number;
  /** Filename expected in /public/testimonials/. Drop a real, permitted photo in with this name. */
  avatarFile: string;
}

// Quotes and ratings come from actual platform reviews. The full names, job
// titles and countries were supplied by Lucas, who knows these clients, rather
// than inferred from the review screenshots.
export const testimonials: Testimonial[] = [
  {
    quote: {
      pt: "É muito profissional e talentoso, e com certeza estaríamos trabalhando novamente aqui no Workana, tivemos uma experiência ótima com seu trabalho pontual e eficiente.",
      en: "He is very professional and talented, and we would certainly work with him again here on Workana. We had a great experience with his punctual and efficient work.",
      es: "Es muy profesional y talentoso, y sin duda volveríamos a trabajar con él aquí en Workana. Tuvimos una experiencia excelente con su trabajo puntual y eficiente.",
    },
    originalLocale: "pt",
    name: "Marcos Nazareth Souza",
    country: "brazil",
    source: "Workana",
    rating: 5,
    avatarFile: "marcos.webp",
  },
  {
    quote: {
      es: "Completó correctamente el primer hito del proyecto, incluyendo la configuración del repositorio, estructura inicial del backend y frontend, configuración del entorno y transferencia del código a mi repositorio. La comunicación fue excelente.",
      en: "He correctly completed the first milestone of the project, including repository setup, the initial backend and frontend structure, environment configuration and transferring the code to my repository. Communication was excellent.",
      pt: "Concluiu corretamente o primeiro marco do projeto, incluindo a configuração do repositório, a estrutura inicial do backend e do frontend, a configuração do ambiente e a transferência do código para o meu repositório. A comunicação foi excelente.",
    },
    originalLocale: "es",
    name: "Iñigo Toledo",
    role: "CEO, Barracuda Yacht Design",
    country: "spain",
    source: "Workana",
    rating: 5,
    avatarFile: "inigo-toledo.webp",
  },
  {
    quote: {
      en: "An amazing professional! The project far exceeded expectations. He was quick to provide solutions and introduced innovations within the initial scope. Fantastic!",
      pt: "Um profissional incrível! O projeto superou em muito as expectativas. Foi rápido em apresentar soluções e trouxe inovações dentro do escopo inicial. Fantástico!",
      es: "¡Un profesional increíble! El proyecto superó con creces las expectativas. Fue rápido para aportar soluciones e introdujo innovaciones dentro del alcance inicial. ¡Fantástico!",
    },
    originalLocale: "en",
    name: "Craig Austin",
    role: "CEO, Stagecraft",
    country: "unitedStates",
    rating: 5,
    avatarFile: "craig-austin.webp",
  },
  {
    quote: {
      es: "Excelente trabajo, muy recomendable. Demostró conocimiento en el área. Cumplió con todos los plazos.",
      en: "Excellent work, highly recommended. He demonstrated real expertise in the area and met every deadline.",
      pt: "Excelente trabalho, muito recomendável. Demonstrou conhecimento na área e cumpriu todos os prazos.",
    },
    originalLocale: "es",
    name: "Agustín Quintana",
    country: "uruguay",
    source: "Workana",
    rating: 5,
    avatarFile: "agustin-quintana.webp",
  },
  {
    quote: {
      en: "The best programmer in the world by far.",
      pt: "De longe, o melhor programador do mundo.",
      es: "De lejos, el mejor programador del mundo.",
    },
    originalLocale: "en",
    name: "Julián Bracamonte",
    country: "argentina",
    source: "Upwork",
    rating: 5,
    avatarFile: "julian.webp",
  },
  {
    quote: {
      en: "Excellent professional! He developed a complete financial agent system integrating n8n, Supabase and WhatsApp with artificial intelligence. The work was very well structured, with functional workflows, an optimized database and a professional dashboard. Clear communication, respected deadlines, and a great ability to solve complex problems.",
      pt: "Excelente profissional! Desenvolveu um sistema completo de agente financeiro integrando n8n, Supabase e WhatsApp com inteligência artificial. O trabalho foi muito bem estruturado, com fluxos funcionais, um banco de dados otimizado e um dashboard profissional. Comunicação clara, prazos respeitados e uma grande capacidade de resolver problemas complexos.",
      es: "¡Excelente profesional! Desarrolló un sistema completo de agente financiero integrando n8n, Supabase y WhatsApp con inteligencia artificial. El trabajo estuvo muy bien estructurado, con flujos funcionales, una base de datos optimizada y un panel profesional. Comunicación clara, plazos respetados y una gran capacidad para resolver problemas complejos.",
    },
    originalLocale: "en",
    name: "Daniel Baven",
    role: "Co-founder & CEO, Noahs",
    country: "denmark",
    source: "Upwork",
    rating: 5,
    avatarFile: "daniel.webp",
  },
  {
    quote: {
      en: "Perfectionist. He fully understands the work he has to do and improves upon it.",
      pt: "Perfeccionista. Entende completamente o trabalho que precisa fazer e ainda o aprimora.",
      es: "Perfeccionista. Entiende por completo el trabajo que tiene que hacer y además lo mejora.",
    },
    originalLocale: "en",
    name: "Pablo Alvarez Blanco",
    role: "CEO, EuroEscalator Solutions SL",
    country: "spain",
    source: "Upwork",
    rating: 5,
    avatarFile: "pablo.webp",
  },
];
