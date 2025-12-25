
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';
import { VENEZUELA_STATES } from '../constants';

interface GeoBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const GeoBoard: React.FC<GeoBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [selectedState, setSelectedState] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setSelectedState(null);
    setShowResult(false);
    setAttempts(0);
  }, [level.id]);

  const handleOptionSelect = (option: any) => {
    if (showResult) return;
    
    if (option.isCorrect) {
      sounds.playSuccess();
      setShowResult(true);
    } else {
      sounds.playWrong();
      setAttempts(prev => prev + 1);
      onWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 bg-gradient-to-br from-amber-50 to-yellow-100 overflow-hidden font-quicksand">
      
      {/* Mentor GEO */}
      <div className="flex items-center gap-4 mb-4 md:mb-8 animate-slide-up">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
           <i className="fas fa-globe-americas text-white text-3xl md:text-5xl animate-spin-slow"></i>
        </div>
        <div className="bg-white/80 p-3 md:p-4 rounded-3xl shadow-lg border-2 border-amber-200 flex-grow">
           <p className="text-xs md:text-lg font-bold text-amber-800">
             {level.index === 1 ? "¡Hola Jana! Soy GEO. Vamos a recorrer Venezuela. ¿Estás lista?" : "¿Recuerdas dónde queda este lugar?"}
           </p>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 overflow-hidden">
        
        {/* Mapa / Visual */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white overflow-hidden relative group">
           <div className="absolute inset-0 bg-[#E3F2FD] opacity-20 pattern-grid"></div>
           
           <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              {level.visual && typeof level.visual === 'string' && level.visual.length < 5 ? (
                <div className="text-9xl md:text-[14rem] animate-bounce-slow drop-shadow-2xl">
                   <i className={`fas ${level.visual} text-amber-500`}></i>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                   <i className="fas fa-map-marked-alt text-[10rem] md:text-[18rem] text-amber-100"></i>
                </div>
              )}
              
              <div className="mt-4 md:mt-8 bg-white/90 px-6 md:px-10 py-3 md:py-6 rounded-[2rem] shadow-xl border-b-4 md:border-b-8 border-amber-100">
                 <h2 className="text-xl md:text-4xl font-fredoka text-gray-800 leading-tight">
                   {level.question}
                 </h2>
              </div>
           </div>
        </div>

        {/* Opciones */}
        <div className="flex flex-col gap-3 md:gap-4 justify-center">
          {level.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-lg md:text-3xl font-fredoka shadow-xl transition-all border-b-4 md:border-b-8 active:scale-95
                ${showResult && opt.isCorrect ? 'bg-green-500 border-green-700 text-white animate-pulse' : 'bg-white text-amber-700 border-amber-100 hover:bg-amber-50'}`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-[100] bg-amber-600/95 flex items-center justify-center p-4 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-6 md:p-16 max-w-2xl w-full text-center border-[10px] md:border-[16px] border-white shadow-2xl animate-pop-in">
            <div className="text-7xl md:text-[10rem] mb-4">🇻🇪</div>
            <h3 className="text-3xl md:text-7xl font-fredoka text-amber-600 mb-2 uppercase">¡Excelente!</h3>
            
            {level.factCard && (
              <div className="bg-amber-50 p-4 md:p-8 rounded-[2rem] text-left mb-6 md:mb-10 border-2 border-amber-100">
                <p className="text-xl md:text-3xl font-bold text-amber-900 mb-2 underline">{level.factCard.title}</p>
                <p className="text-sm md:text-2xl text-gray-700 leading-relaxed italic">"{level.factCard.curiosity}"</p>
                <div className="mt-4 flex gap-4 text-xs md:text-lg font-black uppercase text-amber-400">
                  <span>CAPITAL: {level.factCard.capital}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => onCorrect(200 + (attempts === 0 ? 100 : 0))}
              className="w-full bg-amber-500 text-white py-4 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-fredoka text-xl md:text-4xl shadow-lg border-b-8 border-amber-700 active:scale-95"
            >
              SIGUIENTE DESTINO <i className="fas fa-plane-arrival ml-2"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoBoard;
