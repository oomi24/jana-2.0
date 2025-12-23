
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val: boolean) {
    this.enabled = val;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx!.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx!.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.1);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx!.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.4);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx!.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.ctx!.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.3);
  }

  playCelebration() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx!.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A Major sequence
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);
      gain.gain.setValueAtTime(0, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.6);
    });
  }

  // Genera un sonido sutil de "pincel" usando ruido blanco filtrado
  // Fix: Changed type to AudioBufferSourceNode because AudioNode does not have a stop() method
  private brushNode: AudioBufferSourceNode | null = null;
  private brushGain: GainNode | null = null;

  startBrush() {
    if (!this.enabled) return;
    this.init();
    const bufferSize = 2 * this.ctx!.sampleRate;
    const noiseBuffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx!.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx!.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx!.currentTime);

    this.brushGain = this.ctx!.createGain();
    this.brushGain.gain.setValueAtTime(0, this.ctx!.currentTime);
    this.brushGain.gain.linearRampToValueAtTime(0.05, this.ctx!.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(this.brushGain);
    this.brushGain.connect(this.ctx!.destination);
    
    noise.start();
    this.brushNode = noise;
  }

  stopBrush() {
    if (this.brushGain) {
      this.brushGain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + 0.1);
      setTimeout(() => {
        // Fix: brushNode is now correctly typed to include the stop() method
        if (this.brushNode) this.brushNode.stop();
        this.brushNode = null;
      }, 150);
    }
  }
}

export const sounds = new SoundManager();
