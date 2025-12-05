const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playKeySound = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  // High pitched blip
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
};

export const playAccessDenied = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
  
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.3);
};

export const playAccessGranted = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.4);
};

export const playTypingSound = () => {
  if (Math.random() > 0.5) playKeySound();
};
