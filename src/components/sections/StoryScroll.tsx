"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { chapters } from "@/data/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 3;

const RUNNER_GIF = "https://placehold.co/120x160/png?text=Runner";

const WALL = ["Labels", "Doubt", "Mocking", "Limits", "Fear"];

export default function StoryScroll() {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const runner = useRef<HTMLDivElement>(null);
  const ground = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // chapter 1
  const wall = useRef<HTMLDivElement>(null);
  const wallPieces = useRef<(HTMLDivElement | null)[]>([]);

  // chapter 2
  const net = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        pin: stage.current,
        pinSpacing: false,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // ground scrolls left the whole time (runner stays fixed)
      tl.to(
        ground.current,
        { backgroundPositionX: "-4000px", duration: chapters.length },
        0,
      );

      // ---------- chapter 1 (0 to 1): wall comes, then breaks ----------
      tl.to(
        wall.current,
        { x: () => -window.innerWidth * 0.2, duration: 0.6 },
        0,
      );

      wallPieces.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          {
            x: 250 + i * 60,
            y: (i - 2) * 160,
            rotation: (i - 2) * 45,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0.6,
        );
      });

      // ---------- chapter 2 (1 to 2): net, ball, jump ----------
      tl.fromTo(
        net.current,
        { opacity: 0, x: 300 },
        { opacity: 1, x: 0, duration: 0.5 },
        1,
      );
      tl.to(net.current, { opacity: 0, duration: 0.2 }, 1.8);

      // ball appears and flies over the net
      tl.set(ball.current, { opacity: 1 }, 1.2);
      tl.to(ball.current, { x: 350, duration: 0.8 }, 1.2);
      tl.to(ball.current, { y: -220, duration: 0.4, ease: "power2.out" }, 1.2);
      tl.to(ball.current, { y: 0, duration: 0.4, ease: "power2.in" }, 1.6);
      tl.to(ball.current, { opacity: 0, duration: 0.1 }, 1.9);

      // runner jumps in the middle of chapter 2
      tl.to(
        runner.current,
        { y: -160, duration: 0.2, ease: "power2.out" },
        1.4,
      );
      tl.to(runner.current, { y: 0, duration: 0.2, ease: "power2.in" }, 1.6);

      // ---------- text for every chapter ----------
      chapters.forEach((_, i) => {
        const el = textRefs.current[i];
        if (!el) return;
        if (i > 0) tl.to(el, { opacity: 1, duration: 0.3 }, i);
        if (i < chapters.length - 1)
          tl.to(el, { opacity: 0, duration: 0.3 }, i + 0.7);
      });
    },
    { scope: container },
  );

  return (
    <Box
      ref={container}
      sx={{ height: `${chapters.length * STEP * 100}vh`, position: "relative" }}
    >
      <Box
        ref={stage}
        sx={{
          height: "100vh",
          bgcolor: "#111",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ground */}
        <Box
          ref={ground}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 80,
            background:
              "repeating-linear-gradient(90deg, #333 0 40px, #222 40px 80px)",
          }}
        />

        {/* chapter text */}
        {chapters.map((chapter, i) => (
          <Box
            key={chapter.id}
            ref={(el: HTMLDivElement | null) => {
              textRefs.current[i] = el;
            }}
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              pt: "10vh",
              textAlign: "center",
              px: 3,
              opacity: i === 0 ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              {chapter.title}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700 }}>
              {chapter.text}
            </Typography>
          </Box>
        ))}

        {/* chapter 1: wall */}
        <Box
          ref={wall}
          sx={{
            position: "absolute",
            left: "60%",
            bottom: 80,
            zIndex: 1,
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {WALL.map((label, i) => (
            <Box
              key={label}
              ref={(el: HTMLDivElement | null) => {
                wallPieces.current[i] = el;
              }}
              sx={{
                width: 140,
                height: 70,
                bgcolor: "#b23a48",
                border: "2px solid #111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {/* chapter 2: net */}
        <Box
          ref={net}
          sx={{
            position: "absolute",
            left: "65%",
            bottom: 80,
            zIndex: 1,
            width: 12,
            height: 240,
            bgcolor: "#eee",
            opacity: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 12,
              width: 160,
              height: 90,
              border: "2px solid #eee",
            },
          }}
        />

        {/* chapter 2: ball */}
        <Box
          ref={ball}
          sx={{
            position: "absolute",
            left: "28%",
            bottom: 140,
            zIndex: 1,
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "#f4d35e",
            opacity: 0,
          }}
        />

        {/* runner (gif placeholder) */}
        <Box
          ref={runner}
          sx={{
            position: "absolute",
            left: "20%",
            bottom: 80,
            zIndex: 1,
            width: 120,
            height: 160,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RUNNER_GIF}
            alt="runner"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
