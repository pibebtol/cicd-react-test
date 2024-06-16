import { full_notes, major, minor, notes, pitches } from './constants.ts';

export function generateWomen(key: string, configuration: number[]): string {
  const baseNote = key.charAt(0).toUpperCase();
  const index = notes.findIndex((note) => note === baseNote);
  return (
    notes[(index + configuration[0]) % 7] +
    notes[(index + configuration[1]) % 7]
  );
}

export function generateMen(key: string, configuration: number[]): string {
  const baseNote = key.charAt(0).toUpperCase();
  const index = notes.findIndex((note) => note === baseNote);
  return (
    notes[(index + configuration[2]) % 7] +
    notes[(index + configuration[3]) % 7]
  );
}

export function generateSolution(key: string, configuration: number[]): string {
  return generateWomen(key, configuration) + generateMen(key, configuration);
}

export function getPitch(
  key: string,
  configuration: number[],
  voice: number
): number {
  const baseNote = key.charAt(0).toUpperCase();
  const index = full_notes.findIndex((note) => note === baseNote);
  if (key.endsWith('m')) {
    return pitches[3][index + minor[configuration[voice]]];
  } else {
    return pitches[3][index + major[configuration[voice]]];
  }
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
