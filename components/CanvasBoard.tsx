
import React, { useRef, useState, useEffect } from 'react';
import { DrawingTool } from '../types';
import { sounds } from '../utils/audio';

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
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Inicialización limpia del lienzo
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (silhouette) {
      const path = new Path2D(silhouette);
      ctx.save();
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 12;
      ctx.setLineDash([15, 15]);
      ctx.stroke(path);
      ctx.restore();
    }
  }, [levelId, silhouette]);

  // FUNCIÓN CRÍTICA: Mapeo exacto de coordenadas para táctil y mouse
  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Calcular el factor de escala real entre el tamaño CSS y el tamaño de dibujo del canvas
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
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = brushSize * 1.8;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = Math.max(3, brushSize / 6);
    } else if (tool === 'magic') {
      // EFECTO ARCOÍRIS DINÁMICO
      const nextHue = (hue + 12) % 360;
      setHue(nextHue);
      ctx.strokeStyle = `hsl(${nextHue}, 100%, 55%)`;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsl(${nextHue}, 100%, 55%)`;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    setLastPos(pos);
    
    if (Math.random() > 0.94) sounds.playPencil();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvas();
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/webp', 0.6));
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

  const colorsMatch = (c1: number[], c2: number[], threshold = 22) => {
    return Math.abs(c1[0] - c2[0]) <= threshold &&
           Math.abs(c1[1] - c2[1]) <= threshold &&
           Math.abs(c1[2] - c2[2]) <= threshold &&
           Math.abs(c1[3] - c2[3]) <= threshold;
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
    <div className="w-full h-full flex-grow bg-white md:rounded-[2rem] shadow-inner overflow-hidden border-b-2 border-pink-100 cursor-none relative touch-none">
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
        className="w-full h-full block object-contain bg-white cursor-none"
      />
      
      {/* Indicador visual del pincel para Jana */}
      {isDrawing && tool !== 'fill' && (
        <div 
          className="fixed pointer-events-none rounded-full border-2 border-white shadow-lg z-[999]"
          style={{ 
            left: lastPos.x / (canvasRef.current?.width || 800) * 100 + '%', 
            top: lastPos.y / (canvasRef.current?.height || 600) * 100 + '%',
            width: brushSize + 'px',
            height: brushSize + 'px',
            backgroundColor: tool === 'magic' ? `hsl(${hue}, 100%, 55%)` : (tool === 'eraser' ? 'white' : brushColor),
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

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
        className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white active:scale-90 transition-transform z-30"
      >
        <i className="fas fa-trash-alt text-xl"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
