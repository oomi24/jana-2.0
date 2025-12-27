
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

interface MathBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const MathBoard: React.FC<MathBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [input, setInput] = useState('');
  const [activeCarry, setActiveCarry] = useState<Record<number, string>>({});
  
  const math = (level as any).mathData;

  useEffect(() => {
    setInput('');
    setActiveCarry({});
  }, [level.id]);

  const handleSubmit = () => {
    if (parseInt(input) === level.answer) {
      onCorrect(300);
    } else {
      sounds.playWrong();
      setInput('');
    }
  };

  const addDigit = (n: string) => {
    if (input.length < 8) {
      sounds.playClick();
      // LÓGICA INVERSA: El nuevo dígito se coloca a la izquierda para que 
      // parezca que se llena de derecha a izquierda en la cuadrícula.
      setInput(prev => n + prev);
    }
  };

  const updateCarry = (col: number, val: string) => {
    setActiveCarry(prev => ({ ...prev, [col]: val.slice(-1) }));
  };

  const v1Digits = math.v1.toString().split('');
  const v2Digits = math.v2.toString().split('');
  const maxDigits = Math.max(v1Digits.length, v2Digits.length);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row p-2 md:p-6 gap-2 md:gap-6 bg-[#f8fafc] overflow-hidden font-quicksand">
      
      {/* CUADERNO DE TRABAJO */}
      <div className="flex-grow bg-white rounded-[1.5rem] md:rounded-[3.5rem] shadow-xl border-2 md:border-[12px] border-white overflow-hidden relative p-3 md:p-12 flex flex-col items-center justify-center">
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)' }}></div>
         
         <div className="relative z-10 flex flex-col items-end scale-[0.85] md:scale-100">
            {/* Llevadas (Anotaciones arriba) */}
            <div className="flex gap-1 md:gap-4 mb-2 pr-1 md:pr-4">
               {[...Array(maxDigits + 1)].map((_, i) => (
                 <input 
                   key={i} 
                   type="tel" 
                   value={activeCarry[maxDigits - i] || ''} 
                   onChange={(e) => updateCarry(maxDigits - i, e.target.value)}
                   className="w-7 h-7 md:w-14 md:h-14 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-center font-fredoka text-yellow-600 text-sm md:text-2xl focus:ring-2 focus:ring-yellow-400 outline-none"
                   placeholder="0"
                 />
               ))}
            </div>

            {/* Operación Vertical */}
            <div className="flex flex-col items-end pr-1 md:pr-4">
               <div className="flex gap-1 md:gap-4">
                  {v1Digits.map((d, i) => (
                    <span key={i} className="w-8 h-12 md:w-16 md:h-24 flex items-center justify-center text-4xl md:text-8xl font-fredoka text-gray-800">{d}</span>
                  ))}
               </div>

               <div className="flex items-center">
                  <span className="text-3xl md:text-7xl font-fredoka text-purple-500 mr-2 md:mr-6">{math.op}</span>
                  <div className="flex gap-1 md:gap-4">
                    {[...Array(v1Digits.length - v2Digits.length)].map((_, i) => <span key={i} className="w-8 md:w-16"></span>)}
                    {v2Digits.map((d, i) => (
                      <span key={i} className="w-8 h-12 md:w-16 md:h-24 flex items-center justify-center text-4xl md:text-8xl font-fredoka text-gray-800">{d}</span>
                    ))}
                  </div>
               </div>

               <div className="w-[120%] h-1 md:h-3 bg-gray-800 rounded-full my-2 md:my-4"></div>
               
               {/* Resultado con Lógica de Derecha a Izquierda */}
               <div className="flex flex-row-reverse gap-1 md:gap-4 min-h-[50px] md:min-h-[100px] items-center">
                  {/* Mostramos el input invertido visualmente o simplemente alineado a la derecha */}
                  <div className="bg-purple-50 px-4 md:px-12 py-2 md:py-6 rounded-xl md:rounded-[2.5rem] border-2 md:border-4 border-purple-200 shadow-inner min-w-[120px] md:min-w-[300px] text-right">
                    <span className="text-4xl md:text-[8rem] font-fredoka text-purple-600 tracking-[0.05em] leading-none">
                       {input || <span className="opacity-10">?</span>}
                    </span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* TECLADO ADAPTADO */}
      <div className="w-full lg:w-96 flex flex-col gap-2 md:gap-4 shrink-0">
        <div className="bg-white p-2 md:p-6 rounded-[1.5rem] md:rounded-[3rem] shadow-lg border-2 md:border-8 border-purple-100 grid grid-cols-3 gap-1 md:gap-3">
           {[1,2,3,4,5,6,7,8,9,0].map(n => (
             <button 
               key={n} 
               onClick={() => addDigit(n.toString())}
               className={`h-12 md:h-24 rounded-lg md:rounded-[1.5rem] font-fredoka text-xl md:text-4xl transition-all border-b-4 md:border-b-8 active:translate-y-1
                 ${n === 0 ? 'col-span-2 bg-gray-100 border-gray-300 text-gray-600' : 'bg-purple-100 border-purple-300 text-purple-600'}`}
             >
               {n}
             </button>
           ))}
           <button 
             onClick={() => { setInput(''); sounds.playEraser(); }} 
             className="h-12 md:h-24 bg-red-100 border-red-300 text-red-600 rounded-lg md:rounded-[1.5rem] font-black text-[10px] md:text-xl border-b-4 md:border-b-8"
           >
             C
           </button>
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={!input}
          className="w-full bg-green-500 text-white py-4 md:py-10 rounded-xl md:rounded-[2.5rem] font-fredoka text-xl md:text-5xl shadow-xl border-b-[6px] md:border-b-[12px] border-green-700 active:translate-y-1 transition-all disabled:opacity-50"
        >
          ¡LISTO!
        </button>
        
        <div className="hidden md:block bg-blue-50 p-4 rounded-2xl border-2 border-blue-100 text-center">
           <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Pista Pedagógica</p>
           <p className="text-sm text-gray-500 font-bold leading-tight">
             Escribe el resultado empezando por las unidades (derecha).
           </p>
        </div>
      </div>
    </div>
  );
};

export default MathBoard;
