
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
          // Buscamos voz en español, si no, la primera disponible
          this.voice = voices.find(v => v.lang.toLowerCase().includes('es-es') || v.lang.toLowerCase().includes('es-mx')) || voices[0];
          this.voicesLoaded = true;
        }
      } catch (e) {
        console.error("Error al cargar voces:", e);
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

        // Generar un pequeño sonido de 0.01s para "despertar" el hardware de audio en Android
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(0);
        osc.stop(this.ctx.currentTime + 0.01);

        // Despertar el motor de síntesis de voz con una cadena vacía
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance("");
          utterance.volume = 0;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {
        console.warn("No se pudo desbloquear el audio automáticamente:", e);
      }
    })();

    return this.initPromise;
  }

  public speak(text: string, rate: number = 0.9, lang: string = 'es-ES') {
    if (!window.speechSynthesis) return;
    
    // Forzar cancelación de cualquier voz previa para evitar colas infinitas
    window.speechSynthesis.cancel();

    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(String(text));
        
        // Refrescar voces si no se han cargado
        const voices = window.speechSynthesis.getVoices();
        const targetVoice = voices.find(v => v.lang.toLowerCase().includes(lang.toLowerCase())) || this.voice;
        
        if (targetVoice) utterance.voice = targetVoice;
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("Fallo en SpeechSynthesis:", e);
      }
    }, 50); // Pequeño delay para asegurar que el canal esté libre
  }

  playClick() {
    this.unlockAudio();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
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
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  playWrong() {
    this.unlockAudio();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.3);
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
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.5);
      });
    } catch (e) {}
  }

  playPencil() {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.02;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.01;
      source.connect(gain); gain.connect(this.ctx.destination);
      source.start();
    } catch (e) {}
  }

  playEraser() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

export const sounds = new SoundManager();
