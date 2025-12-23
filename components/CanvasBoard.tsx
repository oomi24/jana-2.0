
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { sounds } from '../utils/audio';

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
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? 'white' : brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize, tool]);

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getPointerPos(e);
    setIsDrawing(true);
    setStartPos({ x, y });

    if (contextRef.current) {
      setSnapshot(contextRef.current.getImageData(0, 0, 800, 600));
      if (tool === 'brush' || tool === 'eraser') {
        sounds.startBrush();
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
      } else if (tool === 'fill') {
          sounds.playClick();
          floodFill(Math.floor(x), Math.floor(y), brushColor);
          setIsDrawing(false);
      }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current) return;
    const { x, y } = getPointerPos(e);

    if (tool === 'brush' || tool === 'eraser') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } else if (tool === 'rect' || tool === 'circle') {
      if (snapshot) contextRef.current.putImageData(snapshot, 0, 0);
      contextRef.current.beginPath();
      if (tool === 'rect') {
        contextRef.current.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        contextRef.current.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        contextRef.current.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (tool === 'brush' || tool === 'eraser') {
        sounds.stopBrush();
      }
      if (canvasRef.current) {
        onSave(canvasRef.current.toDataURL('image/webp', 0.8));
      }
    }
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = contextRef.current;
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixel(data, startX, startY);
    const fillRGBA = hexToRGBA(fillColor);

    if (colorsMatch(targetColor, fillRGBA)) return;

    const pixelsToCheck = [startX, startY];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop()!;
      const x = pixelsToCheck.pop()!;
      const currentColor = getPixel(data, x, y);

      if (colorsMatch(currentColor, targetColor)) {
        setPixel(data, x, y, fillRGBA);
        if (x > 0) pixelsToCheck.push(x - 1, y);
        if (x < canvas.width - 1) pixelsToCheck.push(x + 1, y);
        if (y > 0) pixelsToCheck.push(x, y - 1);
        if (y < canvas.height - 1) pixelsToCheck.push(x, y + 1);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const getPixel = (data: Uint8ClampedArray, x: number, y: number) => {
    const offset = (y * 800 + x) * 4;
    return [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]];
  };

  const setPixel = (data: Uint8ClampedArray, x: number, y: number, color: number[]) => {
    const offset = (y * 800 + x) * 4;
    data[offset] = color[0];
    data[offset + 1] = color[1];
    data[offset + 2] = color[2];
    data[offset + 3] = color[3];
  };

  const colorsMatch = (c1: number[], c2: number[]) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
  };

  const hexToRGBA = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden cursor-crosshair border-8 border-pink-200">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="touch-none block"
      />
    </div>
  );
};

export default CanvasBoard;
