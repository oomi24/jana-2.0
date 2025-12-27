
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

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Usamos el tamaño real del elemento en el DOM
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

    // El cálculo debe ser relativo al BoundingClientRect para evitar desfases
    return {
      x: (clientX - rect.left),
      y: (clientY - rect.top)
    };
  };

  const startDrawing = (e: any) => {
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    if (tool === 'fill') {
      handleFloodFill(pos.x, pos.y);
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
    } else if (tool === 'magic') {
      const nextHue = (hue + 5) % 360;
      setHue(nextHue);
      ctx.strokeStyle = `hsl(${nextHue}, 100%, 60%)`;
      ctx.lineWidth = brushSize;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    setLastPos(pos);
    if (Math.random() > 0.95) sounds.playPencil();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      onSave(canvasRef.current!.toDataURL('image/webp', 0.5));
    }
  };

  const handleFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio;
    const x = Math.round(startX * dpr);
    const y = Math.round(startY * dpr);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixel(imageData, x, y);
    const fillColor = hexToRgb(brushColor);

    if (colorsMatch(targetColor, [fillColor.r, fillColor.g, fillColor.b, 255])) return;

    const pixels = [[x, y]];
    while (pixels.length > 0) {
      const [px, py] = pixels.pop()!;
      if (colorsMatch(getPixel(imageData, px, py), targetColor)) {
        setPixel(imageData, px, py, fillColor);
        if (px > 0) pixels.push([px - 1, py]);
        if (px < canvas.width - 1) pixels.push([px + 1, py]);
        if (py > 0) pixels.push([px, py - 1]);
        if (py < canvas.height - 1) pixels.push([px, py + 1]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
    sounds.playSuccess();
  };

  const getPixel = (img: ImageData, x: number, y: number) => {
    const i = (y * img.width + x) * 4;
    return [img.data[i], img.data[i+1], img.data[i+2], img.data[i+3]];
  };

  const setPixel = (img: ImageData, x: number, y: number, color: any) => {
    const i = (y * img.width + x) * 4;
    img.data[i] = color.r; img.data[i+1] = color.g; img.data[i+2] = color.b; img.data[i+3] = 255;
  };

  const colorsMatch = (c1: number[], c2: number[]) => {
    return Math.abs(c1[0]-c2[0])<20 && Math.abs(c1[1]-c2[1])<20 && Math.abs(c1[2]-c2[2])<20;
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
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
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full block cursor-none"
      />
    </div>
  );
};

export default CanvasBoard;
