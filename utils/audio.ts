
class SoundManager {
  private ctx: AudioContext | null = null;
  private voicesLoaded: boolean = false;
  private voice: SpeechSynthesisVoice | null = null;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          // Prioridad: Español (México/España) -> Inglés (para LinguaBoard)
          this.voice = voices.find(v => v.lang.toLowerCase().includes('es-mx') || v.lang.toLowerCase().includes('es-es')) || voices[0];
          this.voicesLoaded = true;
          console.log("Voces cargadas en Jana App:", this.voice.name);
        }
      } catch (e) {
        console.error("Error cargando motor de voz:", e);
      }
    };

    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }

  public async unlockAudio() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        if (!this.ctx) {
          this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
        }
        
        if (this.ctx.state === 'suspended') {
          await this.ctx.resume();
        }

        // 1. Desbloquear AudioContext con un buffer de silencio (Primordial para Android APK)
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);

        // 2. Desbloquear SpeechSynthesis con una ráfaga vacía
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(" ");
          utterance.volume = 0;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
        console.warn("Fallo en desbloqueo de audio:", e);
      }
    })();

    return this.initPromise;
  }

  public speak(text: string, rate: number = 0.9, lang: string = 'es-ES') {
    if (!window.speechSynthesis) return;
    
    // Cancelar cualquier discurso pendiente antes de empezar uno nuevo
    window.speechSynthesis.cancel();

    // Pequeño delay para permitir que el canal de audio del WebView respire
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(String(text));
        const voices = window.speechSynthesis.getVoices();
        
        // Buscar la mejor voz para el idioma solicitado
        const targetVoice = voices.find(v => v.lang.toLowerCase().includes(lang.toLowerCase())) || this.voice;
        
        if (targetVoice) utterance.voice = targetVoice;
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("Error en salida de voz:", e);
      }
    }, 100);
  }

  playClick() {
    this.unlockAudio();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playSuccess() {
    this.unlockAudio();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
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
    this.unlockAudio();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playCelebration() {
    this.unlockAudio();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      [440, 554, 659, 880].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0, now + i * 0.15);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.15 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.5);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now + i * 0.15); osc.stop(now + i * 0.15 + 0.6);
      });
    } catch (e) {}
  }

  playPencil() {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.01;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.005;
      source.connect(gain); gain.connect(this.ctx.destination);
      source.start();
    } catch (e) {}
  }

  playEraser() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

export const sounds = new SoundManager();
