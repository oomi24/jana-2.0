
class SoundManager {
  private ctx: AudioContext | null = null;
  private voicesLoaded: boolean = false;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Preferir voces en español (México/España) para Jana
        this.voice = voices.find(v => v.lang.includes('es-ES') || v.lang.includes('es-MX')) || voices[0];
        this.voicesLoaded = true;
      }
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async unlockAudio() {
    this.init();
    
    // Fix para Android APK: Forzar activación mediante un buffer de 0.1s de silencio
    if (this.ctx) {
      const buffer = this.ctx.createBuffer(1, 1, 22050);
      const node = this.ctx.createBufferSource();
      node.buffer = buffer;
      node.connect(this.ctx.destination);
      node.start(0);
      await this.ctx.resume();
    }
    
    // "Despertar" Text-to-Speech en Android
    window.speechSynthesis.cancel();
    const silence = new SpeechSynthesisUtterance("");
    silence.volume = 0;
    window.speechSynthesis.speak(silence);
    
    console.log("Audio y TTS desbloqueados para entorno móvil");
  }

  public speak(text: string, rate: number = 0.9) {
    window.speechSynthesis.cancel(); // Detener cualquier voz previa
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.lang = 'es-ES';
    utterance.rate = rate;
    utterance.pitch = 1.1; // Un poco más agudo para que suene amigable
    utterance.volume = 1;

    // En APKs a veces el primer intento falla, reintentamos si es necesario
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Reintentando TTS...");
      setTimeout(() => window.speechSynthesis.speak(utterance), 100);
    }
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
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
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
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
  }

  playWrong() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.3);
  }

  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 554, 659, 880, 1108].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(freq, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now + i * 0.15); osc.stop(now + i * 0.15 + 0.6);
    });
  }

  playPencil() {
    this.init();
    if (!this.ctx) return;
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
  }

  playEraser() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
  }
}

export const sounds = new SoundManager();
