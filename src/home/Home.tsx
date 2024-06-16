import { Box } from '@mui/material';
import NavBar from '../general/NavBar.tsx';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar></NavBar>
      <Box component="p">
        One of the central tasks in a choir is the finding of the pitches for
        starting singing during a concert. If you have troubles doing that, fret
        not, here comes the Anstimmen-Trainer. You can use it, to train your ear
        to find the right pitches quicker and more safely. Also, it will test if
        you are singing the right notes. Wow!
      </Box>
      <Box component="p">
        The german word <b>Anstimmen</b> denotes the task of deriving the right
        pitches for a choir from a classic 440hz tuning fork. This is a high
        art, given the complexity of deriving the right key, as well as giving
        the right notes in the right order for the choir. The{' '}
        <b>Anstimmen-Trainer</b> aims to give you a tool to train this
        profession.
      </Box>
    </Box>
  );
}
