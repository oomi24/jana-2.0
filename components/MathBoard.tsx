
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

interface MathBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const MathBoard: React.FC<MathBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [input, setInput] = useState('');
  const data = level.mathData;

  useEffect(() => { setInput(''); }, [level.id]);

  const handleSubmit = () => {
    if (parseInt(input) === level.answer) {
      onCorrect(300);
    } else {
      sounds.playWrong();
      setInput('');
      onWrong();
    }
  };

  const addDigit = (n: string) => {
    if (input.length < 3) {
      sounds.playClick();
      setInput(prev => prev + n);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-white/50 backdrop-blur-sm rounded-[3rem] shadow-inner border-4 border-white animate-fade-in">
      <div className="text-center mb-8">
        <span className="bg-purple-100 text-purple-600 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 inline-block shadow-sm">
          Reto de Técnica #{level.index}
        </span>
        <div className="text-6xl md:text-8xl mb-6 drop-shadow-md">{data?.obj || '⭐️'}</div>
        <h2 className="text-4xl md:text-7xl font-fredoka text-gray-800 flex items-center gap-6 justify-center">
          {data?.v1} {data?.op} {data?.v2} = 
          <div className="bg-white w-24 md:w-40 h-20 md:h-32 rounded-3xl border-4 border-purple-200 flex items-center justify-center shadow-inner text-purple-600">
            {input || '?'}
          </div>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-sm w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
          <button
            key={n}
            onClick={() => addDigit(n.toString())}
            className={`h-16 md:h-20 rounded-2xl font-fredoka text-2xl md:text-3xl border-b-4 transition-all active:translate-y-1 active:border-b-0
              ${n === 0 ? 'col-span-1 bg-gray-100 border-gray-300' : 'bg-purple-50 border-purple-200 text-purple-600'}`}
          >
            {n}
          </button>
        ))}
        <button onClick={() => setInput('')} className="bg-red-50 text-red-500 rounded-2xl font-black text-xl border-b-4 border-red-200 active:translate-y-1 active:border-b-0">C</button>
        <button 
          onClick={handleSubmit} 
          disabled={!input}
          className="col-span-3 mt-4 bg-green-500 text-white py-4 rounded-2xl font-fredoka text-2xl shadow-lg border-b-4 border-green-700 active:translate-y-1 active:border-b-0 disabled:opacity-50"
        >
          ¡COMPROBAR!
        </button>
      </div>
    </div>
  );
};

export default MathBoard;
