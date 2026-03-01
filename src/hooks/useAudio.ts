import { useRef, useCallback, useEffect, useState } from 'react';
import type { Region } from '../types';

type CreatureRarity = 'common' | 'rare' | 'legendary' | 'mythic';

interface UseAudioOptions {
  loop?: boolean;
  volume?: number;
}

interface BrushingMusicController {
  start: () => void;
  stop: () => void;
  setIntensity: (level: 'calm' | 'excited') => void;
}

const NOTE_FREQS: Record<string, number> = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98,
  'Db2': 69.30, 'Eb2': 77.78, 'Gb2': 92.50, 'Ab2': 103.83, 'Bb2': 116.54,
  'Db3': 138.59, 'Eb3': 155.56, 'Gb3': 185.00, 'Ab3': 207.65, 'Bb3': 233.08,
  'Db4': 277.18, 'Eb4': 311.13, 'Gb4': 369.99, 'Ab4': 415.30, 'Bb4': 466.16,
  'Db5': 554.37, 'Eb5': 622.25, 'Gb5': 739.99, 'Ab5': 830.61, 'Bb5': 932.33,
  'Db6': 1108.73, 'Eb6': 1244.51,
  'C#3': 138.59, 'C#4': 277.18, 'C#5': 554.37,
  'F#2': 92.50, 'F#3': 185.00, 'F#4': 369.99, 'F#5': 739.99, 'F#6': 1479.98,
  'G#3': 207.65, 'G#4': 415.30, 'G#5': 830.61,
};

interface RegionMusicConfig {
  tempo: { calm: number; excited: number };
  melodyCalm: number[][];
  melodyExcited: number[][];
  bassCalm: number[][];
  bassExcited: number[][];
  arpCalm: number[][];
  arpExcited: number[][];
  pulseWidth: number;
  drumStyle: 'soft' | 'punchy' | 'electronic' | 'heavy' | 'airy';
  melodyWave: OscillatorType;
  bassWave: OscillatorType;
  arpWave: OscillatorType;
  vibratoRate: number;
  vibratoDepth: number;
  filterFreq: number;
  filterType: BiquadFilterType;
  attackTime: number;
  releaseTime: number;
  arpSpeed: number;
}

