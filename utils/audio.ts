
class SoundManager {
  private ctx: AudioContext | null = null;
  private voicesLoaded: boolean = false;
  private voice: any = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          // Intentamos encontrar una voz en español
          this.voice = voices.find(v => v.lang.toLowerCase().includes('es-es') || v.lang.toLowerCase().includes('es-mx')) || voices[0];
          this.voicesLoaded = true;
        }
      } catch (e) {
        console.error("Error cargando voces de sistema:", e);
      }
    };

    try {
      // Algunos navegadores requieren asignar el evento y luego llamar a la función
      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      loadVoices();
    } catch (e) {
      console.error("No se pudo configurar onvoiceschanged:", e);
    }
  }

  public init() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.error("AudioContext init error:", e);
    }
  }

  public async unlockAudio() {
    this.init();
    
    if (this.ctx) {
      try {
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const node = this.ctx.createBufferSource();
        node.buffer = buffer;
        node.connect(this.ctx.destination);
        node.start(0);
        await this.ctx.resume();
      } catch (e) {
        console.warn("Fallo al desbloquear AudioContext");
      }
    }
    
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const silence = new SpeechSynthesisUtterance("");
        silence.volume = 0;
        window.speechSynthesis.speak(silence);
      }
    } catch (e) {
      console.warn("Fallo al despertar TTS");
    }
  }

  public speak(text: string, rate: number = 0.9) {
    if (!window.speechSynthesis) return;
    
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) utterance.voice = this.voice;
      utterance.lang = 'es-ES';
      utterance.rate = rate;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Error en TTS speak:", e);
    }
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.4);
      });
    } catch (e) {}
  }

  playWrong() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      [440, 554, 659, 880, 1108].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now + i * 0.15); osc.stop(now + i * 0.15 + 0.6);
      });
    } catch (e) {}
  }

  playPencil() {
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1500;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.03;
      source.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
      source.start();
    } catch (e) {}
  }

  playEraser() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }
}

export const sounds = new SoundManager();
