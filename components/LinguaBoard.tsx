
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

interface LinguaBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const LinguaBoard: React.FC<LinguaBoardProps> = ({ level, powerUps, onCorrect, onWrong, usePowerUp }) => {
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const eng = (level as any).englishData;
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  useEffect(() => {
    setUserInput('');
    // Auto-pronunciación al iniciar el nivel
    setTimeout(() => speak(), 600);
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
    <div className="w-full h-full flex flex-col p-2 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden font-quicksand">
      
      {/* Visualización de la palabra */}
      <div className="flex-grow flex flex-col items-center justify-center gap-2 md:gap-6 bg-white/80 backdrop-blur-md rounded-[1.5rem] md:rounded-[3rem] p-4 shadow-xl border-2 md:border-8 border-white mb-2 md:mb-6 overflow-hidden">
        
        <div className="text-5xl md:text-[10rem] animate-bounce-slow text-blue-500 drop-shadow-md">
           <i className={`fas ${level.visual}`}></i>
        </div>

        <div className="text-center">
            <h3 className="text-3xl md:text-7xl font-fredoka text-gray-800 uppercase tracking-tight">
                {level.question}
            </h3>
            <p className="text-sm md:text-2xl text-blue-400 font-bold italic">
               Pronunciación: /{eng?.pronunciation}/
            </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full max-w-md">
            <button 
              onClick={() => speak()} 
              className={`w-12 h-12 md:w-24 md:h-24 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center transition-all ${isSpeaking ? 'scale-110 ring-4 ring-blue-200' : 'active:scale-95'}`}
            >
                <i className="fas fa-volume-up text-xl md:text-4xl"></i>
            </button>
            <div className="bg-white flex-grow px-4 py-2 md:py-4 rounded-xl md:rounded-[2rem] border-2 border-blue-100 shadow-inner text-center">
                <p className="text-[8px] md:text-xs font-black text-blue-300 uppercase tracking-widest mb-1">Escribe en español:</p>
                <p className="text-xl md:text-5xl font-fredoka text-blue-600 min-h-[30px] uppercase">
                    {userInput}<span className="animate-pulse">_</span>
                </p>
            </div>
        </div>
      </div>

      {/* Teclado responsivo */}
      <div className="w-full bg-white p-2 md:p-6 rounded-[1.5rem] md:rounded-[3rem] shadow-xl border-b-4 md:border-b-8 border-blue-100 shrink-0">
        <div className="grid grid-cols-7 sm:grid-cols-9 gap-1 md:gap-3">
          {letters.map(l => (
            <button 
              key={l} 
              onClick={() => handleKeyPress(l)} 
              className="h-10 sm:h-12 md:h-20 bg-blue-50 hover:bg-blue-100 rounded-lg md:rounded-xl font-fredoka text-sm md:text-3xl text-blue-600 border-b-2 md:border-b-4 border-blue-200 active:translate-y-0.5 transition-all flex items-center justify-center"
            >
              {l}
            </button>
          ))}
          <button 
            onClick={handleBackspace} 
            className="col-span-2 h-10 sm:h-12 md:h-20 bg-red-100 text-red-500 rounded-lg md:rounded-xl font-black text-[10px] md:text-xl border-b-2 md:border-b-4 border-red-200 flex items-center justify-center"
          >
            <i className="fas fa-backspace"></i>
          </button>
          <button 
            onClick={handleCheck}
            disabled={!userInput}
            className="col-span-5 sm:col-span-7 h-10 sm:h-12 md:h-20 bg-green-500 text-white rounded-lg md:rounded-xl font-fredoka text-sm md:text-3xl border-b-2 md:border-b-4 border-green-700 disabled:opacity-50"
          >
            ¡COMPROBAR!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinguaBoard;