const REGION_MUSIC: Record<Region, RegionMusicConfig[]> = {
  grassland: [
    {
      tempo: { calm: 100, excited: 128 },
      melodyCalm: [
        [NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4],
        [NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.D4],
        [NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4],
      ],
      melodyExcited: [
        [NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5],
        [NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.G5],
      ],
      bassCalm: [[NOTE_FREQS.G2, 0, NOTE_FREQS.D3, 0, NOTE_FREQS.G2, 0, NOTE_FREQS.B2, 0]],
      bassExcited: [[NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.D3, NOTE_FREQS.D3, NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS.D3, NOTE_FREQS.G2]],
      arpCalm: [[0, 4, 7, 11, 12]],
      arpExcited: [[0, 4, 7, 11, 14, 11, 7, 4]],
      pulseWidth: 0.5,
      drumStyle: 'soft',
      melodyWave: 'square',
      bassWave: 'triangle',
      arpWave: 'square',
      vibratoRate: 4,
      vibratoDepth: 0.003,
      filterFreq: 3000,
      filterType: 'lowpass',
      attackTime: 0.01,
      releaseTime: 0.3,
      arpSpeed: 1.0,
    },
    {
      tempo: { calm: 95, excited: 125 },
      melodyCalm: [
        [NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.C5, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.E4],
        [NOTE_FREQS.F4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.F5, NOTE_FREQS.C5, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.A4],
        [NOTE_FREQS.G4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.G5, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS.G4, NOTE_FREQS.D4],
      ],
      melodyExcited: [
        [NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS.E5, NOTE_FREQS.C5, NOTE_FREQS.G5],
        [NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.C6, NOTE_FREQS.F6, NOTE_FREQS.C6, NOTE_FREQS.A5, NOTE_FREQS.F5, NOTE_FREQS.C6],
      ],
      bassCalm: [[NOTE_FREQS.C3, 0, NOTE_FREQS.G3, 0, NOTE_FREQS.C3, 0, NOTE_FREQS.E3, 0]],
      bassExcited: [[NOTE_FREQS.C3, NOTE_FREQS.C3, NOTE_FREQS.G3, NOTE_FREQS.G3, NOTE_FREQS.F3, NOTE_FREQS.F3, NOTE_FREQS.G3, NOTE_FREQS.C3]],
      arpCalm: [[0, 4, 7, 12, 16]],
      arpExcited: [[0, 4, 7, 12, 16, 19, 16, 12, 7, 4]],
      pulseWidth: 0.5,
      drumStyle: 'soft',
      melodyWave: 'square',
      bassWave: 'triangle',
      arpWave: 'triangle',
      vibratoRate: 5,
      vibratoDepth: 0.004,
      filterFreq: 3200,
      filterType: 'lowpass',
      attackTime: 0.015,
      releaseTime: 0.35,
      arpSpeed: 1.1,
    },
    {
      tempo: { calm: 105, excited: 132 },
      melodyCalm: [
        [NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.E4, NOTE_FREQS.D4, 0],
        [NOTE_FREQS.E4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.E4, 0],
        [NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.E5, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.E4],
      ],
      melodyExcited: [
        [NOTE_FREQS.D5, NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.E5],
        [NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.E6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5],
      ],
      bassCalm: [[NOTE_FREQS.D3, 0, NOTE_FREQS.A3, 0, NOTE_FREQS.D3, 0, NOTE_FREQS.E3, 0]],
      bassExcited: [[NOTE_FREQS.D3, NOTE_FREQS.D3, NOTE_FREQS.A3, NOTE_FREQS.A3, NOTE_FREQS.E3, NOTE_FREQS.E3, NOTE_FREQS.A3, NOTE_FREQS.D3]],
      arpCalm: [[0, 2, 7, 9, 12]],
      arpExcited: [[0, 2, 7, 9, 12, 14, 12, 9, 7, 2]],
      pulseWidth: 0.4,
      drumStyle: 'soft',
      melodyWave: 'square',
      bassWave: 'triangle',
      arpWave: 'square',
      vibratoRate: 4,
      vibratoDepth: 0.003,
      filterFreq: 2800,
      filterType: 'lowpass',
      attackTime: 0.012,
      releaseTime: 0.28,
      arpSpeed: 0.95,
    },
  ],
  coastal: [
    {
      tempo: { calm: 88, excited: 116 },
      melodyCalm: [
        [NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.A4, 0, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.E4, 0],
        [NOTE_FREQS.E4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.B4, 0, NOTE_FREQS.A4, NOTE_FREQS['F#4'], NOTE_FREQS.E4],
        [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, 0, NOTE_FREQS.A4, NOTE_FREQS['F#4']],
      ],
      melodyExcited: [
        [NOTE_FREQS.D5, NOTE_FREQS.E5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5'], NOTE_FREQS.E5],
        [NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.E6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
      ],
      bassCalm: [[NOTE_FREQS.D2, 0, 0, NOTE_FREQS.A2, 0, 0, NOTE_FREQS.D2, 0]],
      bassExcited: [[NOTE_FREQS.D2, 0, NOTE_FREQS.A2, 0, NOTE_FREQS.D2, NOTE_FREQS.E2, NOTE_FREQS['F#2'], 0]],
      arpCalm: [[0, 4, 9, 12, 16, 12, 9, 4]],
      arpExcited: [[0, 2, 4, 7, 9, 12, 9, 7, 4, 2]],
      pulseWidth: 0.3,
      drumStyle: 'soft',
      melodyWave: 'sine',
      bassWave: 'sine',
      arpWave: 'triangle',
      vibratoRate: 3,
      vibratoDepth: 0.008,
      filterFreq: 2500,
      filterType: 'lowpass',
      attackTime: 0.05,
      releaseTime: 0.5,
      arpSpeed: 1.3,
    },
    {
      tempo: { calm: 82, excited: 110 },
      melodyCalm: [
        [NOTE_FREQS.G4, 0, NOTE_FREQS.B4, 0, NOTE_FREQS.D5, NOTE_FREQS.B4, 0, NOTE_FREQS.G4],
        [NOTE_FREQS.A4, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.E5, NOTE_FREQS.C5, 0, NOTE_FREQS.A4],
        [NOTE_FREQS.B4, 0, NOTE_FREQS.D5, 0, NOTE_FREQS['F#5'], NOTE_FREQS.D5, 0, NOTE_FREQS.B4],
      ],
      melodyExcited: [
        [NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.G6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.D5],
        [NOTE_FREQS.A5, NOTE_FREQS.C6, NOTE_FREQS.E6, NOTE_FREQS.A5, NOTE_FREQS.E6, NOTE_FREQS.C6, NOTE_FREQS.A5, NOTE_FREQS.E5],
      ],
      bassCalm: [[NOTE_FREQS.G2, 0, 0, 0, NOTE_FREQS.D3, 0, 0, 0]],
      bassExcited: [[NOTE_FREQS.G2, 0, NOTE_FREQS.D3, 0, NOTE_FREQS.G2, NOTE_FREQS.A2, NOTE_FREQS.B2, 0]],
      arpCalm: [[0, 4, 7, 11, 14, 11, 7, 4]],
      arpExcited: [[0, 4, 7, 11, 14, 18, 14, 11, 7, 4]],
      pulseWidth: 0.25,
      drumStyle: 'soft',
      melodyWave: 'sine',
      bassWave: 'triangle',
      arpWave: 'sine',
      vibratoRate: 2.5,
      vibratoDepth: 0.01,
      filterFreq: 2200,
      filterType: 'lowpass',
      attackTime: 0.06,
      releaseTime: 0.6,
      arpSpeed: 1.5,
    },
    {
      tempo: { calm: 92, excited: 120 },
      melodyCalm: [
        [NOTE_FREQS.E4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.B4, 0, NOTE_FREQS.A4, 0, NOTE_FREQS['F#4']],
        [NOTE_FREQS['F#4'], NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS['C#5'], 0, NOTE_FREQS.B4, 0, NOTE_FREQS['G#4']],
        [NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS['C#5'], NOTE_FREQS.E5, 0, NOTE_FREQS['C#5'], 0, NOTE_FREQS.B4],
      ],
      melodyExcited: [
        [NOTE_FREQS.E5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS['C#6'], NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
        [NOTE_FREQS['F#5'], NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS.B5, NOTE_FREQS['G#5']],
      ],
      bassCalm: [[NOTE_FREQS.E2, 0, 0, NOTE_FREQS.B2, 0, 0, NOTE_FREQS.E2, 0]],
      bassExcited: [[NOTE_FREQS.E2, 0, NOTE_FREQS.B2, 0, NOTE_FREQS.E2, NOTE_FREQS['F#2'], NOTE_FREQS['G#2'], 0]],
      arpCalm: [[0, 4, 7, 11, 14, 11, 7, 4]],
      arpExcited: [[0, 2, 4, 7, 9, 11, 14, 11, 9, 7, 4, 2]],
      pulseWidth: 0.35,
      drumStyle: 'soft',
      melodyWave: 'sine',
      bassWave: 'sine',
      arpWave: 'triangle',
      vibratoRate: 3.5,
      vibratoDepth: 0.007,
      filterFreq: 2600,
      filterType: 'lowpass',
      attackTime: 0.045,
      releaseTime: 0.45,
      arpSpeed: 1.2,
    },
  ],
  lava: [
    {
      tempo: { calm: 135, excited: 170 },
      melodyCalm: [
        [NOTE_FREQS.A3, NOTE_FREQS.A3, NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.A4, NOTE_FREQS.E4, NOTE_FREQS.C4, NOTE_FREQS.A3],
        [NOTE_FREQS.G3, NOTE_FREQS.G3, NOTE_FREQS['Bb3'], NOTE_FREQS.D4, NOTE_FREQS.G4, NOTE_FREQS.D4, NOTE_FREQS['Bb3'], NOTE_FREQS.G3],
        [NOTE_FREQS.F3, NOTE_FREQS.F3, NOTE_FREQS.A3, NOTE_FREQS.C4, NOTE_FREQS.F4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.A4],
      ],
      melodyExcited: [
        [NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.A5, NOTE_FREQS.E5, NOTE_FREQS.C5, NOTE_FREQS.A4],
        [NOTE_FREQS.G4, NOTE_FREQS['Bb4'], NOTE_FREQS.D5, NOTE_FREQS.G5, NOTE_FREQS.G5, NOTE_FREQS.D5, NOTE_FREQS['Bb4'], NOTE_FREQS.G4],
      ],
      bassCalm: [[NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.G2, NOTE_FREQS.E2]],
      bassExcited: [[NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.G2, NOTE_FREQS.G2]],
      arpCalm: [[0, 3, 7, 10, 12, 10, 7, 3]],
      arpExcited: [[0, 3, 7, 12, 15, 19, 15, 12, 7, 3, 0, 3]],
      pulseWidth: 0.125,
      drumStyle: 'heavy',
      melodyWave: 'sawtooth',
      bassWave: 'sawtooth',
      arpWave: 'square',
      vibratoRate: 6,
      vibratoDepth: 0.002,
      filterFreq: 4500,
      filterType: 'lowpass',
      attackTime: 0.002,
      releaseTime: 0.15,
      arpSpeed: 0.7,
    },
    {
      tempo: { calm: 145, excited: 180 },
      melodyCalm: [
        [NOTE_FREQS.E4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4],
        [NOTE_FREQS.D4, NOTE_FREQS.D4, NOTE_FREQS.F4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.F4, NOTE_FREQS.D4],
        [NOTE_FREQS.C4, NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.C5, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.C4],
      ],
      melodyExcited: [
        [NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.C6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.G5],
        [NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.G5, NOTE_FREQS.F5],
      ],
      bassCalm: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.G2, NOTE_FREQS.A2, NOTE_FREQS.G2, NOTE_FREQS.E2, NOTE_FREQS.D2]],
      bassExcited: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.A2, NOTE_FREQS.A2]],
      arpCalm: [[0, 3, 5, 7, 10, 7, 5, 3]],
      arpExcited: [[0, 3, 5, 7, 10, 12, 15, 12, 10, 7, 5, 3]],
      pulseWidth: 0.1,
      drumStyle: 'heavy',
      melodyWave: 'sawtooth',
      bassWave: 'square',
      arpWave: 'sawtooth',
      vibratoRate: 7,
      vibratoDepth: 0.0015,
      filterFreq: 5000,
      filterType: 'lowpass',
      attackTime: 0.001,
      releaseTime: 0.1,
      arpSpeed: 0.6,
    },
    {
      tempo: { calm: 128, excited: 165 },
      melodyCalm: [
        [NOTE_FREQS.D4, NOTE_FREQS.F4, NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS.A4, NOTE_FREQS.F4, NOTE_FREQS.D4, NOTE_FREQS.A3],
        [NOTE_FREQS.C4, NOTE_FREQS['Eb4'], NOTE_FREQS.G4, NOTE_FREQS.C5, NOTE_FREQS.G4, NOTE_FREQS['Eb4'], NOTE_FREQS.C4, NOTE_FREQS.G3],
        [NOTE_FREQS['Bb3'], NOTE_FREQS.D4, NOTE_FREQS.F4, NOTE_FREQS['Bb4'], NOTE_FREQS.F4, NOTE_FREQS.D4, NOTE_FREQS['Bb3'], NOTE_FREQS.F3],
      ],
      melodyExcited: [
        [NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS.F5, NOTE_FREQS.D5],
        [NOTE_FREQS.C5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS['Eb5'], NOTE_FREQS.C5],
      ],
      bassCalm: [[NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.F2, NOTE_FREQS.A2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.C2, NOTE_FREQS['Bb2']]],
      bassExcited: [[NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.F2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.C3, NOTE_FREQS.D3]],
      arpCalm: [[0, 3, 7, 10, 12, 15, 12, 10, 7, 3]],
      arpExcited: [[0, 3, 7, 10, 12, 15, 17, 15, 12, 10, 7, 3]],
      pulseWidth: 0.15,
      drumStyle: 'heavy',
      melodyWave: 'sawtooth',
      bassWave: 'sawtooth',
      arpWave: 'square',
      vibratoRate: 5,
      vibratoDepth: 0.0025,
      filterFreq: 4200,
      filterType: 'lowpass',
      attackTime: 0.003,
      releaseTime: 0.18,
      arpSpeed: 0.75,
    },
  ],
  city: [
    {
      tempo: { calm: 115, excited: 145 },
      melodyCalm: [
        [NOTE_FREQS['Eb4'], NOTE_FREQS.G4, NOTE_FREQS['Bb4'], 0, NOTE_FREQS['Eb5'], 0, NOTE_FREQS['Bb4'], NOTE_FREQS.G4],
        [NOTE_FREQS.F4, NOTE_FREQS['Ab4'], NOTE_FREQS.C5, 0, NOTE_FREQS.F5, 0, NOTE_FREQS.C5, NOTE_FREQS['Ab4']],
        [NOTE_FREQS.G4, NOTE_FREQS['Bb4'], NOTE_FREQS.D5, NOTE_FREQS.F5, 0, NOTE_FREQS.D5, NOTE_FREQS['Bb4'], 0],
      ],
      melodyExcited: [
        [NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6'], NOTE_FREQS['Bb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6']],
        [NOTE_FREQS.F5, NOTE_FREQS['Ab5'], NOTE_FREQS.C6, NOTE_FREQS.F6, NOTE_FREQS.C6, NOTE_FREQS['Ab5'], NOTE_FREQS.C6, NOTE_FREQS.F6],
      ],
      bassCalm: [[NOTE_FREQS['Eb2'], 0, NOTE_FREQS['Bb2'], 0, NOTE_FREQS['Eb2'], 0, NOTE_FREQS.G2, 0]],
      bassExcited: [[NOTE_FREQS['Eb2'], NOTE_FREQS['Eb2'], NOTE_FREQS['Bb2'], NOTE_FREQS['Bb2'], NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS['Bb2'], NOTE_FREQS['Eb2']]],
      arpCalm: [[0, 3, 7, 10, 12, 15, 12, 10, 7, 3]],
      arpExcited: [[0, 3, 7, 10, 12, 15, 19, 22, 19, 15, 12, 10, 7, 3]],
      pulseWidth: 0.5,
      drumStyle: 'electronic',
      melodyWave: 'square',
      bassWave: 'sawtooth',
      arpWave: 'sawtooth',
      vibratoRate: 8,
      vibratoDepth: 0.001,
      filterFreq: 5000,
      filterType: 'lowpass',
      attackTime: 0.001,
      releaseTime: 0.2,
      arpSpeed: 0.5,
    },
    {
      tempo: { calm: 120, excited: 150 },
      melodyCalm: [
        [NOTE_FREQS.A4, 0, NOTE_FREQS['C#5'], NOTE_FREQS.E5, 0, NOTE_FREQS['C#5'], NOTE_FREQS.A4, 0],
        [NOTE_FREQS.B4, 0, NOTE_FREQS['D#5'], NOTE_FREQS['F#5'], 0, NOTE_FREQS['D#5'], NOTE_FREQS.B4, 0],
        [NOTE_FREQS['C#5'], 0, NOTE_FREQS.E5, NOTE_FREQS['G#5'], 0, NOTE_FREQS.E5, NOTE_FREQS['C#5'], 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS.A5, NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS.A5, NOTE_FREQS.E5],
        [NOTE_FREQS.B5, NOTE_FREQS['Eb6'], NOTE_FREQS['F#6'], NOTE_FREQS.B5, NOTE_FREQS['F#6'], NOTE_FREQS['Eb6'], NOTE_FREQS.B5, NOTE_FREQS['F#5']],
      ],
      bassCalm: [[NOTE_FREQS.A2, 0, NOTE_FREQS.E3, 0, NOTE_FREQS.A2, 0, NOTE_FREQS['C#3'], 0]],
      bassExcited: [[NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E3, NOTE_FREQS.E3, NOTE_FREQS['C#3'], NOTE_FREQS['C#3'], NOTE_FREQS.E3, NOTE_FREQS.A2]],
      arpCalm: [[0, 4, 7, 11, 14, 11, 7, 4]],
      arpExcited: [[0, 4, 7, 11, 14, 16, 19, 16, 14, 11, 7, 4]],
      pulseWidth: 0.4,
      drumStyle: 'electronic',
      melodyWave: 'square',
      bassWave: 'sawtooth',
      arpWave: 'square',
      vibratoRate: 10,
      vibratoDepth: 0.0008,
      filterFreq: 5500,
      filterType: 'lowpass',
      attackTime: 0.0008,
      releaseTime: 0.18,
      arpSpeed: 0.45,
    },
    {
      tempo: { calm: 108, excited: 138 },
      melodyCalm: [
        [NOTE_FREQS.C4, NOTE_FREQS['Eb4'], NOTE_FREQS.G4, NOTE_FREQS.C5, 0, NOTE_FREQS.G4, NOTE_FREQS['Eb4'], 0],
        [NOTE_FREQS['Bb3'], NOTE_FREQS.D4, NOTE_FREQS.F4, NOTE_FREQS['Bb4'], 0, NOTE_FREQS.F4, NOTE_FREQS.D4, 0],
        [NOTE_FREQS['Ab3'], NOTE_FREQS.C4, NOTE_FREQS['Eb4'], NOTE_FREQS['Ab4'], 0, NOTE_FREQS['Eb4'], NOTE_FREQS.C4, 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.C5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6],
        [NOTE_FREQS['Bb4'], NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS['Bb5'], NOTE_FREQS.F5, NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS['Bb5']],
      ],
      bassCalm: [[NOTE_FREQS.C2, 0, NOTE_FREQS.G2, 0, NOTE_FREQS['Eb2'], 0, NOTE_FREQS.G2, 0]],
      bassExcited: [[NOTE_FREQS.C2, NOTE_FREQS.C2, NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS['Eb2'], NOTE_FREQS['Eb2'], NOTE_FREQS.G2, NOTE_FREQS.C2]],
      arpCalm: [[0, 3, 7, 10, 15, 10, 7, 3]],
      arpExcited: [[0, 3, 7, 10, 15, 19, 22, 19, 15, 10, 7, 3]],
      pulseWidth: 0.45,
      drumStyle: 'electronic',
      melodyWave: 'sawtooth',
      bassWave: 'sawtooth',
      arpWave: 'sawtooth',
      vibratoRate: 6,
      vibratoDepth: 0.0012,
      filterFreq: 4800,
      filterType: 'lowpass',
      attackTime: 0.002,
      releaseTime: 0.22,
      arpSpeed: 0.55,
    },
  ],
  sky: [
    {
      tempo: { calm: 72, excited: 100 },
      melodyCalm: [
        [NOTE_FREQS.C5, 0, NOTE_FREQS.G5, 0, NOTE_FREQS.E5, 0, NOTE_FREQS.G5, 0],
        [NOTE_FREQS.D5, 0, NOTE_FREQS.A5, 0, NOTE_FREQS['F#5'], 0, NOTE_FREQS.A5, 0],
        [NOTE_FREQS.E5, 0, NOTE_FREQS.B5, 0, NOTE_FREQS['G#5'], 0, NOTE_FREQS.B5, 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.E6, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS.E5],
        [NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS['F#6'], NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
      ],
      bassCalm: [[NOTE_FREQS.C3, 0, 0, 0, NOTE_FREQS.G3, 0, 0, 0]],
      bassExcited: [[NOTE_FREQS.C3, 0, NOTE_FREQS.G3, 0, NOTE_FREQS.C3, 0, NOTE_FREQS.E3, 0]],
      arpCalm: [[0, 7, 12, 19, 24, 19, 12, 7]],
      arpExcited: [[0, 4, 7, 12, 16, 19, 24, 19, 16, 12, 7, 4]],
      pulseWidth: 0.25,
      drumStyle: 'airy',
      melodyWave: 'sine',
      bassWave: 'sine',
      arpWave: 'sine',
      vibratoRate: 2,
      vibratoDepth: 0.015,
      filterFreq: 2000,
      filterType: 'lowpass',
      attackTime: 0.1,
      releaseTime: 0.8,
      arpSpeed: 1.8,
    },
    {
      tempo: { calm: 68, excited: 95 },
      melodyCalm: [
        [NOTE_FREQS.G5, 0, 0, NOTE_FREQS.D6, 0, 0, NOTE_FREQS.B5, 0],
        [NOTE_FREQS.A5, 0, 0, NOTE_FREQS.E6, 0, 0, NOTE_FREQS['C#6'], 0],
        [NOTE_FREQS.B5, 0, 0, NOTE_FREQS['F#6'], 0, 0, NOTE_FREQS['D#6'], 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.G6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.D5],
        [NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS.A5, NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS.A5, NOTE_FREQS.E5],
      ],
      bassCalm: [[NOTE_FREQS.G2, 0, 0, 0, 0, 0, NOTE_FREQS.D3, 0]],
      bassExcited: [[NOTE_FREQS.G2, 0, 0, NOTE_FREQS.D3, 0, NOTE_FREQS.G2, 0, NOTE_FREQS.B2]],
      arpCalm: [[0, 5, 12, 17, 24, 17, 12, 5]],
      arpExcited: [[0, 5, 7, 12, 17, 19, 24, 19, 17, 12, 7, 5]],
      pulseWidth: 0.2,
      drumStyle: 'airy',
      melodyWave: 'sine',
      bassWave: 'sine',
      arpWave: 'triangle',
      vibratoRate: 1.5,
      vibratoDepth: 0.02,
      filterFreq: 1800,
      filterType: 'lowpass',
      attackTime: 0.12,
      releaseTime: 1.0,
      arpSpeed: 2.0,
    },
    {
      tempo: { calm: 78, excited: 105 },
      melodyCalm: [
        [NOTE_FREQS.F5, 0, NOTE_FREQS.A5, 0, NOTE_FREQS.C6, 0, NOTE_FREQS.A5, 0],
        [NOTE_FREQS.G5, 0, NOTE_FREQS.B5, 0, NOTE_FREQS.D6, 0, NOTE_FREQS.B5, 0],
        [NOTE_FREQS.A5, 0, NOTE_FREQS['C#6'], 0, NOTE_FREQS.E6, 0, NOTE_FREQS['C#6'], 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.C6, NOTE_FREQS.F6, NOTE_FREQS.C6, NOTE_FREQS.A5, NOTE_FREQS.F5, NOTE_FREQS.C5],
        [NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.G6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.D5],
      ],
      bassCalm: [[NOTE_FREQS.F3, 0, 0, 0, NOTE_FREQS.C3, 0, 0, 0]],
      bassExcited: [[NOTE_FREQS.F3, 0, NOTE_FREQS.C3, 0, NOTE_FREQS.F3, 0, NOTE_FREQS.A3, 0]],
      arpCalm: [[0, 4, 7, 12, 16, 19, 16, 12, 7, 4]],
      arpExcited: [[0, 4, 7, 12, 16, 19, 24, 28, 24, 19, 16, 12, 7, 4]],
      pulseWidth: 0.3,
      drumStyle: 'airy',
      melodyWave: 'sine',
      bassWave: 'triangle',
      arpWave: 'sine',
      vibratoRate: 2.5,
      vibratoDepth: 0.012,
      filterFreq: 2200,
      filterType: 'lowpass',
      attackTime: 0.08,
      releaseTime: 0.7,
      arpSpeed: 1.6,
    },
  ],
};

const RARE_MUSIC: Record<Region, RegionMusicConfig[]> = {
  grassland: [
    {
      tempo: { calm: 108, excited: 138 },
      melodyCalm: [
        [NOTE_FREQS.E4, NOTE_FREQS['F#4'], NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS.E5, NOTE_FREQS.B4, NOTE_FREQS['G#4'], NOTE_FREQS['F#4']],
        [NOTE_FREQS['F#4'], NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS['C#5'], NOTE_FREQS.E5, NOTE_FREQS['C#5'], NOTE_FREQS.B4, NOTE_FREQS['G#4']],
      ],
      melodyExcited: [
        [NOTE_FREQS.E5, NOTE_FREQS['F#5'], NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS.B5, NOTE_FREQS['G#5'], NOTE_FREQS['F#5']],
        [NOTE_FREQS['F#5'], NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS.B5, NOTE_FREQS['G#5']],
      ],
      bassCalm: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.B2, 0, NOTE_FREQS.E2, NOTE_FREQS['F#2'], NOTE_FREQS['G#2'], 0]],
      bassExcited: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS['G#2'], NOTE_FREQS['G#2'], NOTE_FREQS.B2, NOTE_FREQS.E2]],
      arpCalm: [[0, 4, 8, 11, 16, 11, 8, 4]],
      arpExcited: [[0, 4, 8, 11, 16, 20, 16, 11, 8, 4]],
      pulseWidth: 0.4,
      drumStyle: 'punchy',
      melodyWave: 'square',
      bassWave: 'sawtooth',
      arpWave: 'square',
      vibratoRate: 5,
      vibratoDepth: 0.004,
      filterFreq: 3500,
      filterType: 'lowpass',
      attackTime: 0.008,
      releaseTime: 0.25,
      arpSpeed: 0.9,
    },
  ],
  coastal: [
    {
      tempo: { calm: 95, excited: 125 },
      melodyCalm: [
        [NOTE_FREQS.B4, 0, NOTE_FREQS['D#5'], NOTE_FREQS['F#5'], 0, NOTE_FREQS.B5, NOTE_FREQS['F#5'], 0],
        [NOTE_FREQS['C#5'], 0, NOTE_FREQS.E5, NOTE_FREQS['G#5'], 0, NOTE_FREQS['C#6'], NOTE_FREQS['G#5'], 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.B5, NOTE_FREQS['D#6'], NOTE_FREQS['F#6'], NOTE_FREQS.B5, NOTE_FREQS['F#6'], NOTE_FREQS['D#6'], NOTE_FREQS.B5, NOTE_FREQS['F#5']],
        [NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS['G#5'], NOTE_FREQS['C#6'], NOTE_FREQS['G#5'], NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS['G#5']],
      ],
      bassCalm: [[NOTE_FREQS.B2, 0, 0, NOTE_FREQS['F#3'], 0, 0, NOTE_FREQS.B2, 0]],
      bassExcited: [[NOTE_FREQS.B2, 0, NOTE_FREQS['F#3'], 0, NOTE_FREQS.B2, NOTE_FREQS['C#3'], NOTE_FREQS['D#3'], 0]],
      arpCalm: [[0, 4, 8, 11, 16, 20, 16, 11, 8, 4]],
      arpExcited: [[0, 4, 8, 11, 16, 20, 23, 20, 16, 11, 8, 4]],
      pulseWidth: 0.35,
      drumStyle: 'punchy',
      melodyWave: 'triangle',
      bassWave: 'sine',
      arpWave: 'triangle',
      vibratoRate: 4,
      vibratoDepth: 0.01,
      filterFreq: 2800,
      filterType: 'lowpass',
      attackTime: 0.04,
      releaseTime: 0.4,
      arpSpeed: 1.1,
    },
  ],
  lava: [
    {
      tempo: { calm: 150, excited: 185 },
      melodyCalm: [
        [NOTE_FREQS.B3, NOTE_FREQS.D4, NOTE_FREQS['F#4'], NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS['F#4'], NOTE_FREQS.D4],
        [NOTE_FREQS.A3, NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.A4, NOTE_FREQS.E4, NOTE_FREQS.C4],
      ],
      melodyExcited: [
        [NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS['F#5'], NOTE_FREQS.D5],
        [NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.C6, NOTE_FREQS.A5, NOTE_FREQS.E5, NOTE_FREQS.C5],
      ],
      bassCalm: [[NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS['F#2'], NOTE_FREQS['F#2'], NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.A2, NOTE_FREQS.A2]],
      bassExcited: [[NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS['F#2'], NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.A2]],
      arpCalm: [[0, 3, 6, 9, 12, 9, 6, 3]],
      arpExcited: [[0, 3, 6, 9, 12, 15, 18, 15, 12, 9, 6, 3]],
      pulseWidth: 0.1,
      drumStyle: 'heavy',
      melodyWave: 'sawtooth',
      bassWave: 'sawtooth',
      arpWave: 'sawtooth',
      vibratoRate: 8,
      vibratoDepth: 0.001,
      filterFreq: 5500,
      filterType: 'lowpass',
      attackTime: 0.001,
      releaseTime: 0.08,
      arpSpeed: 0.5,
    },
  ],
  city: [
    {
      tempo: { calm: 128, excited: 158 },
      melodyCalm: [
        [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS['C#5'], 0, NOTE_FREQS['F#5'], 0, NOTE_FREQS['C#5'], NOTE_FREQS.A4],
        [NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS['D#5'], 0, NOTE_FREQS['G#5'], 0, NOTE_FREQS['D#5'], NOTE_FREQS.B4],
      ],
      melodyExcited: [
        [NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS['F#6'], NOTE_FREQS['C#6'], NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS['F#6']],
        [NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS['Eb6'], NOTE_FREQS['G#5'], NOTE_FREQS['Eb6'], NOTE_FREQS.B5, NOTE_FREQS['Eb6'], NOTE_FREQS['G#5']],
      ],
      bassCalm: [[NOTE_FREQS['F#2'], 0, NOTE_FREQS['C#3'], 0, NOTE_FREQS['F#2'], 0, NOTE_FREQS.A2, 0]],
      bassExcited: [[NOTE_FREQS['F#2'], NOTE_FREQS['F#2'], NOTE_FREQS['C#3'], NOTE_FREQS['C#3'], NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS['C#3'], NOTE_FREQS['F#2']]],
      arpCalm: [[0, 4, 7, 11, 14, 18, 14, 11, 7, 4]],
      arpExcited: [[0, 4, 7, 11, 14, 18, 21, 25, 21, 18, 14, 11, 7, 4]],
      pulseWidth: 0.35,
      drumStyle: 'electronic',
      melodyWave: 'sawtooth',
      bassWave: 'sawtooth',
      arpWave: 'square',
      vibratoRate: 12,
      vibratoDepth: 0.0006,
      filterFreq: 6000,
      filterType: 'lowpass',
      attackTime: 0.0005,
      releaseTime: 0.15,
      arpSpeed: 0.4,
    },
  ],
  sky: [
    {
      tempo: { calm: 80, excited: 110 },
      melodyCalm: [
        [NOTE_FREQS.D5, 0, NOTE_FREQS['F#5'], 0, NOTE_FREQS.A5, 0, NOTE_FREQS.D6, 0],
        [NOTE_FREQS.E5, 0, NOTE_FREQS['G#5'], 0, NOTE_FREQS.B5, 0, NOTE_FREQS.E6, 0],
      ],
      melodyExcited: [
        [NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS['F#6'], NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
        [NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS['G#5'], NOTE_FREQS.E6, NOTE_FREQS.B5, NOTE_FREQS['G#5']],
      ],
      bassCalm: [[NOTE_FREQS.D3, 0, 0, 0, 0, 0, NOTE_FREQS.A3, 0]],
      bassExcited: [[NOTE_FREQS.D3, 0, NOTE_FREQS.A3, 0, NOTE_FREQS.D3, 0, NOTE_FREQS['F#3'], 0]],
      arpCalm: [[0, 4, 9, 16, 21, 16, 9, 4]],
      arpExcited: [[0, 4, 9, 12, 16, 21, 24, 21, 16, 12, 9, 4]],
      pulseWidth: 0.2,
      drumStyle: 'airy',
      melodyWave: 'sine',
      bassWave: 'triangle',
      arpWave: 'sine',
      vibratoRate: 3,
      vibratoDepth: 0.018,
      filterFreq: 2400,
      filterType: 'lowpass',
      attackTime: 0.08,
      releaseTime: 0.9,
      arpSpeed: 1.5,
    },
  ],
};

