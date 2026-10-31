export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  tech: string[];
};

export type ExperienceData = {
  eyebrow: string;
  heading: string;
  items: ExperienceItem[];
};

export const experience: ExperienceData = {
  eyebrow: "Experience",
  heading: "Where I’ve shipped",
  items: [
    {
      id: "climeup",
      role: "Jr Software Engineer",
      company: "Climeup",
      period: "2025 – Present",
      points: [
        "Worked on frontend development for 1 year using React, Vite, MUI, and Redux Toolkit.",
        "Now exploring backend development with NestJS and MongoDB to contribute end-to-end.",
        "Deploying applications on AWS and learning DevOps fundamentals.",
      ],
      tech: ["React", "Redux Toolkit", "NestJS", "MongoDB", "AWS"],
    },
    {
      id: "video-editor",
      role: "Video Editor",
      company: "Others",
      period: "2024 – 2025",
      points: [
        "Edited professional-grade promotional videos using CapCut and DaVinci Resolve.",
        "Specialized in mobile video editing (CapCut).",
      ],
      tech: ["CapCut", "DaVinci Resolve"],
    },
    {
      id: "sri-murugan-cafe",
      role: "Freelance Web Developer",
      company: "Sri Murugan Cafe",
      period: "December 2024",
      points: [
        "Built a fully responsive website for Sri Murugan Cafe using HTML, CSS, JavaScript, and React.",
        "Optimized site performance and SEO, with direct client collaboration on design.",
      ],
      tech: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "pumo",
      role: "React Developer Intern",
      company: "Pumo Technovation, Coimbatore",
      period: "June 2024 – December 2024",
      points: [
        "Built responsive web apps using React, Node.js, Express.js, and MongoDB.",
        "Developed reusable React components and a customer-facing dashboard with the team.",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "GitHub"],
    },
  ],
};
