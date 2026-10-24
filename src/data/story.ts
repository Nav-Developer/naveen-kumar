import assets from "@/assets";
import type { StaticImageData } from "next/image";

export type Chapter = {
  id: number;
  title: string;
  text: string;
  mood: string;
  runner:
    | "walk"
    | "run"
    | "jump"
    | "dribble"
    | "lift"
    | "stop"
    | "night"
    | "ride"
    | "study"
    | "build";
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Kid They Underestimated",
    text: "As a kid, I got bullied for my color and my look. I decided to break out of it, step outside, and beat them at everything.",
    mood: "#1b1b2f",
    runner: "walk",
  },
  {
    id: 2,
    title: "Short, But I Can Jump",
    text: "In early higher secondary they said I couldn't play volleyball because I was short. I focused on my jump and proved them wrong. I played for the school team for 6-7 years, became an all-rounder, and finished in the top 20 in the 10th public exam.",
    mood: "#162447",
    runner: "jump",
  },
  {
    id: 3,
    title: "No Team, So I Switched Games",
    text: "In higher secondary there weren't enough players for a volleyball team, and people said I couldn't focus on studies. I joined basketball, struggled, learned the game and the discipline, and still finished top 5 in my school in studies.",
    mood: "#1f4068",
    runner: "dribble",
  },
  {
    id: 4,
    title: "The Uniform I Didn't Wear",
    text: "After school I wanted to join the defence and trained hard for the army. My family didn't allow it, because my uncle and grandfather had already served. I agreed and chose BE ECE.",
    mood: "#2d4a22",
    runner: "stop",
  },
  {
    id: 5,
    title: "Iron and Stage",
    text: "In college I didn't care about studies. I focused on the gym and built a strong physique. I competed in Mr South India and won a participation award. Among unnatural builders, I was the only natty in the 60 kg category.",
    mood: "#3d1e1e",
    runner: "lift",
  },
  {
    id: 6,
    title: "The President",
    text: "In final year my department chose me as president. I organised college events and the IV for juniors. I treated them as my brothers and sisters, and they treated me like an elder brother.",
    mood: "#4a3b1a",
    runner: "run",
  },
  {
    id: 7,
    title: "The Hard Phase",
    text: "I got stuck in between and didn't want to tell my family. I stepped out and did a part-time job at KFC, waking up at 3 AM. It felt like hell, but I kept learning and got selected as a technical engineer at one company.",
    mood: "#0f0f0f",
    runner: "night",
  },
  {
    id: 8,
    title: "Quit, Learn, Survive",
    text: "That job wasn't what I wanted, so I worked 4 months and quit. I spent 5 months learning software and rode Rapido bike taxi for expenses. After 4+ interviews I got selected. I was scared, and for 3 months I leaned on AI. My senior told me to stop, and he was right. I realised I knew nothing without it.",
    mood: "#1a1a40",
    runner: "ride",
  },
  {
    id: 9,
    title: "Learning the Real Way",
    text: "I started reading the docs first and analysing code myself. It took more time, but now I feel confident even without AI. I now have 1.6+ years of experience, and I invest my time in learning.",
    mood: "#0b3d3a",
    runner: "study",
  },
  {
    id: 10,
    title: "Freelance Begins",
    text: "I reached out to 3 vendors and promised to build their websites for free. One of them showed interest, then stopped replying. I didn't get demotivated. I started my portfolio and moved on with the other two.",
    mood: "#3a1c5c",
    runner: "build",
  },
  {
    id: 11,
    title: "To Be Continued...",
    text: "Right now I have more confidence, and I'm learning AI the right way. The story is still running.",
    mood: "#0d0d0d",
    runner: "run",
  },
];