const LEGENDARY_MUSIC: RegionMusicConfig[] = [
  {
    tempo: { calm: 140, excited: 175 },
    melodyCalm: [
      [NOTE_FREQS.D4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS.A4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5],
      [NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.B4, NOTE_FREQS.E5, NOTE_FREQS.B4, NOTE_FREQS.G4, NOTE_FREQS.B4, NOTE_FREQS.E5],
      [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.D5, NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS['F#5']],
    ],
    melodyExcited: [
      [NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6],
      [NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.E6],
    ],
    bassCalm: [[NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.E2, NOTE_FREQS['F#2']]],
    bassExcited: [[NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.A2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.E2]],
    arpCalm: [[0, 4, 7, 12, 16, 19]],
    arpExcited: [[0, 4, 7, 12, 16, 19, 24, 19, 16, 12, 7, 4]],
    pulseWidth: 0.125,
    drumStyle: 'heavy',
    melodyWave: 'sawtooth',
    bassWave: 'sawtooth',
    arpWave: 'square',
    vibratoRate: 7,
    vibratoDepth: 0.003,
    filterFreq: 5000,
    filterType: 'lowpass',
    attackTime: 0.002,
    releaseTime: 0.15,
    arpSpeed: 0.6,
  },
  {
    tempo: { calm: 135, excited: 168 },
    melodyCalm: [
      [NOTE_FREQS.A4, NOTE_FREQS['C#5'], NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.E5, NOTE_FREQS['C#5'], NOTE_FREQS.E5, NOTE_FREQS.A5],
      [NOTE_FREQS.B4, NOTE_FREQS['D#5'], NOTE_FREQS['F#5'], NOTE_FREQS.B5, NOTE_FREQS['F#5'], NOTE_FREQS['D#5'], NOTE_FREQS['F#5'], NOTE_FREQS.B5],
      [NOTE_FREQS['C#5'], NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS['C#6'], NOTE_FREQS['G#5'], NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS['C#6']],
    ],
    melodyExcited: [
      [NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS.A5, NOTE_FREQS.E6, NOTE_FREQS['C#6'], NOTE_FREQS.E6, NOTE_FREQS.A5],
      [NOTE_FREQS.B5, NOTE_FREQS['Eb6'], NOTE_FREQS['F#6'], NOTE_FREQS.B5, NOTE_FREQS['F#6'], NOTE_FREQS['Eb6'], NOTE_FREQS['F#6'], NOTE_FREQS.B5],
    ],
    bassCalm: [[NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E3, NOTE_FREQS.E3, NOTE_FREQS.A2, NOTE_FREQS.B2, NOTE_FREQS['C#3'], NOTE_FREQS.E3]],
    bassExcited: [[NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E3, NOTE_FREQS.A2, NOTE_FREQS.B2, NOTE_FREQS['C#3'], NOTE_FREQS.E3]],
    arpCalm: [[0, 4, 8, 12, 16, 20]],
    arpExcited: [[0, 4, 8, 12, 16, 20, 24, 20, 16, 12, 8, 4]],
    pulseWidth: 0.15,
    drumStyle: 'heavy',
    melodyWave: 'sawtooth',
    bassWave: 'sawtooth',
    arpWave: 'sawtooth',
    vibratoRate: 6,
    vibratoDepth: 0.0035,
    filterFreq: 5200,
    filterType: 'lowpass',
    attackTime: 0.002,
    releaseTime: 0.12,
    arpSpeed: 0.55,
  },
];

