
import React, { useRef, useState, useEffect } from 'react';
import { Level, DrawingTool } from '../types.ts';
import { sounds } from '../utils/audio.ts';

interface ArtTechniqueBoardProps {
  level: Level;
  brushColor: string;
  brushSize: number;
  tool: DrawingTool;
  onComplete: () => void;
  onSave: (dataUrl: string) => void;
}

const ArtTechniqueBoard: React.FC<ArtTechniqueBoardProps> = ({ level, brushColor, brushSize, tool, onComplete, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [connectedCount, setConnectedCount] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const art = level.artData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Inicializar Hoja Blanca
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setConnectedCount(0);
    setShowGuide(true);
  }, [level.id]);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: any) => {
    if (e.cancelable) e.preventDefault();
    
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);

    // Lógica de Unir Puntos
    if (art?.technique === 'dots' && art.points) {
      const nextPoint = art.points[connectedCount];
      if (!nextPoint) return;

      const dist = Math.sqrt(Math.pow(pos.x - nextPoint.x, 2) + Math.pow(pos.y - nextPoint.y, 2));
      
      // Mantenemos el radio de detección generoso pero el visual es más pequeño
      if (dist < 60) {
        sounds.playClick();
        if (connectedCount > 0) {
          const prevPoint = art.points[connectedCount - 1];
          drawAutoLine(prevPoint, nextPoint);
        }
        const nextIdx = connectedCount + 1;
        setConnectedCount(nextIdx);
        
        if (nextIdx >= art.points.length) {
          setTimeout(() => {
            sounds.playSuccess();
          }, 500);
        }
      }
    }
  };

  const drawAutoLine = (p1: any, p2: any) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? 'white' : brushColor;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 2.5 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setLastPos(pos);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 800, 600);
      sounds.playEraser();
      setConnectedCount(0);
    }
  };

  const stopDrawing = (e: any) => {
    setIsDrawing(false);
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center bg-[#fafafa] overflow-hidden relative touch-none">
      
      {/* HUD - Objetivos en la Esquina Superior Izquierda */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
         <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border-2 border-pink-100 flex items-center gap-3 pointer-events-auto">
            <i className={`fas ${String(level.visual)} text-pink-500 text-lg`}></i>
            <span className="font-black text-xs md:text-sm uppercase text-gray-700 max-w-[120px] md:max-w-none truncate">{level.objective}</span>
         </div>
      </div>

      {/* Botón de Guía en la Esquina Superior Derecha */}
      <div className="absolute top-4 right-4 z-30">
        <button 
           onClick={() => setShowGuide(!showGuide)} 
           className={`px-5 py-2 rounded-2xl font-black text-xs shadow-xl transition-all border-b-4 active:translate-y-1 ${showGuide ? 'bg-pink-500 text-white border-pink-700' : 'bg-white text-pink-500 border-pink-100'}`}
         >
            <i className={`fas ${showGuide ? 'fa-eye-slash' : 'fa-eye'} mr-2`}></i>
            {showGuide ? 'OCULTAR' : 'VER GUÍA'}
         </button>
      </div>

      <div className="flex-grow w-full h-full relative overflow-hidden bg-white">
        {/* Capa de Puntos (Números) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {art?.technique === 'dots' && art.points?.map((p, i) => (
            <div 
              key={i} 
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${i < connectedCount ? 'opacity-10 scale-50 grayscale' : 'opacity-100 scale-100'}`} 
              style={{left: `${(p.x/800)*100}%`, top: `${(p.y/600)*100}%`}}
            >
               <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-[10px] md:text-sm font-black shadow-lg
                 ${i === connectedCount ? 'bg-pink-500 text-white border-white animate-pulse scale-125 shadow-pink-200' : 'bg-white text-pink-500 border-pink-100'}`}>
                 {p.label}
               </div>
            </div>
          ))}

          {art?.technique === 'step-by-step' && showGuide && (
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
               <i className={`fas ${String(level.visual)} text-[12rem] md:text-[25rem] text-pink-500`}></i>
            </div>
          )}
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block bg-white cursor-crosshair"
          style={{ touchAction: 'none' }}
        />

        {/* Botón Flotante de Borrado */}
        <button 
          onClick={clearCanvas} 
          className="absolute right-4 bottom-24 md:bottom-32 w-16 h-16 md:w-24 md:h-24 bg-rose-50 text-rose-500 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white active:scale-95 transition-all z-40 group"
        >
          <i className="fas fa-trash-alt text-2xl md:text-4xl group-hover:rotate-12"></i>
          <span className="text-[8px] md:text-xs font-black uppercase mt-1">Borrar</span>
        </button>
      </div>

      {/* Footer Lateralizado - Botón principal a la derecha */}
      <div className="w-full p-3 md:p-6 bg-white border-t-4 border-pink-50 flex justify-between items-center z-30 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
         <div className="flex items-center gap-4">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-4 border-pink-100 flex items-center justify-center ${tool === 'eraser' ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}>
               <i className="fas fa-eraser text-lg md:text-2xl"></i>
            </div>
            <div className="hidden sm:block">
               <p className="text-xs md:text-lg font-black text-gray-700 leading-none mb-1 uppercase tracking-tighter">MODO TÉCNICO</p>
               <p className="text-[8px] md:text-xs font-bold text-gray-400">
                  {art?.technique === 'dots' ? 'Sigue los puntos en orden' : 'Dibuja sobre la guía'}
               </p>
            </div>
         </div>

         <button 
           onClick={() => {
              if (canvasRef.current) onSave(canvasRef.current.toDataURL('image/png'));
              onComplete();
           }} 
           className="bg-emerald-500 text-white px-8 py-4 md:px-14 md:py-6 rounded-full font-fredoka text-lg md:text-3xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] border-b-6 border-emerald-700 active:translate-y-2 active:border-b-0 transition-all flex items-center gap-3"
         >
            ¡LISTO JANA! <i className="fas fa-check-circle"></i>
         </button>
      </div>
    </div>
  );
};

export default ArtTechniqueBoard;
