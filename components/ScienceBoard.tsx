
import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';
import IconButton from './IconButton';

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
  const [isTimeWarped, setIsTimeWarped] = useState(false);
  const [revealedByLens, setRevealedByLens] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFoundItems([]);
    setDiscoveryDetail(null);
    setLockOnProgress(null);
    setIsTimeWarped(false);
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
          setLockOnProgress(prev => prev ? { ...prev, progress: prev.progress + 20 } : null);
          if (Math.random() > 0.8) sounds.playPencil();
        }, 50);
        return () => clearTimeout(timer);
      } else {
        checkDiscovery(nearbyItem);
        setLockOnProgress(null);
      }
    } else {
      setLockOnProgress(null);
    }
  }, [scanPos, isScanning, foundItems, lockOnProgress, discoveryDetail, level]);

  const handleScanMove = (e: any) => {
    if (!containerRef.current || discoveryDetail) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX === undefined || clientY === undefined) return;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setScanPos({ x, y });
  };

  const checkDiscovery = (item: any) => {
    if (!foundItems.includes(item.id)) {
      sounds.playSuccess();
      setDiscoveryDetail(item);
    }
  };

  const archiveDiscovery = () => {
    if (discoveryDetail) {
      const newFound = [...foundItems, discoveryDetail.id];
      setFoundItems(newFound);
      setDiscoveryDetail(null);
      sounds.playClick();

      const totalToFind = level.scientificData?.hiddenItems.length || 0;
      if (newFound.length >= totalToFind) {
        onCorrect(500);
      }
    }
  };

  const handlePowerUp = (type: string) => {
    if (usePowerUp(type)) {
      if (type === 'darwinLens') {
        const allIds = level.scientificData?.hiddenItems.map(h => h.id) || [];
        setRevealedByLens(allIds);
      }
      if (type === 'timeWarp') {
        setIsTimeWarped(true);
        setTimeout(() => setIsTimeWarped(false), 5000);
      }
    }
  };

  const getBiomeStyle = () => {
    switch(level.scenario) {
      case 'caves': return 'from-slate-900 via-emerald-950 to-slate-900';
      case 'forest': return 'from-green-950 via-emerald-900 to-green-950';
      case 'lab': return 'from-blue-950 via-indigo-900 to-blue-950';
      default: return 'from-slate-900 to-black';
    }
  };

  return (
    <div className={`w-full h-full flex flex-col md:flex-row p-2 md:p-6 transition-all duration-1000 bg-gradient-to-br ${getBiomeStyle()} relative overflow-hidden font-quicksand`}>
      
      {/* HUD de Bitácora Vertical */}
      <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 mb-2 md:mb-0 md:mr-6 z-20">
        <div className="bg-black/70 backdrop-blur-2xl p-5 rounded-[2.5rem] border-2 border-white/10 flex-grow md:flex-grow-0 shadow-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Bio-Base Jana</h4>
            <div className="text-white font-fredoka text-sm bg-emerald-600 px-3 py-0.5 rounded-full">{foundItems.length}/{level.scientificData?.hiddenItems.length}</div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-3">
            {level.scientificData?.hiddenItems.map((item: any) => {
              const isFound = foundItems.includes(item.id);
              return (
                <div key={item.id} className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-500 ${isFound ? 'bg-emerald-500 border-white shadow-lg scale-100' : 'bg-white/5 border-white/5 opacity-20 scale-90'}`}>
                  <i className={`fas ${item.icon} text-lg text-white mb-1`}></i>
                  {isFound && <span className="text-[7px] font-black text-white/80 uppercase">{item.symbol || '?'}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visor de Ecosistema */}
      <div 
        ref={containerRef}
        onMouseMove={handleScanMove}
        onTouchMove={handleScanMove}
        onMouseDown={() => setIsScanning(true)}
        onMouseUp={() => setIsScanning(false)}
        onTouchStart={() => setIsScanning(true)}
        onTouchEnd={() => setIsScanning(false)}
        className="flex-grow relative cursor-none select-none rounded-[3rem] md:rounded-[5rem] border-8 border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden bg-black/40 group"
      >
        {/* Grilla de radar */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        {/* Objetivos Científicos */}
        {level.scientificData?.hiddenItems.map((item: any) => {
          const isFound = foundItems.includes(item.id);
          const isLensRevealed = revealedByLens.includes(item.id);
          const dx = scanPos.x - item.x;
          const dy = scanPos.y - item.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const isBeingLocked = isScanning && dist < 14 && !isFound;
          const isVisible = isFound || isLensRevealed || (isScanning && dist < 22);

          return (
            <div 
              key={item.id}
              className={`absolute transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
              `}
              style={{ left: `${item.x}%`, top: `${item.y}%`, zIndex: isFound ? 10 : 20 }}
            >
               <div className={`relative p-6 md:p-12 rounded-full border-4 shadow-2xl transition-all duration-500
                 ${isFound ? 'bg-emerald-500 border-white rotate-6' : 'bg-white/5 border-white/10'}
                 ${isBeingLocked ? 'ring-[15px] ring-emerald-400/40 scale-110' : ''}
               `}>
                  <i className={`fas ${item.icon} text-4xl md:text-8xl text-white`}></i>
                  
                  {isBeingLocked && lockOnProgress?.id === item.id && (
                    <svg className="absolute inset-0 -rotate-90 w-full h-full p-1 scale-110">
                      <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#34d399" strokeWidth="10" strokeDasharray="283" strokeDashoffset={283 - (283 * lockOnProgress.progress) / 100} strokeLinecap="round" className="transition-all duration-100" />
                    </svg>
                  )}
               </div>
               {isFound && (
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="bg-white text-emerald-800 px-5 py-1.5 rounded-full font-black text-xs whitespace-nowrap shadow-2xl uppercase border-2 border-emerald-50 animate-pop-in">
                       {item.label}
                    </div>
                    <div className="bg-emerald-900 text-white text-[9px] px-3 py-0.5 rounded-full mt-1 font-bold">{item.symbol}</div>
                 </div>
               )}
            </div>
          );
        })}

        {/* Lente del Escáner High-Tech */}
        <div className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-50 ${isScanning ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} style={{ left: `${scanPos.x}%`, top: `${scanPos.y}%` }}>
           <div className="w-48 h-48 md:w-80 md:h-80 rounded-full border-4 border-emerald-400/20 shadow-[0_0_100px_rgba(52,211,153,0.2)] flex items-center justify-center bg-emerald-400/5 backdrop-blur-[4px]">
              <div className="absolute inset-4 border-2 border-dashed border-emerald-400/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 border-t-4 border-emerald-400 rounded-full animate-spin"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]"></div>
           </div>
        </div>
      </div>

      {/* Modal de Ficha Científica Enriquecida */}
      {discoveryDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-fade-in">
           <div className="bg-white rounded-[4rem] shadow-2xl border-[16px] border-emerald-500 p-8 md:p-16 max-w-2xl w-full text-center animate-pop-in">
              <div className="flex justify-center gap-6 mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-emerald-500 rounded-full flex items-center justify-center border-8 border-white shadow-2xl animate-bounce-slow">
                   <i className={`fas ${discoveryDetail.icon} text-6xl md:text-8xl text-white`}></i>
                </div>
                <div className="flex flex-col justify-center text-left">
                   <span className="text-emerald-500 font-black text-5xl md:text-7xl leading-none">{discoveryDetail.symbol}</span>
                   <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Identificador</span>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-fredoka text-gray-800 mb-4 uppercase leading-none">{discoveryDetail.label}</h2>
              
              <div className="bg-emerald-50 p-6 md:p-8 rounded-[3rem] border-2 border-emerald-100 text-left mb-10 shadow-inner">
                <p className="text-gray-700 text-xl md:text-2xl font-medium leading-relaxed italic">
                  "{discoveryDetail.desc}"
                </p>
              </div>

              <button 
                onClick={archiveDiscovery} 
                className="w-full bg-emerald-500 text-white py-8 rounded-[2.5rem] font-fredoka text-3xl md:text-4xl shadow-[0_15px_0_#065f46] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4"
              >
                ARCHIVAR EN BITÁCORA <i className="fas fa-microscope"></i>
              </button>
           </div>
        </div>
      )}

      {/* Power-ups Flotantes */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-40">
        <button onClick={() => handlePowerUp('darwinLens')} className="w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center text-white active:scale-90 transition-all relative group overflow-hidden">
           <i className="fas fa-search-plus text-2xl md:text-3xl z-10"></i>
           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
           <span className="absolute -top-3 -right-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">{powerUps.darwinLens}</span>
        </button>
        <button onClick={() => handlePowerUp('timeWarp')} className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center text-white active:scale-90 transition-all relative group overflow-hidden">
           <i className="fas fa-history text-2xl md:text-3xl z-10"></i>
           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
           <span className="absolute -top-3 -right-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">{powerUps.timeWarp}</span>
        </button>
      </div>
    </div>
  );
};

export default ScienceBoard;
