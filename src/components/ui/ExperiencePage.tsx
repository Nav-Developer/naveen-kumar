"use client";

import { Box, Chip, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MotionBackground from "@/components/ui/MotionBackground";

import { experience } from "@/data/experience";

const MotionBox = motion.create(Box);

export default function ExperiencePage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container maxWidth="md" sx={{ pt: 20, pb: 10 }} id="experience">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label={experience.eyebrow.toUpperCase()}
            variant="outlined"
            sx={{ mb: 3, letterSpacing: 3 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {experience.heading}
          </Typography>
        </Box>

        {/* Timeline */}
        <Box sx={{ position: "relative", pl: { xs: 4, md: 6 } }}>
          {/* Vertical line */}
          <Box
            sx={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(180deg, #3b82f6 0%, #22c55e 55%, rgba(255,255,255,0.08) 100%)",
            }}
          />

          {experience.items.map((item, i) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              sx={{ position: "relative", mb: 4 }}
            >
              {/* Dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: -32, md: -48 },
                  top: 28,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #3b82f6",
                  bgcolor: "#0a0a0c",
                  boxShadow: "0 0 12px rgba(59,130,246,0.6)",
                }}
              />

              {/* Card */}
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 5,
                  border: "1px solid rgba(255,255,255,0.08)",
                  bgcolor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(14px)",
                  transition: "border-color .25s, transform .25s",
                  "&:hover": {
                    borderColor: "rgba(96,165,250,0.5)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {/* Title row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#3b82f6" }}>
                      {item.company}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: "text.secondary",
                      bgcolor: "rgba(255,255,255,0.08)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.period}
                  </Box>
                </Box>

                {/* Bullets */}
                <Box component="ul" sx={{ listStyle: "none", p: 0, my: 2.5 }}>
                  {item.points.map((p) => (
                    <Box
                      component="li"
                      key={p}
                      sx={{
                        display: "flex",
                        gap: 1.25,
                        mb: 1,
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      <Box sx={{ color: "#3b82f6", fontSize: 10, mt: "5px" }}>
                        ▸
                      </Box>
                      {p}
                    </Box>
                  ))}
                </Box>

                {/* Tech tags */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {item.tech.map((t) => (
                    <Box
                      key={t}
                      sx={{
                        px: 1.25,
                        py: 0.4,
                        borderRadius: 999,
                        fontSize: 11,
                        fontFamily: "monospace",
                        bgcolor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {t}
                    </Box>
                  ))}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </MotionBackground>
  );
}
