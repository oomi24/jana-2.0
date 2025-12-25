
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
  const [userWords, setUserWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mode, setMode] = useState<'vocab' | 'listen' | 'sentence'>('sentence');

  useEffect(() => {
    // Determinar modo por índice de nivel
    if (level.index <= 20) setMode('vocab');
    else if (level.index <= 50) setMode('listen');
    else setMode('sentence');

    if (level.question) {
      const words = level.question.replace(/[?.!,]/g, '').split(' ');
      setShuffledWords([...words].sort(() => Math.random() - 0.5));
      setUserWords([]);
      setShowTranslation(level.index <= 20); // Mostrar traducción siempre en niveles básicos
    }
    
    // Auto-hablar en modo escucha al inicio
    if (level.index > 20 && level.index <= 50) {
      setTimeout(() => speak(), 500);
    }
  }, [level]);

  const speak = (slow = false) => {
    if (!level.question) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(level.question);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.5 : 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    sounds.playPencil();
  };

  const addWord = (word: string, index: number) => {
    sounds.playClick();
    setUserWords([...userWords, word]);
    const newShuffled = [...shuffledWords];
    newShuffled.splice(index, 1);
    setShuffledWords(newShuffled);
  };

  const removeWord = (index: number) => {
    const word = userWords[index];
    const newUserWords = [...userWords];
    newUserWords.splice(index, 1);
    setUserWords(newUserWords);
    setShuffledWords([...shuffledWords, word]);
    sounds.playEraser();
  };

  const handleCheck = () => {
    const result = userWords.join(' ');
    const target = level.question?.replace(/[?.!,]/g, '') || '';
    
    if (result.toLowerCase() === target.toLowerCase()) {
      onCorrect(200);
    } else {
      sounds.playWrong();
      setShuffledWords([...shuffledWords, ...userWords].sort(() => Math.random() - 0.5));
      setUserWords([]);
    }
  };

  const handlePowerUp = (type: string) => {
    if (usePowerUp(type)) {
      if (type === 'nativeEar') speak(true);
      if (type === 'contextVision') setShowTranslation(true);
    }
  };

  const getBgColor = () => {
    switch(level.scenario) {
      case 'cafe': return 'bg-orange-50';
      case 'airport': return 'bg-blue-50';
      case 'park': return 'bg-green-50';
      default: return 'bg-indigo-50';
    }
  };

  return (
    <div className={`w-full h-full flex flex-col p-4 md:p-8 transition-colors duration-1000 ${getBgColor()} overflow-hidden`}>
      <div className="flex-grow flex flex-col items-center justify-center gap-6 relative">
        
        {/* Cabecera de Modo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/50 px-6 py-1 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-white">
          Challenge: {mode === 'vocab' ? 'Vocabulary' : mode === 'listen' ? 'Listening' : 'Grammar'}
        </div>

        {/* Visual / Personaje */}
        <div className="z-10 flex flex-col items-center gap-4 w-full max-w-4xl">
          {mode === 'vocab' && level.visual && (
            <div className="text-9xl md:text-[12rem] animate-bounce-slow drop-shadow-2xl mb-4">
              {level.visual}
            </div>
          )}

          <div className="relative group cursor-pointer" onClick={() => speak()}>
            <div className={`w-24 h-24 md:w-40 md:h-40 rounded-full bg-white shadow-2xl border-4 md:border-8 border-white flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 ${isSpeaking ? 'ring-8 ring-blue-400' : ''}`}>
               <i className={`fas ${mode === 'listen' ? 'fa-headphones' : 'fa-user-astronaut'} text-4xl md:text-6xl text-indigo-400`}></i>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg">
               <i className="fas fa-volume-up text-lg"></i>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[3rem] shadow-2xl border-4 border-white text-center min-h-[100px] w-full flex flex-col justify-center animate-pop-in">
             {(showTranslation || mode === 'vocab') && (
               <p className="text-lg md:text-2xl text-indigo-400 font-bold mb-1 italic opacity-80">"{level.translation}"</p>
             )}
             <p className="text-2xl md:text-4xl font-fredoka text-gray-800 tracking-wide">
                {userWords.length > 0 ? userWords.join(' ') : (mode === 'listen' ? 'Listen and build...' : 'Build the sentence...')}
             </p>
          </div>
        </div>

        {/* Slot de palabras construidas */}
        <div className="w-full max-w-4xl bg-white/40 p-4 rounded-[2.5rem] min-h-[80px] flex flex-wrap gap-2 justify-center items-center border-4 border-dashed border-white/50">
           {userWords.map((word, i) => (
             <button key={i} onClick={() => removeWord(i)} className="bg-indigo-500 text-white px-5 py-2.5 rounded-2xl font-bold text-base md:text-xl shadow-lg active:scale-95">
                {word}
             </button>
           ))}
        </div>

        {/* Banco de palabras */}
        <div className="flex flex-wrap gap-2 justify-center w-full max-w-4xl">
           {shuffledWords.map((word, i) => (
             <button key={i} onClick={() => addWord(word, i)} className="bg-white text-indigo-600 px-5 py-2.5 rounded-2xl font-fredoka text-base md:text-xl shadow-md border-b-4 border-indigo-100 hover:bg-indigo-50 active:scale-90 transition-all">
                {word}
             </button>
           ))}
        </div>
      </div>

      <div className="mt-auto flex justify-between items-center gap-4 bg-white/80 p-4 rounded-[2.5rem] shadow-xl backdrop-blur-sm border-t-2 border-white">
        <div className="flex gap-2">
           <button onClick={() => handlePowerUp('nativeEar')} className="flex flex-col items-center bg-blue-50 p-3 rounded-2xl border-b-4 border-blue-200 active:scale-95 relative">
              <i className="fas fa-ear-listen text-blue-500 text-xl"></i>
              <span className="text-[9px] font-black text-blue-400">SLOW</span>
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full">{powerUps.nativeEar}</span>
           </button>
           <button onClick={() => handlePowerUp('contextVision')} className="flex flex-col items-center bg-yellow-50 p-3 rounded-2xl border-b-4 border-yellow-200 active:scale-95 relative">
              <i className="fas fa-eye text-yellow-500 text-xl"></i>
              <span className="text-[9px] font-black text-yellow-400">HINT</span>
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] font-bold px-1.5 rounded-full">{powerUps.contextVision}</span>
           </button>
        </div>

        <button 
          onClick={handleCheck}
          disabled={userWords.length === 0}
          className="bg-green-500 text-white px-10 py-4 rounded-3xl font-fredoka text-xl md:text-2xl shadow-xl border-b-8 border-green-700 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
        >
          {mode === 'vocab' ? 'MATCH' : 'CHECK'} <i className="fas fa-bolt ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default LinguaBoard;
