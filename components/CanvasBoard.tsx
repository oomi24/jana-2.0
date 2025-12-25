
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

  // Inicializar lienzo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Limpiar para nuevo nivel
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar silueta como guía suave
    if (silhouette) {
      const path = new Path2D(silhouette);
      ctx.save();
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 10;
      ctx.setLineDash([15, 15]);
      ctx.stroke(path);
      ctx.restore();
    }
  }, [levelId, silhouette]);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: any) => {
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
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    
    ctx.shadowBlur = 0; // Reset shadow

    if (tool === 'eraser') {
      ctx.strokeStyle = 'white';
      ctx.lineWidth = brushSize * 1.5;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = Math.max(2, brushSize / 4);
    } else if (tool === 'magic') {
      // Efecto Arcoíris
      const nextHue = (hue + 5) % 360;
      setHue(nextHue);
      ctx.strokeStyle = `hsl(${nextHue}, 100%, 50%)`;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${nextHue}, 100%, 50%)`;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setLastPos(pos);
    
    if (Math.random() > 0.9) sounds.playPencil();
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

  const colorsMatch = (c1: number[], c2: number[], threshold = 15) => {
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

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      sounds.playEraser();
      saveCanvas();
    }
  };

  return (
    <div className="w-full h-full flex-grow bg-white md:rounded-[2rem] shadow-inner overflow-hidden border-b-2 border-pink-100 cursor-crosshair relative touch-lock">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
        onTouchEnd={(e) => { e.preventDefault(); stopDrawing(); }}
        className="w-full h-full touch-none select-none block object-contain bg-white"
      />
      <button 
        onClick={clearCanvas}
        className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white active:scale-90 transition-transform z-30"
      >
        <i className="fas fa-trash-alt text-xl"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
