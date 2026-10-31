"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { animate, motion, useInView } from "framer-motion";
import { numbers } from "@/data/techStack";
import SectionHeader from "./SectionHeader";

const MotionBox = motion.create(Box);

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-US") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/**
 * Standalone "By the numbers" section. Drop it anywhere:
 *   <NumbersSection />
 * Pass showHeader={false} to render only the cards.
 */
export default function NumbersSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  return (
    <Box>
      {showHeader && (
        <SectionHeader eyebrow={numbers.eyebrow} heading={numbers.heading} />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(6, 1fr)",
          },
          gap: 1.75,
        }}
      >
        {numbers.stats.map((s, i) => (
          <MotionBox
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            sx={{
              py: 2.5,
              px: 1,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.08)",
              bgcolor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(14px)",
              transition: "border-color .25s, transform .25s",
              "&:hover": {
                borderColor: "rgba(167,139,250,0.5)",
                transform: "translateY(-3px)",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 22, md: 26 },
                fontWeight: 700,
                color: "#a5b4fc",
              }}
            >
              <CountUp to={s.value} suffix={s.suffix} />
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 9.5,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              {s.label}
            </Typography>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}
