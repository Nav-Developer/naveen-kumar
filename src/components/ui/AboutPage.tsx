import { Box, Chip, Container, Typography } from "@mui/material";
import MotionBackground from "@/components/ui/MotionBackground";

import { about } from "@/data/about";
import TimelineList from "./TimeLine";
import Image from "next/image";
import assets from "@/assets";

export default function AboutPage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container maxWidth="lg" sx={{ pt: 20, pb: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label={about.eyebrow.toUpperCase()}
            variant="outlined"
            sx={{ mb: 3 }}
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
            {about.heading}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: 5,
            alignItems: "start",
          }}
        >
          {/* Left: photo + stats */}
          <Box>
            <Box
              sx={{
                position: "relative",
                borderRadius: 5,
                overflow: "hidden",
                aspectRatio: "4 / 5",
                boxShadow: "0 0 40px rgba(99,102,241,0.35)",
                backgroundImage: `url(${about.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Image
                src={assets.images.me}
                alt="Naveen Kumar"
                fill
                priority
                sizes="(min-width:900px) 40vw, 100vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: 3,
                  fontWeight: 600,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              >
                {about.imageCaption}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {about.stats.map((s, i) => (
                <Box
                  key={s.label}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    bgcolor: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    gridColumn:
                      i === about.stats.length - 1 && about.stats.length % 2
                        ? "1 / -1"
                        : "auto",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#93c5fd" }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <TimelineList items={about.timeline} />
        </Box>
      </Container>
    </MotionBackground>
  );
}
