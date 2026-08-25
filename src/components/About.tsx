import SectionHeading from "./SectionHeading";

const skills = [
  "Node.js",
  "Python",
  "React",
  "Next.js",
  "TypeScript",
  "Django",
  "PostgreSQL",
  "Redis",
  "React Native",
  "Flutter",
  "OpenAI / LLMs",
  "Docker / AWS",
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Introduction" title="Overview." />

        <div className="max-w-3xl space-y-5 text-slate-300 leading-relaxed">
          <p>
            I&apos;m a full-stack and AI automation developer. Over the past several years I&apos;ve worked
            across SaaS platforms, marketplaces, mobile apps and AI-agent systems — usually joining as
            the engineer who turns a manual, messy process into something automated, reliable and easy
            to operate.
          </p>
          <p>
            On the backend I work mainly in Node.js and Python, with Django, REST APIs, PostgreSQL,
            Redis and queue-driven architectures. On the AI side I build LLM-integrated workflows —
            document/OCR pipelines, WhatsApp and chat agents, outbound automation, and classification
            systems using OpenAI, Gemini and Claude. On the frontend and mobile side I work in React,
            Next.js, TypeScript, React Native and Flutter, and I&apos;ve shipped production apps in
            no-code tools like Bubble.io when speed-to-market mattered more than a custom stack.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
