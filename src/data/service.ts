export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string; // key into the icon map in ServicesPage.tsx
};

export type CreatorItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services = {
  eyebrow: "Services",
  heading: "What I can build for you (with AI Assist)",
  subheading: "Premium engineering, freelance-friendly pricing.",
  items: [
    {
      id: "web",
      title: "Web Development",
      description: "Marketing sites and apps built for speed.",
      price: "$1+",
      icon: "web",
    },
    {
      id: "video",
      title: "Video Editing",
      description: "Video to boost the commercial.",
      price: "$1+",
      icon: "video",
    },
    {
      id: "fullstack",
      title: "Full Stack Development",
      description: "End-to-end MERN / NestJS products.",
      price: "$1+",
      icon: "fullstack",
    },
    {
      id: "react",
      title: "React Development",
      description: "Component libraries, dashboards, SPAs.",
      price: "$1+",
      icon: "react",
    },
    {
      id: "api",
      title: "API Development",
      description: "REST APIs with auth and rate-limits.",
      price: "$1+",
      icon: "api",
    },
    {
      id: "ui",
      title: "UI Development",
      description: "Pixel-perfect Figma → React conversions.",
      price: "$1+",
      icon: "ui",
    },
    {
      id: "portfolio",
      title: "Portfolio Websites",
      description: "Premium creator portfolios that convert.",
      price: "$1+",
      icon: "portfolio",
    },
    {
      id: "landing",
      title: "Landing Pages",
      description: "High-conversion launches in days.",
      price: "$1+",
      icon: "landing",
    },
  ] as ServiceItem[],
};

export const creatorHub = {
  eyebrow: "Creator Hub",
  heading: "Beyond Code",
  subheading: "A future ecosystem of content, products and craft.",
  items: [
    {
      id: "c-video",
      title: "Video Editing",
      description: "Cinematic cuts for creators.",
      icon: "video",
    },
    {
      id: "c-fitness",
      title: "Fitness & Workout",
      description: "Strength routines that actually stick.",
      icon: "fitness",
    },
    {
      id: "c-nutrition",
      title: "Nutrition Tips",
      description: "Macro-friendly meal planning.",
      icon: "nutrition",
    },
    {
      id: "c-cooking",
      title: "Cooking",
      description: "Fast, healthy, delicious.",
      icon: "cooking",
    },
    {
      id: "c-tutorials",
      title: "Coding Tutorials",
      description: "Bite-size, deeply practical.",
      icon: "tutorials",
    },
    {
      id: "c-productivity",
      title: "Productivity",
      description: "Deep work systems that ship.",
      icon: "productivity",
    },
    {
      id: "c-tech",
      title: "Tech Content",
      description: "Honest reviews and breakdowns.",
      icon: "tech",
    },
    {
      id: "c-journey",
      title: "Learning Journey",
      description: "Documenting the climb.",
      icon: "journey",
    },
  ] as CreatorItem[],
};
