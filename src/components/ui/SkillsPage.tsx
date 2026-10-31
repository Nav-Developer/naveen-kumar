"use client";

import { Box, Chip, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MotionBackground from "@/components/ui/MotionBackground";

import { skills } from "@/data/skills";

const MotionBox = motion.create(Box);

export default function SkillsPage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container maxWidth="lg" sx={{ pt: 20, pb: 10 }} id="skills">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Chip
            label={skills.eyebrow.toUpperCase()}
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
            {skills.heading}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {skills.subheading}
          </Typography>
        </Box>

        {/* Categories */}
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          {skills.categories.map((cat, ci) => (
            <MotionBox
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              sx={{ mb: 6 }}
            >
              {/* Label row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: cat.color,
                    boxShadow: `0 0 10px ${cat.color}`,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    letterSpacing: 4,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {cat.label}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              </Box>

              {/* Pills */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {cat.skills.map((name, si) => (
                  <motion.div
                    key={name}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + ((ci + si) % 4) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ((ci + si) % 5) * 0.2,
                    }}
                    whileHover={{ scale: 1.06, y: -6 }}
                  >
                    <Box
                      sx={{
                        px: 2.75,
                        py: 1.5,
                        borderRadius: 999,
                        fontSize: 15,
                        fontWeight: 500,
                        cursor: "default",
                        border: "1px solid rgba(255,255,255,0.08)",
                        bgcolor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(12px)",
                        transition: "border-color .25s, box-shadow .25s",
                        "&:hover": {
                          borderColor: cat.color,
                          boxShadow: `0 0 18px ${cat.color}55`,
                        },
                      }}
                    >
                      {name}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </MotionBackground>
  );
}
