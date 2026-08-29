export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  source: string;
  rating: number;
  /** Filename expected in /public/testimonials/ — drop a real, permitted photo in with this name. */
  avatarFile: string;
}

// Names/quotes below are only included where a name, quote and rating could be verified
// together against an actual platform review screenshot. Everything else is credited
// generically rather than guessed.
export const testimonials: Testimonial[] = [
  {
    quote:
      "É muito profissional e talentoso, e com certeza estaríamos trabalhando novamente aqui no Workana, tivemos uma experiência ótima com seu trabalho pontual e eficiente.",
    name: "Visão Na Web BR",
    role: "Fullstack Marketplace Project",
    source: "Workana",
    rating: 5,
    avatarFile: "marcos.jpg",
  },
  {
    quote:
      "Completó correctamente el primer hito del proyecto, incluyendo la configuración del repositorio, estructura inicial del backend y frontend, configuración del entorno y transferencia del código a mi repositorio. La comunicación fue excelente.",
    name: "Gabriel Londero",
    role: "Marketplace Architecture Project",
    source: "Workana",
    rating: 5,
    avatarFile: "inigo-toledo.jpg",
  },
  {
    quote:
      "Excelente trabajo, muy recomendable. Demostró conocimiento en el área. Cumplió con todos los plazos.",
    name: "Agustín Quintana",
    role: "Real Estate Automation Project",
    source: "Workana",
    rating: 5,
    avatarFile: "agustin-quintana.jpg",
  },
  {
    quote: "The best programmer in the world by far.",
    name: "Julian",
    role: "Upwork",
    source: "Upwork",
    rating: 5,
    avatarFile: "julian.jpg",
  },
  {
    quote:
      "Excellent professional! He developed a complete financial agent system integrating n8n, Supabase and WhatsApp with artificial intelligence. The work was very well structured, with functional workflows, an optimized database and a professional dashboard. Clear communication, respected deadlines, and a great ability to solve complex problems.",
    name: "Daniel",
    role: "AI Automation Project",
    source: "Upwork",
    rating: 5,
    avatarFile: "daniel.jpg",
  },
  {
    quote:
      "Perfectionist. He fully understands the work he has to do and improves upon it.",
    name: "Pablo",
    role: "Upwork",
    source: "Upwork",
    rating: 5,
    avatarFile: "pablo.jpg",
  },
];
