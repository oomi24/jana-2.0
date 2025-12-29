
import React, { useState, useEffect } from 'react';
import { Level } from '../types.ts';
import { sounds } from '../utils/audio.ts';

interface GeoBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const GeoBoard: React.FC<GeoBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [showResult, setShowResult] = useState(false);
  const [showWildcard, setShowWildcard] = useState(false);

  useEffect(() => {
    setShowResult(false);
    setShowWildcard(false);
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

  const useWildcard = () => {
    sounds.playClick();
    setShowWildcard(true);
  };

  return (
    <div className="w-full h-full flex flex-col p-3 md:p-8 bg-gradient-to-br from-amber-50 to-orange-100 overflow-y-auto lg:overflow-hidden font-quicksand relative">
      
      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-4 md:mb-8 animate-slide-up shrink-0">
        <div className="w-12 h-12 md:w-24 md:h-24 bg-amber-500 rounded-2xl md:rounded-[2rem] flex items-center justify-center border-4 border-white shadow-lg shrink-0">
           <i className="fas fa-map-marked-alt text-white text-xl md:text-5xl"></i>
        </div>
        <div className="bg-white/90 px-4 py-2 md:p-6 rounded-xl md:rounded-[2.5rem] shadow-md border border-amber-200 flex-grow">
           <p className="text-xs md:text-xl font-black text-amber-800 uppercase tracking-widest leading-none">
             MISIÓN GEOGRÁFICA #{level.index}
           </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 md:gap-10 min-h-0 pb-6">
        
        {/* Pregunta */}
        <div className="flex-[1.2] bg-white rounded-3xl md:rounded-[4rem] shadow-xl border-4 md:border-[16px] border-white overflow-hidden relative flex flex-col items-center justify-center p-6 text-center min-h-[250px] lg:min-h-0">
           <div className="absolute inset-0 bg-amber-50/20 opacity-40" style={{backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           
           <div className="relative z-10 flex flex-col items-center gap-4 md:gap-8 w-full">
              {level.visual && (
                <div className="text-6xl md:text-[10rem] animate-bounce-slow drop-shadow-lg text-amber-500">
                   <i className={`fas ${String(level.visual)}`}></i>
                </div>
              )}
              
              <div className="bg-amber-50/90 px-6 py-4 md:px-12 md:py-8 rounded-2xl md:rounded-[3rem] shadow-inner border-2 border-amber-100 w-full">
                 <h2 className="text-lg md:text-3xl font-fredoka text-amber-900 leading-tight">
                   {String(level.question)}
                 </h2>
              </div>

              {showWildcard && level.hints && (
                <div className="bg-yellow-100 p-3 md:p-6 rounded-2xl border-2 border-yellow-300 animate-bounce text-xs md:text-xl font-bold text-amber-900 shadow-lg">
                  <i className="fas fa-compass mr-2 text-red-500"></i>
                  {String(level.hints[0])}
                </div>
              )}
           </div>
        </div>

        {/* Opciones */}
        <div className="flex-1 flex flex-col gap-3 md:gap-6 justify-center shrink-0">
          {level.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              className={`w-full p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] text-base md:text-2xl font-fredoka shadow-lg transition-all border-b-[4px] md:border-b-[10px] active:translate-y-1 active:border-b-0
                ${showResult && opt.isCorrect ? 'bg-green-500 border-green-700 text-white' : 'bg-white text-amber-700 border-amber-100 hover:bg-amber-50'}`}
            >
              {String(opt.text)}
            </button>
          ))}

          {!showWildcard && !showResult && (
            <button 
              onClick={useWildcard}
              className="mt-2 bg-purple-500 text-white p-3 md:p-5 rounded-full font-black text-[10px] md:text-lg shadow-xl hover:scale-105 transition-transform border-b-4 border-purple-700"
            >
              <i className="fas fa-magic mr-2"></i> PISTA MÁGICA
            </button>
          )}
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-[100] bg-amber-600/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-[2rem] md:rounded-[4rem] p-6 md:p-14 max-w-xl w-full text-center border-[6px] md:border-[16px] border-white shadow-2xl animate-pop-in flex flex-col items-center">
            <div className="text-5xl md:text-8xl mb-4 animate-bounce">🗺️</div>
            <h3 className="text-2xl md:text-5xl font-fredoka text-amber-600 mb-4 uppercase">¡EXCELENTE!</h3>
            
            <div className="bg-amber-50 p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] text-left mb-6 md:mb-10 border-2 md:border-4 border-amber-100 w-full shadow-inner">
              <p className="text-[10px] md:text-lg font-black text-amber-900 mb-1 md:mb-4 underline uppercase tracking-tight">Sabías que...</p>
              <p className="text-sm md:text-2xl text-gray-700 leading-relaxed font-bold">
                {String(level.answer)}
              </p>
            </div>

            <button
              onClick={() => onCorrect(400)}
              className="w-full bg-amber-500 text-white py-4 md:py-8 rounded-2xl md:rounded-[3rem] font-fredoka text-xl md:text-3xl shadow-xl border-b-[6px] md:border-b-[12px] border-amber-700 active:translate-y-2 active:border-b-0 transition-all"
            >
              ¡CONTINUAR!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeoBoard;
