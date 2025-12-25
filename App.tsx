
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
      if (nextLevel) {
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
    setProgress(prev => ({ ...prev, gallery: [newItem, ...prev.gallery].slice(0, 30) }));
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col font-quicksand bg-pink-50">
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-purple-600 text-white p-6">
          <div className="mb-8 animate-bounce">
            <i className="fas fa-magic text-8xl text-yellow-300 drop-shadow-lg"></i>
          </div>
          <h1 className="text-6xl md:text-8xl font-fredoka mb-4 text-center leading-none">K-POP<br/><span className="text-2xl md:text-4xl text-pink-200">ACADEMY</span></h1>
          <button 
            onClick={() => { sounds.playClick(); setScreen('menu'); }} 
            className="bg-white text-pink-600 px-16 py-6 rounded-full text-4xl font-fredoka shadow-2xl active:scale-90 transition-all hover:scale-105"
          >
            ¡JUGAR!
          </button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto">
          <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-lg border-b-4 border-pink-200 sticky top-0 z-10">
             <h2 className="text-3xl font-fredoka text-pink-500">¡Hola Jana! ✨</h2>
             <div className="flex gap-4">
                <IconButton icon="fa-paint-brush" onClick={startFreeDraw} colorClass="bg-gradient-to-r from-orange-400 to-pink-500" label="Libre" pulse />
                <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-500" label="Galería" />
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.values(WARRIORS).map(w => (
              <div 
                key={w.id} 
                onClick={() => { sounds.playClick(); setSelectedModule(w.id); setScreen('levels'); }} 
                className={`p-8 rounded-[3rem] bg-gradient-to-br ${w.gradient} text-white cursor-pointer hover:scale-[1.03] transition-all shadow-xl h-56 flex flex-col justify-between border-4 border-white/20`}
              >
                <i className={`fas ${w.icon} text-6xl opacity-30 self-end`}></i>
                <h3 className="text-4xl font-fredoka">{w.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'levels' && (
        <div className="p-6 flex-grow flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center gap-4">
            <IconButton icon="fa-home" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
            <h2 className="text-3xl font-fredoka text-pink-500 uppercase">{WARRIORS[selectedModule].name}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4 pb-24">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => {
              const unlocked = l.index === 1 || progress.levelsCompleted.includes(`${l.moduleId}_${l.index - 1}`);
              return (
                <button 
                  key={l.id} 
                  disabled={!unlocked} 
                  onClick={() => { sounds.playClick(); setCurrentLevel(l); setScreen('game'); }} 
                  className={`aspect-square rounded-3xl font-fredoka text-3xl shadow-lg flex items-center justify-center transition-all ${
                    progress.levelsCompleted.includes(l.id) ? 'bg-pink-500 text-white' : 
                    unlocked ? 'bg-white text-pink-500 border-4 border-pink-100' : 
                    'bg-gray-200 text-gray-400 opacity-60'
                  }`}
                >
                  {unlocked ? l.index : <i className="fas fa-lock text-sm"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full">
          <div className="p-3 bg-white flex justify-between items-center border-b-4 border-pink-100">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('levels')} colorClass="bg-gray-400" />
            <div className="text-center flex-grow">
               <h3 className="text-2xl font-black text-purple-600 truncate px-4">{currentLevel.objective}</h3>
            </div>
            {currentLevel.type === 'paint' ? (
              <IconButton icon="fa-check" onClick={() => completeLevel()} colorClass="bg-green-500" label="¡LISTO!" pulse />
            ) : <div className="w-14"></div>}
          </div>

          <div className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden bg-pink-100/20">
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
                 <div className="flex-shrink-0 bg-white rounded-[3rem] p-6 shadow-2xl flex md:flex-col gap-6 items-center justify-center border-4 border-pink-100 overflow-x-auto md:w-48">
                    <div className="grid grid-cols-6 md:grid-cols-2 gap-3">
                       {['#ec4899', '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#000000', '#ffffff', '#8b5cf6'].map(c => (
                         <div 
                           key={c} 
                           onClick={() => { setBrushColor(c); if(tool==='eraser') setTool('brush'); }} 
                           className={`w-12 h-12 rounded-full cursor-pointer border-4 ${brushColor===c && tool !== 'magic' ? 'border-gray-800 scale-110 shadow-lg' : 'border-gray-100'}`} 
                           style={{background: c}}
                         ></div>
                       ))}
                    </div>
                    
                    <div className="h-[2px] w-full bg-pink-50 hidden md:block"></div>
                    
                    <div className="flex md:flex-col gap-3">
                       <IconButton icon="fa-paint-brush" onClick={() => setTool('brush')} colorClass={tool==='brush' ? 'bg-pink-500' : 'bg-gray-100 text-gray-400'} label="Pincel" />
                       <IconButton icon="fa-magic" onClick={() => setTool('magic')} colorClass={tool==='magic' ? 'bg-gradient-to-br from-red-500 via-yellow-400 to-purple-600' : 'bg-gray-100 text-gray-400'} label="Arcoiris" />
                       <IconButton icon="fa-fill-drip" onClick={() => setTool('fill')} colorClass={tool==='fill' ? 'bg-blue-500' : 'bg-gray-100 text-gray-400'} label="Bote" />
                       <IconButton icon="fa-eraser" onClick={() => setTool('eraser')} colorClass={tool==='eraser' ? 'bg-pink-200 text-pink-500' : 'bg-gray-100 text-gray-400'} label="Goma" />
                    </div>
                    
                    <div className="h-[2px] w-full bg-pink-50 hidden md:block"></div>
                    
                    <div className="flex md:flex-col gap-4 items-center">
                       <button 
                        onClick={() => setBrushSize(prev => Math.min(150, prev + 15))} 
                        className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full font-bold text-5xl shadow-md active:scale-90"
                       >+</button>
                       <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Tamaño</div>
                       <button 
                        onClick={() => setBrushSize(prev => Math.max(5, prev - 15))} 
                        className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full font-bold text-5xl shadow-md active:scale-90"
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
        <div className="fixed inset-0 z-[100] bg-pink-600/90 flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-xl animate-fade-in">
          <div className="text-[12rem] mb-6 animate-bounce drop-shadow-2xl">🌟</div>
          <h2 className="text-8xl font-fredoka tracking-tighter">¡BRILANTE JANA!</h2>
          <p className="text-3xl font-bold bg-white/20 p-10 rounded-[3rem] border-4 border-white/30 max-w-2xl">{celebrationQuote}</p>
        </div>
      )}

      {screen === 'gallery' && (
        <div className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-md sticky top-0 z-10">
             <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
             <h2 className="text-3xl font-fredoka text-pink-500 uppercase">Mis Creaciones ✨</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-32">
            {progress.gallery.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-[3rem] shadow-xl border-4 border-pink-100 flex flex-col gap-3 transform hover:rotate-1 transition-transform">
                <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={item.dataUrl} className="w-full h-full object-contain" alt={item.title} />
                </div>
                <p className="text-center font-black text-pink-600 text-xl truncate">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
