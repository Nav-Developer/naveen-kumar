import assets from "@/assets";

export const blogs = {
  eyebrow: "BLOG",
  heading: "Latest from my Medium",
  subheading:
    "Notes on web development, building products and things I learn along the way.",
  mediumProfile: "https://medium.com/@naveendeveloper07",
  items: [
    {
      id: "blog-1",
      title:
        "Gmail → AI Agent → Telegram/Whatsapp : My First n8n Automation, Step by Step",
      description:
        "Building my first n8n automation by connecting Gmail with an AI Agent to process emails and send smart notifications through Telegram or WhatsApp. A beginner-friendly, step-by-step guide to creating an AI-powered workflow with minimal coding.",
      url: "https://medium.com/@naveendeveloper07/gmail-ai-agent-telegram-whatsapp-my-first-n8n-automation-step-by-step-ada23f119fe5",
      date: "2026-11-06",
      readTime: "11 min read",
      tags: ["n8n", "gmail n8n automation", "workflow automation"],
      image: assets.images.blog1,
    },
    // {
    //   id: "blog-2",
    //   title: "Your second Medium post title",
    //   description:
    //     "Another short summary that makes people curious enough to click.",
    //   url: "https://medium.com/@your-username/your-second-post",
    //   date: "2026-11-02",
    //   readTime: "7 min read",
    //   tags: ["UI", "MUI"],
    //   image: "",
    // },
  ],
};
