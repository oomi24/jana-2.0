
import React, { useState, useEffect } from 'react';
import { ModuleId, UserProgress, Level, GalleryItem } from './types';
import { WARRIORS, LEVELS, MOTIVATIONAL_QUOTES } from './constants';
import CanvasBoard from './components/CanvasBoard';
import QuizBoard from './components/QuizBoard';
import IconButton from './components/IconButton';
import { sounds } from './utils/audio';
import { supabase, syncProgress } from './supabase';

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
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'fill' | 'rect' | 'circle'>('brush');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuote, setCelebrationQuote] = useState("");

  const JANA_ID = 'jana_tablet_user';

  useEffect(() => {
    const saved = localStorage.getItem('jana_kpop_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setProgress(prev => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.error("Error al cargar progreso local:", e);
      }
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
    }, 2000);
  };

  const saveToGallery = (dataUrl: string) => {
    const newItem = { 
      id: Date.now().toString(), 
      timestamp: Date.now(), 
      dataUrl, 
      title: String(currentLevel?.objective || 'Mi Arte K-Pop') 
    };
    setProgress(prev => ({ 
      ...prev, 
      gallery: [newItem, ...prev.gallery].slice(0, 20) 
    }));
  };

  const renderGallery = () => (
    <div className="p-4 md:p-6 flex-grow flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-4">
        <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
        <h2 className="text-2xl md:text-3xl font-fredoka text-pink-500 uppercase">Mi Galería ✨</h2>
      </div>
      
      {progress.gallery.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-gray-400 opacity-50 italic">
          <i className="fas fa-palette text-6xl md:text-8xl mb-6"></i>
          <p className="text-xl md:text-2xl font-fredoka text-center px-4">¡Tu galería está vacía!<br/>Dibuja algo lindo en el módulo AURA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
          {progress.gallery.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-[2rem] shadow-xl border-4 border-pink-100 transform hover:scale-[1.02] transition-transform flex flex-col">
              <div className="aspect-[4/3] w-full bg-gray-50 rounded-2xl overflow-hidden mb-3 border border-pink-50">
                <img src={item.dataUrl} alt={String(item.title)} className="w-full h-full object-contain" />
              </div>
              <h4 className="text-center font-fredoka text-pink-600 text-sm truncate px-2">{String(item.title)}</h4>
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase mt-1">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col font-quicksand bg-pink-50">
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-purple-600 text-white p-6">
          <h1 className="text-6xl md:text-8xl font-fredoka mb-4 drop-shadow-lg text-center leading-none">K-POP<br/><span className="text-2xl md:text-4xl tracking-[0.2em]">ACADEMY</span></h1>
          <p className="text-xl md:text-2xl font-bold tracking-widest mb-12 uppercase opacity-80">Jana Edition</p>
          <button 
            onClick={() => { sounds.playClick(); setScreen('menu'); }} 
            className="bg-white text-pink-600 px-10 py-4 md:px-12 md:py-5 rounded-full text-2xl md:text-4xl font-fredoka shadow-2xl active:scale-90 transition-transform"
          >
            ¡JUGAR!
          </button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 md:gap-6 overflow-y-auto overflow-x-hidden">
          <div className="flex justify-between items-center bg-white p-4 md:p-5 rounded-3xl shadow-md border-b-4 border-pink-200 sticky top-0 z-10">
             <h2 className="text-2xl md:text-4xl font-fredoka text-pink-500 truncate mr-2">Hola Jana! ✨</h2>
             <div className="flex gap-2 md:gap-4 flex-shrink-0">
                <div className="bg-yellow-100 px-3 py-1 md:px-4 md:py-2 rounded-2xl flex items-center gap-2 border-2 border-yellow-300">
                   <i className="fas fa-gem text-yellow-500 text-lg md:text-xl"></i>
                   <span className="font-bold text-yellow-700 text-xl md:text-2xl">{progress.totalPoints}</span>
                </div>
                <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-500" />
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-20">
            {Object.values(WARRIORS).map(w => (
              <div 
                key={w.id} 
                onClick={() => { sounds.playClick(); setSelectedModule(w.id); setScreen('levels'); }} 
                className={`p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${w.gradient} text-white cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-xl h-48 md:h-64 flex flex-col justify-between`}
              >
                <i className={`fas ${w.icon} text-4xl md:text-5xl opacity-30 self-end`}></i>
                <div>
                  <h3 className="text-2xl md:text-3xl font-fredoka leading-tight">{String(w.name)}</h3>
                  <p className="text-[10px] md:text-sm font-bold opacity-90 uppercase tracking-wider">{String(w.subject)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'levels' && (
        <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 md:gap-6 overflow-hidden">
          <div className="flex items-center gap-4">
            <IconButton icon="fa-home" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
            <h2 className="text-2xl md:text-3xl font-fredoka text-pink-500 uppercase truncate">{String(WARRIORS[selectedModule].name)}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2 md:gap-3 pb-24 px-1">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => (
              <button 
                key={l.id} 
                onClick={() => { sounds.playClick(); setCurrentLevel(l); setScreen('game'); }} 
                className={`aspect-square rounded-xl md:rounded-2xl font-fredoka text-xl md:text-2xl shadow-md transition-all flex items-center justify-center ${progress.levelsCompleted.includes(l.id) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-2 border-pink-100 hover:border-pink-300'}`}
              >
                {l.index}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full">
          <div className="p-2 md:p-3 bg-white flex justify-between items-center border-b-2 border-pink-100 flex-shrink-0">
            <IconButton icon="fa-times" onClick={() => setScreen('levels')} colorClass="bg-red-400" />
            <div className="text-center px-2 flex-grow overflow-hidden">
               <h3 className="text-sm md:text-lg font-bold text-purple-600 leading-tight truncate px-2">{String(currentLevel.objective)}</h3>
               <span className="text-[8px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Nivel {currentLevel.index}</span>
            </div>
            {currentLevel.type === 'paint' ? (
              <IconButton icon="fa-check" onClick={() => completeLevel()} colorClass="bg-green-500" />
            ) : <div className="w-14 h-14 md:w-16 md:h-16"></div>}
          </div>

          <div className="flex-grow flex flex-col md:flex-row p-2 md:p-4 gap-2 md:gap-4 overflow-hidden bg-pink-50/50">
             {currentLevel.type === 'paint' ? (
               <>
                 <div className="flex-grow flex items-center justify-center overflow-hidden h-full">
                    <CanvasBoard brushColor={brushColor} brushSize={brushSize} tool={tool} onSave={saveToGallery} />
                 </div>
                 <div className="flex-shrink-0 h-24 md:h-auto md:w-32 bg-white rounded-3xl p-2 md:p-4 shadow-xl flex md:flex-col gap-2 md:gap-4 items-center justify-center border-4 border-pink-100 overflow-x-auto md:overflow-visible">
                    <div className="grid grid-cols-6 md:grid-cols-2 gap-1 md:gap-2 flex-shrink-0">
                       {['#ec4899', '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#000000'].map(c => (
                         <div 
                           key={c} 
                           onClick={() => { setBrushColor(c); if(tool==='eraser') setTool('brush'); }} 
                           className={`w-7 h-7 md:w-9 md:h-9 rounded-full cursor-pointer border-2 ${brushColor===c && tool!=='eraser' ? 'border-gray-800 scale-110 shadow-lg' : 'border-gray-100 shadow-sm'}`} 
                           style={{background: c}}
                         ></div>
                       ))}
                    </div>
                    <div className="h-[2px] w-full bg-pink-100 hidden md:block flex-shrink-0"></div>
                    <div className="flex md:flex-col gap-2 flex-shrink-0">
                       <button 
                        onClick={() => setTool('brush')} 
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${tool==='brush' ? 'bg-pink-500 text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-400'}`}
                       >
                         <i className="fas fa-paint-brush"></i>
                       </button>
                       <button 
                        onClick={() => setTool('eraser')} 
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${tool==='eraser' ? 'bg-pink-500 text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-400'}`}
                       >
                         <i className="fas fa-eraser"></i>
                       </button>
                    </div>
                    <div className="h-[2px] w-full bg-pink-100 hidden md:block flex-shrink-0"></div>
                    <div className="flex md:flex-col gap-2 flex-shrink-0">
                       {[6, 15, 45].map(s => (
                         <div 
                           key={s} 
                           onClick={() => setBrushSize(s)} 
                           className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${brushSize===s ? 'bg-pink-200 border-2 border-pink-400 shadow-sm' : 'bg-gray-50'}`}
                         >
                            <div className="bg-pink-600 rounded-full" style={{width: Math.max(3, s/6), height: Math.max(3, s/6)}}></div>
                         </div>
                       ))}
                    </div>
                 </div>
               </>
             ) : (
               <div className="flex-grow w-full h-full overflow-y-auto flex items-center justify-center">
                 <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => sounds.playWrong()} />
               </div>
             )}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-pink-600/95 flex flex-col items-center justify-center text-white animate-fade-in text-center p-6 backdrop-blur-sm">
          <div className="text-7xl md:text-9xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-4xl md:text-6xl font-fredoka">¡EXCELENTE!</h2>
          <p className="text-lg md:text-2xl mt-4 bg-white/20 p-6 rounded-[2rem] max-w-md border border-white/30">{String(celebrationQuote)}</p>
        </div>
      )}

      {screen === 'gallery' && (
        <div className="flex-grow flex flex-col overflow-hidden h-full">
          {renderGallery()}
        </div>
      )}
    </div>
  );
};

export default App;
