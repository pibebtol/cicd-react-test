import { describe, expect, it } from 'vitest';
import {
  generateMen,
  generateSolution,
  generateWomen,
  getPitch,
} from '../src/training/task-generator.ts';
import { pitches } from '../src/training/constants.ts';

describe('generate women voices', () => {
  it('returns ec for C easy', () => {
    expect(generateWomen('C', [2, 0, 4, 0])).toBe('EC');
  });
  it('returns fd for Dm easy', () => {
    expect(generateWomen('Dm', [2, 0, 4, 0])).toBe('FD');
  });
  it.skip('returns ac for A easy', () => {
    expect(generateWomen('A', [2, 0, 4, 0])).toBe('cA');
  });
});

describe('generate men voices', () => {
  it('returns ec for C easy', () => {
    expect(generateMen('C', [2, 0, 4, 0])).toBe('GC');
  });
  it('returns BE for Em easy', () => {
    expect(generateMen('Em', [2, 0, 4, 0])).toBe('BE');
  });
  it.skip('returns ea for A easy', () => {
    expect(generateMen('A', [2, 0, 4, 0])).toBe('eA');
  });
});

describe('generate solution', () => {
  it('returns ECGC for C easy', () => {
    expect(generateSolution('C', [2, 0, 4, 0])).toBe('ECGC');
  });
  it('returns FDAD for Dm easy', () => {
    expect(generateSolution('Dm', [2, 0, 4, 0])).toBe('FDAD');
  });
  it('returns GEBE for E easy', () => {
    expect(generateSolution('E', [2, 0, 4, 0])).toBe('GEBE');
  });
  it.skip('returns ea for A easy', () => {
    expect(generateSolution('A', [2, 0, 4, 0])).toBe('cAeA');
  });
});

describe('get pitch', () => {
  it('returns correct pitch for C 0', () => {
    expect(getPitch('C', [2, 0, 4, 0], 0)).toBe(pitches[3][4]);
  });
  it('returns correct pitch for C 0', () => {
    expect(getPitch('C', [2, 0, 4, 0], 1)).toBe(pitches[3][0]);
  });
  it('returns correct pitch for Em 2', () => {
    expect(getPitch('Em', [2, 0, 4, 0], 2)).toBe(pitches[3][11]);
  });
  it('returns correct pitch for Em 0', () => {
    expect(getPitch('Em', [2, 0, 4, 0], 0)).toBe(pitches[3][7]);
  });
  it('returns correct pitch for D 0', () => {
    expect(getPitch('D', [2, 0, 4, 0], 0)).toBe(pitches[3][6]);
  });
});
