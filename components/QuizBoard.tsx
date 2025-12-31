
import React, { useState, useEffect } from 'react';
import { Level, QuizOption } from '../types';
import { sounds } from '../utils/audio';

interface QuizBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const QuizBoard: React.FC<QuizBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [level.id]);

  const handleSelect = (option: QuizOption) => {
    if (option.isCorrect) {
      sounds.playSuccess();
      setShowAnswer(true);
    } else {
      sounds.playWrong();
      onWrong();
    }
  };

  if (showAnswer) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-8 bg-white rounded-[3rem] shadow-2xl border-8 border-green-100 animate-pop-in text-center">
        <div className="text-8xl mb-6 animate-bounce">🌟</div>
        <h3 className="text-4xl font-fredoka text-green-600 mb-4 uppercase">¡CORRECTO!</h3>
        
        <div className="bg-green-50 p-8 rounded-[2.5rem] border-2 border-green-200 w-full mb-8 shadow-inner">
           <p className="text-2xl md:text-3xl font-bold text-green-800 leading-tight">
              {level.answer}
           </p>
        </div>

        <button
          onClick={() => onCorrect(400)}
          className="w-full py-6 bg-green-500 text-white text-3xl font-fredoka rounded-3xl shadow-xl border-b-8 border-green-700 active:translate-y-2 active:border-b-0 transition-all"
        >
          SIGUIENTE RETO <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 p-8 bg-white/50 backdrop-blur-sm rounded-[3rem] shadow-inner border-4 border-white animate-fade-in">
      <div className="text-center w-full">
        <span className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 inline-block">
           Nivel #{level.index}
        </span>
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 mb-8 shadow-xl border-4 border-white">
          <p className="text-2xl md:text-5xl font-bold text-gray-800 leading-tight">
            {level.question}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {level.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option)}
            className="w-full p-6 md:p-8 text-xl md:text-3xl font-bold text-purple-700 bg-white rounded-[2rem] shadow-lg border-b-8 border-purple-100 hover:bg-purple-50 active:translate-y-1 active:border-b-0 transition-all"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizBoard;
