import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import fourfour0hz from '/sine_440.ogg';
import './App.css';
import abcjs from 'abcjs';
import H5AudioPlayer from 'react-h5-audio-player';

const solution =
  'X: 1\n' + 'M: 4/4\n' + 'L: 1/4\n' + 'K: Am\n' + 'V:1\n' + '[V:1]eBGBE';

function playSolution() {
  if (abcjs.synth.supportsAudio()) {
    const abc = solution;
    const visualObj = abcjs.renderAbc('*', abc)[0];

    const midiBuffer = new abcjs.synth.CreateSynth();
    midiBuffer
      .init({
        visualObj: visualObj,
        options: {
          soundFontVolumeMultiplier: 0.1,
        },
      })
      .then(function (response) {
        console.log(response);
        midiBuffer.prime().then(function () {
          midiBuffer.start();
        });
      })
      .catch(function (error) {
        console.warn('Audio problem:', error);
      });
  }
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const task =
      'X: 1\n' +
      'M: 4/4\n' +
      'L: 1/4\n' +
      'K: Em\n' +
      'V:1\n' +
      'V:2 clef=bass octave=-2\n' +
      '[V:1][eBG]\n' +
      '[V:2][eb]';
    abcjs.renderAbc('paper', task);
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div id="paper"></div>
      <H5AudioPlayer
        showJumpControls={false}
        volume={0.1}
        src={fourfour0hz}
      ></H5AudioPlayer>
      <button onClick={playSolution}>Play Solution</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
