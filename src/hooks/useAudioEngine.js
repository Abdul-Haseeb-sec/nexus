import { useRef, useEffect } from 'react';
import { useStore } from '../store';

export function useAudioEngine() {
  const { soundEnabled, soundProfile, volume, allMute, customSound, setCustomSound } = useStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (customSound) {
      audioRef.current = new Audio(customSound);
    }
  }, [customSound]);

  const playHoverSound = (isNotif = false) => {
    if (allMute || (!soundEnabled && !isNotif)) return;
    try {
      if (customSound && audioRef.current) {
        const clone = audioRef.current.cloneNode(true);
        clone.volume = volume;
        clone.play().catch(() => {});
        return;
      }
      
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const v = volume * 0.4;

      if (isNotif) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(v, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      } else {
        if (soundProfile === 'pop') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(v * 0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        } else if (soundProfile === 'swoosh') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(100, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(v * 0.1, ctx.currentTime + 0.05);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        } else if (soundProfile === 'click') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(1000, ctx.currentTime);
          gain.gain.setValueAtTime(v * 0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
        } else if (soundProfile === 'chime') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(v * 0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        } else if (soundProfile === 'digital') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(v * 0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        }
      }
      
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
    } catch (e) { console.error(e); }
  };

  const handleCustomSoundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomSound(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return { playHoverSound, handleCustomSoundUpload };
}
