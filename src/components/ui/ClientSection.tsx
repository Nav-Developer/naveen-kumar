"use client";

import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import Image from "next/image";

import MotionBackground from "@/components/ui/MotionBackground";
import SectionHeader from "./SectionHeader";
import { Client, clients } from "@/data/client";

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

// ---------------------------------------------
// SINGLE LOGO (no box, just the logo)
// ---------------------------------------------

function LogoItem({ client, size }: { client: Client; size: "sm" | "lg" }) {
  const height = size === "lg" ? 90 : 64;
  const width = size === "lg" ? 180 : 140;

  const content = (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        opacity: 0.7,
        filter: "grayscale(1)",
        transition: "opacity .25s, filter .25s, transform .25s",
        "&:hover": {
          opacity: 1,
          filter: "grayscale(0)",
          transform: "scale(1.08)",
        },
      }}
    >
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          fill
          sizes={`${width}px`}
          unoptimized={typeof client.logo === "string"}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <Typography sx={{ fontWeight: 700, fontSize: 17, textAlign: "center" }}>
          {client.name}
        </Typography>
      )}
    </Box>
  );

  return client.url ? (
    <Box
      component="a"
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      sx={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      {content}
    </Box>
  ) : (
    content
  );
}

// ---------------------------------------------
// MOVING VERSION
// ---------------------------------------------

function MovingLogos() {
  const base = clients.items;

  // make one half of the track wider than the screen, then double it
  const half = Array.from({
    length: Math.max(1, Math.ceil(8 / base.length)),
  }).flatMap(() => base);
  const track = [...half, ...half];

  return (
    <Box
      sx={{
        overflow: "hidden",
        py: 1,
        maskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        "&:hover .clients-track": { animationPlayState: "paused" },
      }}
    >
      <Box
        className="clients-track"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 6, md: 10 },
          width: "max-content",
          animation: `${scroll} ${Math.max(20, half.length * 4)}s linear infinite`,
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
        }}
      >
        {track.map((client, i) => (
          <LogoItem key={`${client.id}-${i}`} client={client} size="sm" />
        ))}
      </Box>
    </Box>
  );
}

// ---------------------------------------------
// STATIC VERSION
// ---------------------------------------------

function StaticLogos() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 5, md: 8 },
      }}
    >
      {clients.items.map((client) => (
        <LogoItem key={client.id} client={client} size="lg" />
      ))}
    </Box>
  );
}

export function ClientsSection() {
  if (clients.items.length === 0) return null;

  return (
    <MotionBackground>
      <Container
        maxWidth="lg"
        id="clients"
        sx={{ pt: 12, pb: 10, display: "grid", gap: 6 }}
      >
        <SectionHeader
          eyebrow={clients.eyebrow}
          heading={clients.heading}
          subheading={clients.subheading}
          gradientEnd="#5eead4"
        />

        {clients.movable ? <MovingLogos /> : <StaticLogos />}
      </Container>
    </MotionBackground>
  );
}

export default ClientsSection;