const MYTHIC_MUSIC: RegionMusicConfig[] = [
  {
    tempo: { calm: 155, excited: 190 },
    melodyCalm: [
      [NOTE_FREQS.E4, NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS['G#5'], NOTE_FREQS.E5],
      [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS['C#5'], NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS.A5, NOTE_FREQS['F#5']],
      [NOTE_FREQS['G#4'], NOTE_FREQS.B4, NOTE_FREQS['D#5'], NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS['Eb6'], NOTE_FREQS.B5, NOTE_FREQS['G#5']],
    ],
    melodyExcited: [
      [NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS['G#5']],
      [NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS['F#6'], NOTE_FREQS.A5, NOTE_FREQS['C#6'], NOTE_FREQS['F#6'], NOTE_FREQS.A5],
    ],
    bassCalm: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS['G#2'], NOTE_FREQS['G#2'], NOTE_FREQS.B2, NOTE_FREQS.E2]],
    bassExcited: [[NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.B2, NOTE_FREQS.E2, NOTE_FREQS['G#2'], NOTE_FREQS.B2, NOTE_FREQS.E2]],
    arpCalm: [[0, 4, 7, 11, 16, 19, 23, 19, 16, 11, 7, 4]],
    arpExcited: [[0, 4, 7, 11, 16, 19, 23, 28, 23, 19, 16, 11, 7, 4]],
    pulseWidth: 0.1,
    drumStyle: 'heavy',
    melodyWave: 'sawtooth',
    bassWave: 'square',
    arpWave: 'sawtooth',
    vibratoRate: 9,
    vibratoDepth: 0.002,
    filterFreq: 5800,
    filterType: 'lowpass',
    attackTime: 0.001,
    releaseTime: 0.1,
    arpSpeed: 0.45,
  },
  {
    tempo: { calm: 148, excited: 185 },
    melodyCalm: [
      [NOTE_FREQS.C5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6],
      [NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.D6],
      [NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6'], NOTE_FREQS['Bb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6']],
    ],
    melodyExcited: [
      [NOTE_FREQS.C5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS['Eb6'], NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS['Eb5']],
      [NOTE_FREQS.D5, NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.F6, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS.F5],
    ],
    bassCalm: [[NOTE_FREQS.C2, NOTE_FREQS.C2, NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS['Eb2'], NOTE_FREQS['Eb2'], NOTE_FREQS.G2, NOTE_FREQS.C2]],
    bassExcited: [[NOTE_FREQS.C2, NOTE_FREQS.C2, NOTE_FREQS.C2, NOTE_FREQS.G2, NOTE_FREQS['Eb2'], NOTE_FREQS['Eb2'], NOTE_FREQS.G2, NOTE_FREQS.C2]],
    arpCalm: [[0, 3, 7, 12, 15, 19, 24, 19, 15, 12, 7, 3]],
    arpExcited: [[0, 3, 7, 12, 15, 19, 24, 27, 24, 19, 15, 12, 7, 3]],
    pulseWidth: 0.12,
    drumStyle: 'heavy',
    melodyWave: 'sawtooth',
    bassWave: 'sawtooth',
    arpWave: 'square',
    vibratoRate: 8,
    vibratoDepth: 0.0025,
    filterFreq: 5500,
    filterType: 'lowpass',
    attackTime: 0.0015,
    releaseTime: 0.12,
    arpSpeed: 0.5,
  },
];

