
import React, { useState, useRef, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';
import IconButton from './IconButton';

interface MathBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const MathBoard: React.FC<MathBoardProps> = ({ level, powerUps, onCorrect, onWrong, usePowerUp }) => {
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeDoubleXP, setActiveDoubleXP] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Inicializar Canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#4b5563';
        ctxRef.current = ctx;
      }
    }
    
    // Resetear Estado por Nivel
    setInput('');
    setTimeLeft(60);
    setActiveDoubleXP(false);
    setHintMessage(null);

    // Iniciar Temporizador Real
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
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

  const handleUsePowerUp = (type: string) => {
    const success = usePowerUp(type);
    if (!success) return;

    switch (type) {
      case 'doubleXP':
        setActiveDoubleXP(true);
        break;
      case 'hint':
        setHintMessage(level.hints?.[0] || `La respuesta tiene ${level.answer?.toString().length} cifras.`);
        setTimeout(() => setHintMessage(null), 5000);
        break;
      case 'extraTime':
        setTimeLeft(prev => prev + 20);
        break;
    }
  };

  const startDraw = (e: any) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(x, y);
      sounds.playPencil();
    }
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      ctxRef.current?.lineTo(x, y);
      ctxRef.current?.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      sounds.playEraser();
    }
  };

  const handleSubmit = () => {
    if (parseInt(input) === level.answer) {
      let finalPoints = 150 + (timeLeft * 2);
      if (activeDoubleXP) finalPoints *= 2;
      onCorrect(Math.floor(finalPoints));
    } else {
      sounds.playWrong();
      setInput('');
      // Pequeña penalización de tiempo
      setTimeLeft(prev => Math.max(0, prev - 5));
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-4 p-2 md:p-4 bg-[#f8f9fa] overflow-hidden animate-slide-up">
      {/* Lado Izquierdo: Scratchpad con Feedback Visual */}
      <div className={`flex-grow flex flex-col gap-2 relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 transition-colors duration-500 overflow-hidden ${activeDoubleXP ? 'border-blue-400' : 'border-gray-200'}`} 
           style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
        
        <div className="p-4 border-b-2 border-dashed border-gray-100 flex justify-between items-center bg-gray-50/50 relative z-20">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${timeLeft < 15 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
             <span className="font-fredoka text-gray-400 text-sm tracking-widest uppercase">Papel Digital v.2</span>
          </div>
          <div className="flex gap-4 items-center">
            {activeDoubleXP && <span className="text-blue-500 font-black text-xs animate-bounce">⚡ DOBLE PUNTOS ACTIVO</span>}
            <button onClick={clearCanvas} className="text-red-400 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              <i className="fas fa-eraser mr-1"></i> Borrar Todo
            </button>
          </div>
        </div>
        
        <div className="flex-grow relative cursor-crosshair">
          {/* Pregunta Central Estilizada */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
             <div className="text-center">
                <h3 className="text-gray-200 text-2xl font-bold uppercase mb-4 tracking-[0.2em] opacity-30 select-none">{level.objective}</h3>
                <div className="text-8xl md:text-[12rem] font-fredoka text-gray-800 leading-none select-none tracking-tighter transition-all">
                   {level.question}
                </div>
             </div>
          </div>

          {/* Mensaje de Pista Flotante */}
          {hintMessage && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-yellow-400 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-lg animate-bounce border-4 border-white">
              💡 {hintMessage}
            </div>
          )}

          <canvas 
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onTouchStart={(e) => { e.preventDefault(); startDraw(e); }}
            onTouchMove={(e) => { e.preventDefault(); draw(e); }}
            onTouchEnd={() => setIsDrawing(false)}
            className="w-full h-full relative z-10 touch-none"
          />
        </div>

        {/* Barra de Tiempo Inferior */}
        <div className="absolute bottom-0 left-0 h-2 bg-gray-100 w-full overflow-hidden">
           <div 
             className={`h-full transition-all duration-1000 ${timeLeft < 15 ? 'bg-red-500' : 'bg-purple-500'}`} 
             style={{ width: `${(timeLeft / 60) * 100}%` }}
           />
        </div>
      </div>

      {/* Lado Derecho: Controles y Comodines */}
      <div className="w-full md:w-72 flex flex-col gap-3 md:gap-4 flex-shrink-0 overflow-y-auto">
        
        {/* Entrada de Respuesta */}
        <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border-4 border-purple-100 flex flex-col items-center">
           <div className={`text-4xl md:text-5xl font-fredoka px-6 py-4 bg-gray-50 rounded-[2rem] w-full text-center border-b-8 mb-4 transition-all ${input ? 'text-purple-600 border-purple-200' : 'text-gray-200 border-gray-100'}`}>
              {input || "?"}
           </div>
           
           <div className="grid grid-cols-3 gap-2 w-full">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button 
                  key={n} 
                  onClick={() => { sounds.playClick(); if(input.length < 6) setInput(prev => prev + n); }}
                  className="bg-purple-50 hover:bg-purple-100 p-4 rounded-2xl font-fredoka text-2xl text-purple-600 active:scale-90 transition-all border-b-4 border-purple-100"
                >{n}</button>
              ))}
              <button onClick={() => setInput('')} className="bg-red-50 text-red-500 p-4 rounded-2xl font-black text-xs uppercase border-b-4 border-red-100">DEL</button>
              <button 
                onClick={() => { sounds.playClick(); if(input.length < 6) setInput(prev => prev + '0'); }}
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-2xl font-fredoka text-2xl text-purple-600 border-b-4 border-purple-100"
              >0</button>
              <button 
                onClick={handleSubmit}
                className="bg-green-500 text-white p-4 rounded-2xl font-black text-xl border-b-4 border-green-700 active:scale-95 flex items-center justify-center shadow-lg"
              ><i className="fas fa-paper-plane"></i></button>
           </div>
        </div>

        {/* Panel de Comodines (Inventario Real) */}
        <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border-4 border-yellow-100">
           <div className="text-center font-black text-gray-300 text-[10px] uppercase tracking-widest mb-4">Mochila de Comodines</div>
           <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => handleUsePowerUp('doubleXP')} 
               disabled={powerUps.doubleXP <= 0}
               className={`flex flex-col items-center p-3 rounded-2xl transition-all relative group ${powerUps.doubleXP > 0 ? 'bg-blue-50 hover:bg-blue-100 border-b-4 border-blue-200' : 'bg-gray-100 opacity-40 grayscale pointer-events-none'}`}
             >
                <i className={`fas fa-bolt text-xl mb-1 ${activeDoubleXP ? 'text-blue-600 animate-pulse' : 'text-blue-400'}`}></i>
                <span className="text-[9px] font-black uppercase text-blue-600">2X PUNTOS</span>
                <span className="absolute -top-2 -right-1 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.doubleXP}</span>
             </button>

             <button 
               onClick={() => handleUsePowerUp('hint')} 
               disabled={powerUps.hint <= 0}
               className={`flex flex-col items-center p-3 rounded-2xl transition-all relative ${powerUps.hint > 0 ? 'bg-yellow-50 hover:bg-yellow-100 border-b-4 border-yellow-200' : 'bg-gray-100 opacity-40 grayscale pointer-events-none'}`}
             >
                <i className="fas fa-lightbulb text-xl text-yellow-400 mb-1"></i>
                <span className="text-[9px] font-black uppercase text-yellow-600">PISTA</span>
                <span className="absolute -top-2 -right-1 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.hint}</span>
             </button>

             <button 
               onClick={() => handleUsePowerUp('extraTime')} 
               disabled={powerUps.extraTime <= 0}
               className={`flex flex-col items-center p-3 rounded-2xl transition-all relative ${powerUps.extraTime > 0 ? 'bg-green-50 hover:bg-green-100 border-b-4 border-green-200' : 'bg-gray-100 opacity-40 grayscale pointer-events-none'}`}
             >
                <i className="fas fa-clock text-xl text-green-400 mb-1"></i>
                <span className="text-[9px] font-black uppercase text-green-600">+20 SEG</span>
                <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.extraTime}</span>
             </button>

             <button 
               onClick={() => handleUsePowerUp('autoSolve')} 
               disabled={powerUps.autoSolve <= 0}
               className={`flex flex-col items-center p-3 rounded-2xl transition-all relative group ${powerUps.autoSolve > 0 ? 'bg-purple-50 hover:bg-purple-100 border-b-4 border-purple-200' : 'bg-gray-100 opacity-40 grayscale pointer-events-none'}`}
             >
                <i className="fas fa-magic text-xl text-purple-400 mb-1 group-hover:rotate-12 transition-transform"></i>
                <span className="text-[9px] font-black uppercase text-purple-600">AUTO</span>
                <span className="absolute -top-2 -right-1 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">{powerUps.autoSolve}</span>
             </button>
           </div>
        </div>

        <div className="bg-red-500 text-white p-3 rounded-2xl text-center font-fredoka text-xl shadow-lg border-b-4 border-red-800 animate-pulse">
           <i className="fas fa-hourglass-half mr-2"></i> {timeLeft}s
        </div>
      </div>
    </div>
  );
};

export default MathBoard;
