import { Box, Typography } from "@mui/material";

type Props = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  /** end colour of the gradient heading */
  gradientEnd?: string;
};

/** Reusable section header: dotted eyebrow pill + gradient heading + subtitle */
export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  gradientEnd = "#60a5fa",
}: Props) {
  return (
    <Box sx={{ textAlign: "center", mb: 7 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.75,
          py: 0.5,
          mb: 3,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.1)",
          bgcolor: "rgba(255,255,255,0.03)",
        }}
      >
        <Box
          sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#22c55e" }}
        />
        <Typography
          variant="caption"
          sx={{
            letterSpacing: 3,
            fontFamily: "monospace",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {eyebrow}
        </Typography>
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "3rem" },
          background: `linear-gradient(90deg, #a78bfa, ${gradientEnd})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {heading}
      </Typography>

      {subheading && (
        <Typography
          color="text.secondary"
          sx={{ mt: 1.5, fontSize: { xs: 13, md: 14 } }}
        >
          {subheading}
        </Typography>
      )}
    </Box>
  );
}
