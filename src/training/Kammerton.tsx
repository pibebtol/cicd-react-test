import H5AudioPlayer from 'react-h5-audio-player';
import fourfour0hz from '/sine_440.mp3';

export default function Kammerton() {
  return (
    <H5AudioPlayer
      showJumpControls={false}
      volume={0.1}
      src={fourfour0hz}
    ></H5AudioPlayer>
  );
}
