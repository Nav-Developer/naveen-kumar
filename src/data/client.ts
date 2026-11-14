// Place at: src/data/clients.ts
// Add one object per client. `logo` can be an imported image or a URL string.
// If you leave `logo` empty, the client's name is shown as text instead.

import assets from "@/assets";

// import b8c from "@/assets/clients/b8c.png";

export type Client = {
  id: string;
  name: string;
  logo?: string | import("next/image").StaticImageData;
  url?: string;
};

export const clients: {
  eyebrow: string;
  heading: string;
  subheading: string;

  movable: boolean;
  items: Client[];
} = {
  eyebrow: "CLIENTS",
  heading: "Trusted by great people",
  subheading:
    "A few of the brands and teams I've had the pleasure to work with.",
  movable: false,
  items: [
    {
      id: "c1",
      name: "B8C Dance Company",
      logo: assets.clients.b8c_logo,
      url: "https://b8cdancecompany.in",
    },
    {
      id: "c2",
      name: "Sri devi vilas mittai kadai",
      logo: assets.clients.sri_devi_vilas_logo,
      url: "https://sri-devi-vilas-mittai-kadai-xnpg.vercel.app/",
    },
  ],
};
