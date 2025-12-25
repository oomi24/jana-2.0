
import React, { useRef, useState, useEffect } from 'react';
import { DrawingTool } from '../types';
import { sounds } from '../utils/audio';

interface Path {
  d: string;
  color: string;
  size: number;
  tool: DrawingTool;
}

interface CanvasBoardProps {
  brushColor: string;
  brushSize: number;
  tool: DrawingTool;
  silhouette?: string;
  levelId: string;
  onSave: (dataUrl: string) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ brushColor, brushSize, tool, silhouette, levelId, onSave }) => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('white');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setPaths([]);
    setBgColor('white');
    setCurrentPath(null);
  }, [levelId, silhouette]);

  const getCoordinates = (e: any) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    
    // Soporte para touch y mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d
    };
  };

  const startDrawing = (e: any) => {
    if (tool === 'fill') {
      setBgColor(brushColor);
      sounds.playSuccess();
      setTimeout(() => exportToImage(), 100);
      return;
    }
    const { x, y } = getCoordinates(e);
    setCurrentPath(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
  };

  const draw = (e: any) => {
    if (currentPath === null) return;
    const { x, y } = getCoordinates(e);
    setCurrentPath(prev => `${prev} L ${x.toFixed(1)} ${y.toFixed(1)}`);
  };

  const endDrawing = () => {
    if (currentPath === null) return;
    
    const colorToUse = tool === 'eraser' 
      ? bgColor 
      : (tool === 'magic' ? 'url(#rainbowGrad)' : brushColor);

    const newPath: Path = {
      d: currentPath,
      color: colorToUse,
      size: tool === 'pencil' ? Math.max(3, brushSize / 3) : brushSize,
      tool: tool
    };

    setPaths(prev => [...prev, newPath]);
    setCurrentPath(null);
    
    setTimeout(() => exportToImage(), 100);
  };

  const exportToImage = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 800; 
    canvas.height = 600; 
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 800, 600);
        onSave(canvas.toDataURL('image/webp', 0.5));
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="w-full flex-grow bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden border-4 md:border-8 border-pink-200 cursor-crosshair relative touch-lock">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
        onTouchEnd={(e) => { e.preventDefault(); endDrawing(); }}
        className="w-full h-full touch-none select-none"
      >
        <defs>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="16%" stopColor="#FF7F00" />
            <stop offset="33%" stopColor="#FFFF00" />
            <stop offset="50%" stopColor="#00FF00" />
            <stop offset="66%" stopColor="#0000FF" />
            <stop offset="83%" stopColor="#4B0082" />
            <stop offset="100%" stopColor="#9400D3" />
          </linearGradient>
          <filter id="magicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="800" height="600" fill={bgColor} style={{ transition: 'fill 0.4s' }} />

        {silhouette && silhouette.startsWith('M') && (
          <path 
            d={silhouette} 
            fill="none" 
            stroke={bgColor === 'white' ? '#f0f0f0' : 'rgba(255,255,255,0.2)'} 
            strokeWidth="10" 
            strokeDasharray="15,15" 
          />
        )}
        
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.color}
            strokeWidth={p.size}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={p.tool === 'magic' ? 'url(#magicGlow)' : undefined}
          />
        ))}

        {currentPath && (
          <path
            d={currentPath}
            stroke={tool === 'eraser' ? bgColor : (tool === 'magic' ? 'url(#rainbowGrad)' : brushColor)}
            strokeWidth={tool === 'pencil' ? Math.max(3, brushSize / 3) : brushSize}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={tool === 'magic' ? 'url(#magicGlow)' : undefined}
          />
        )}
      </svg>

      <button 
        onClick={() => { sounds.playClick(); setPaths([]); setBgColor('white'); }}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-xl border-2 md:border-4 border-white active:scale-90 transition-transform"
      >
        <i className="fas fa-trash-alt text-xl md:text-2xl"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
