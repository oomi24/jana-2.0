
import React, { useState, useEffect } from 'react';
import { ModuleId, UserProgress, Level, DrawingTool, BrushShape } from './types.ts';
import { WARRIORS, LEVELS, MOTIVATIONAL_QUOTES } from './constants.tsx';
import CanvasBoard from './components/CanvasBoard.tsx';
import ArtTechniqueBoard from './components/ArtTechniqueBoard.tsx';
import QuizBoard from './components/QuizBoard.tsx';
import MathBoard from './components/MathBoard.tsx';
import LinguaBoard from './components/LinguaBoard.tsx';
import ScienceBoard from './components/ScienceBoard.tsx';
import GeoBoard from './components/GeoBoard.tsx';
import ReadingBoard from './components/ReadingBoard.tsx';
import IconButton from './components/IconButton.tsx';
import { sounds } from './utils/audio.ts';
import { syncProgress } from './supabase.ts';

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
    totalPoints: 0,
    powerUps: { 
      doubleXP: 5, hint: 5, extraTime: 5, autoSolve: 2, 
      nativeEar: 10, contextVision: 10,
      darwinLens: 10, timeWarp: 10 
    }
  });

  const [brushColor, setBrushColor] = useState('#ec4899');
  const [brushSize, setBrushSize] = useState(30);
  const [brushShape, setBrushShape] = useState<BrushShape>('round');
  const [tool, setTool] = useState<DrawingTool>('brush');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuote, setCelebrationQuote] = useState("");

  const JANA_ID = 'jana_tablet_user_v10';

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jana_kpop_v10');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) setProgress(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) { console.warn(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('jana_kpop_v10', JSON.stringify(progress));
      syncProgress(JANA_ID, progress);
    } catch (e) {}
  }, [progress]);

  const handleStartApp = () => {
    setScreen('menu');
    sounds.unlockAudio().then(() => sounds.playClick()).catch(() => {});
  };

  const completeLevel = (points: number = 100) => {
    if (!currentLevel) return;
    sounds.playCelebration();
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCelebrationQuote(String(randomQuote));
    setShowCelebration(true);

    setProgress(prev => ({
      ...prev,
      levelsCompleted: Array.from(new Set([...prev.levelsCompleted, currentLevel.id])),
      totalPoints: prev.totalPoints + points
    }));

    setTimeout(() => {
      setShowCelebration(false);
      setScreen('levels');
    }, 2500);
  };

  const saveToGallery = (dataUrl: string) => {
    const newItem = { id: Date.now().toString(), timestamp: Date.now(), dataUrl, title: String(currentLevel?.objective || 'Mi Arte') };
    setProgress(prev => ({ ...prev, gallery: [newItem, ...prev.gallery].slice(0, 40) }));
  };

  const handleUsePowerUp = (type: string) => {
    if (progress.powerUps[type] > 0) {
      setProgress(prev => ({
        ...prev,
        powerUps: { ...prev.powerUps, [type]: prev.powerUps[type] - 1 }
      }));
      return true;
    }
    return false;
  };

  const COLORS = ['#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#000000', '#ffffff'];

  return (
    <div className="h-full w-full overflow-hidden flex flex-col font-quicksand bg-[#fdf2f8]">
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white p-6 relative">
          <div className="mb-6 animate-bounce text-center">
            <i className="fas fa-star text-7xl md:text-9xl text-yellow-300 drop-shadow-2xl"></i>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-2 text-center uppercase leading-tight" style={{ fontFamily: 'Fredoka One, cursive' }}>K-POP<br/>WARRIORS</h1>
          <p className="text-xl md:text-2xl mb-8 font-bold opacity-80 uppercase tracking-widest text-pink-200">Paint & Learn: Academia de Jana</p>
          <button onClick={handleStartApp} className="mt-8 bg-white text-pink-600 px-16 py-6 rounded-full text-3xl font-black shadow-2xl active:scale-95 transition-all">¡ENTRAR!</button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-lg border-b-4 border-pink-100 mb-2">
             <h2 className="text-xl font-black text-pink-500 uppercase">Elige tu Misión</h2>
             <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-400" label="Galería" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            {Object.values(WARRIORS).map(w => (
              <div key={w.id} onClick={() => { sounds.playClick(); setSelectedModule(w.id); setScreen('levels'); }} 
                className={`p-6 rounded-[2.5rem] bg-gradient-to-br ${w.gradient} text-white cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-xl h-44 flex flex-col justify-between border-4 border-white/20 relative overflow-hidden group`}>
                <i className={`fas ${w.icon} text-6xl absolute -bottom-2 -right-2 opacity-10 group-hover:scale-110 transition-transform`}></i>
                <h3 className="text-3xl font-black uppercase tracking-tighter relative z-10" style={{ fontFamily: 'Fredoka One, cursive' }}>{String(w.name)}</h3>
                <span className="text-xs font-bold opacity-80 uppercase tracking-widest relative z-10">{String(w.subject)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'levels' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-3">
            <IconButton icon="fa-home" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
            <h2 className="text-2xl font-black text-pink-500 uppercase" style={{ fontFamily: 'Fredoka One, cursive' }}>{String(WARRIORS[selectedModule]?.name)}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-5 md:grid-cols-10 gap-2 pb-20">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => (
              <button key={l.id} onClick={() => { sounds.playClick(); setCurrentLevel(l); setScreen('game'); }}
                className={`aspect-square rounded-2xl font-black text-xl shadow-md flex items-center justify-center transition-all ${
                  progress.levelsCompleted.includes(l.id) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-4 border-pink-50'}`}>
                {l.index}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full relative">
          <div className="p-2 bg-white/90 flex justify-between items-center border-b-2 border-pink-50 z-20">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('levels')} colorClass="bg-gray-400" />
            <h3 className="font-black text-purple-600 uppercase truncate px-4">{String(currentLevel.objective)}</h3>
            {currentLevel.type === 'paint' ? (
              <IconButton icon="fa-check" onClick={() => completeLevel()} colorClass="bg-green-500" label="OK" />
            ) : <div className="w-12"></div>}
          </div>

          <div className="flex-grow flex flex-col overflow-hidden relative">
             {currentLevel.type === 'paint' ? (
               <div className="flex-grow flex flex-col h-full bg-white">
                  <CanvasBoard brushColor={brushColor} brushSize={brushSize} brushShape={brushShape} tool={tool} silhouette={currentLevel.visual} levelId={currentLevel.id} onSave={saveToGallery} />
                  <div className="bg-white border-t-4 border-pink-100 flex flex-col gap-2 p-3 flex-shrink-0">
                       <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                          {COLORS.map(c => (
                            <button key={c} onClick={() => setBrushColor(c)}
                              className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-4 transition-all flex-shrink-0 ${brushColor === c ? 'border-pink-500 scale-110 shadow-lg' : 'border-white shadow-sm'}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                       </div>
                       
                       <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-inner">
                          {/* Herramientas Principales */}
                          <div className="flex gap-2 md:gap-3">
                             <IconButton icon="fa-brush" onClick={() => setTool('brush')} colorClass={tool === 'brush' ? 'bg-pink-500' : 'bg-white !text-gray-400'} label="Pincel" />
                             <IconButton icon="fa-magic" onClick={() => setTool('magic')} colorClass={tool === 'magic' ? 'bg-purple-500' : 'bg-white !text-gray-400'} label="Magia" />
                             <IconButton icon="fa-eraser" onClick={() => setTool('eraser')} colorClass={tool === 'eraser' ? 'bg-blue-400' : 'bg-white !text-gray-400'} label="Goma" />
                          </div>

                          {/* Forma de Pincel */}
                          <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-pink-50">
                             <button onClick={() => setBrushShape('round')} className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg transition-all ${brushShape === 'round' ? 'bg-pink-100 text-pink-600' : 'text-gray-300'}`}>
                                <i className="fas fa-circle text-lg"></i>
                             </button>
                             <button onClick={() => setBrushShape('square')} className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg transition-all ${brushShape === 'square' ? 'bg-pink-100 text-pink-600' : 'text-gray-300'}`}>
                                <i className="fas fa-square text-lg"></i>
                             </button>
                          </div>

                          {/* Tamaños Rápidos */}
                          <div className="flex gap-2">
                             <button onClick={() => setBrushSize(8)} className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-black text-[10px] md:text-xs transition-all border ${brushSize <= 12 ? 'bg-pink-500 text-white border-pink-600 shadow-md' : 'bg-white text-gray-400 border-gray-200'}`}>
                                FINO
                             </button>
                             <button onClick={() => setBrushSize(35)} className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-black text-[10px] md:text-xs transition-all border ${brushSize > 12 && brushSize <= 50 ? 'bg-pink-500 text-white border-pink-600 shadow-md' : 'bg-white text-gray-400 border-gray-200'}`}>
                                MEDIO
                             </button>
                             <button onClick={() => setBrushSize(85)} className={`px-3 py-1 md:px-4 md:py-2 rounded-lg font-black text-[10px] md:text-xs transition-all border ${brushSize > 50 ? 'bg-pink-500 text-white border-pink-600 shadow-md' : 'bg-white text-gray-400 border-gray-200'}`}>
                                GRUESO
                             </button>
                          </div>

                          {/* Slider de precisión */}
                          <div className="flex items-center gap-2">
                             <i className="fas fa-arrows-alt-h text-gray-400 text-xs"></i>
                             <input type="range" min="4" max="150" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-24 md:w-40 accent-pink-500" title="Tamaño libre" />
                          </div>
                       </div>
                  </div>
               </div>
             ) : currentLevel.type === 'art-technique' ? (
                <ArtTechniqueBoard level={currentLevel} brushColor={brushColor} brushSize={brushSize} tool={tool} onComplete={completeLevel} onSave={saveToGallery} />
             ) : currentLevel.moduleId === 'geo' ? (
               <GeoBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             ) : currentLevel.moduleId === 'math' ? (
               <MathBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={handleUsePowerUp} />
             ) : currentLevel.moduleId === 'english' ? (
               <LinguaBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={handleUsePowerUp} />
             ) : currentLevel.moduleId === 'science' ? (
               <ScienceBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={handleUsePowerUp} />
             ) : currentLevel.moduleId === 'reading' ? (
               <ReadingBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             ) : <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-purple-600/95 flex flex-col items-center justify-center text-white text-center p-6 backdrop-blur-xl">
          <div className="text-[10rem] mb-4 animate-bounce">🏆</div>
          <h2 className="text-5xl font-black mb-2 uppercase" style={{ fontFamily: 'Fredoka One, cursive' }}>¡LO LOGRASTE!</h2>
          <p className="text-xl font-bold">{celebrationQuote}</p>
        </div>
      )}

      {screen === 'gallery' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-y-auto bg-purple-50">
          <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
          <h2 className="text-2xl font-black text-purple-600 uppercase">Mi Galería de Arte</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20">
            {progress.gallery.map(item => (
              <div key={item.id} className="bg-white p-2 rounded-2xl shadow-xl border-4 border-pink-100 transition-transform hover:rotate-1">
                <img src={item.dataUrl} className="rounded-xl w-full aspect-square object-contain" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
