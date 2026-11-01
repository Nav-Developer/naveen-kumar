import MotionBackground from "@/components/ui/MotionBackground";
import UnderConstruction from "@/components/ui/PageUnderConstruction";
import { ProjectPage } from "@/components/ui/ProjectPage";
import { Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <ProjectPage />

    // <UnderConstruction />
    // <Container sx={{ pt: 14, pb: 8 }}>
    //   <Typography variant="h2">Projects</Typography>
    // </Container>
  );
}
