import { Box } from '@mui/material';
import NavBar from '../general/NavBar.tsx';

export default function About() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar></NavBar>
      <Box component="p">
        Hey, we are <b>russelx3</b> and <b>pibebtol</b>, two singers from
        germany. We were searching for a tool, that specifically allows you to
        train the high art of pitch finding.
      </Box>
      <Box component="p">
        We are singing in the Kammerchor Wernigerode e.V., check us out here:
        <a href="https://kammerchor-wernigerode.de/"> Kammerchor Wernigerode</a>
      </Box>
    </Box>
  );
}
