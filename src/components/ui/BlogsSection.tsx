"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

import ArticleIcon from "@mui/icons-material/Article";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import MotionBackground from "@/components/ui/MotionBackground";
import SectionHeader from "./SectionHeader";
import { blogs } from "@/data/blog";

const MotionBox = motion.create(Box);

type Post = (typeof blogs.items)[number];

const cardSx = {
  position: "relative",
  borderRadius: 5,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  bgcolor: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(14px)",
  transition: "border-color .25s, transform .25s, box-shadow .25s",

  "&:hover": {
    borderColor: "rgba(96,165,250,0.5)",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(59,130,246,0.15)",
  },
  "&:focus-within": {
    borderColor: "#60a5fa",
  },
  // cover zoom on hover
  "&:hover .blog-cover": {
    transform: "scale(1.05)",
  },
  "&:hover .blog-arrow": {
    transform: "translate(2px, -2px)",
    bgcolor: "rgba(59,130,246,0.25)",
  },
};

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---------------------------------------------
// SMALL PIECES
// ---------------------------------------------

function MediumBadge() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 2,
        px: 1,
        py: 0.2,
        borderRadius: 999,
        fontSize: 8.5,
        fontFamily: "monospace",
        letterSpacing: 1,
        color: "#bfdbfe",
        bgcolor: "rgba(99,102,241,0.35)",
        border: "1px solid rgba(129,140,248,0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      MEDIUM
    </Box>
  );
}

function Cover({ post, height }: { post: Post; height: number | string }) {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", height }}>
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 45vw"
          unoptimized={typeof post.image === "string"}
          className="blog-cover"
          style={{
            objectFit: "cover",
            transition: "transform .5s",
          }}
        />
      ) : (
        <Box
          className="blog-cover"
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            transition: "transform .5s",
            background:
              "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(94,234,212,0.3), transparent 55%), linear-gradient(135deg, #0f172a, #1e1b4b)",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArticleIcon sx={{ fontSize: 26, color: "#93c5fd" }} />
          </Box>
        </Box>
      )}

      {/* bottom fade so it blends into the card */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,8,20,0.55), transparent 55%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Box
          key={tag}
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: 999,
            fontSize: 10,
            fontFamily: "monospace",
            letterSpacing: 0.5,
            color: "#bfdbfe",
            bgcolor: "rgba(99,102,241,0.25)",
            border: "1px solid rgba(129,140,248,0.35)",
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.75,
        fontSize: 11.5,
        color: "text.secondary",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CalendarTodayIcon sx={{ fontSize: 12 }} />
        {formatDate(post.date)}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AccessTimeIcon sx={{ fontSize: 12 }} />
        {post.readTime}
      </Box>
    </Box>
  );
}

function ArrowButton() {
  return (
    <Box
      className="blog-arrow"
      sx={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        bgcolor: "rgba(255,255,255,0.07)",
        transition: "transform .25s, background-color .25s",
      }}
    >
      <ArrowOutwardIcon sx={{ fontSize: 15, color: "#3b82f6" }} />
    </Box>
  );
}

const linkSx = {
  display: "flex",
  color: "inherit",
  textDecoration: "none",
  outline: "none",
  height: "100%",
};

// ---------------------------------------------
// FEATURED (LATEST) POST
// ---------------------------------------------

function FeaturedPost({ post }: { post: Post }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      sx={cardSx}
    >
      <MediumBadge />

      <Box
        component="a"
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read "${post.title}" on Medium`}
        sx={{
          ...linkSx,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: { md: "0 0 45%" } }}>
          <Cover post={post} height={{ xs: 190, md: "100%" } as never} />
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            minHeight: { md: 260 },
          }}
        >
          <Box
            sx={{
              mb: 1.5,
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: 2,
              color: "#5eead4",
            }}
          >
            LATEST POST
          </Box>

          <Tags tags={post.tags} />

          <Typography
            sx={{
              mt: 1.75,
              fontWeight: 700,
              fontSize: { xs: 20, md: 26 },
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1.25, fontSize: 14, lineHeight: 1.6 }}
          >
            {post.description}
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Meta post={post} />
            <ArrowButton />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}

// ---------------------------------------------
// REGULAR POST CARD
// ---------------------------------------------

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      sx={cardSx}
    >
      <MediumBadge />

      <Box
        component="a"
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read "${post.title}" on Medium`}
        sx={{ ...linkSx, flexDirection: "column" }}
      >
        <Cover post={post} height={150} />

        <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flex: 1 }}>
          <Tags tags={post.tags} />

          <Typography sx={{ mt: 1.5, fontWeight: 600, fontSize: 15 }}>
            {post.title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.75,
              fontSize: 12.5,
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.description}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              pt: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Meta post={post} />
            <ArrowButton />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}

// ---------------------------------------------
// BLOGS SECTION
// ---------------------------------------------

export function BlogsSection() {
  // newest first
  const posts = [...blogs.items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const [featured, ...rest] = posts;

  return (
    <MotionBackground className="min-h-screen">
      <Container
        maxWidth="lg"
        sx={{
          pt: 18,
          pb: 10,
          display: "grid",
          gap: 6,
        }}
      >
        <SectionHeader
          eyebrow={blogs.eyebrow}
          heading={blogs.heading}
          subheading={blogs.subheading}
          gradientEnd="#5eead4"
        />

        <Box sx={{ display: "grid", gap: 2.5 }}>
          {featured && <FeaturedPost post={featured} />}

          {rest.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2.5,
              }}
            >
              {rest.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component="a"
            href={blogs.mediumProfile}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              px: 3,
              py: 1,
              borderColor: "rgba(96,165,250,0.5)",
              color: "#bfdbfe",
              "&:hover": {
                borderColor: "#60a5fa",
                bgcolor: "rgba(59,130,246,0.1)",
              },
            }}
          >
            Read more on Medium
          </Button>
        </Box>
      </Container>
    </MotionBackground>
  );
}

export default BlogsSection;