const TITLE_THEME_CONFIG: RegionMusicConfig = {
  tempo: { calm: 95, excited: 95 },
  melodyCalm: [
    [NOTE_FREQS.F4, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.A4, 0, NOTE_FREQS.F4, 0],
    [NOTE_FREQS.G4, 0, NOTE_FREQS.A4, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.A4, 0],
    [NOTE_FREQS.A4, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.F5, 0, NOTE_FREQS.C5, 0],
    [NOTE_FREQS.C5, 0, NOTE_FREQS.A4, 0, NOTE_FREQS.F4, 0, NOTE_FREQS.F4, 0],
  ],
  melodyExcited: [
    [NOTE_FREQS.F5, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.A4, 0, NOTE_FREQS.F5, 0],
    [NOTE_FREQS.A4, 0, NOTE_FREQS.C5, 0, NOTE_FREQS.F5, 0, NOTE_FREQS.A4, 0],
  ],
  bassCalm: [
    [NOTE_FREQS.F2, 0, 0, 0, NOTE_FREQS.C3, 0, 0, 0],
    [NOTE_FREQS.F2, 0, NOTE_FREQS.C3, 0, 0, 0, NOTE_FREQS.F2, 0],
  ],
  bassExcited: [[NOTE_FREQS.F2, 0, 0, NOTE_FREQS.C3, NOTE_FREQS.F2, 0, 0, 0]],
  arpCalm: [[0, 4, 7, 12, 16, 12, 7, 4]],
  arpExcited: [[0, 4, 7, 12, 16, 12, 7, 4]],
  pulseWidth: 0.5,
  drumStyle: 'soft',
  melodyWave: 'triangle',
  bassWave: 'sine',
  arpWave: 'triangle',
  vibratoRate: 3.5,
  vibratoDepth: 0.006,
  filterFreq: 2800,
  filterType: 'lowpass',
  attackTime: 0.045,
  releaseTime: 0.42,
  arpSpeed: 1.15,
};

