
import React, { useRef, useState, useEffect } from 'react';
import { DrawingTool, BrushShape } from '../types.ts';
import { sounds } from '../utils/audio.ts';

interface CanvasBoardProps {
  brushColor: string;
  brushSize: number;
  brushShape: BrushShape;
  tool: DrawingTool;
  silhouette?: string;
  levelId: string;
  onSave: (dataUrl: string) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ brushColor, brushSize, brushShape, tool, silhouette, levelId, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Fondo inicial (La Hoja)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (silhouette) {
      if (silhouette.startsWith('M')) {
        const path = new Path2D(silhouette);
        ctx.save();
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 12;
        ctx.setLineDash([15, 15]);
        ctx.stroke(path);
        ctx.restore();
      }
    }
  }, [levelId, silhouette]);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    // Obtener las dimensiones reales del elemento en pantalla
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Factor de escala exacto para sincronizar pincel
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
    if (tool === 'fill') {
      handleFloodFill(Math.round(pos.x), Math.round(pos.y));
      return;
    }
    setIsDrawing(true);
    setLastPos(pos);
  };

  const draw = (e: any) => {
    if (!isDrawing || tool === 'fill') return;
    if (e.cancelable) e.preventDefault();
    
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
    
    ctx.lineCap = brushShape === 'round' ? 'round' : 'square';
    ctx.lineJoin = brushShape === 'round' ? 'round' : 'miter';

    if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = brushSize * 2.8;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = Math.max(4, brushSize / 2);
    } else if (tool === 'magic') {
      const nextHue = (hue + 12) % 360;
      setHue(nextHue);
      ctx.strokeStyle = `hsl(${nextHue}, 100%, 65%)`;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsl(${nextHue}, 100%, 65%)`;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    setLastPos(pos);
    if (Math.random() > 0.95) sounds.playPencil();
  };

  const stopDrawing = (e: any) => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvas();
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(data, startX, startY, canvas.width);
    const fillRGB = hexToRgb(brushColor);
    
    if (colorsMatch(targetColor, [fillRGB.r, fillRGB.g, fillRGB.b, 255])) return;

    const pixelsToCheck = [[startX, startY]];
    const width = canvas.width;
    const height = canvas.height;
    
    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop()!;
      const currentColor = getPixelColor(data, x, y, width);
      if (colorsMatch(currentColor, targetColor)) {
        setPixelColor(data, x, y, width, fillRGB);
        if (x > 0) pixelsToCheck.push([x - 1, y]);
        if (x < width - 1) pixelsToCheck.push([x + 1, y]);
        if (y > 0) pixelsToCheck.push([x, y - 1]);
        if (y < height - 1) pixelsToCheck.push([x, y + 1]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
    sounds.playSuccess();
    saveCanvas();
  };

  const getPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const index = (y * width + x) * 4;
    return [data[index], data[index + 1], data[index + 2], data[index + 3]];
  };

  const setPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number, color: {r:number, g:number, b:number}) => {
    const index = (y * width + x) * 4;
    data[index] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = 255;
  };

  const colorsMatch = (c1: number[], c2: number[], threshold = 30) => {
    return Math.abs(c1[0] - c2[0]) <= threshold &&
           Math.abs(c1[1] - c2[1]) <= threshold &&
           Math.abs(c1[2] - c2[2]) <= threshold;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  return (
    <div className="w-full h-full flex-grow bg-white md:rounded-[2rem] shadow-2xl overflow-hidden border-b-8 border-pink-50 relative touch-none">
      
      {silhouette && !silhouette.startsWith('M') && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <i className={`fas ${silhouette} text-[10rem] md:text-[22rem] text-pink-500`}></i>
        </div>
      )}

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
      
      <button 
        onClick={() => {
          const ctx = canvasRef.current?.getContext('2d');
          if(ctx && canvasRef.current) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,800,600);
            sounds.playEraser();
            saveCanvas();
          }
        }}
        className="absolute bottom-8 right-8 w-16 h-16 md:w-24 md:h-24 bg-rose-50 text-rose-600 rounded-full flex flex-col items-center justify-center shadow-[0_10px_25px_rgba(244,63,94,0.3)] border-4 border-white active:scale-90 transition-all z-40 group"
      >
        <i className="fas fa-trash-alt text-2xl md:text-4xl group-hover:shake"></i>
        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">Limpiar</span>
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .group:hover .fas { animation: shake 0.3s infinite; }
      `}</style>
    </div>
  );
};

export default CanvasBoard;
