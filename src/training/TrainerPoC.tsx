import { useEffect, useState } from 'react';
import '../App.css';
import abcjs from 'abcjs';
import { PitchDetector } from 'pitchy';
import { Box, Button } from '@mui/material';
import NavBar from '../general/NavBar.tsx';
import Kammerton from './Kammerton.tsx';
import { Voice } from './types.ts';
import { pitches } from './constants.ts';

const solution =
  'X: 1\n' + 'M: 4/4\n' + 'L: 1/4\n' + 'K: Am\n' + 'V:1\n' + '[V:1]eBGBE';
const task =
  'X: 1\n' +
  'M: 4/4\n' +
  'L: 1/4\n' +
  'K: Em\n' +
  'V:1\n' +
  'V:2 clef=bass octave=-2\n' +
  '[V:1][eG]||\n' +
  '[V:2][eb]||';

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
  pitch: pitches[4][4],
  count: 0,
  ele: 'sop1',
  eleCheck: 'sop1check',
};
const altoobj = {
  pitch: pitches[3][7],
  count: 0,
  ele: 'alto',
  eleCheck: 'altocheck',
};
const tenorobj = {
  pitch: pitches[3][11],
  count: 0,
  ele: 'tenor',
  eleCheck: 'tenorcheck',
};
const bassobj = {
  pitch: pitches[3][4],
  count: 0,
  ele: 'bass',
  eleCheck: 'basscheck',
};

const objs = [sopobj, altoobj, tenorobj, bassobj];

function TrainerPoC() {
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
      <NavBar></NavBar>
      <Box component="div" display="flex" alignItems="center">
        <div id="paper" style={{ maxWidth: '200px' }}></div>
      </Box>
      <Kammerton />
      <p>Pitch: {pitch}</p>
      <p>Clarity: {clarity}</p>
      <Button onClick={() => audioContext.resume()}>
        Resume Audio Context
      </Button>
      <p style={{ color: sop1color }}>Sopran 1</p>
      <p style={{ color: 'green' }}>{sop1check}</p>
      <Button onClick={playSolution}>Play Solution</Button>
    </>
  );
}

export default TrainerPoC;
