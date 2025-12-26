
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
      
      {/* Mentor GEO Cabecera */}
      <div className="flex items-center gap-4 mb-4 md:mb-8 animate-slide-up shrink-0">
        <div className="w-14 h-14 md:w-24 md:h-24 bg-amber-500 rounded-full flex items-center justify-center border-4 md:border-8 border-white shadow-xl flex-shrink-0">
           <i className="fas fa-globe-americas text-white text-2xl md:text-5xl animate-spin-slow"></i>
        </div>
        <div className="bg-white/95 p-4 md:p-6 rounded-[2rem] shadow-xl border-2 border-amber-200 flex-grow">
           <p className="text-[10px] md:text-xl font-black text-amber-800 uppercase tracking-widest">
             EXPLORACIÓN DE VENEZUELA: {level.objective}
           </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-6 md:gap-10 overflow-hidden">
        
        {/* Contenedor de Pregunta - MAX VISIBILIDAD */}
        <div className="flex-grow bg-white rounded-[3rem] md:rounded-[5rem] shadow-2xl border-4 md:border-[16px] border-white overflow-hidden relative flex flex-col items-center justify-center p-8 md:p-16 text-center">
           <div className="absolute inset-0 bg-blue-50/20 opacity-40" style={{backgroundImage: 'radial-gradient(#fbbf24 2px, transparent 2px)', backgroundSize: '50px 50px'}}></div>
           
           <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:gap-12 w-full max-w-4xl">
              {level.visual && typeof level.visual === 'string' && (
                <div className="text-[6rem] md:text-[16rem] animate-bounce-slow drop-shadow-2xl">
                   <i className={`fas ${level.visual} text-amber-500`}></i>
                </div>
              )}
              
              <div className="bg-amber-50/95 px-8 md:px-16 py-8 md:py-14 rounded-[3rem] md:rounded-[4rem] shadow-2xl border-b-[12px] border-amber-300 w-full">
                 <h2 className="text-2xl md:text-6xl font-fredoka text-amber-900 leading-tight">
                   {level.question}
                 </h2>
              </div>
           </div>
        </div>

        {/* Opciones de Respuesta */}
        <div className="lg:w-[450px] flex flex-col gap-4 md:gap-8 justify-center shrink-0">
          {level.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`p-5 md:p-12 rounded-[2rem] md:rounded-[3rem] text-xl md:text-4xl font-fredoka shadow-2xl transition-all border-b-[8px] md:border-b-[14px] active:scale-95
                ${showResult && opt.isCorrect ? 'bg-green-500 border-green-700 text-white animate-pulse' : 'bg-white text-amber-700 border-amber-100 hover:bg-amber-50'}`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-[100] bg-amber-600/90 flex items-center justify-center p-6 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[4rem] md:rounded-[6rem] p-10 md:p-20 max-w-3xl w-full text-center border-[12px] md:border-[20px] border-white shadow-2xl animate-pop-in">
            <div className="text-8xl md:text-[12rem] mb-8">🇻🇪</div>
            <h3 className="text-4xl md:text-8xl font-fredoka text-amber-600 mb-8 uppercase leading-none">¡FANTÁSTICO!</h3>
            
            <div className="bg-amber-50 p-8 md:p-14 rounded-[3rem] md:rounded-[4.5rem] text-left mb-10 md:mb-16 border-2 border-amber-100">
              <p className="text-2xl md:text-4xl font-black text-amber-900 mb-6 underline tracking-tight">Sabías que...</p>
              <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-medium">
                {level.answer ? `Este lugar se encuentra en la región ${level.answer}. ¡Es una de las zonas más bellas de Venezuela!` : "¡Has demostrado ser una gran exploradora!"}
              </p>
            </div>

            <button
              onClick={() => onCorrect(400)}
              className="w-full bg-amber-500 text-white py-8 md:py-12 rounded-[2rem] md:rounded-[3.5rem] font-fredoka text-2xl md:text-5xl shadow-2xl border-b-[12px] border-amber-700 active:translate-y-2 transition-all"
            >
              CONTINUAR VIAJE <i className="fas fa-chevron-right ml-3"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoBoard;
