import UnderConstruction from "@/components/ui/PageUnderConstruction";
import SkillsPage from "@/components/ui/SkillsPage";
import TechStackOrbit from "@/components/ui/TechStackOrbit";
import { Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <>
      <SkillsPage />
      <TechStackOrbit />
    </>
    // <UnderConstruction />
    // <Container sx={{ pt: 14, pb: 8 }}>
    //   <Typography variant="h2">Skils</Typography>

    // </Container>
  );
}
