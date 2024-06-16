import { useEffect, useState } from 'react';
import '../App.css';
import abcjs from 'abcjs';
import { PitchDetector } from 'pitchy';
import { Box, Button } from '@mui/material';
import NavBar from '../general/NavBar.tsx';
import Kammerton from './Kammerton.tsx';
import { Voice } from './types.ts';
import { easy_keys, easy_note_configs } from './constants.ts';
import {
  generateMen,
  generateSolution,
  generateWomen,
  getPitch,
  getRandomInt,
} from './task-generator.ts';

const key = easy_keys[getRandomInt(5)];
const note_config = easy_note_configs[0];

const solution =
  'X: 1\n' +
  'M: 4/4\n' +
  'L: 1/4\n' +
  'K: ' +
  key +
  '\n' +
  'V:1\n' +
  '[V:1]' +
  generateSolution(key, note_config);
const task =
  'X: 1\n' +
  'M: 4/4\n' +
  'L: 1/4\n' +
  'K: ' +
  key +
  '\n' +
  'V:1\n' +
  'V:2 clef=bass octave=-1\n' +
  '[V:1][' +
  generateWomen(key, note_config) +
  ']||\n' +
  '[V:2][' +
  generateMen(key, note_config) +
  ']||';

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

const sopobj = {
  pitch: getPitch(key, note_config, 0),
  count: 0,
};
const altoobj = {
  pitch: getPitch(key, note_config, 1),
  count: 0,
};
const tenorobj = {
  pitch: getPitch(key, note_config, 2),
  count: 0,
};
const bassobj = {
  pitch: getPitch(key, note_config, 3),
  count: 0,
};

const objs = [sopobj, altoobj, tenorobj, bassobj];

function TrainerPoC() {
  const [pitch, setPitch] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [sopColor, setSopColor] = useState('white');
  const [sopCheck, setSopCheck] = useState('');
  const [altoColor, setAltoColor] = useState('white');
  const [altoCheck, setAltoCheck] = useState('');
  const [tenorColor, setTenorColor] = useState('white');
  const [tenorCheck, setTenorCheck] = useState('');
  const [bassColor, setBassColor] = useState('white');
  const [bassCheck, setBassCheck] = useState('');

  useEffect(() => {
    abcjs.renderAbc('paper', task);
  });

  const audioContext = new window.AudioContext();
  const analyserNode = audioContext.createAnalyser();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      detector.minVolumeDecibels = -20;
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

  function setColor(length: number, color: string) {
    if (length === 4) {
      setSopColor(color);
    }
    if (length === 3) {
      setAltoColor(color);
    }
    if (length === 2) {
      setTenorColor(color);
    }
    if (length === 1) {
      setBassColor(color);
    }
  }

  function setCheck(length: number) {
    if (length === 4) {
      setSopCheck('> correct');
    }
    if (length === 3) {
      setAltoCheck('> correct');
    }
    if (length === 2) {
      setTenorCheck('> correct');
    }
    if (length === 1) {
      setBassCheck('> correct');
    }
  }

  function checkPitch(pitch: number, clarity: number, obj: Voice) {
    if (clarity < 95) {
      setColor(objs.length, 'grey');
      return;
    }
    if (pitch > obj.pitch * 0.95 && pitch < obj.pitch * 1.05) {
      setColor(objs.length, 'green');
      obj.count = obj.count + 1;
      if (obj.count === 10) {
        setCheck(objs.length);
        objs.shift();
        console.log(objs);
      }
    } else {
      setColor(objs.length, 'red');
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <Box component="div" display="flex" alignItems="center">
        <div id="paper" style={{ maxWidth: '200px' }}></div>
      </Box>
      <Kammerton />
      <p hidden>Pitch: {pitch}</p>
      <p hidden>Clarity: {clarity}</p>
      <Button onClick={() => audioContext.resume()}>
        Resume Audio Context
      </Button>
      <p style={{ color: sopColor }}>Sopran</p>
      <p style={{ color: 'green' }}>{sopCheck}</p>
      <p style={{ color: altoColor }}>Alto</p>
      <p style={{ color: 'green' }}>{altoCheck}</p>
      <p style={{ color: tenorColor }}>Tenor</p>
      <p style={{ color: 'green' }}>{tenorCheck}</p>
      <p style={{ color: bassColor }}>Bass</p>
      <p style={{ color: 'green' }}>{bassCheck}</p>
      <Button onClick={playSolution}>Play Solution</Button>
    </>
  );
}

export default TrainerPoC;
