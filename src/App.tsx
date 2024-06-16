import { useEffect, useState } from 'react';
import anstimmenTutorLogo from '/anstimmen-tutor-logo.svg';
import fourfour0hz from '/sine_440.ogg';
import './App.css';
import abcjs from 'abcjs';
import H5AudioPlayer from 'react-h5-audio-player';
import { PitchDetector } from 'pitchy';

const solution =
  'X: 1\n' + 'M: 4/4\n' + 'L: 1/4\n' + 'K: Am\n' + 'V:1\n' + '[V:1]eBGBE';
const task =
  'X: 1\n' +
  'M: 4/4\n' +
  'L: 1/4\n' +
  'K: Em\n' +
  'V:1\n' +
  'V:2 clef=bass octave=-2\n' +
  '[V:1][eBG]\n' +
  '[V:2][eb]';

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

const oct3 = [
  130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08,
  246.94,
];
const oct4 = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440,
  466.16, 493.88,
];

interface Voice {
  pitch: number;
  count: number;
  ele: string;
  eleCheck: string;
}
const sop1obj = {
  pitch: oct4[4],
  count: 0,
  ele: 'sop1',
  eleCheck: 'sop1check',
};
const sop2obj = {
  pitch: oct3[11],
  count: 0,
  ele: 'sop2',
  eleCheck: 'sop2check',
};
const altoobj = {
  pitch: oct3[7],
  count: 0,
  ele: 'alto',
  eleCheck: 'altocheck',
};
const tenorobj = {
  pitch: oct3[11],
  count: 0,
  ele: 'tenor',
  eleCheck: 'tenorcheck',
};
const bassobj = {
  pitch: oct3[4],
  count: 0,
  ele: 'bass',
  eleCheck: 'basscheck',
};

const objs = [sop1obj, sop2obj, altoobj, tenorobj, bassobj];

function App() {
  const [pitch, setPitch] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [sop1color, setSop1color] = useState('white');
  const [sop1check, setSop1check] = useState('');

  useEffect(() => {
    abcjs.renderAbc('paper', task);
  });

  const audioContext = new window.AudioContext();
  const analyserNode = audioContext.createAnalyser();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      detector.minVolumeDecibels = -40;
      const input = new Float32Array(detector.inputLength);
      updatePitch(analyserNode, detector, input, audioContext.sampleRate);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updatePitch(
    analyserNode: AnalyserNode,
    detector: PitchDetector<Float32Array>,
    input: Float32Array,
    sampleRate: number
  ) {
    analyserNode.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, sampleRate);

    const pitchCorrected = Math.round(pitch * 10) / 10;
    const clarityCorrected = Math.round(clarity * 100);
    if (objs.length !== 0) {
      checkPitch(pitchCorrected, clarityCorrected, objs[0]);
    }
    setPitch(pitchCorrected);
    setClarity(clarityCorrected);
    window.setTimeout(
      () => updatePitch(analyserNode, detector, input, sampleRate),
      100
    );
  }

  function checkPitch(pitch: number, clarity: number, obj: Voice) {
    if (clarity < 95) {
      setSop1color('grey');
      return;
    }
    if (pitch > obj.pitch * 0.95 && pitch < obj.pitch * 1.05) {
      setSop1color('green');
      obj.count = obj.count + 1;
      if (obj.count === 10) {
        setSop1check('correct');
        objs.shift();
        console.log(objs);
      }
    } else {
      setSop1color('red');
    }
  }

  return (
    <>
      <div>
        <a
          href="https://pibebtol.github.io/cicd-react-test"
          target="_blank"
          rel="noreferrer"
        >
          <img src={anstimmenTutorLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Anstimmen-Tutor</h1>
      <div id="paper"></div>
      <H5AudioPlayer
        showJumpControls={false}
        volume={0.1}
        src={fourfour0hz}
      ></H5AudioPlayer>
      <p>Pitch: {pitch}</p>
      <p>Clarity: {clarity}</p>
      <button onClick={() => audioContext.resume()}>
        Resume Audio Context
      </button>
      <p style={{ color: sop1color }}>Sopran 1</p>
      <p style={{ color: 'green' }}>{sop1check}</p>
      <button onClick={playSolution}>Play Solution</button>
    </>
  );
}

export default App;
