
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const eng = level.englishData;

  useEffect(() => {
    setUserWords([]);
    setSelectedOption(null);
    setShowTranslation(level.index <= 20);

    if (eng?.exerciseType === 'sentence' && level.question) {
      const words = level.question.replace(/[?.!,]/g, '').split(' ');
      setShuffledWords([...words].sort(() => Math.random() - 0.5));
    }
    
    if (eng?.exerciseType === 'vocab' || eng?.exerciseType === 'sentence') {
      setTimeout(() => speak(), 500);
    }
  }, [level]);

  const speak = (slow = false) => {
    const textToSpeak = eng?.exerciseType === 'vocab' ? level.question : level.question;
    if (!textToSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
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
    if (eng?.exerciseType === 'sentence') {
      const result = userWords.join(' ');
      const target = level.question?.replace(/[?.!,]/g, '') || '';
      if (result.toLowerCase() === target.toLowerCase()) {
        onCorrect(250);
      } else {
        sounds.playWrong();
        setShuffledWords([...shuffledWords, ...userWords].sort(() => Math.random() - 0.5));
        setUserWords([]);
      }
    } else if (eng?.exerciseType === 'multiple-choice') {
      const correct = level.options?.findIndex(o => o.isCorrect);
      if (selectedOption === correct) {
        onCorrect(200);
      } else {
        sounds.playWrong();
        setSelectedOption(null);
      }
    } else if (eng?.exerciseType === 'vocab') {
      onCorrect(150);
    }
  };

  const handlePowerUp = (type: string) => {
    if (usePowerUp(type)) {
      if (type === 'nativeEar') speak(true);
      if (type === 'contextVision') setShowTranslation(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden font-quicksand">
      <div className="flex-grow flex flex-col items-center justify-center gap-6 relative">
        
        {/* Cabecera */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/50 px-6 py-1 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest border border-white">
          {eng?.lessonTitle || 'English Challenge'}
        </div>

        {/* Visual Content Area */}
        <div className="z-10 flex flex-col items-center gap-4 w-full max-w-4xl">
          {level.visual && (
            <div className="text-8xl md:text-[10rem] animate-bounce-slow drop-shadow-2xl mb-2">
              {level.visual}
            </div>
          )}

          <div className="relative group cursor-pointer" onClick={() => speak()}>
            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-white shadow-2xl border-4 md:border-6 border-white flex items-center justify-center transition-all ${isSpeaking ? 'ring-8 ring-blue-400 scale-110' : ''}`}>
               <i className={`fas ${eng?.exerciseType === 'sentence' ? 'fa-quote-left' : 'fa-volume-up'} text-3xl md:text-5xl text-blue-400`}></i>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-white text-center w-full min-h-[120px] flex flex-col justify-center animate-pop-in">
             {showTranslation && (
               <p className="text-lg md:text-2xl text-blue-400 font-bold mb-1 italic opacity-80">"{level.translation}"</p>
             )}
             
             {eng?.exerciseType === 'sentence' ? (
               <p className="text-2xl md:text-4xl font-fredoka text-gray-800 tracking-wide">
                  {userWords.length > 0 ? userWords.join(' ') : 'Build the sentence...'}
               </p>
             ) : eng?.exerciseType === 'multiple-choice' ? (
               <p className="text-2xl md:text-4xl font-fredoka text-gray-800">{level.question}</p>
             ) : (
               <div className="space-y-2">
                  <p className="text-4xl md:text-6xl font-fredoka text-gray-800 uppercase tracking-tighter">{level.question}</p>
                  <p className="text-xl md:text-2xl text-blue-500 font-black">/{eng?.pronunciation}/</p>
               </div>
             )}
          </div>
        </div>

        {/* Interacción específica por tipo */}
        {eng?.exerciseType === 'sentence' && (
          <div className="flex flex-col gap-4 w-full max-w-4xl">
            <div className="bg-white/40 p-4 rounded-[2rem] min-h-[80px] flex flex-wrap gap-2 justify-center items-center border-4 border-dashed border-white/50">
               {userWords.map((word, i) => (
                 <button key={i} onClick={() => removeWord(i)} className="bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-lg shadow-lg active:scale-95">
                    {word}
                 </button>
               ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
               {shuffledWords.map((word, i) => (
                 <button key={i} onClick={() => addWord(word, i)} className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-fredoka text-lg shadow-md border-b-4 border-blue-100 hover:bg-blue-50 active:scale-90 transition-all">
                    {word}
                 </button>
               ))}
            </div>
          </div>
        )}

        {eng?.exerciseType === 'multiple-choice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {level.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`p-5 rounded-2xl md:rounded-3xl text-xl md:text-2xl font-bold shadow-xl transition-all border-b-8 active:scale-95
                  ${selectedOption === idx ? 'bg-blue-500 border-blue-700 text-white' : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'}`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}

        {eng?.exerciseType === 'vocab' && (
           <div className="text-center animate-pulse">
              <p className="text-blue-400 font-bold text-lg">Click the CHECK button when you're ready!</p>
           </div>
        )}

      </div>

      {/* Controles de Juego */}
      <div className="mt-auto flex justify-between items-center gap-4 bg-white/80 p-4 rounded-[2.5rem] shadow-xl backdrop-blur-sm border-t-2 border-white">
        <div className="flex gap-2">
           <button onClick={() => handlePowerUp('nativeEar')} className="flex flex-col items-center bg-blue-50 p-3 rounded-2xl border-b-4 border-blue-200 active:scale-95 relative">
              <i className="fas fa-ear-listen text-blue-500 text-xl"></i>
              <span className="text-[9px] font-black text-blue-400 uppercase">Slow</span>
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.nativeEar}</span>
           </button>
           <button onClick={() => handlePowerUp('contextVision')} className="flex flex-col items-center bg-yellow-50 p-3 rounded-2xl border-b-4 border-yellow-200 active:scale-95 relative">
              <i className="fas fa-eye text-yellow-600 text-xl"></i>
              <span className="text-[9px] font-black text-yellow-500 uppercase">Hint</span>
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.contextVision}</span>
           </button>
        </div>

        <button 
          onClick={handleCheck}
          disabled={eng?.exerciseType === 'sentence' ? userWords.length === 0 : (eng?.exerciseType === 'multiple-choice' ? selectedOption === null : false)}
          className="bg-green-500 text-white px-12 py-4 rounded-[2rem] font-fredoka text-xl md:text-3xl shadow-xl border-b-8 border-green-700 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center gap-3"
        >
          {eng?.exerciseType === 'vocab' ? 'LEARNED' : 'CHECK'} <i className="fas fa-check-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default LinguaBoard;
