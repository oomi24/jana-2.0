
import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types.ts';
import { sounds } from '../utils/audio.ts';

interface ScienceBoardProps {
  level: Level;
  powerUps: any;
  onCorrect: (points: number) => void;
  onWrong: () => void;
  usePowerUp: (type: string) => boolean;
}

const ScienceBoard: React.FC<ScienceBoardProps> = ({ level, powerUps, onCorrect, onWrong, usePowerUp }) => {
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPos, setScanPos] = useState({ x: 50, y: 50 });
  const [discoveryDetail, setDiscoveryDetail] = useState<any | null>(null);
  const [lockOnProgress, setLockOnProgress] = useState<{id: string, progress: number} | null>(null);
  const [revealedByLens, setRevealedByLens] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFoundItems([]);
    setDiscoveryDetail(null);
    setLockOnProgress(null);
    setRevealedByLens([]);
  }, [level.id]);

  useEffect(() => {
    if (!isScanning || discoveryDetail) {
      setLockOnProgress(null);
      return;
    }

    const nearbyItem = level.scientificData?.hiddenItems.find(item => {
      const dx = scanPos.x - item.x;
      const dy = scanPos.y - item.y;
      return Math.sqrt(dx * dx + dy * dy) < 14; 
    });

    if (nearbyItem && !foundItems.includes(nearbyItem.id)) {
      if (lockOnProgress?.id !== nearbyItem.id) {
        setLockOnProgress({ id: nearbyItem.id, progress: 0 });
      } else if (lockOnProgress.progress < 100) {
        const timer = window.setTimeout(() => {
          setLockOnProgress(prev => prev ? { ...prev, progress: prev.progress + 25 } : null);
        }, 60);
        return () => clearTimeout(timer);
      } else {
        checkDiscovery(nearbyItem);
        setLockOnProgress(null);
      }
    } else {
      setLockOnProgress(null);
    }
  }, [scanPos, isScanning, foundItems, lockOnProgress, discoveryDetail, level]);

  const updateCoordinates = (e: any) => {
    if (!containerRef.current || discoveryDetail) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX; clientY = e.clientY;
    }
    if (clientX === undefined || clientY === undefined) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setScanPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const checkDiscovery = (item: any) => {
    if (!foundItems.includes(item.id)) {
      sounds.playSuccess();
      setDiscoveryDetail(item);
      setIsScanning(false);
    }
  };

  const archiveDiscovery = () => {
    if (discoveryDetail) {
      const newFound = [...foundItems, discoveryDetail.id];
      setFoundItems(newFound);
      setDiscoveryDetail(null);
      sounds.playClick();
      const totalToFind = level.scientificData?.hiddenItems.length || 0;
      if (newFound.length >= totalToFind) onCorrect(400);
    }
  };

  const handlePowerUp = (type: string) => {
    if (usePowerUp(type) && type === 'darwinLens') {
      const allIds = level.scientificData?.hiddenItems.map(h => h.id) || [];
      setRevealedByLens(allIds);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row p-2 md:p-6 bg-slate-950 relative overflow-hidden font-quicksand touch-none">
      <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 mb-2 md:mb-0 md:mr-6 z-20 shrink-0">
        <div className="bg-black/60 backdrop-blur-xl p-3 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-emerald-500/20 flex-grow md:flex-grow-0">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <h4 className="text-[8px] md:text-xs font-black text-emerald-400 uppercase tracking-widest">EXPEDICIÓN JANA</h4>
            <div className="text-white font-fredoka text-[10px] md:text-xl bg-emerald-600 px-3 py-1 rounded-full shadow-lg">{foundItems.length}/{level.scientificData?.hiddenItems.length}</div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
            {level.scientificData?.hiddenItems.map((item: any) => (
              <div key={item.id} className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-500 ${foundItems.includes(item.id) ? 'bg-emerald-500 border-white scale-100 shadow-xl' : 'bg-white/5 border-white/5 opacity-20 scale-90'}`}>
                <i className={`fas ${String(item.icon)} text-base md:text-2xl text-white`}></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={containerRef} onMouseMove={updateCoordinates} onTouchMove={(e) => { e.preventDefault(); updateCoordinates(e); }} onMouseDown={() => setIsScanning(true)} onMouseUp={() => setIsScanning(false)} onTouchStart={(e) => { e.preventDefault(); setIsScanning(true); updateCoordinates(e); }} onTouchEnd={() => setIsScanning(false)} className="flex-grow relative cursor-none select-none rounded-[2rem] md:rounded-[4rem] border-2 md:border-8 border-white/5 shadow-2xl overflow-hidden bg-emerald-950/20">
        {level.scientificData?.hiddenItems.map((item: any) => {
          const isFound = foundItems.includes(item.id);
          const isVisible = isFound || revealedByLens.includes(item.id) || (isScanning && Math.sqrt(Math.pow(scanPos.x - item.x, 2) + Math.pow(scanPos.y - item.y, 2)) < 18);
          return (
            <div key={item.id} className={`absolute transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`} style={{ left: `${item.x}%`, top: `${item.y}%`, zIndex: isFound ? 10 : 20 }}>
               <div className={`relative p-4 md:p-10 rounded-full border-2 md:border-4 shadow-2xl ${isFound ? 'bg-emerald-500 border-white' : 'bg-white/10 border-white/10'}`}>
                  <i className={`fas ${String(item.icon)} text-xl md:text-6xl text-white`}></i>
                  {isScanning && !isFound && lockOnProgress?.id === item.id && (
                    <svg className="absolute inset-0 -rotate-90 w-full h-full p-0.5 scale-110">
                      <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#34d399" strokeWidth="6" strokeDasharray="300" strokeDashoffset={300 - (300 * lockOnProgress.progress) / 100} className="transition-all duration-100" />
                    </svg>
                  )}
               </div>
               {isFound && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-emerald-800 px-2 py-0.5 rounded-full font-black text-[8px] md:text-xs whitespace-nowrap border border-emerald-100 uppercase">{String(item.label)}</div>}
            </div>
          );
        })}

        <div className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-50 ${isScanning ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} style={{ left: `${scanPos.x}%`, top: `${scanPos.y}%` }}>
           <div className="w-24 h-24 md:w-56 md:h-56 rounded-full border-2 border-emerald-400/30 flex items-center justify-center bg-emerald-400/5 backdrop-blur-[1px]">
              <div className="absolute inset-0 border-t-2 border-emerald-400 rounded-full animate-spin"></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
           </div>
        </div>
      </div>

      {discoveryDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl">
           <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-[8px] md:border-[16px] border-emerald-500 p-6 md:p-12 max-w-xl w-full text-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-8 border-4 border-emerald-200">
                 <i className={`fas ${String(discoveryDetail.icon)} text-3xl md:text-6xl text-emerald-600`}></i>
              </div>
              <h2 className="text-2xl md:text-5xl font-fredoka text-gray-800 mb-2 md:mb-4 uppercase">{String(discoveryDetail.label)}</h2>
              <div className="bg-emerald-50 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-emerald-100 text-left mb-6 md:mb-10">
                <p className="text-gray-700 text-xs md:text-xl font-medium leading-relaxed italic">"{String(discoveryDetail.desc)}"</p>
              </div>
              <button onClick={archiveDiscovery} className="w-full bg-emerald-500 text-white py-4 md:py-8 rounded-2xl md:rounded-[2rem] font-fredoka text-lg md:text-3xl shadow-xl active:translate-y-1 transition-all">ARCHIVAR HALLAZGO</button>
           </div>
        </div>
      )}

      <button onClick={() => handlePowerUp('darwinLens')} className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-12 h-12 md:w-20 md:h-20 bg-yellow-400 rounded-2xl md:rounded-[2.5rem] shadow-2xl border-4 border-white flex items-center justify-center text-white active:scale-90 transition-all z-40">
         <i className="fas fa-search-plus text-xl md:text-4xl"></i>
         <span className="absolute -top-1 -right-1 bg-emerald-800 text-white text-[10px] md:text-sm font-black px-2 py-0.5 rounded-full border-2 border-white">{String(powerUps.darwinLens)}</span>
      </button>
    </div>
  );
};

export default ScienceBoard;
