
import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

interface LinguaBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const LinguaBoard: React.FC<LinguaBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState('');
  const [mode, setMode] = useState<'translate' | 'pronounce'>('translate');
  
  const eng = (level as any).englishData;
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setUserInput('');
    setSpeechResult('');
    setMode(level.index % 2 === 0 ? 'pronounce' : 'translate');
    
    // Auto-pronunciación al iniciar
    setTimeout(() => speak(), 600);

    // Setup Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSpeechResult(transcript);
        setIsListening(false);
        checkPronunciation(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [level.id]);

  const speak = (slow = false) => {
    if (!level.question) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(level.question);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.5 : 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    sounds.playClick();
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Tu navegador no soporta reconocimiento de voz. ¡Intenta escribir!");
      return;
    }
    if (isListening) return;
    setIsListening(true);
    setSpeechResult('');
    recognitionRef.current.start();
  };

  const checkPronunciation = (spoken: string) => {
    const target = String(level.question).toLowerCase();
    if (spoken.includes(target) || target.includes(spoken)) {
      sounds.playSuccess();
      setTimeout(() => onCorrect(300), 1000);
    } else {
      sounds.playWrong();
    }
  };

  const handleKeyPress = (char: string) => {
    if (userInput.length < 15) {
      setUserInput(prev => prev + char);
      sounds.playClick();
    }
  };

  const handleBackspace = () => {
    setUserInput(prev => prev.slice(0, -1));
    sounds.playEraser();
  };

  const handleCheck = () => {
    if (userInput.toUpperCase() === String(level.answer).toUpperCase()) {
      onCorrect(200);
    } else {
      sounds.playWrong();
      setUserInput('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-2 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto lg:overflow-hidden font-quicksand">
      
      {/* Módulo de Entrenamiento Visual */}
      <div className="flex-grow flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-md rounded-[2rem] md:rounded-[3.5rem] p-6 shadow-xl border-4 md:border-8 border-white mb-4 relative min-h-[400px]">
        
        <div className="absolute top-4 left-4 flex gap-2">
           <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${mode === 'translate' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>Traducir</span>
           <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${mode === 'pronounce' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-400'}`}>Pronunciar</span>
        </div>

        <div className="text-6xl md:text-[10rem] text-blue-500 drop-shadow-md transition-all hover:scale-110">
           <i className={`fas ${level.visual || 'fa-language'}`}></i>
        </div>

        <div className="text-center">
            <h3 className="text-4xl md:text-8xl font-fredoka text-gray-800 uppercase leading-none mb-2">
                {level.question}
            </h3>
            <p className="text-sm md:text-3xl text-blue-400 font-bold italic opacity-70">
               /{eng?.pronunciation || '...'}/
            </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-lg">
            <div className="flex gap-4">
              <button 
                onClick={() => speak()} 
                className={`w-16 h-16 md:w-28 md:h-28 rounded-full bg-blue-500 text-white shadow-xl flex items-center justify-center transition-all ${isSpeaking ? 'scale-110 ring-8 ring-blue-100' : 'active:scale-90'}`}
              >
                  <i className="fas fa-volume-up text-2xl md:text-5xl"></i>
              </button>
              
              <button 
                onClick={startListening}
                className={`w-16 h-16 md:w-28 md:h-28 rounded-full shadow-xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 animate-pulse scale-110 ring-8 ring-red-100' : 'bg-purple-500 active:scale-90 text-white'}`}
              >
                  <i className={`fas ${isListening ? 'fa-microphone' : 'fa-microphone-alt'} text-2xl md:text-5xl`}></i>
              </button>
            </div>

            <div className="bg-white/50 backdrop-blur-sm w-full p-4 rounded-2xl border-2 border-dashed border-blue-200 text-center">
                {mode === 'translate' ? (
                  <>
                    <p className="text-[10px] md:text-sm font-black text-blue-400 uppercase tracking-widest mb-1">Escribe en español:</p>
                    <div className="text-2xl md:text-6xl font-fredoka text-blue-600 min-h-[40px] uppercase tracking-wider">
                        {userInput || <span className="opacity-10">...</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] md:text-sm font-black text-purple-400 uppercase tracking-widest mb-1">Repite la palabra:</p>
                    <div className="text-2xl md:text-5xl font-fredoka text-purple-600 min-h-[40px] italic">
                        {isListening ? "Te escucho..." : (speechResult || <span className="opacity-10">Dilo ahora...</span>)}
                    </div>
                  </>
                )}
            </div>
        </div>
      </div>

      {/* Teclado - Solo visible en modo traducción */}
      {mode === 'translate' && (
        <div className="w-full bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[3rem] shadow-xl border-b-4 md:border-b-8 border-blue-100 shrink-0">
          <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 md:gap-3">
            {letters.map(l => (
              <button 
                key={l} 
                onClick={() => handleKeyPress(l)} 
                className="h-10 sm:h-12 md:h-20 bg-blue-50 hover:bg-blue-100 rounded-lg md:rounded-2xl font-fredoka text-base md:text-4xl text-blue-600 border-b-2 md:border-b-4 border-blue-200 active:translate-y-0.5 transition-all flex items-center justify-center"
              >
                {l}
              </button>
            ))}
            <button 
              onClick={handleBackspace} 
              className="col-span-2 h-10 sm:h-12 md:h-20 bg-red-100 text-red-500 rounded-lg md:rounded-2xl font-black border-b-2 md:border-b-4 border-red-200 flex items-center justify-center"
            >
              <i className="fas fa-backspace text-sm md:text-2xl"></i>
            </button>
            <button 
              onClick={handleCheck}
              disabled={!userInput}
              className="col-span-5 sm:col-span-7 h-10 sm:h-12 md:h-20 bg-green-500 text-white rounded-lg md:rounded-2xl font-fredoka text-base md:text-4xl border-b-2 md:border-b-4 border-green-700 disabled:opacity-50"
            >
              ¡COMPROBAR!
            </button>
          </div>
        </div>
      )}
      
      {mode === 'pronounce' && (
        <div className="w-full py-4 text-center">
          <p className="text-xs md:text-xl font-bold text-indigo-400 animate-pulse">
            <i className="fas fa-info-circle mr-2"></i>
            Usa el micrófono morado para practicar tu pronunciación
          </p>
        </div>
      )}
    </div>
  );
};

export default LinguaBoard;
