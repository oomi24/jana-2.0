
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

  useEffect(() => {
    setShowResult(false);
  }, [level.id]);

  const handleOptionSelect = (option: any) => {
    if (showResult) return;
    
    if (option.isCorrect) {
      sounds.playSuccess();
      setShowResult(true);
    } else {
      sounds.playWrong();
      onWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-3 md:p-8 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden font-quicksand relative">
      
      {/* Cabecera para Jana */}
      <div className="flex items-center gap-3 mb-3 md:mb-8 animate-slide-up shrink-0">
        <div className="w-12 h-12 md:w-24 md:h-24 bg-amber-500 rounded-2xl md:rounded-[2rem] flex items-center justify-center border-4 border-white shadow-lg">
           <i className="fas fa-map-marked-alt text-white text-xl md:text-5xl"></i>
        </div>
        <div className="bg-white/90 px-4 py-2 md:p-6 rounded-xl md:rounded-[2.5rem] shadow-md border border-amber-200 flex-grow">
           <p className="text-[10px] md:text-xl font-black text-amber-800 uppercase tracking-widest leading-none">
             EXPEDICIÓN VENEZUELA #{level.index}
           </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-3 md:gap-10 overflow-hidden min-h-0">
        
        {/* Pregunta con Icono Visual */}
        <div className="flex-[1.2] bg-white rounded-3xl md:rounded-[4rem] shadow-xl border-4 md:border-[16px] border-white overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
           <div className="absolute inset-0 bg-amber-50/20 opacity-40" style={{backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           
           <div className="relative z-10 flex flex-col items-center gap-4 md:gap-10 w-full">
              {level.visual && (
                <div className="text-7xl md:text-[14rem] animate-bounce-slow drop-shadow-lg text-amber-500">
                   <i className={`fas ${level.visual}`}></i>
                </div>
              )}
              
              <div className="bg-amber-50/90 px-6 py-4 md:px-16 md:py-10 rounded-2xl md:rounded-[4rem] shadow-inner border-2 border-amber-100 w-full">
                 <h2 className="text-xl md:text-5xl font-fredoka text-amber-900 leading-tight">
                   {level.question}
                 </h2>
              </div>
           </div>
        </div>

        {/* Opciones de Respuesta Adaptables */}
        <div className="flex-1 flex flex-col gap-3 md:gap-8 justify-center shrink-0 overflow-y-auto pb-4 px-1">
          {level.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`w-full p-5 md:p-12 rounded-2xl md:rounded-[3rem] text-lg md:text-4xl font-fredoka shadow-lg transition-all border-b-[6px] md:border-b-[14px] active:translate-y-1 active:border-b-0
                ${showResult && opt.isCorrect ? 'bg-green-500 border-green-700 text-white' : 'bg-white text-amber-700 border-amber-100 hover:bg-amber-50'}`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Pantalla de Éxito para Jana */}
      {showResult && (
        <div className="fixed inset-0 z-[100] bg-amber-600/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] md:rounded-[6rem] p-8 md:p-20 max-w-2xl w-full text-center border-[10px] md:border-[24px] border-white shadow-2xl animate-pop-in flex flex-col items-center">
            <div className="text-7xl md:text-[12rem] mb-6 animate-bounce">🇻🇪</div>
            <h3 className="text-3xl md:text-8xl font-fredoka text-amber-600 mb-6 uppercase leading-none">¡EXCELENTE!</h3>
            
            <div className="bg-amber-50 p-6 md:p-14 rounded-[2rem] md:rounded-[4.5rem] text-left mb-8 md:mb-16 border-4 border-amber-100 w-full shadow-inner">
              <p className="text-xs md:text-4xl font-black text-amber-900 mb-2 md:mb-6 underline uppercase tracking-tight">¿Sabías que...?</p>
              <p className="text-sm md:text-3xl text-gray-700 leading-relaxed font-bold">
                {level.answer}
              </p>
            </div>

            <button
              onClick={() => onCorrect(400)}
              className="w-full bg-amber-500 text-white py-5 md:py-12 rounded-2xl md:rounded-[4rem] font-fredoka text-xl md:text-5xl shadow-xl border-b-[8px] md:border-b-[16px] border-amber-700 active:translate-y-2 active:border-b-0 transition-all"
            >
              ¡SIGUIENTE VIAJE! <i className="fas fa-rocket ml-3"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoBoard;
