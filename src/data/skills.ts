export type SkillCategory = {
  id: string;
  label: string;
  color: string; // dot color
  skills: string[];
};

export type SkillsData = {
  eyebrow: string;
  heading: string;
  subheading: string;
  categories: SkillCategory[];
};

export const skills: SkillsData = {
  eyebrow: "Skills",
  heading: "The tools I wield",
  subheading: "A floating arsenal of frameworks, languages and ideas.",
  categories: [
    {
      id: "frontend",
      label: "Frontend",
      color: "#3b82f6",
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind",
        "Material UI",
        "Redux",
      ],
    },
    {
      id: "backend",
      label: "Backend",
      color: "#a855f7",
      skills: ["Node.js", "NestJS", "Express", "REST API", "Authentication"],
    },
    {
      id: "database",
      label: "Database",
      color: "#22c55e",
      skills: ["MongoDB"],
    },
    {
      id: "dev-tools",
      label: "Developer Tools",
      color: "#eab308",
      skills: ["Git", "GitHub", "Postman", "Vite", "VS Code"],
    },
    {
      id: "animations",
      label: "Animations",
      color: "#ef4444",
      skills: ["GSAP", "Framer Motion"],
    },
    {
      id: "ai-coding",
      label: "AI-Assisted Development",
      color: "#06b6d4",
      skills: [
        "Prompt Engineering",
        "Claude",
        "ChatGPT",
        "Gemini",
        "Debugging with AI",
        "Code Review with AI",
        "Problem Solving with AI",
      ],
    },
    {
      id: "ai-creation",
      label: "AI Image & Video Creation",
      color: "#ec4899",
      skills: [
        "Google Flow",
        "AI Image Generation",
        "AI Video Generation",
        "Creative Prompting",
      ],
    },
    {
      id: "local-ai",
      label: "Local AI",
      color: "#f97316",
      skills: ["Ollama", "Running LLMs Locally", "Local Model Experiments"],
    },
    {
      id: "deploy",
      label: "Deploy Tools (Amateur)",
      color: "#f43f5e",
      skills: ["Vercel", "Netlify", "Render"],
    },
  ],
};
