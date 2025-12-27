
import React, { useRef, useState, useEffect } from 'react';
import { DrawingTool } from '../types.ts';
import { sounds } from '../utils/audio.ts';

interface CanvasBoardProps {
  brushColor: string;
  brushSize: number;
  tool: DrawingTool;
  silhouette?: string;
  levelId: string;
  onSave: (dataUrl: string) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ brushColor, brushSize, tool, silhouette, levelId, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Ajustar resolución interna al tamaño del contenedor real
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [levelId]);

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

    // Retornar coordenadas relativas al elemento CSS (el contexto ya está escalado por dpr)
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
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
    const pos = getPos(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = brushSize * 2;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = Math.max(2, brushSize / 4);
    } else if (tool === 'magic') {
      const nextHue = (hue + 5) % 360;
      setHue(nextHue);
      ctx.strokeStyle = `hsl(${nextHue}, 100%, 60%)`;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${nextHue}, 100%, 60%)`;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    setLastPos(pos);
    if (Math.random() > 0.98) sounds.playPencil();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvas();
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/webp', 0.5));
    }
  };

  // Optimizamos FloodFill para el nuevo escalado
  const handleFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Usamos coordenadas reales de pixeles para el algoritmo
    const dpr = window.devicePixelRatio;
    const realX = Math.round(startX * dpr);
    const realY = Math.round(startY * dpr);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(data, realX, realY, canvas.width);
    const fillRGB = hexToRgb(brushColor);
    
    if (colorsMatch(targetColor, [fillRGB.r, fillRGB.g, fillRGB.b, 255])) return;

    const pixelsToCheck = [[realX, realY]];
    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop()!;
      const currentColor = getPixelColor(data, x, y, canvas.width);
      if (colorsMatch(currentColor, targetColor)) {
        setPixelColor(data, x, y, canvas.width, fillRGB);
        if (x > 0) pixelsToCheck.push([x - 1, y]);
        if (x < canvas.width - 1) pixelsToCheck.push([x + 1, y]);
        if (y > 0) pixelsToCheck.push([x, y - 1]);
        if (y < canvas.height - 1) pixelsToCheck.push([x, y + 1]);
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
    <div ref={containerRef} className="w-full h-full flex-grow bg-white md:rounded-[2rem] shadow-inner overflow-hidden relative touch-none">
      {silhouette && !silhouette.startsWith('M') && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
           <i className={`fas ${silhouette} text-[20rem] md:text-[30rem]`}></i>
        </div>
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full block cursor-none"
      />
      <button 
        onClick={() => {
          const ctx = canvasRef.current?.getContext('2d');
          if(ctx && canvasRef.current) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,canvasRef.current.width, canvasRef.current.height);
            sounds.playEraser();
            saveCanvas();
          }
        }}
        className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white active:scale-90 transition-transform z-30"
      >
        <i className="fas fa-trash-alt text-xl"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
