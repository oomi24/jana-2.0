
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

interface GeoBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const GeoBoard: React.FC<GeoBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
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
      <div className="flex items-center gap-4 mb-4 md:mb-6 animate-slide-up shrink-0">
        <div className="w-12 h-12 md:w-20 md:h-20 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl flex-shrink-0">
           <i className="fas fa-globe-americas text-white text-xl md:text-4xl animate-spin-slow"></i>
        </div>
        <div className="bg-white/80 p-2 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border-2 border-amber-200 flex-grow">
           <p className="text-[10px] md:text-lg font-bold text-amber-800 uppercase tracking-tight">
             Misión Geo: {level.objective}
           </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 md:gap-8 overflow-hidden">
        
        {/* Contenedor de Pregunta Centralizado */}
        <div className="flex-grow bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
           <div className="absolute inset-0 bg-[#E3F2FD] opacity-20" style={{backgroundImage: 'radial-gradient(#amber-500 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           
           <div className="relative z-10 flex flex-col items-center justify-center gap-6">
              {level.visual && typeof level.visual === 'string' && (
                <div className="text-7xl md:text-[12rem] animate-bounce-slow drop-shadow-2xl">
                   <i className={`fas ${level.visual} text-amber-500`}></i>
                </div>
              )}
              
              <div className="bg-amber-50/90 px-8 py-6 rounded-[2.5rem] shadow-xl border-b-8 border-amber-200 w-full max-w-lg">
                 <h2 className="text-xl md:text-4xl font-fredoka text-gray-800 leading-tight">
                   {level.question}
                 </h2>
              </div>
           </div>
        </div>

        {/* Opciones de Respuesta */}
        <div className="lg:w-1/3 flex flex-col gap-3 md:gap-4 justify-center shrink-0">
          {level.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-lg md:text-2xl font-fredoka shadow-xl transition-all border-b-4 md:border-b-8 active:scale-95
                ${showResult && opt.isCorrect ? 'bg-green-500 border-green-700 text-white animate-pulse scale-105' : 'bg-white text-amber-700 border-amber-100 hover:bg-amber-50'}`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-[100] bg-amber-600/95 flex items-center justify-center p-4 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-6 md:p-12 max-w-xl w-full text-center border-[8px] md:border-[12px] border-white shadow-2xl animate-pop-in">
            <div className="text-6xl md:text-8xl mb-4">🇻🇪</div>
            <h3 className="text-3xl md:text-5xl font-fredoka text-amber-600 mb-4 uppercase">¡Genial Jana!</h3>
            
            <div className="bg-amber-50 p-4 md:p-6 rounded-[2rem] text-left mb-8 border-2 border-amber-100">
              <p className="text-lg md:text-2xl font-bold text-amber-900 mb-2 underline tracking-tight">Dato Curioso:</p>
              <p className="text-sm md:text-xl text-gray-700 leading-relaxed italic">
                {level.answer ? `Perteneces a la región ${level.answer}, un lugar lleno de maravillas en nuestra hermosa Venezuela.` : "¡Has descubierto un lugar increíble!"}
              </p>
            </div>

            <button
              onClick={() => onCorrect(250 + (attempts === 0 ? 50 : 0))}
              className="w-full bg-amber-500 text-white py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] font-fredoka text-xl md:text-3xl shadow-lg border-b-8 border-amber-700 active:scale-95 transition-all"
            >
              CONTINUAR VIAJE <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoBoard;
