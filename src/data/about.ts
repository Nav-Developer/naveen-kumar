export type TimelineItem = {
  id: string;
  title: string;
  year: string;
  description: string;
  details: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type AboutThings = {
  eyebrow: string;
  heading: string;
  image: string;
  imageCaption: string;
  stats: StatItem[];
  timeline: TimelineItem[];
};

export const about: AboutThings = {
  eyebrow: "About",
  heading: "The story behind the code",
  image: "/about/naveen.jpg",
  imageCaption: "Engineer · Creator · Athlete · Traveller ",
  stats: [
    { value: "10+", label: "Projects" },
    { value: "3+", label: "Years Learning" },
    { value: "20+", label: "Technologies" },
    { value: "2", label: "Active Clients" },
    { value: "3", label: "Cups of Coffee" },
  ],

  timeline: [
    {
      id: "first-exposure",
      title: "First Exposure to Coding",
      year: "2020",
      description:
        "My first introduction to programming came during my BE ECE degree, but I had almost zero knowledge of coding.",
      details:
        "During my BE ECE degree, I had subjects related to Data Structures and Algorithms using Java. Honestly, I didn't pay much attention to them at the time, and I barely understood anything about programming. I had no idea how coding worked or how it could become a career. Looking back, this was where my journey technically began, even though I didn't realize its importance back then.",
    },
    {
      id: "learning-dev",
      title: "Discovered Software Development",
      year: "2022",
      description:
        "My friends introduced me to the opportunities in software development and motivated me to explore the IT industry.",
      details:
        "In 2022, my friends started talking about software development and the opportunities available in the IT industry, especially for people interested in technology. They encouraged me to explore this field and explained how a career as a Software Engineer could open up new opportunities. I started learning basic programming concepts and preparing for interviews. At that point, my main goal was to understand enough to get an opportunity in the software industry.",
    },
    {
      id: "web-dev",
      title: "The Decision to Start Over",
      year: "2023–2024",
      description:
        "After my first technical job, I realized I wanted a different path and decided to seriously learn software development.",
      details:
        "Through campus recruitment, I got an opportunity to work in a technical engineering role. I worked there for around four months, but eventually, I realized that the role wasn't the direction I wanted to pursue for my future. I made the difficult decision to quit and join an institute to learn the skills required to enter the IT industry as a Software Engineer. This was the turning point when I started taking software development seriously and building the foundation I had missed earlier.",
    },
    {
      id: "professional",
      title: "My First Software Engineering Role",
      year: "2025",
      description:
        "I joined a startup as a Software Engineer and began turning my learning into real-world experience.",
      details:
        "In mid-2025, I got my opportunity to work as a Software Engineer at a startup. It was exciting to finally work on real projects and apply the skills I had learned. Initially, I relied heavily on AI tools while writing code, and over time, I realized that this approach was affecting how deeply I understood the code I was working with. My senior advised me to focus on writing code independently and strengthening my fundamentals. I took that advice seriously, practiced more, explored application architecture, and started understanding not just how to write code, but why it works.",
    },
    {
      id: "expanding",
      title: "Building Confidence Through Experience",
      year: "2026",
      description:
        "I developed the confidence to learn new technologies independently by reading documentation, experimenting, and solving problems.",
      details:
        "As I gained more practical experience, my mindset started to change. I became more confident in my ability to learn unfamiliar technologies by reading documentation, exploring existing codebases, experimenting, and solving problems independently. Working with technologies like React, TypeScript, and NestJS helped me understand both frontend development and backend concepts. Instead of depending entirely on tutorials or AI-generated code, I began focusing on understanding the underlying concepts and application architecture. I still have a lot to learn, but now I trust my ability to figure things out. By this stage, I had built over two years of coding and learning experience across my journey.",
    },
    {
      id: "freelancing",
      title: "Started My Freelance Journey",
      year: "2026",
      description:
        "I started building websites for freelance clients to keep learning, create real-world products, and grow beyond my full-time job.",
      details:
        "I didn't want to spend my free time without building something meaningful. I believe that in software development, continuous learning is essential to stay relevant and keep growing. Alongside my full-time job, I started my freelance journey and began working on two client website projects. These projects give me opportunities to explore UI design, animations, modern frontend technologies, and the process of building products for real clients. My goal is to keep improving, build a strong portfolio, grow as an independent developer, and eventually create something of my own. For me, this is not the finish line; it's just the beginning of another chapter.",
    },
  ],
};
