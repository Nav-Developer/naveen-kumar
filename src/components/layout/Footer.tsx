import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        py: 4,
        textAlign: "center",
        color: "rgba(255,255,255,0.6)",
        background:
          "radial-gradient(ellipse at 50% 0%, #1a0b3d 0%, #07040f 60%, #05030a 100%)",
        // gradient top line instead of the old brown border
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #60a5fa, #a78bfa, #8b5cf6, transparent)",
        },
      }}
    >
      <Typography variant="body2" sx={{ letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Naveen Kumar. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
}
