
import React, { useState, useEffect } from 'react';
import { ModuleId, UserProgress, Level, DrawingTool } from './types.ts';
import { WARRIORS, LEVELS, MOTIVATIONAL_QUOTES } from './constants.tsx';
import CanvasBoard from './components/CanvasBoard.tsx';
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

  const usePowerUp = (type: string): boolean => {
    const powerUps = progress.powerUps as any;
    if (powerUps && powerUps[type] > 0) {
      sounds.playCelebration();
      setProgress(prev => ({
        ...prev,
        powerUps: { ...prev.powerUps, [type]: powerUps[type] - 1 }
      }));
      if (type === 'autoSolve' && currentLevel) {
        setTimeout(() => completeLevel(300), 500);
      }
      return true;
    }
    sounds.playWrong();
    return false;
  };

  const completeLevel = (points: number = 100) => {
    if (!currentLevel) return;
    sounds.playCelebration();
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCelebrationQuote(String(randomQuote));
    setShowCelebration(true);

    const nextIndex = currentLevel.index + 1;
    const nextLevel = LEVELS.find(l => l.moduleId === currentLevel.moduleId && l.index === nextIndex);

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
    const freeLevel: Level = { id: 'free_draw', moduleId: 'color', type: 'paint', index: 0, objective: "🎨 ARTE LIBRE", help: "", rewardId: "free" };
    setCurrentLevel(freeLevel); setScreen('game');
  };

  const saveToGallery = (dataUrl: string) => {
    const newItem = { id: Date.now().toString(), timestamp: Date.now(), dataUrl, title: String(currentLevel?.objective || 'Mi Arte') };
    setProgress(prev => ({ ...prev, gallery: [newItem, ...prev.gallery].slice(0, 40) }));
  };

  const COLORS = ['#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#000000', '#ffffff'];

  return (
    <div className="h-full w-full overflow-hidden flex flex-col font-quicksand bg-[#fdf2f8]">
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white p-6 relative">
          <div className="mb-6 animate-bounce text-center">
            <i className="fas fa-rocket text-7xl md:text-9xl text-yellow-300 drop-shadow-2xl"></i>
            <p className="text-2xl mt-4 tracking-widest text-pink-200 uppercase font-black">Academia del Aprendizaje</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-2 text-center leading-tight uppercase tracking-tighter" style={{ fontFamily: 'Fredoka One, cursive' }}>JANA<br/>CIENTÍFICA</h1>
          <button onClick={handleStartApp} className="mt-8 bg-white text-pink-600 px-16 py-6 rounded-full text-3xl font-black shadow-2xl active:scale-95 transition-all hover:bg-pink-50">¡ENTRAR!</button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-y-auto bg-pink-50/30">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-lg border-b-4 border-pink-100 sticky top-0 z-10">
             <h2 className="text-xl md:text-2xl font-black text-pink-500 uppercase">Jana Científica ✨ <span className="text-gray-400 text-xs block font-quicksand font-bold">PTS: {progress.totalPoints}</span></h2>
             <div className="flex gap-2">
                <IconButton icon="fa-paint-brush" onClick={startFreeDraw} colorClass="bg-orange-400" label="Arte" />
                <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-400" label="Fotos" />
             </div>
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
            <h2 className="text-2xl font-black text-pink-500 uppercase" style={{ fontFamily: 'Fredoka One, cursive' }}>{String(WARRIORS[selectedModule]?.name || 'Misión')}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2 pb-20">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => {
              const unlocked = l.index === 1 || progress.levelsCompleted.includes(`${l.moduleId}_${l.index - 1}`);
              return (
                <button key={l.id} disabled={!unlocked} onClick={() => { sounds.playClick(); setCurrentLevel(l); setScreen('game'); }}
                  className={`aspect-square rounded-2xl font-black text-xl shadow-md flex items-center justify-center transition-all ${
                    progress.levelsCompleted.includes(l.id) ? 'bg-pink-500 text-white' : unlocked ? 'bg-white text-pink-500 border-4 border-pink-50' : 'bg-gray-200 text-gray-400 opacity-40'}`}>
                  {unlocked ? l.index : <i className="fas fa-lock text-xs"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full relative">
          <div className="p-2 bg-white/90 backdrop-blur-md flex justify-between items-center border-b-2 border-pink-50 z-20 flex-shrink-0">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('levels')} colorClass="bg-gray-400" />
            <div className="text-center flex-grow px-2 overflow-hidden">
               <h3 className="text-[10px] md:text-sm font-black text-purple-600 truncate uppercase tracking-widest">{String(currentLevel.objective)}</h3>
            </div>
            {currentLevel.type === 'paint' ? (
              <IconButton icon="fa-check" onClick={() => completeLevel()} colorClass="bg-green-500" label="LISTO" />
            ) : <div className="w-12 md:w-14"></div>}
          </div>

          <div className="flex-grow flex flex-col overflow-hidden relative">
             {currentLevel.moduleId === 'reading' ? (
               <ReadingBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             ) : currentLevel.moduleId === 'geo' ? (
               <GeoBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             ) : currentLevel.type === 'science-lab' ? (
               <ScienceBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={usePowerUp} />
             ) : currentLevel.type === 'lingua-flow' ? (
               <LinguaBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={usePowerUp} />
             ) : currentLevel.type === 'math-master' ? (
               <MathBoard level={currentLevel} powerUps={progress.powerUps} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} usePowerUp={usePowerUp} />
             ) : currentLevel.type === 'paint' ? (
               <div className="flex-grow flex flex-col h-full bg-white">
                  <div className="flex-grow relative overflow-hidden">
                     <CanvasBoard brushColor={brushColor} brushSize={brushSize} tool={tool} silhouette={currentLevel.visual} levelId={currentLevel.id} onSave={saveToGallery} />
                  </div>
                  <div className="bg-white border-t-4 border-pink-100 flex flex-col gap-1 p-2 flex-shrink-0">
                       <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                          {COLORS.map(c => (
                            <button key={c} onClick={() => { setBrushColor(c); setTool('brush'); sounds.playClick(); }}
                              className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-4 transition-all flex-shrink-0 ${brushColor === c && tool !== 'eraser' ? 'border-pink-500 scale-110 shadow-lg' : 'border-white shadow-sm'}`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                       </div>
                       <div className="flex justify-between items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
                          <div className="flex gap-1 md:gap-4">
                             <IconButton icon="fa-brush" onClick={() => setTool('brush')} colorClass={tool === 'brush' ? 'bg-pink-500' : 'bg-white !text-gray-400'} label="Pincel" />
                             <IconButton icon="fa-magic" onClick={() => setTool('magic')} colorClass={tool === 'magic' ? 'bg-purple-500' : 'bg-white !text-gray-400'} label="Magia" />
                             <IconButton icon="fa-fill-drip" onClick={() => setTool('fill')} colorClass={tool === 'fill' ? 'bg-orange-500' : 'bg-white !text-gray-400'} label="Balde" />
                             <IconButton icon="fa-eraser" onClick={() => setTool('eraser')} colorClass={tool === 'eraser' ? 'bg-blue-400' : 'bg-white !text-gray-400'} label="Goma" />
                          </div>
                          <div className="flex flex-col items-center gap-1 px-2">
                             <input type="range" min="10" max="100" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-20 md:w-32 accent-pink-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Grosor</span>
                          </div>
                       </div>
                  </div>
               </div>
             ) : (
               <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
             )}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-purple-600/95 flex flex-col items-center justify-center text-white text-center p-6 backdrop-blur-xl">
          <div className="text-[10rem] mb-4 animate-bounce">🏆</div>
          <h2 className="text-5xl md:text-7xl font-black mb-2 uppercase" style={{ fontFamily: 'Fredoka One, cursive' }}>¡Brillante Jana!</h2>
          <p className="text-xl md:text-2xl font-bold bg-white/10 p-8 rounded-[3rem] border-4 border-white/20 max-w-2xl">{celebrationQuote}</p>
        </div>
      )}

      {screen === 'gallery' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-y-auto bg-purple-50">
          <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20">
            {progress.gallery.map(item => (
              <div key={item.id} className="bg-white p-2 rounded-2xl shadow-xl border-4 border-pink-100 flex flex-col gap-2">
                <img src={item.dataUrl} className="rounded-xl w-full aspect-square object-contain" />
                <p className="text-center font-bold text-xs text-pink-500 truncate">{String(item.title)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
