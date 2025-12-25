
import React, { useState, useRef, useEffect } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const timerRef = useRef<number | null>(null);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = window.innerWidth < 768 ? 3 : 5;
        ctx.strokeStyle = '#4b5563';
        ctxRef.current = ctx;
      }
    }
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    
    setInput('');
    setTimeLeft(60);
    setActiveDoubleXP(false);
    setHintMessage(null);

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
      window.removeEventListener('resize', initCanvas);
    };
  }, [level.id]);

  const handleUsePowerUp = (type: string) => {
    const success = usePowerUp(type);
    if (!success) return;

    switch (type) {
      case 'doubleXP':
        setActiveDoubleXP(true);
        break;
      case 'hint':
        setHintMessage(level.hints?.[0] || `Tiene ${level.answer?.toString().length} cifras`);
        setTimeout(() => setHintMessage(null), 4000);
        break;
      case 'extraTime':
        setTimeLeft(prev => prev + 20);
        break;
    }
  };

  const getPos = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDraw = (e: any) => {
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
    if (Math.random() > 0.7) sounds.playPencil();
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    ctxRef.current?.lineTo(x, y);
    ctxRef.current?.stroke();
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
      setTimeLeft(prev => Math.max(0, prev - 5));
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-1 md:gap-4 p-1 md:p-4 bg-[#f8f9fa] overflow-hidden touch-lock animate-slide-up">
      
      {/* Área de Pizarra Digital */}
      <div className={`flex-1 min-h-[150px] flex flex-col relative bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border-2 md:border-4 transition-all overflow-hidden ${activeDoubleXP ? 'border-blue-400' : 'border-gray-100'}`} 
           style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.2px, transparent 1.2px)', backgroundSize: '15px 15px' }}>
        
        <div className="px-3 py-1.5 border-b border-dashed border-gray-100 flex justify-between items-center bg-gray-50/50 z-20">
          <div className="flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${timeLeft < 15 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
             <span className="font-fredoka text-gray-400 text-[8px] md:text-xs uppercase tracking-widest">Digital Paper</span>
          </div>
          <button onClick={clearCanvas} className="text-red-400 font-black text-[8px] md:text-[10px] uppercase bg-red-50 px-3 py-1 rounded-full">
             <i className="fas fa-eraser mr-1"></i> Borrar
          </button>
        </div>
        
        <div ref={containerRef} className="flex-1 relative cursor-crosshair touch-none">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 p-2">
             <div className="text-center w-full">
                <h3 className="text-gray-200 text-xs md:text-2xl font-bold uppercase mb-1 md:mb-4 tracking-widest opacity-40 select-none truncate">{level.objective}</h3>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-fredoka text-gray-800 leading-none select-none tracking-tighter break-words">
                   {level.question}
                </div>
             </div>
          </div>

          {hintMessage && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-yellow-400 text-white px-3 py-1 rounded-xl shadow-xl font-bold text-xs md:text-lg animate-bounce border-2 border-white">
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

        <div className="h-1 bg-gray-100 w-full overflow-hidden">
           <div className={`h-full transition-all duration-1000 ${timeLeft < 15 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${(timeLeft / 60) * 100}%` }} />
        </div>
      </div>

      {/* Controles y Teclado Compacto */}
      <div className="w-full md:w-64 lg:w-72 flex flex-col gap-1 md:gap-4 flex-shrink-0">
        <div className="bg-white p-1.5 md:p-4 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border-2 md:border-4 border-purple-100 flex flex-col">
           <div className={`text-2xl md:text-5xl font-fredoka py-1 md:py-4 bg-gray-50 rounded-lg md:rounded-[2rem] w-full text-center border-b-2 md:border-b-8 mb-1.5 md:mb-4 ${input ? 'text-purple-600 border-purple-200' : 'text-gray-200 border-gray-100'}`}>
              {input || "?"}
           </div>
           
           <div className="grid grid-cols-3 gap-1 md:gap-2">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => { sounds.playClick(); if(input.length < 5) setInput(prev => prev + n); }}
                  className="bg-purple-50 active:bg-purple-200 p-2 md:p-4 rounded-lg md:rounded-2xl font-fredoka text-lg md:text-2xl text-purple-600 border-b-2 md:border-b-4 border-purple-100"
                >{n}</button>
              ))}
              <button onClick={() => setInput('')} className="bg-red-50 text-red-500 p-2 md:p-4 rounded-lg md:rounded-2xl font-black text-[8px] md:text-xs uppercase border-b-2 border-red-100">DEL</button>
              <button onClick={() => { sounds.playClick(); if(input.length < 5) setInput(prev => prev + '0'); }}
                className="bg-purple-50 active:bg-purple-200 p-2 md:p-4 rounded-lg md:rounded-2xl font-fredoka text-lg md:text-2xl text-purple-600 border-b-2 border-purple-100"
              >0</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white p-2 md:p-4 rounded-lg md:rounded-2xl font-black text-lg md:text-xl border-b-2 border-green-700 active:scale-95 shadow-lg">
                 <i className="fas fa-paper-plane"></i>
              </button>
           </div>
        </div>

        <div className="bg-white p-1.5 md:p-4 rounded-[1.2rem] md:rounded-[2.5rem] shadow-xl border-2 md:border-4 border-yellow-100">
           <div className="flex md:grid md:grid-cols-2 gap-1.5 md:gap-3 overflow-x-auto no-scrollbar">
             {[
               { id: 'doubleXP', icon: 'fa-bolt', color: 'blue', label: '2X' },
               { id: 'hint', icon: 'fa-lightbulb', color: 'yellow', label: '?' },
               { id: 'extraTime', icon: 'fa-clock', color: 'green', label: '+20' },
               { id: 'autoSolve', icon: 'fa-magic', color: 'purple', label: 'AUTO' }
             ].map(pw => (
               <button key={pw.id} onClick={() => handleUsePowerUp(pw.id)} disabled={powerUps[pw.id] <= 0}
                 className={`flex-shrink-0 flex flex-col items-center justify-center p-1.5 md:p-3 rounded-lg md:rounded-xl transition-all relative ${powerUps[pw.id] > 0 ? `bg-${pw.color}-50 border-b-2 border-${pw.color}-200` : 'opacity-30 grayscale pointer-events-none'}`}
               >
                  <i className={`fas ${pw.icon} text-xs md:text-xl mb-0.5 text-${pw.color}-500`}></i>
                  <span className="text-[6px] md:text-[9px] font-black uppercase text-gray-500">{pw.label}</span>
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[7px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                    {powerUps[pw.id]}
                  </span>
               </button>
             ))}
           </div>
        </div>

        <div className={`${timeLeft < 15 ? 'bg-red-500' : 'bg-gray-800'} text-white py-1.5 md:py-3 rounded-lg md:rounded-2xl text-center font-fredoka text-xs md:text-xl shadow-lg transition-colors`}>
           <i className="fas fa-hourglass-half mr-2"></i> {timeLeft}s
        </div>
      </div>
    </div>
  );
};

export default MathBoard;
