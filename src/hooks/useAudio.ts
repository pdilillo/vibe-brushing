import { useRef, useCallback, useEffect, useState } from 'react';
import type { Region } from '../types';

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

const REGION_MUSIC: Record<Region, RegionMusicConfig> = {
  grassland: {
    tempo: { calm: 100, excited: 128 },
    melodyCalm: [
      [NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4],
      [NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.D4],
      [NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4],
      [NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4, NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.B4],
    ],
    melodyExcited: [
      [NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5],
      [NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.G5],
      [NOTE_FREQS.D5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS.G5, NOTE_FREQS.E5],
    ],
    bassCalm: [
      [NOTE_FREQS.G2, 0, NOTE_FREQS.D3, 0, NOTE_FREQS.G2, 0, NOTE_FREQS.B2, 0],
      [NOTE_FREQS.E2, 0, NOTE_FREQS.B2, 0, NOTE_FREQS.E2, 0, NOTE_FREQS.G2, 0],
    ],
    bassExcited: [
      [NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.D3, NOTE_FREQS.D3, NOTE_FREQS.B2, NOTE_FREQS.B2, NOTE_FREQS.D3, NOTE_FREQS.G2],
    ],
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
  coastal: {
    tempo: { calm: 88, excited: 116 },
    melodyCalm: [
      [NOTE_FREQS.D4, NOTE_FREQS.E4, NOTE_FREQS.A4, 0, NOTE_FREQS.B4, NOTE_FREQS.A4, NOTE_FREQS.E4, 0],
      [NOTE_FREQS.E4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.B4, 0, NOTE_FREQS.A4, NOTE_FREQS['F#4'], NOTE_FREQS.E4],
      [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.B4, NOTE_FREQS.D5, NOTE_FREQS.B4, 0, NOTE_FREQS.A4, NOTE_FREQS['F#4']],
      [NOTE_FREQS.A4, 0, NOTE_FREQS.E4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, 0, NOTE_FREQS.D4, NOTE_FREQS.E4],
    ],
    melodyExcited: [
      [NOTE_FREQS.D5, NOTE_FREQS.E5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5'], NOTE_FREQS.E5],
      [NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.D6, NOTE_FREQS.E6, NOTE_FREQS.D6, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
      [NOTE_FREQS.E5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.B5, NOTE_FREQS.A5, NOTE_FREQS['F#5'], NOTE_FREQS.E5, NOTE_FREQS.D5],
    ],
    bassCalm: [
      [NOTE_FREQS.D2, 0, 0, NOTE_FREQS.A2, 0, 0, NOTE_FREQS.D2, 0],
      [NOTE_FREQS.E2, 0, 0, NOTE_FREQS.B2, 0, 0, NOTE_FREQS.E2, 0],
    ],
    bassExcited: [
      [NOTE_FREQS.D2, 0, NOTE_FREQS.A2, 0, NOTE_FREQS.D2, NOTE_FREQS.E2, NOTE_FREQS['F#2'], 0],
    ],
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
  lava: {
    tempo: { calm: 135, excited: 170 },
    melodyCalm: [
      [NOTE_FREQS.A3, NOTE_FREQS.A3, NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.A4, NOTE_FREQS.E4, NOTE_FREQS.C4, NOTE_FREQS.A3],
      [NOTE_FREQS.G3, NOTE_FREQS.G3, NOTE_FREQS['Bb3'], NOTE_FREQS.D4, NOTE_FREQS.G4, NOTE_FREQS.D4, NOTE_FREQS['Bb3'], NOTE_FREQS.G3],
      [NOTE_FREQS.F3, NOTE_FREQS.F3, NOTE_FREQS.A3, NOTE_FREQS.C4, NOTE_FREQS.F4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.A4],
      [NOTE_FREQS.E4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.A4, NOTE_FREQS.G4, NOTE_FREQS.E4],
    ],
    melodyExcited: [
      [NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.A5, NOTE_FREQS.A5, NOTE_FREQS.E5, NOTE_FREQS.C5, NOTE_FREQS.A4],
      [NOTE_FREQS.G4, NOTE_FREQS['Bb4'], NOTE_FREQS.D5, NOTE_FREQS.G5, NOTE_FREQS.G5, NOTE_FREQS.D5, NOTE_FREQS['Bb4'], NOTE_FREQS.G4],
      [NOTE_FREQS.F4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.F5, NOTE_FREQS.A5, NOTE_FREQS.F5, NOTE_FREQS.C5, NOTE_FREQS.A4],
      [NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.A4, NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.E5, NOTE_FREQS.C5],
    ],
    bassCalm: [
      [NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.G2, NOTE_FREQS.E2],
      [NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.D2, NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS.F2, NOTE_FREQS.D2],
    ],
    bassExcited: [
      [NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.G2, NOTE_FREQS.G2],
      [NOTE_FREQS.F2, NOTE_FREQS.F2, NOTE_FREQS.F2, NOTE_FREQS.F2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2, NOTE_FREQS.E2],
    ],
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
  city: {
    tempo: { calm: 115, excited: 145 },
    melodyCalm: [
      [NOTE_FREQS['Eb4'], NOTE_FREQS.G4, NOTE_FREQS['Bb4'], 0, NOTE_FREQS['Eb5'], 0, NOTE_FREQS['Bb4'], NOTE_FREQS.G4],
      [NOTE_FREQS.F4, NOTE_FREQS['Ab4'], NOTE_FREQS.C5, 0, NOTE_FREQS.F5, 0, NOTE_FREQS.C5, NOTE_FREQS['Ab4']],
      [NOTE_FREQS.G4, NOTE_FREQS['Bb4'], NOTE_FREQS.D5, NOTE_FREQS.F5, 0, NOTE_FREQS.D5, NOTE_FREQS['Bb4'], 0],
      [NOTE_FREQS['Ab4'], NOTE_FREQS.C5, NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS['Eb5'], NOTE_FREQS.C5, NOTE_FREQS['Ab4'], 0],
    ],
    melodyExcited: [
      [NOTE_FREQS['Eb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6'], NOTE_FREQS['Bb5'], NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS['Eb6']],
      [NOTE_FREQS.F5, NOTE_FREQS['Ab5'], NOTE_FREQS.C6, NOTE_FREQS.F6, NOTE_FREQS.C6, NOTE_FREQS['Ab5'], NOTE_FREQS.C6, NOTE_FREQS.F6],
      [NOTE_FREQS.G5, NOTE_FREQS['Bb5'], NOTE_FREQS.D6, NOTE_FREQS.G6, NOTE_FREQS.D6, NOTE_FREQS['Bb5'], NOTE_FREQS.G5, NOTE_FREQS.D6],
    ],
    bassCalm: [
      [NOTE_FREQS['Eb2'], 0, NOTE_FREQS['Bb2'], 0, NOTE_FREQS['Eb2'], 0, NOTE_FREQS.G2, 0],
      [NOTE_FREQS.F2, 0, NOTE_FREQS.C3, 0, NOTE_FREQS.F2, 0, NOTE_FREQS['Ab2'], 0],
    ],
    bassExcited: [
      [NOTE_FREQS['Eb2'], NOTE_FREQS['Eb2'], NOTE_FREQS['Bb2'], NOTE_FREQS['Bb2'], NOTE_FREQS.G2, NOTE_FREQS.G2, NOTE_FREQS['Bb2'], NOTE_FREQS['Eb2']],
    ],
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
  sky: {
    tempo: { calm: 72, excited: 100 },
    melodyCalm: [
      [NOTE_FREQS.C5, 0, NOTE_FREQS.G5, 0, NOTE_FREQS.E5, 0, NOTE_FREQS.G5, 0],
      [NOTE_FREQS.D5, 0, NOTE_FREQS.A5, 0, NOTE_FREQS['F#5'], 0, NOTE_FREQS.A5, 0],
      [NOTE_FREQS.E5, 0, NOTE_FREQS.B5, 0, NOTE_FREQS['G#5'], 0, NOTE_FREQS.B5, 0],
      [NOTE_FREQS.G5, 0, NOTE_FREQS.D6, 0, NOTE_FREQS.B5, 0, NOTE_FREQS.G5, 0],
    ],
    melodyExcited: [
      [NOTE_FREQS.C5, NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.C6, NOTE_FREQS.E6, NOTE_FREQS.C6, NOTE_FREQS.G5, NOTE_FREQS.E5],
      [NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS['F#6'], NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS['F#5']],
      [NOTE_FREQS.E5, NOTE_FREQS['G#5'], NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS.B5, NOTE_FREQS['G#5'], NOTE_FREQS.E5, NOTE_FREQS.B4],
    ],
    bassCalm: [
      [NOTE_FREQS.C3, 0, 0, 0, NOTE_FREQS.G3, 0, 0, 0],
      [NOTE_FREQS.D3, 0, 0, 0, NOTE_FREQS.A3, 0, 0, 0],
      [NOTE_FREQS.E3, 0, 0, 0, NOTE_FREQS.B3, 0, 0, 0],
    ],
    bassExcited: [
      [NOTE_FREQS.C3, 0, NOTE_FREQS.G3, 0, NOTE_FREQS.C3, 0, NOTE_FREQS.E3, 0],
    ],
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
};

const LEGENDARY_MUSIC: RegionMusicConfig = {
  tempo: { calm: 140, excited: 175 },
  melodyCalm: [
    [NOTE_FREQS.D4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS.A4, NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5],
    [NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.B4, NOTE_FREQS.E5, NOTE_FREQS.B4, NOTE_FREQS.G4, NOTE_FREQS.B4, NOTE_FREQS.E5],
    [NOTE_FREQS['F#4'], NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.D5, NOTE_FREQS.A4, NOTE_FREQS.D5, NOTE_FREQS['F#5']],
  ],
  melodyExcited: [
    [NOTE_FREQS.D5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6],
    [NOTE_FREQS.E5, NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.E6, NOTE_FREQS.B5, NOTE_FREQS.G5, NOTE_FREQS.B5, NOTE_FREQS.E6],
    [NOTE_FREQS['F#5'], NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS.E6, NOTE_FREQS.D6, NOTE_FREQS.A5, NOTE_FREQS.D6, NOTE_FREQS['F#5']],
  ],
  bassCalm: [[NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.A2, NOTE_FREQS.A2, NOTE_FREQS.D2, NOTE_FREQS.D2, NOTE_FREQS.E2, NOTE_FREQS['F#3']]],
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
};

export function useRegionMusic(region: Region, isLegendary: boolean = false): BrushingMusicController {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const intensityRef = useRef<'calm' | 'excited'>('calm');
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentPatternRef = useRef(0);
  const barCountRef = useRef(0);
  const regionRef = useRef(region);
  const isLegendaryRef = useRef(isLegendary);

  useEffect(() => {
    regionRef.current = region;
    isLegendaryRef.current = isLegendary;
  }, [region, isLegendary]);

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
    const config = isLegendaryRef.current ? LEGENDARY_MUSIC : REGION_MUSIC[regionRef.current];
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
        playChiptuneDrum(nextNoteTimeRef.current, isExcited || isLegendaryRef.current ? 'snare' : 'kick', config.drumStyle);
      }
      if (isExcited || isLegendaryRef.current) {
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
        const volume = isLegendaryRef.current ? 0.08 : 0.06;
        playChiptuneNote(melodyNote, nextNoteTimeRef.current, secondsPerBeat * 0.8, volume, config);
      }
      
      const bassNote = bass[beat];
      if (bassNote > 0) {
        const volume = isLegendaryRef.current ? 0.1 : 0.08;
        playChiptuneBass(bassNote, nextNoteTimeRef.current, secondsPerBeat * 0.9, volume, config);
      }
      
      if (beat % 4 === 0) {
        const arpBase = NOTE_FREQS.C4;
        const volume = isLegendaryRef.current ? 0.04 : 0.03;
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

export function useBrushingMusic(): BrushingMusicController {
  return useRegionMusic('grassland', false);
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

export function playSoundEffect(name: 'success' | 'fail' | 'brush' | 'sparkle' | 'capture' | 'legendary-intro' | 'wobble' | 'click') {
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
    }
  };
  
  try {
    sounds[name]?.();
  } catch (e) {
    console.warn('Sound playback failed:', e);
  }
}
