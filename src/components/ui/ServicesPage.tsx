"use client";

import type { ElementType } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MotionBackground from "@/components/ui/MotionBackground";

import LanguageIcon from "@mui/icons-material/Language";
import VideocamIcon from "@mui/icons-material/Videocam";
import LayersIcon from "@mui/icons-material/Layers";
import CodeIcon from "@mui/icons-material/Code";
import ApiIcon from "@mui/icons-material/Api";
import PaletteIcon from "@mui/icons-material/Palette";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import EcoIcon from "@mui/icons-material/Eco";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import SchoolIcon from "@mui/icons-material/School";
import TimerIcon from "@mui/icons-material/Timer";
import MemoryIcon from "@mui/icons-material/Memory";
import ExploreIcon from "@mui/icons-material/Explore";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EcoIcon from "@mui/icons-material/AcUnit";
import { creatorHub, services } from "@/data/service";
import SectionHeader from "./SectionHeader";

const MotionBox = motion.create(Box);

const iconMap: Record<string, ElementType> = {
  web: LanguageIcon,
  video: VideocamIcon,
  fullstack: LayersIcon,
  react: CodeIcon,
  api: ApiIcon,
  ui: PaletteIcon,
  portfolio: AutoAwesomeIcon,
  landing: RocketLaunchIcon,
  fitness: FitnessCenterIcon,
  nutrition: EcoIcon,
  cooking: SoupKitchenIcon,
  tutorials: SchoolIcon,
  productivity: TimerIcon,
  tech: MemoryIcon,
  journey: ExploreIcon,
};

const gridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  },
  gap: 2,
};

const cardSx = {
  position: "relative",
  p: 2.5,
  borderRadius: 5,
  border: "1px solid rgba(255,255,255,0.08)",
  bgcolor: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(14px)",
  transition: "border-color .25s, transform .25s, box-shadow .25s",
  "&:hover": {
    borderColor: "rgba(96,165,250,0.5)",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(59,130,246,0.15)",
  },
};

function IconBubble({
  name,
  tone = "blue",
}: {
  name: string;
  tone?: "blue" | "violet";
}) {
  const Icon = iconMap[name] ?? CodeIcon;
  return (
    <Box
      sx={{
        width: tone === "blue" ? 40 : 46,
        height: tone === "blue" ? 40 : 46,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        bgcolor:
          tone === "blue" ? "rgba(255,255,255,0.07)" : "rgba(129,140,248,0.22)",
        color: tone === "blue" ? "#3b82f6" : "#c4b5fd",
      }}
    >
      <Icon sx={{ fontSize: 18 }} />
    </Box>
  );
}

export function ServicesSection() {
  return (
    <Box>
      <SectionHeader
        eyebrow={services.eyebrow}
        heading={services.heading}
        subheading={services.subheading}
        gradientEnd="#5eead4"
      />
      <Box sx={gridSx}>
        {services.items.map((s, i) => (
          <MotionBox
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            sx={{
              ...cardSx,
              minHeight: 190,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconBubble name={s.icon} />
            <Typography sx={{ mt: 3, fontWeight: 600, fontSize: 15 }}>
              {s.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ mt: 0.75, fontSize: 12.5, lineHeight: 1.5 }}
            >
              {s.description}
            </Typography>
            <Box
              sx={{
                mt: "auto",
                pt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11.5,
                color: "text.secondary",
              }}
            >
              <span>
                Starting at{" "}
                <Box component="b" sx={{ color: "#fff" }}>
                  {s.price}
                </Box>
              </span>
              <ArrowOutwardIcon sx={{ fontSize: 13, color: "#3b82f6" }} />
            </Box>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}

export function CreatorHubSection() {
  return (
    <Box>
      <SectionHeader
        eyebrow={creatorHub.eyebrow}
        heading={creatorHub.heading}
        subheading={creatorHub.subheading}
      />
      <Box sx={gridSx}>
        {creatorHub.items.map((c, i) => (
          <MotionBox
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            sx={{ ...cardSx, minHeight: 130 }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                px: 1,
                py: 0.2,
                borderRadius: 999,
                fontSize: 8.5,
                fontFamily: "monospace",
                letterSpacing: 1,
                color: "#bfdbfe",
                bgcolor: "rgba(99,102,241,0.35)",
                border: "1px solid rgba(129,140,248,0.4)",
              }}
            >
              COMING SOON
            </Box>
            <IconBubble name={c.icon} tone="violet" />
            <Typography sx={{ mt: 2, fontWeight: 600, fontSize: 15 }}>
              {c.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: 12.5 }}>
              {c.description}
            </Typography>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  return (
    <MotionBackground className="min-h-screen">
      <Container
        maxWidth="lg"
        id="services"
        sx={{ pt: 18, pb: 10, display: "grid", gap: 14 }}
      >
        <ServicesSection />
        <CreatorHubSection />
      </Container>
    </MotionBackground>
  );
}
