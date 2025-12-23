
import React, { useRef, useEffect, useState } from 'react';

interface CanvasBoardProps {
  brushColor: string;
  brushSize: number;
  tool: 'brush' | 'eraser' | 'fill' | 'rect' | 'circle';
  onSave: (dataUrl: string) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ brushColor, brushSize, tool, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Tamaño optimizado para tablet
    const container = canvas.parentElement;
    const width = container?.clientWidth || 800;
    const height = container?.clientHeight || 600;

    canvas.width = width * 2; // HD scale
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      contextRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? 'white' : brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize, tool]);

  const startDrawing = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing || !contextRef.current) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    contextRef.current?.closePath();
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL('image/webp', 0.5));
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-pink-100 cursor-crosshair">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        className="touch-none w-full h-full"
      />
    </div>
  );
};

export default CanvasBoard;
