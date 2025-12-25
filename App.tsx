
import React, { useState, useEffect } from 'react';
import { ModuleId, UserProgress, Level, GalleryItem, DrawingTool } from './types';
import { WARRIORS, LEVELS, MOTIVATIONAL_QUOTES } from './constants';
import CanvasBoard from './components/CanvasBoard';
import QuizBoard from './components/QuizBoard';
import IconButton from './components/IconButton';
import { sounds } from './utils/audio';
import { syncProgress } from './supabase';

type Screen = 'splash' | 'menu' | 'levels' | 'game' | 'gallery';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedModule, setSelectedModule] = useState<ModuleId>('color');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    levelsCompleted: [],
    stars: {},
    stickers: [],
    gallery: [],
    totalPoints: 0
  });

  const [brushColor, setBrushColor] = useState('#ec4899');
  const [brushSize, setBrushSize] = useState(30);
  const [tool, setTool] = useState<DrawingTool>('brush');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuote, setCelebrationQuote] = useState("");

  const JANA_ID = 'jana_tablet_user';

  // 20 Colores vibrantes para Jana
  const PALETTE = [
    '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', 
    '#a855f7', '#d946ef', '#78350f', '#fbbf24', '#ffffff', 
    '#cbd5e1', '#64748b', '#000000', '#fecaca', '#bbf7d0'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('jana_kpop_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) setProgress(prev => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jana_kpop_v5', JSON.stringify(progress));
    syncProgress(JANA_ID, progress);
  }, [progress]);

  const completeLevel = (points: number = 100) => {
    if (!currentLevel) return;
    sounds.playCelebration();
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCelebrationQuote(String(randomQuote));
    setShowCelebration(true);

    const nextIndex = currentLevel.index + 1;
    const nextId = `${currentLevel.moduleId}_${nextIndex}`;
    const nextLevel = LEVELS.find(l => l.id === nextId);

    setProgress(prev => ({
      ...prev,
      levelsCompleted: Array.from(new Set([...prev.levelsCompleted, currentLevel.id])),
      totalPoints: prev.totalPoints + points
    }));

    setTimeout(() => {
      setShowCelebration(false);
      if (nextLevel && currentLevel.id !== 'free_draw') {
        setCurrentLevel(nextLevel);
      } else {
        setScreen('levels');
      }
    }, 2500);
  };

  const startFreeDraw = () => {
    const freeLevel: Level = {
      id: 'free_draw',
      moduleId: 'color',
      type: 'paint',
      index: 0,
      objective: "🎨 DIBUJO LIBRE",
      help: "¡Crea tu propia magia!",
      rewardId: "free"
    };
    setCurrentLevel(freeLevel);
    setScreen('game');
  };

  const saveToGallery = (dataUrl: string) => {
    const newItem = { 
      id: Date.now().toString(), 
      timestamp: Date.now(), 
      dataUrl, 
      title: String(currentLevel?.objective || 'Mi Arte K-Pop') 
    };
    setProgress(prev => ({ ...prev, gallery: [newItem, ...prev.gallery].slice(0, 40) }));
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col font-quicksand bg-pink-50">
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-purple-600 text-white p-6">
          <div className="mb-6 animate-bounce">
            <i className="fas fa-palette text-7xl md:text-9xl text-yellow-300 drop-shadow-lg"></i>
          </div>
          <h1 className="text-5xl md:text-8xl font-fredoka mb-2 text-center leading-none">K-POP<br/><span className="text-xl md:text-4xl text-pink-200">ACADEMY</span></h1>
          <p className="mb-8 font-bold opacity-80 uppercase tracking-widest text-sm md:text-base">Jana Edition ✨</p>
          <button 
            onClick={() => { sounds.playClick(); setScreen('menu'); }} 
            className="bg-white text-pink-600 px-12 py-4 md:px-16 md:py-6 rounded-full text-2xl md:text-4xl font-fredoka shadow-2xl active:scale-90 transition-all"
          >
            ¡JUGAR!
          </button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 md:gap-6 overflow-y-auto">
          <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg border-b-4 border-pink-200 sticky top-0 z-10">
             <h2 className="text-xl md:text-3xl font-fredoka text-pink-500 truncate">¡Hola Jana! ✨</h2>
             <div className="flex gap-2 md:gap-4">
                <IconButton icon="fa-paint-brush" onClick={startFreeDraw} colorClass="bg-gradient-to-r from-orange-400 to-pink-500" label="Libre" pulse />
                <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-500" label="Galería" />
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 pb-10">
            {Object.values(WARRIORS).map(w => (
              <div 
                key={w.id} 
                onClick={() => { sounds.playClick(); setSelectedModule(w.id); setScreen('levels'); }} 
                className={`p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br ${w.gradient} text-white cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-xl h-40 md:h-56 flex flex-col justify-between border-4 border-white/20`}
              >
                <i className={`fas ${w.icon} text-4xl md:text-6xl opacity-30 self-end`}></i>
                <h3 className="text-2xl md:text-4xl font-fredoka">{w.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'levels' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 md:gap-6 overflow-hidden">
          <div className="flex items-center gap-3 md:gap-4">
            <IconButton icon="fa-home" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
            <h2 className="text-lg md:text-3xl font-fredoka text-pink-500 uppercase truncate tracking-tighter">{WARRIORS[selectedModule].name}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2 md:gap-4 pb-20">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => {
              const unlocked = l.index === 1 || progress.levelsCompleted.includes(`${l.moduleId}_${l.index - 1}`);
              return (
                <button 
                  key={l.id} 
                  disabled={!unlocked} 
                  onClick={() => { sounds.playClick(); setCurrentLevel(l); setScreen('game'); }} 
                  className={`aspect-square rounded-xl md:rounded-3xl font-fredoka text-xl md:text-3xl shadow-md flex items-center justify-center transition-all ${
                    progress.levelsCompleted.includes(l.id) ? 'bg-pink-500 text-white' : 
                    unlocked ? 'bg-white text-pink-500 border-2 md:border-4 border-pink-100' : 
                    'bg-gray-200 text-gray-400 opacity-60'
                  }`}
                >
                  {unlocked ? l.index : <i className="fas fa-lock text-xs md:text-sm"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full">
          {/* Header del Juego */}
          <div className="p-2 md:p-3 bg-white flex justify-between items-center border-b-2 md:border-b-4 border-pink-100 flex-shrink-0">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('levels')} colorClass="bg-gray-400" />
            <div className="text-center flex-grow overflow-hidden px-2">
               <h3 className="text-base md:text-2xl font-black text-purple-600 truncate">{currentLevel.objective}</h3>
            </div>
            {currentLevel.type === 'paint' ? (
              <IconButton icon="fa-check" onClick={() => completeLevel()} colorClass="bg-green-500" label="¡LISTO!" pulse />
            ) : <div className="w-12 md:w-14"></div>}
          </div>

          <div className="flex-grow flex flex-col md:flex-row p-2 md:p-4 gap-2 md:gap-4 overflow-hidden bg-pink-100/10">
             {currentLevel.type === 'paint' ? (
               <>
                 <CanvasBoard 
                    brushColor={brushColor} 
                    brushSize={brushSize} 
                    tool={tool} 
                    silhouette={currentLevel.visual} 
                    levelId={currentLevel.id}
                    onSave={saveToGallery} 
                 />
                 
                 {/* Barra de Herramientas Responsiva */}
                 <div className="flex-shrink-0 bg-white rounded-2xl md:rounded-[3rem] p-3 md:p-6 shadow-2xl flex flex-col md:w-48 overflow-y-auto max-h-[35%] md:max-h-full">
                    {/* Paleta de Colores (Grid responsivo) */}
                    <div className="grid grid-cols-10 md:grid-cols-2 gap-2 mb-4">
                       {PALETTE.map(c => (
                         <div 
                           key={c} 
                           onClick={() => { setBrushColor(c); if(tool==='eraser') setTool('brush'); }} 
                           className={`w-7 h-7 md:w-12 md:h-12 rounded-full cursor-pointer border-2 md:border-4 ${brushColor===c && tool !== 'magic' ? 'border-gray-800 scale-110 shadow-lg' : 'border-gray-100'}`} 
                           style={{background: c}}
                         ></div>
                       ))}
                    </div>
                    
                    <div className="h-[2px] w-full bg-pink-50 mb-4"></div>
                    
                    {/* Botones de Herramientas (Fila en móvil, Columna en tablet) */}
                    <div className="flex md:flex-col gap-2 justify-between mb-4">
                       <IconButton icon="fa-paint-brush" onClick={() => setTool('brush')} colorClass={tool==='brush' ? 'bg-pink-500' : 'bg-gray-100 text-gray-400'} label="Pincel" />
                       <IconButton icon="fa-magic" onClick={() => setTool('magic')} colorClass={tool==='magic' ? 'bg-gradient-to-br from-red-500 via-yellow-400 to-purple-600' : 'bg-gray-100 text-gray-400'} label="Magia" />
                       <IconButton icon="fa-fill-drip" onClick={() => setTool('fill')} colorClass={tool==='fill' ? 'bg-blue-500' : 'bg-gray-100 text-gray-400'} label="Bote" />
                       <IconButton icon="fa-eraser" onClick={() => setTool('eraser')} colorClass={tool==='eraser' ? 'bg-pink-200 text-pink-500' : 'bg-gray-100 text-gray-400'} label="Goma" />
                    </div>
                    
                    <div className="h-[2px] w-full bg-pink-50 mb-4"></div>
                    
                    {/* Ajuste de Tamaño */}
                    <div className="flex md:flex-col gap-3 items-center justify-center">
                       <button 
                        onClick={() => { sounds.playClick(); setBrushSize(prev => Math.min(150, prev + 15)); }} 
                        className="w-10 h-10 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-full font-bold text-2xl md:text-5xl shadow-sm active:scale-90"
                       >+</button>
                       <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase">Grosor</span>
                       <button 
                        onClick={() => { sounds.playClick(); setBrushSize(prev => Math.max(5, prev - 15)); }} 
                        className="w-10 h-10 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-full font-bold text-2xl md:text-5xl shadow-sm active:scale-90"
                       >-</button>
                    </div>
                 </div>
               </>
             ) : (
               <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             )}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-pink-600/90 flex flex-col items-center justify-center text-white text-center p-6 md:p-8 backdrop-blur-xl animate-fade-in">
          <div className="text-[8rem] md:text-[12rem] mb-4 animate-bounce drop-shadow-2xl">🌟</div>
          <h2 className="text-5xl md:text-8xl font-fredoka tracking-tighter leading-none mb-4">¡GENIAL JANA!</h2>
          <p className="text-xl md:text-3xl font-bold bg-white/20 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-white/30 max-w-2xl">{celebrationQuote}</p>
        </div>
      )}

      {screen === 'gallery' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 md:gap-6 overflow-y-auto">
          <div className="flex items-center gap-3 md:gap-4 bg-white p-4 rounded-2xl md:rounded-3xl shadow-md sticky top-0 z-10">
             <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
             <h2 className="text-xl md:text-3xl font-fredoka text-pink-500 uppercase tracking-widest truncate">Mi Arte ✨</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-32">
            {progress.gallery.length === 0 ? (
               <div className="col-span-full text-center py-10 opacity-30 italic">No hay dibujos todavía...</div>
            ) : progress.gallery.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-2xl md:rounded-[3rem] shadow-xl border-2 md:border-4 border-pink-100 flex flex-col gap-2 transform active:scale-105 transition-transform">
                <div className="bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={item.dataUrl} className="w-full h-full object-contain" alt={item.title} />
                </div>
                <p className="text-center font-black text-pink-600 text-sm md:text-xl truncate px-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