function getMusicConfig(region: Region, rarity: CreatureRarity): RegionMusicConfig {
  let musicArray: RegionMusicConfig[];
  
  switch (rarity) {
    case 'mythic':
      musicArray = MYTHIC_MUSIC;
      break;
    case 'legendary':
      musicArray = LEGENDARY_MUSIC;
      break;
    case 'rare':
      musicArray = RARE_MUSIC[region];
      break;
    case 'common':
    default:
      musicArray = REGION_MUSIC[region];
      break;
  }
  
  const randomIndex = Math.floor(Math.random() * musicArray.length);
  return musicArray[randomIndex];
}

export function useRegionMusic(region: Region, rarity: CreatureRarity = 'common'): BrushingMusicController {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const intensityRef = useRef<'calm' | 'excited'>('calm');
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentPatternRef = useRef(0);
  const barCountRef = useRef(0);
  const regionRef = useRef(region);
  const rarityRef = useRef(rarity);
  const musicConfigRef = useRef<RegionMusicConfig>(getMusicConfig(region, rarity));

  useEffect(() => {
    regionRef.current = region;
    rarityRef.current = rarity;
    musicConfigRef.current = getMusicConfig(region, rarity);
  }, [region, rarity]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playChiptuneNote = useCallback((
    frequency: number, 
    startTime: number, 
    duration: number, 
    volume: number,
    config: RegionMusicConfig
  ) => {
    const ctx = getAudioContext();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const masterGain = ctx.createGain();
    
    osc1.type = config.melodyWave;
    osc2.type = config.melodyWave;
    
    osc1.frequency.setValueAtTime(frequency, startTime);
    osc2.frequency.setValueAtTime(frequency * 1.003, startTime);
    
    osc1.frequency.setValueAtTime(frequency * 1.02, startTime);
    osc1.frequency.exponentialRampToValueAtTime(frequency, startTime + 0.02);
    
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = config.vibratoRate;
    lfoGain.gain.value = frequency * config.vibratoDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    
    filter.type = config.filterType;
    filter.frequency.setValueAtTime(config.filterFreq, startTime);
    filter.Q.value = 1;
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    
    const attackEnd = startTime + config.attackTime;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, attackEnd);
    gainNode.gain.setValueAtTime(volume * 0.7, attackEnd + 0.005);
    gainNode.gain.setValueAtTime(volume * 0.6, startTime + duration * 0.3);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration + config.releaseTime * 0.5);
    
    masterGain.gain.value = 0.5;
    
    const stopTime = startTime + duration + config.releaseTime;
    osc1.start(startTime);
    osc2.start(startTime);
    lfo.start(startTime);
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    lfo.stop(stopTime);
  }, [getAudioContext]);

  const playChiptuneBass = useCallback((
    frequency: number, 
    startTime: number, 
    duration: number, 
    volume: number,
    config: RegionMusicConfig
  ) => {
    const ctx = getAudioContext();
    
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = config.bassWave;
    osc2.type = config.bassWave;
    
    osc.frequency.setValueAtTime(frequency * 1.5, startTime);
    osc.frequency.exponentialRampToValueAtTime(frequency, startTime + 0.03);
    osc2.frequency.setValueAtTime(frequency * 0.5, startTime);
    
    filter.type = 'lowpass';
    filter.frequency.value = Math.min(config.filterFreq * 0.5, 800);
    
    osc.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + config.attackTime * 0.5);
    gainNode.gain.setValueAtTime(volume * 0.8, startTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    
    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }, [getAudioContext]);

  const playChiptuneDrum = useCallback((startTime: number, type: 'kick' | 'snare' | 'hihat', style: string) => {
    const ctx = getAudioContext();
    
    const volumeMultiplier = style === 'heavy' ? 1.3 : style === 'airy' ? 0.5 : 1.0;
    
    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'square';
      const startFreq = style === 'heavy' ? 200 : 150;
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(20, startTime + 0.12);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, startTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
      
      osc.start(startTime);
      osc.stop(startTime + 0.12);
    } else if (type === 'snare') {
      const toneOsc = ctx.createOscillator();
      const toneGain = ctx.createGain();
      toneOsc.connect(toneGain);
      toneGain.connect(ctx.destination);
      
      toneOsc.type = 'square';
      toneOsc.frequency.setValueAtTime(180, startTime);
      toneOsc.frequency.exponentialRampToValueAtTime(100, startTime + 0.04);
      
      toneGain.gain.setValueAtTime(0, startTime);
      toneGain.gain.linearRampToValueAtTime(0.15 * volumeMultiplier, startTime + 0.001);
      toneGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.06);
      
      toneOsc.start(startTime);
      toneOsc.stop(startTime + 0.06);
      
      const noiseLength = 0.08;
      const bufferSize = Math.floor(ctx.sampleRate * noiseLength);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      let lastValue = 0;
      for (let i = 0; i < bufferSize; i++) {
        if (i % 4 === 0) {
          lastValue = Math.random() > 0.5 ? 1 : -1;
        }
        data[i] = lastValue;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = style === 'electronic' ? 5000 : 3500;
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseGain.gain.setValueAtTime(0, startTime);
      noiseGain.gain.linearRampToValueAtTime(0.12 * volumeMultiplier, startTime + 0.001);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + noiseLength);
      
      noise.start(startTime);
      noise.stop(startTime + noiseLength);
    } else {
      const noiseLength = style === 'airy' ? 0.04 : 0.025;
      const bufferSize = Math.floor(ctx.sampleRate * noiseLength);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      let lastValue = 0;
      for (let i = 0; i < bufferSize; i++) {
        if (i % 2 === 0) {
          lastValue = Math.random() > 0.5 ? 1 : -1;
        }
        data[i] = lastValue;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = style === 'electronic' ? 10000 : 8000;
      const gain = ctx.createGain();
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06 * volumeMultiplier, startTime + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + noiseLength);
      
      noise.start(startTime);
      noise.stop(startTime + noiseLength);
    }
  }, [getAudioContext]);

  const playChiptuneArpeggio = useCallback((
    baseFreq: number, 
    pattern: number[], 
    startTime: number, 
    totalDuration: number, 
    volume: number,
    config: RegionMusicConfig
  ) => {
    const ctx = getAudioContext();
    const adjustedDuration = totalDuration * config.arpSpeed;
    const noteDuration = adjustedDuration / pattern.length;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 400;
    filter.connect(ctx.destination);
    
    pattern.forEach((semitones, i) => {
      const freq = baseFreq * Math.pow(2, semitones / 12);
      const noteStart = startTime + i * noteDuration;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = config.arpWave;
      osc.frequency.setValueAtTime(freq, noteStart);
      
      osc.connect(gainNode);
      gainNode.connect(filter);
      
      gainNode.gain.setValueAtTime(0, noteStart);
      gainNode.gain.linearRampToValueAtTime(volume, noteStart + config.attackTime * 0.3);
      gainNode.gain.setValueAtTime(volume * 0.7, noteStart + 0.005);
      gainNode.gain.linearRampToValueAtTime(0, noteStart + noteDuration * 0.9);
      
      osc.start(noteStart);
      osc.stop(noteStart + noteDuration + 0.01);
    });
  }, [getAudioContext]);

  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    const scheduleAhead = 0.1;
    const isExcited = intensityRef.current === 'excited';
    const config = musicConfigRef.current;
    const isSpecialRarity = rarityRef.current === 'legendary' || rarityRef.current === 'mythic' || rarityRef.current === 'rare';
    const tempo = isExcited ? config.tempo.excited : config.tempo.calm;
    const secondsPerBeat = 60.0 / tempo;
    
    const melodyPatterns = isExcited ? config.melodyExcited : config.melodyCalm;
    const bassPatterns = isExcited ? config.bassExcited : config.bassCalm;
    const arpPatterns = isExcited ? config.arpExcited : config.arpCalm;
    
    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAhead) {
      const beat = currentBeatRef.current % 8;
      const patternIndex = currentPatternRef.current % melodyPatterns.length;
      const bassIndex = currentPatternRef.current % bassPatterns.length;
      const arpIndex = currentPatternRef.current % arpPatterns.length;
      
      const melody = melodyPatterns[patternIndex];
      const bass = bassPatterns[bassIndex];
      const arpPattern = arpPatterns[arpIndex];
      
      if (beat === 0) {
        playChiptuneDrum(nextNoteTimeRef.current, 'kick', config.drumStyle);
      }
      if (beat === 4) {
        playChiptuneDrum(nextNoteTimeRef.current, isExcited || isSpecialRarity ? 'snare' : 'kick', config.drumStyle);
      }
      if (isExcited || isSpecialRarity) {
        if (beat % 2 === 0) {
          playChiptuneDrum(nextNoteTimeRef.current, 'hihat', config.drumStyle);
        }
        playChiptuneDrum(nextNoteTimeRef.current + secondsPerBeat / 2, 'hihat', config.drumStyle);
      } else {
        if (beat % 2 === 0) {
          playChiptuneDrum(nextNoteTimeRef.current + secondsPerBeat / 2, 'hihat', config.drumStyle);
        }
      }
      
      const melodyNote = melody[beat];
      if (melodyNote > 0) {
        const volume = isSpecialRarity ? 0.08 : 0.06;
        playChiptuneNote(melodyNote, nextNoteTimeRef.current, secondsPerBeat * 0.8, volume, config);
      }
      
      const bassNote = bass[beat];
      if (bassNote > 0) {
        const volume = isSpecialRarity ? 0.1 : 0.08;
        playChiptuneBass(bassNote, nextNoteTimeRef.current, secondsPerBeat * 0.9, volume, config);
      }
      
      if (beat % 4 === 0) {
        const arpBase = NOTE_FREQS.C4;
        const volume = isSpecialRarity ? 0.04 : 0.03;
        playChiptuneArpeggio(arpBase, arpPattern, nextNoteTimeRef.current, secondsPerBeat * 2, volume, config);
      }
      
      if (beat === 7) {
        barCountRef.current++;
        if (barCountRef.current % 2 === 0) {
          currentPatternRef.current++;
        }
      }
      
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current++;
    }
  }, [getAudioContext, playChiptuneNote, playChiptuneBass, playChiptuneDrum, playChiptuneArpeggio]);

  const start = useCallback(() => {
    if (isPlayingRef.current) return;
    
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    isPlayingRef.current = true;
    intensityRef.current = 'calm';
    nextNoteTimeRef.current = ctx.currentTime;
    currentBeatRef.current = 0;
    currentPatternRef.current = 0;
    barCountRef.current = 0;
    
    intervalRef.current = window.setInterval(scheduler, 25);
  }, [getAudioContext, scheduler]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  const setIntensity = useCallback((level: 'calm' | 'excited') => {
    if (intensityRef.current !== level) {
      intensityRef.current = level;
      currentPatternRef.current = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [stop]);

  return { start, stop, setIntensity };
}

export interface TitleThemeController {
  start: () => void;
  stop: () => void;
}

export function useTitleTheme(): TitleThemeController {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentPatternRef = useRef(0);
  const barCountRef = useRef(0);
  const config = TITLE_THEME_CONFIG;

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playNote = useCallback((
    frequency: number, startTime: number, duration: number, volume: number
  ) => {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const masterGain = ctx.createGain();
    osc1.type = config.melodyWave;
    osc2.type = config.melodyWave;
    osc1.frequency.setValueAtTime(frequency, startTime);
    osc2.frequency.setValueAtTime(frequency * 1.003, startTime);
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = config.vibratoRate;
    lfoGain.gain.value = frequency * config.vibratoDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    filter.type = config.filterType;
    filter.frequency.setValueAtTime(config.filterFreq, startTime);
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + config.attackTime);
    gainNode.gain.setValueAtTime(volume * 0.6, startTime + duration * 0.5);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration + config.releaseTime * 0.5);
    masterGain.gain.value = 0.45;
    const stopTime = startTime + duration + config.releaseTime + 0.05;
    osc1.start(startTime);
    osc2.start(startTime);
    lfo.start(startTime);
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    lfo.stop(stopTime);
  }, [getAudioContext]);

  const playBass = useCallback((
    frequency: number, startTime: number, duration: number, volume: number
  ) => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = config.bassWave;
    osc.frequency.setValueAtTime(frequency * 1.5, startTime);
    osc.frequency.exponentialRampToValueAtTime(frequency, startTime + 0.05);
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    osc.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + config.attackTime * 0.5);
    gainNode.gain.setValueAtTime(volume * 0.8, startTime + duration * 0.3);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration + config.releaseTime * 0.3);
    osc.start(startTime);
    osc.stop(startTime + duration + config.releaseTime);
  }, [getAudioContext]);

  const playDrum = useCallback((startTime: number, type: 'kick' | 'snare' | 'hihat') => {
    const ctx = getAudioContext();
    const airy = config.drumStyle === 'airy';
    const soft = config.drumStyle === 'soft';
    const kickGain = airy ? 0.18 : soft ? 0.22 : 0.35;
    const kickDecay = airy ? 0.2 : soft ? 0.16 : 0.12;
    const snareGain = airy ? 0.08 : soft ? 0.11 : 0.18;
    const hihatGain = airy ? 0.03 : soft ? 0.045 : 0.07;
    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = airy || soft ? 'triangle' : 'square';
      osc.frequency.setValueAtTime(airy ? 120 : soft ? 130 : 150, startTime);
      osc.frequency.exponentialRampToValueAtTime(40, startTime + (airy ? 0.12 : soft ? 0.1 : 0.08));
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(kickGain, startTime + (soft ? 0.008 : 0.005));
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + kickDecay);
      osc.start(startTime);
      osc.stop(startTime + kickDecay);
    } else if (type === 'snare') {
      const toneOsc = ctx.createOscillator();
      const toneGain = ctx.createGain();
      toneOsc.connect(toneGain);
      toneGain.connect(ctx.destination);
      toneOsc.type = airy ? 'sine' : soft ? 'triangle' : 'square';
      toneOsc.frequency.setValueAtTime(180, startTime);
      toneOsc.frequency.exponentialRampToValueAtTime(100, startTime + 0.04);
      toneGain.gain.setValueAtTime(0, startTime);
      toneGain.gain.linearRampToValueAtTime(snareGain, startTime + 0.001);
      toneGain.gain.exponentialRampToValueAtTime(0.01, startTime + (airy ? 0.1 : soft ? 0.08 : 0.06));
      toneOsc.start(startTime);
      toneOsc.stop(startTime + 0.06);
      const bufferSize = Math.floor(ctx.sampleRate * (airy ? 0.05 : soft ? 0.06 : 0.08));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastValue = 0;
      for (let i = 0; i < bufferSize; i++) {
        if (i % 4 === 0) lastValue = Math.random() > 0.5 ? 1 : -1;
        data[i] = lastValue;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = airy ? 2500 : soft ? 3000 : 3500;
      noise.connect(hp);
      hp.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseGain.gain.setValueAtTime(0, startTime);
      noiseGain.gain.linearRampToValueAtTime(airy ? 0.06 : soft ? 0.09 : 0.12, startTime + 0.001);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + (airy ? 0.06 : soft ? 0.07 : 0.08));
      noise.start(startTime);
      noise.stop(startTime + (airy ? 0.06 : soft ? 0.07 : 0.08));
    } else {
      const bufferSize = Math.floor(ctx.sampleRate * (airy ? 0.018 : soft ? 0.022 : 0.025));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastValue = 0;
      for (let i = 0; i < bufferSize; i++) {
        if (i % 2 === 0) lastValue = Math.random() > 0.5 ? 1 : -1;
        data[i] = lastValue;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 8000;
      const gain = ctx.createGain();
      noise.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(hihatGain, startTime + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + (airy ? 0.018 : soft ? 0.022 : 0.025));
      noise.start(startTime);
      noise.stop(startTime + (airy ? 0.02 : soft ? 0.024 : 0.025));
    }
  }, [getAudioContext]);

  const playArp = useCallback((
    baseFreq: number, pattern: number[], startTime: number, totalDuration: number, volume: number
  ) => {
    const ctx = getAudioContext();
    const noteDuration = totalDuration / pattern.length;
    pattern.forEach((semitones, i) => {
      const freq = baseFreq * Math.pow(2, semitones / 12);
      const noteStart = startTime + i * noteDuration;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = config.arpWave;
      osc.frequency.setValueAtTime(freq, noteStart);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0, noteStart);
      gainNode.gain.linearRampToValueAtTime(volume, noteStart + 0.002);
      gainNode.gain.linearRampToValueAtTime(0, noteStart + noteDuration * 0.9);
      osc.start(noteStart);
      osc.stop(noteStart + noteDuration);
    });
  }, [getAudioContext]);

  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    const scheduleAhead = 0.1;
    const tempo = config.tempo.calm;
    const secondsPerBeat = 60.0 / tempo;
    const melodyPatterns = config.melodyCalm;
    const bassPatterns = config.bassCalm;
    const arpPatterns = config.arpCalm;

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAhead) {
      const beat = currentBeatRef.current % 8;
      const patternIndex = currentPatternRef.current % melodyPatterns.length;
      const bassIndex = currentPatternRef.current % bassPatterns.length;
      const arpPattern = arpPatterns[0];

      const melody = melodyPatterns[patternIndex];
      const bass = bassPatterns[bassIndex];

      const airyDrums = config.drumStyle === 'airy';
      if (beat === 0) playDrum(nextNoteTimeRef.current, 'kick');
      if (!airyDrums && beat === 4) playDrum(nextNoteTimeRef.current, 'snare');
      if (airyDrums ? beat === 6 : (beat === 2 || beat === 6)) {
        playDrum(nextNoteTimeRef.current + (airyDrums ? 0 : secondsPerBeat / 2), 'hihat');
      }

      const melodyNote = melody[beat];
      if (melodyNote > 0) {
        playNote(melodyNote, nextNoteTimeRef.current, secondsPerBeat * 0.8, 0.065);
      }
      const bassNote = bass[beat];
      if (bassNote > 0) {
        playBass(bassNote, nextNoteTimeRef.current, secondsPerBeat * 0.9, 0.085);
      }
      if (beat === 0) {
        playArp(NOTE_FREQS.F4, arpPattern, nextNoteTimeRef.current, secondsPerBeat * 4, 0.032);
      }

      if (beat === 7) {
        barCountRef.current++;
        if (barCountRef.current % 2 === 0) {
          currentPatternRef.current++;
        }
      }
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current++;
    }
  }, [getAudioContext, playNote, playBass, playDrum, playArp]);

  const start = useCallback(() => {
    if (isPlayingRef.current) return;
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    isPlayingRef.current = true;
    nextNoteTimeRef.current = ctx.currentTime;
    currentBeatRef.current = 0;
    currentPatternRef.current = 0;
    barCountRef.current = 0;
    intervalRef.current = window.setInterval(scheduler, 25);
  }, [getAudioContext, scheduler]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [stop]);

  return { start, stop };
}

