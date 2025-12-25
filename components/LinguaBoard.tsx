
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';
import IconButton from './IconButton';

interface LinguaBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const LinguaBoard: React.FC<LinguaBoardProps> = ({ level, powerUps, onCorrect, onWrong, usePowerUp }) => {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const eng = level.englishData;
  const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  useEffect(() => {
    setUserInput('');
    setShowHint(false);
    setTimeout(() => speak(), 500);
  }, [level.id]);

  const speak = (slow = false) => {
    const textToSpeak = level.question;
    if (!textToSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.5 : 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (char: string) => {
    sounds.playClick();
    if (userInput.length < 15) {
      setUserInput(prev => prev + char);
    }
  };

  const handleBackspace = () => {
    sounds.playEraser();
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (userInput.toUpperCase() === String(level.answer).toUpperCase()) {
      onCorrect(200);
    } else {
      sounds.playWrong();
    }
  };

  const handlePowerUp = (type: string) => {
    if (usePowerUp(type)) {
      if (type === 'nativeEar') speak(true);
      if (type === 'contextVision') {
          const correctAns = String(level.answer).toUpperCase();
          if (userInput.length < correctAns.length) {
              setUserInput(correctAns.slice(0, userInput.length + 1));
          }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row p-4 gap-4 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden font-quicksand">
      
      {/* Área de Pregunta */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-6 shadow-xl border-4 border-white">
        <div className="text-8xl md:text-[10rem] animate-bounce-slow drop-shadow-2xl">
          {level.visual}
        </div>
        
        <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-fredoka text-gray-800 uppercase tracking-tighter mb-1">
                {level.question}
            </h3>
            <p className="text-xl text-blue-500 font-black italic">/{eng?.pronunciation}/</p>
        </div>

        <div className="flex items-center gap-3">
            <button onClick={() => speak()} className={`w-16 h-16 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center transition-all ${isSpeaking ? 'scale-110 ring-4 ring-blue-200' : 'active:scale-95'}`}>
                <i className="fas fa-volume-up text-2xl"></i>
            </button>
            <div className="bg-blue-50 px-6 py-2 rounded-2xl border-2 border-blue-100 min-w-[200px] text-center">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Tu respuesta en español:</p>
                <p className="text-3xl font-fredoka text-blue-600 min-h-[40px] uppercase tracking-widest">
                    {userInput}<span className="animate-pulse">|</span>
                </p>
            </div>
        </div>

        <button 
            onClick={handleCheck}
            disabled={userInput.length === 0}
            className="w-full max-w-xs bg-green-500 text-white py-4 rounded-2xl font-fredoka text-2xl shadow-lg border-b-8 border-green-700 active:scale-95 disabled:opacity-50 transition-all"
        >
            ¡LISTO! <i className="fas fa-check-circle ml-2"></i>
        </button>
      </div>

      {/* Teclado Personalizado Mejorado */}
      <div className="w-full md:w-[450px] flex flex-col gap-2">
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-blue-100 flex-grow flex flex-col justify-center">
            <div className="grid grid-cols-7 gap-1.5">
                {letters.map(l => (
                    <button 
                      key={l} 
                      onClick={() => handleKeyPress(l)} 
                      className="aspect-square bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-xl font-fredoka text-2xl text-blue-600 border-b-4 border-blue-200 shadow-sm transition-all flex items-center justify-center"
                    >
                        {l}
                    </button>
                ))}
                <button 
                  onClick={() => handleKeyPress(' ')} 
                  className="col-span-4 bg-gray-50 text-gray-400 rounded-xl font-black text-xs uppercase border-b-4 border-gray-200 active:scale-95"
                >
                    ESPACIO
                </button>
                <button 
                  onClick={handleBackspace} 
                  className="col-span-3 bg-red-50 text-red-500 rounded-xl font-black text-xs uppercase border-b-4 border-red-200 active:scale-95"
                >
                    <i className="fas fa-backspace text-lg"></i>
                </button>
            </div>
        </div>

        {/* PowerUps */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border-4 border-yellow-100 flex gap-4">
           <button onClick={() => handlePowerUp('nativeEar')} className="flex-1 bg-blue-50 p-4 rounded-2xl border-b-4 border-blue-200 relative group active:scale-95 transition-all">
              <i className="fas fa-ear-listen text-blue-500 text-2xl"></i>
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[12px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.nativeEar}</span>
           </button>
           <button onClick={() => handlePowerUp('contextVision')} className="flex-1 bg-yellow-50 p-4 rounded-2xl border-b-4 border-yellow-200 relative group active:scale-95 transition-all">
              <i className="fas fa-lightbulb text-yellow-600 text-2xl"></i>
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[12px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.contextVision}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default LinguaBoard;
