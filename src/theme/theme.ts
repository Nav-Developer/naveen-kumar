import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#07040f", // dark base (hero + footer bg)
      light: "#1a0b3d", // purple glow
      dark: "#05030a", // deepest edge
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b5cf6", // violet accent (borders, highlights)
      light: "#a78bfa",
      dark: "#60a5fa", // blue end of your gradient
      contrastText: "#ffffff",
    },
    background: {
      default: "#07040f",
      paper: "#0d0a24",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.6)",
    },
  },
});

export default theme;
