
import React, { useState, useEffect, useRef } from 'react';
import { Level, QuizOption } from '../types';
import { sounds } from '../utils/audio';

interface QuizBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const QuizBoard: React.FC<QuizBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFact, setShowFact] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(30);
    setShowFact(false);
    setShowHint(false);
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level]);

  const handleSelect = (option: QuizOption) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (option.isCorrect) {
      sounds.playSuccess();
      setShowFact(true);
    } else {
      onWrong();
    }
  };

  const calculatePoints = () => {
    if (timeLeft > 20) return 100;
    if (timeLeft > 10) return 75;
    return 50;
  };

  const renderVisual = () => {
    if (!level.visual) return null;
    const visualStr = String(level.visual);
    
    if (visualStr.includes('<svg')) {
      return (
        <div 
          className="w-full max-w-[320px] md:max-w-[400px] aspect-[3/2] mx-auto my-2 md:my-4 shadow-xl border-4 border-white rounded-2xl md:rounded-3xl overflow-hidden bg-white flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: visualStr }}
        />
      );
    }
    return (
      <div className="text-7xl md:text-[140px] my-1 md:my-2 animate-bounce-slow drop-shadow-lg flex items-center justify-center">
        {visualStr}
      </div>
    );
  };

  if (showFact) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-8 border-green-400 animate-slide-up text-center overflow-y-auto max-h-full">
        <div className="text-6xl md:text-8xl mb-2">🏆</div>
        <h3 className="text-2xl md:text-4xl font-fredoka text-green-600 mb-1 uppercase">¡Correcto!</h3>
        <p className="text-lg md:text-xl font-bold text-gray-500 mb-4 md:mb-6">Ganaste {calculatePoints()} puntos</p>
        
        {level.factCard && (
          <div className="bg-green-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-green-200 w-full mb-6 md:mb-8 text-left">
            <h4 className="text-xl md:text-2xl font-fredoka text-green-700 underline mb-2">{String(level.factCard.title)}</h4>
            <div className="space-y-1 text-sm md:text-lg">
               {level.factCard.capital && <p><strong>Capital:</strong> {String(level.factCard.capital)}</p>}
               {level.factCard.continent && <p><strong>Continente:</strong> {String(level.factCard.continent)}</p>}
               <p className="mt-2 md:mt-4 italic text-green-800">"{String(level.factCard.curiosity)}"</p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            sounds.playClick();
            onCorrect(calculatePoints());
          }}
          className="w-full py-4 md:py-6 bg-green-500 text-white text-xl md:text-3xl font-bold rounded-2xl md:rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-8 border-green-700 mt-auto"
        >
          SIGUIENTE <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-1 md:gap-2 p-4 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-8 border-pink-100 animate-slide-up relative overflow-y-auto max-h-full">
      <div className="flex justify-between w-full items-center mb-1 md:mb-2 px-1">
        <div className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold text-white shadow-md ${timeLeft < 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
          <i className="fas fa-clock mr-1 md:mr-2"></i> {timeLeft}s
        </div>
        <button 
          onClick={() => {
            sounds.playClick();
            setShowHint(true);
          }}
          className="bg-yellow-400 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold shadow-md hover:scale-105 active:scale-95"
        >
          <i className="fas fa-lightbulb mr-1 md:mr-2"></i> PISTA
        </button>
      </div>

      <div className="text-center w-full">
        <h3 className="text-lg md:text-2xl font-fredoka text-purple-500 uppercase tracking-tighter mb-1 md:mb-2">{String(level.objective)}</h3>
        
        {renderVisual()}

        {showHint && level.hints && (
          <div className="bg-yellow-50 text-yellow-700 p-2 md:p-3 rounded-xl border-2 border-yellow-200 mb-2 md:mb-4 animate-bounce text-xs md:text-sm font-bold">
            <i className="fas fa-sparkles mr-2"></i> {String(level.hints[0])}
          </div>
        )}

        <div className="bg-purple-50 rounded-2xl md:rounded-3xl border-4 border-purple-100 p-4 md:p-6 mb-4 md:mb-6 shadow-inner">
          <p className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
            {String(level.question)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 w-full">
        {level.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option)}
            className="group relative p-3 md:p-5 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl md:rounded-3xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all border-b-6 md:border-b-8 border-purple-700 overflow-hidden"
          >
            <span className="relative z-10">{String(option.text)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizBoard;
