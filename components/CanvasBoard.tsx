
import React, { useRef, useState, useMemo } from 'react';

interface Path {
  d: string;
  color: string;
  size: number;
}

interface CanvasBoardProps {
  brushColor: string;
  brushSize: number;
  tool: 'brush' | 'eraser' | 'fill' | 'rect' | 'circle';
  onSave: (dataUrl: string) => void;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ brushColor, brushSize, tool, onSave }) => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
    
    const newPath: Path = {
      d: currentPath,
      color: tool === 'eraser' ? 'white' : brushColor,
      size: brushSize
    };

    setPaths(prev => [...prev, newPath]);
    setCurrentPath(null);
    
    // Al final de cada trazo, intentamos guardar una imagen para la galería
    // Usamos un timeout corto para asegurar que el DOM se haya actualizado
    setTimeout(() => {
      exportToImage();
    }, 50);
  };

  const exportToImage = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Obtenemos dimensiones reales
    const rect = svgRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        onSave(canvas.toDataURL('image/webp', 0.5));
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-pink-100 cursor-crosshair relative">
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
        className="w-full h-full touch-none select-none bg-white"
      >
        <rect width="800" height="600" fill="white" />
        
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.color}
            strokeWidth={p.size}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {currentPath && (
          <path
            d={currentPath}
            stroke={tool === 'eraser' ? 'white' : brushColor}
            strokeWidth={brushSize}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Botón rápido para limpiar el lienzo SVG */}
      <button 
        onClick={() => setPaths([])}
        className="absolute bottom-4 right-4 w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-200 active:scale-90 transition-transform"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default CanvasBoard;