export function useBrushingMusic(): BrushingMusicController {
  return useRegionMusic('grassland', 'common');
}

export function useAudio(options: UseAudioOptions = {}) {
  const { loop = false, volume = 0.5 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;
    
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
    
    audio.onended = () => {
      if (!loop) setIsPlaying(false);
    };
  }, [loop, volume, isMuted]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : volume;
      }
      return newMuted;
    });
  }, [volume]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    play,
    stop: stopAudio,
    pause,
    resume,
    toggleMute,
    isPlaying,
    isMuted
  };
}

export function playSoundEffect(name: 'success' | 'fail' | 'brush' | 'sparkle' | 'capture' | 'legendary-intro' | 'wobble' | 'click' | 'tooth-bounce' | 'tooth-fly') {
  const sounds: Record<string, () => void> = {
    success: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      const notes = [NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.C6];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.08 + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
    },
    fail: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      const notes = [NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.C4];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.12 + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.15);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.15);
      });
      
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      sparkle.type = 'square';
      sparkle.frequency.setValueAtTime(1000, ctx.currentTime + 0.4);
      sparkle.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.45);
      sparkleGain.gain.setValueAtTime(0, ctx.currentTime + 0.4);
      sparkleGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.402);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      sparkle.start(ctx.currentTime + 0.4);
      sparkle.stop(ctx.currentTime + 0.5);
    },
    sparkle: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    },
    brush: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastValue = 0;
      for (let i = 0; i < bufferSize; i++) {
        if (i % 4 === 0) lastValue = Math.random() > 0.5 ? 1 : -1;
        output[i] = lastValue;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1500;
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      whiteNoise.start(ctx.currentTime);
      whiteNoise.stop(ctx.currentTime + 0.08);
    },
    capture: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    },
    'legendary-intro': () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      const dramaNotes = [NOTE_FREQS.D3, NOTE_FREQS.A3, NOTE_FREQS.D4, NOTE_FREQS['F#4']];
      dramaNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime + i * 0.2);
        osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + i * 0.2 + 0.05);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.2);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.2 + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.25);
        osc.start(ctx.currentTime + i * 0.2);
        osc.stop(ctx.currentTime + i * 0.2 + 0.25);
      });
      
      setTimeout(() => {
        const finalChord = [NOTE_FREQS.D4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5];
        finalChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.002);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.5);
        });
      }, 900);
    },
    wobble: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.005);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    },
    click: () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(800, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);
      
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.005);
      gain1.gain.setValueAtTime(0.35, ctx.currentTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.1);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1600, ctx.currentTime + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.08);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime + 0.05);
      gain2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.055);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      osc2.start(ctx.currentTime + 0.05);
      osc2.stop(ctx.currentTime + 0.12);
    },
    'tooth-bounce': () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    },
    'tooth-fly': () => {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const notes = [NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.G6];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.06 + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.06 + 0.1);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.1);
      });
    }
  };
  
  try {
    sounds[name]?.();
  } catch (e) {
    console.warn('Sound playback failed:', e);
  }
}
