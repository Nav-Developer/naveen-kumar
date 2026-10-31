export type OrbitRing = {
  radius: number; // px, inside a 460px stage
  duration: number; // seconds per full rotation
  reverse?: boolean;
  nodes: string[];
};

export const techStack = {
  eyebrow: "Tech Stack",
  heading: "React at the center",
  subheading: "The orbit of tools that keep me shipping.",
  center: "React",
  rings: [
    { radius: 88, duration: 28, nodes: ["JS", "HTML", "CSS", "TS"] },
    {
      radius: 148,
      duration: 42,
      reverse: true,
      nodes: ["Mongo", "Express", "REST", "Node", "Nest"],
    },
    {
      radius: 205,
      duration: 60,
      nodes: ["GSAP", "Framer", "Redux", "Git", "Vite", "Tailwind"],
    },
  ] as OrbitRing[],
};

export type NumberStat = {
  value: number;
  suffix?: string;
  label: string;
};

export const numbers = {
  eyebrow: "Milestones",
  heading: "By the numbers",
  stats: [
    { value: 10, suffix: "+", label: "Projects" },
    { value: 1200, suffix: "+", label: "Commits" },
    { value: 22, label: "Technologies" },
    { value: 3500, suffix: "+", label: "Learning Hours" },
    { value: 2, label: "Certificates" },
    { value: 999, suffix: "+", label: "Future Goals" },
  ] as NumberStat[],
};
