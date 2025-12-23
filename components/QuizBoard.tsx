
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
    if (level.visual.includes('<svg')) {
      return (
        <div 
          className="w-full max-w-[400px] h-48 md:h-64 mx-auto my-4 shadow-2xl border-4 border-white rounded-3xl overflow-hidden bg-white flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: level.visual }}
        />
      );
    }
    return (
      <div className="text-[120px] md:text-[160px] my-2 animate-bounce-slow drop-shadow-lg flex items-center justify-center">
        {level.visual}
      </div>
    );
  };

  if (showFact) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-8 bg-white rounded-[3rem] shadow-2xl border-8 border-green-400 animate-slide-up text-center">
        <div className="text-8xl mb-4">🏆</div>
        <h3 className="text-4xl font-fredoka text-green-600 mb-2 uppercase">¡Correcto!</h3>
        <p className="text-xl font-bold text-gray-500 mb-6">Ganaste {calculatePoints()} puntos</p>
        
        {level.factCard && (
          <div className="bg-green-50 rounded-3xl p-6 border-2 border-green-200 w-full mb-8 text-left">
            <h4 className="text-2xl font-fredoka text-green-700 underline mb-2">{level.factCard.title}</h4>
            <div className="space-y-1">
               {level.factCard.capital && <p className="text-lg"><strong>Capital:</strong> {level.factCard.capital}</p>}
               {level.factCard.continent && <p className="text-lg"><strong>Continente:</strong> {level.factCard.continent}</p>}
               <p className="mt-4 text-xl italic text-green-800">"{level.factCard.curiosity}"</p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            sounds.playClick();
            onCorrect(calculatePoints());
          }}
          className="w-full py-6 bg-green-500 text-white text-3xl font-bold rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-8 border-green-700"
        >
          SIGUIENTE <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2 p-6 md:p-10 bg-white rounded-[3rem] shadow-2xl border-8 border-pink-100 animate-slide-up relative">
      <div className="flex justify-between w-full items-center mb-2 px-2">
        <div className={`px-4 py-2 rounded-full font-bold text-white shadow-md ${timeLeft < 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}>
          <i className="fas fa-clock mr-2"></i> {timeLeft}s
        </div>
        <button 
          onClick={() => {
            sounds.playClick();
            setShowHint(true);
          }}
          className="bg-yellow-400 text-white px-4 py-2 rounded-full font-bold shadow-md hover:scale-105 active:scale-95"
        >
          <i className="fas fa-lightbulb mr-2"></i> PISTA
        </button>
      </div>

      <div className="text-center w-full">
        <h3 className="text-xl md:text-2xl font-fredoka text-purple-500 uppercase tracking-tighter mb-2">{level.objective}</h3>
        
        {renderVisual()}

        {showHint && level.hints && (
          <div className="bg-yellow-50 text-yellow-700 p-3 rounded-xl border-2 border-yellow-200 mb-4 animate-bounce text-sm font-bold">
            <i className="fas fa-sparkles mr-2"></i> {level.hints[0]}
          </div>
        )}

        <div className="bg-purple-50 rounded-3xl border-4 border-purple-100 p-6 mb-6 shadow-inner">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            {level.question}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {level.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option)}
            className="group relative p-5 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl shadow-lg hover:scale-105 active:scale-95 transition-all border-b-8 border-purple-700 overflow-hidden"
          >
            <span className="relative z-10">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizBoard;
