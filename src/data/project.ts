import assets from "@/assets";
import { StaticImageData } from "next/image";

export type ProjectCat = "Client" | "Personal" | "Invitation";
export type ProjectStatus = "Live" | "In Progress";

export type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  cat: ProjectCat;
  status: ProjectStatus;
  tags: string[];
  image: StaticImageData;
  github: string;
  live: string;
};

export type ProjectsData = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  cats: ("All" | ProjectCat)[];
  items: ProjectItem[];
};

export const projects: ProjectsData = {
  eyebrow: "Work",
  heading: "Featured projects",
  subtitle: "Frontend builds for clients and personal experiments.",
  cats: ["All", "Client", "Personal", "Invitation"],
  items: [
    {
      id: "wedding-invite",
      title: "Digital Wedding Invitation",
      desc: "Animated, mobile-first wedding invitation website with event details, venue and RSVP-style sections. Completed and delivered.",
      cat: "Invitation",
      status: "Live",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      image: assets.images.wedding,
      github: "https://github.com/Nav-Developer/pandi-wedding-invite",
      live: "https://pandi-wedding-invite.vercel.app",
    },
    {
      id: "b8c-dance",
      title: "B8C Dance",
      desc: "Dance studio website for a client with class schedule, instructor profiles and booking system.",
      cat: "Client",
      status: "In Progress",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      image: assets.images.b8c,
      github: "https://github.com/Nav-Developer/b8c-dance",
      live: "https://b8c-dance.vercel.app/",
    },
    {
      id: "sri-devi-vilas-mittai-kadai",
      title: "Sri Devi Vilas Mittai Kadai",
      desc: "Theni Famous Bakery",
      cat: "Client",
      status: "In Progress",
      tags: ["Next.js", "MUI", "Tailwind", "GSAP", "Sanity"],
      image: assets.images.SDVMK,
      github: "https://github.com/Nav-Developer/the-hot-chicks",
      live: "https://sri-devi-vilas-mittai-kadai-xnpg.vercel.app/",
    },
    {
      id: "influencer-portfolio",
      title: "Influencer Portfolio",
      desc: "Influencer Portfolio.",
      cat: "Personal",
      status: "Live",
      tags: ["Next", "TypeScript", "Tailwind"],
      image: assets.images.santhosh,
      github: "https://github.com/Nav-Developer/santhosh-prem",
      live: "https://santhosh-prem-txg4.vercel.app/",
    },
    {
      id: "trainer-portfolio",
      title: "Trainer Portfolio",
      desc: "Personal Trainer Portfolio.",
      cat: "Personal",
      status: "Live",
      tags: ["Next", "TypeScript", "Tailwind"],
      image: assets.images.raghu,
      github: "https://github.com/Nav-Developer/raghu-rc",
      live: "https://raghu-rc-w2u1.vercel.app/",
    },
    // {
    //   id: "hot-chicks",
    //   title: "The Hot Chicks",
    //   desc: "Pop-art restaurant website for a client with animated hero, story scroll and bold brand-color theming.",
    //   cat: "Client",
    //   status: "In Progress",
    //   tags: ["Next.js", "MUI", "Tailwind", "GSAP"],
    //   image: assets.images.hot_chicks,
    //   github: "https://github.com/Nav-Developer/the-hot-chicks",
    //   live: "https://the-hot-chicks.vercel.app",
    // },
    // {
    //   id: "broffles",
    //   title: "Broffles The Waffle",
    //   desc: "Waffle shop website for a client with menu, gallery and enquiry flow.",
    //   cat: "Client",
    //   status: "In Progress",
    //   tags: ["Next.js", "TypeScript", "Tailwind"],
    //   image: assets.images.broffles,
    //   github: "https://github.com/Nav-Developer/broffles-the-waffle-",
    //   live: "https://broffles-the-waffle.vercel.app",
    // },
    // {
    //   id: "sri-murugan-cafe",
    //   title: "Sri Murugan Cafe",
    //   desc: "Cafe website for a client with video background, Instagram reels carousel and responsive layout.",
    //   cat: "Client",
    //   status: "In Progress",
    //   tags: ["Next.js", "Swiper", "Tailwind"],
    //   image: assets.images.murugan,
    //   github: "https://github.com/Nav-Developer/sri-murugan-cafe",
    //   live: "https://sri-murugan-cafe-kappa.vercel.app",
    // },

    {
      id: "demo-portfolio",
      title: "Demo Portfolio",
      desc: "Earlier portfolio build with contact form wired to a backend POST endpoint.",
      cat: "Personal",
      status: "Live",
      tags: ["React", "TypeScript", "Tailwind"],
      image: assets.images.portfolio,
      github: "https://github.com/Nav-Developer/main-portfolio",
      live: "https://main-portfolio-three-orcin.vercel.app",
    },
  ],
};
