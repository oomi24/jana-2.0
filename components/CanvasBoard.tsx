
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

  // LIMPIEZA AUTOMÁTICA al cambiar de nivel
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
      sounds.playSuccess(); // Sonido de magia al llenar
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
    const rect = svgRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        onSave(canvas.toDataURL('image/webp', 0.5));
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="w-full h-full bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden border-8 border-pink-200 cursor-crosshair relative">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
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

        {/* Rectángulo de fondo real para el bote de pintura */}
        <rect width="800" height="600" fill={bgColor} style={{ transition: 'fill 0.4s' }} />

        {/* Silueta de guía punteada */}
        {silhouette && silhouette.startsWith('M') && (
          <path 
            d={silhouette} 
            fill="none" 
            stroke={bgColor === 'white' ? '#f0f0f0' : 'rgba(255,255,255,0.3)'} 
            strokeWidth="8" 
            strokeDasharray="15,15" 
            className="animate-pulse"
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
        className="absolute bottom-8 right-8 w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white active:scale-90 transition-transform"
        title="Limpiar dibujo"
      >
        <i className="fas fa-trash-alt text-2xl"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
