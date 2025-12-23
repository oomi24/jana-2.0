
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
  const [soundEnabled, setSoundEnabled] = useState(true);
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

  const USER_ID = 'jana_user_001';

  // Carga inicial desde LocalStorage (Prioridad Offline)
  useEffect(() => {
    const saved = localStorage.getItem('kpop_academy_progress_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error("Error al cargar progreso local", e);
      }
    }
    const savedSound = localStorage.getItem('kpop_academy_sound');
    if (savedSound !== null) {
      const enabled = savedSound === 'true';
      setSoundEnabled(enabled);
      sounds.setEnabled(enabled);
    }
  }, []);

  // Guardado automático y sincronización con Supabase (Cloud Backup)
  useEffect(() => {
    localStorage.setItem('kpop_academy_progress_v4', JSON.stringify(progress));
    
    // Intenta sincronizar con Supabase cada vez que cambia el progreso
    if (supabase) {
      syncProgress(USER_ID, progress);
    }
  }, [progress]);

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    sounds.setEnabled(newVal);
    localStorage.setItem('kpop_academy_sound', String(newVal));
    if (newVal) sounds.playClick();
  };

  const navigateTo = (newScreen: Screen) => {
    sounds.playClick();
    setScreen(newScreen);
  };

  const completeLevel = (points: number = 100) => {
    if (!currentLevel) return;
    
    sounds.playCelebration();
    setCelebrationQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    setShowCelebration(true);

    const nextIdx = currentLevel.index + 1;
    const nextLevelId = `${currentLevel.moduleId}_${nextIdx}`;
    const nextLevel = LEVELS.find(l => l.id === nextLevelId);

    setProgress(prev => ({
      ...prev,
      levelsCompleted: Array.from(new Set([...prev.levelsCompleted, currentLevel.id])),
      stars: { ...prev.stars, [currentLevel.id]: 3 },
      totalPoints: prev.totalPoints + points
    }));

    setTimeout(() => {
      setShowCelebration(false);
      if (nextLevel) {
        setCurrentLevel(nextLevel);
        setScreen('game');
      } else {
        setScreen('menu'); 
      }
    }, 2500);
  };

  const saveToGallery = (dataUrl: string) => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      dataUrl,
      title: currentLevel ? `Misión: ${currentLevel.objective}` : 'Dibujo Libre'
    };
    setProgress(prev => ({
      ...prev,
      gallery: [newItem, ...prev.gallery].slice(0, 30) // Ampliada capacidad de galería
    }));
  };

  const renderSplashScreen = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300">
      <div className="mb-8 relative scale-110">
        <div className="absolute -inset-8 bg-white/30 blur-2xl rounded-full animate-pulse"></div>
        <h1 className="text-7xl md:text-9xl font-fredoka text-white drop-shadow-2xl relative">
          K-POP <br/> ACADEMY
        </h1>
        <p className="text-2xl text-white font-bold mt-4 tracking-[0.2em] uppercase drop-shadow-md italic">Academia Jana</p>
      </div>
      <button 
        onClick={() => navigateTo('menu')}
        className="bg-white text-pink-600 px-16 py-6 rounded-full text-3xl font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all border-b-8 border-pink-200"
      >
        ¡COMENZAR!
      </button>
      <div className="mt-16 text-white font-bold text-xl bg-black/20 px-8 py-3 rounded-full flex items-center gap-3">
        <i className="fas fa-gem text-yellow-300"></i> {progress.totalPoints} PUNTOS
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="h-full flex flex-col p-6 bg-pink-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-8 bg-white/50 p-4 rounded-3xl shadow-sm border-b-4 border-pink-100">
        <h2 className="text-3xl md:text-5xl font-fredoka text-pink-600">Reinos K-Pop</h2>
        <div className="flex gap-4">
           <IconButton 
            icon={soundEnabled ? "fa-volume-up" : "fa-volume-mute"} 
            onClick={toggleSound} 
            colorClass={soundEnabled ? "bg-blue-500" : "bg-gray-500"} 
           />
           <div className="hidden md:flex items-center bg-white px-6 py-2 rounded-full shadow-inner border-2 border-pink-200">
             <i className="fas fa-gem text-pink-400 mr-2"></i>
             <span className="font-fredoka text-pink-600">{progress.totalPoints}</span>
           </div>
           <IconButton icon="fa-images" onClick={() => navigateTo('gallery')} label="Álbum" colorClass="bg-purple-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {(Object.entries(WARRIORS) as [ModuleId, typeof WARRIORS.color][]).map(([id, warrior]) => {
          const completedCount = progress.levelsCompleted.filter(lid => lid.startsWith(id)).length;
          return (
            <div 
              key={id} 
              onClick={() => { 
                setSelectedModule(id); 
                navigateTo('levels'); 
              }}
              className={`cursor-pointer rounded-[2.5rem] p-6 bg-gradient-to-br ${warrior.gradient} text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col h-80 relative overflow-hidden group border-4 border-white/30`}
            >
              <div className="absolute -right-10 -bottom-10 opacity-20 text-[140px] group-hover:scale-125 transition-transform rotate-12">
                <i className={`fas ${warrior.icon}`}></i>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/50 mb-4 shadow-lg">
                <i className={`fas ${warrior.icon} text-4xl`}></i>
              </div>
              <h3 className="text-3xl font-fredoka mb-1 tracking-tight">{warrior.name}</h3>
              <p className="text-xs font-bold bg-black/30 self-start px-3 py-1 rounded-full mb-4 uppercase tracking-widest">{warrior.subject}</p>
              <p className="text-sm font-medium leading-tight opacity-90 mb-4">{warrior.description}</p>
              <div className="mt-auto flex justify-between items-center bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <span className="text-sm font-bold">
                  {completedCount}/60 LOGRADOS
                </span>
                <i className="fas fa-arrow-circle-right text-2xl"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLevels = () => (
    <div className="h-full flex flex-col p-6 bg-white overflow-hidden">
      <div className="flex items-center gap-6 mb-8">
        <IconButton icon="fa-home" onClick={() => navigateTo('menu')} colorClass="bg-gray-400" />
        <div className="flex-grow">
          <h2 className="text-4xl font-fredoka text-pink-600 uppercase tracking-tighter">Misiones de {WARRIORS[selectedModule].name}</h2>
          <div className="flex items-center gap-4">
             <div className="h-4 w-48 bg-gray-100 rounded-full overflow-hidden border">
                <div 
                  className="h-full bg-pink-500 transition-all duration-1000" 
                  style={{width: `${(progress.levelsCompleted.filter(l=>l.startsWith(selectedModule)).length / 60) * 100}%`}}
                ></div>
             </div>
             <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Niveles de Sabiduría</span>
          </div>
        </div>
        <IconButton 
          icon={soundEnabled ? "fa-volume-up" : "fa-volume-mute"} 
          onClick={toggleSound} 
          colorClass={soundEnabled ? "bg-blue-500" : "bg-gray-500"} 
        />
      </div>
      <div className="flex-grow overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 pb-32 px-2 scroll-smooth">
        {LEVELS.filter(l => l.moduleId === selectedModule).map(level => {
          const isCompleted = progress.levelsCompleted.includes(level.id);
          const isLocked = !isCompleted && level.index > 1 && !progress.levelsCompleted.includes(`${selectedModule}_${level.index - 1}`);
          
          return (
            <button
              key={level.id}
              disabled={isLocked}
              onClick={() => { 
                sounds.playClick();
                setCurrentLevel(level); 
                setScreen('game'); 
              }}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-4 shadow-md
                ${isLocked ? 'bg-gray-50 text-gray-200 border-gray-100 cursor-not-allowed' : 
                  isCompleted ? 'bg-pink-500 text-white border-pink-400 scale-100 hover:scale-110 active:scale-90' : 
                  'bg-white border-pink-200 text-pink-500 hover:border-pink-400 hover:scale-110'}
              `}
            >
              <span className="text-2xl font-fredoka">{level.index}</span>
              {isCompleted ? <i className="fas fa-check-circle text-white text-[10px]"></i> : isLocked ? <i className="fas fa-lock text-[10px]"></i> : <i className="fas fa-star text-[10px] animate-pulse"></i>}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderGame = () => {
    if (!currentLevel) return null;
    const warrior = WARRIORS[currentLevel.moduleId];
    
    return (
      <div className="h-full flex flex-col bg-gray-50 relative overflow-hidden">
        <div className={`p-4 bg-gradient-to-r ${warrior.gradient} text-white flex justify-between items-center shadow-xl z-20 border-b-4 border-black/10`}>
          <div className="flex items-center gap-4">
            <IconButton icon="fa-times" onClick={() => navigateTo('levels')} colorClass="bg-white/20" />
            <div className="flex flex-col">
              <h3 className="text-2xl font-fredoka leading-none">{warrior.name}</h3>
              <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Nivel {currentLevel.index} / 60</p>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="hidden md:flex flex-col items-end justify-center mr-4">
                <span className="text-[10px] font-bold uppercase opacity-80">Puntos Jana</span>
                <span className="font-fredoka text-xl text-yellow-300 tracking-wider">{progress.totalPoints}</span>
             </div>
             <IconButton 
              icon={soundEnabled ? "fa-volume-up" : "fa-volume-mute"} 
              onClick={toggleSound} 
              colorClass={soundEnabled ? "bg-blue-500/50" : "bg-gray-500/50"} 
             />
             {currentLevel.type === 'paint' && (
               <IconButton icon="fa-check-circle" onClick={() => completeLevel(100)} label="Listo" colorClass="bg-green-500" pulse />
             )}
          </div>
        </div>

        <div className="flex-grow p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden">
          {currentLevel.type === 'paint' ? (
            <div className="flex flex-col w-full h-full gap-4">
               <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1 rounded-3xl shadow-lg animate-slide-up">
                  <div className="bg-white p-4 rounded-[1.4rem] text-center">
                    <span className="text-purple-600 font-black uppercase text-xs tracking-[0.2em] block mb-1 underline decoration-pink-300">Reto de Arte:</span>
                    <p className="text-xl md:text-3xl font-fredoka text-gray-800 leading-tight">
                      {currentLevel.objective}
                    </p>
                  </div>
               </div>
               
               <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden">
                  <div className="flex-grow flex items-center justify-center">
                    <CanvasBoard brushColor={brushColor} brushSize={brushSize} tool={tool} onSave={saveToGallery} />
                  </div>
                  <div className="md:w-44 flex md:flex-col justify-around md:justify-start items-center gap-4 p-4 bg-white rounded-[2.5rem] shadow-xl border-4 border-pink-100 overflow-y-auto">
                      
                      {/* Paleta de Colores */}
                      <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                        {['#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#000000', '#ffffff'].map(c => (
                          <button 
                            key={c} 
                            onClick={() => { 
                              sounds.playClick();
                              setBrushColor(c); 
                              if (tool === 'eraser') setTool('brush'); 
                            }} 
                            className={`w-9 h-9 rounded-full border-4 ${brushColor === c && tool !== 'eraser' ? 'border-gray-800 scale-110 shadow-lg' : 'border-gray-100'}`} 
                            style={{ backgroundColor: c }} 
                          />
                        ))}
                      </div>

                      <div className="w-full h-1 bg-pink-100 rounded-full hidden md:block" />

                      {/* Herramientas Principales */}
                      <div className="flex md:flex-col gap-2">
                        <IconButton icon="fa-paint-brush" onClick={() => { sounds.playClick(); setTool('brush'); }} colorClass={tool === 'brush' ? 'bg-pink-500' : 'bg-pink-100 text-pink-400'} label="Lápiz" />
                        <IconButton icon="fa-fill-drip" onClick={() => { sounds.playClick(); setTool('fill'); }} colorClass={tool === 'fill' ? 'bg-pink-500' : 'bg-pink-100 text-pink-400'} label="Pintura" />
                        <IconButton icon="fa-eraser" onClick={() => { sounds.playClick(); setTool('eraser'); }} colorClass={tool === 'eraser' ? 'bg-pink-500' : 'bg-pink-100 text-pink-400'} label="Borra" />
                      </div>

                      <div className="w-full h-1 bg-pink-100 rounded-full hidden md:block" />

                      {/* Selector de Tamaños */}
                      <div className="flex flex-col gap-1 items-center w-full">
                        <span className="text-[10px] font-black text-pink-400 uppercase mb-1">Tamaño</span>
                        <div className="flex md:flex-col gap-3 p-2 bg-pink-50 rounded-3xl border-2 border-pink-100">
                          {[5, 15, 40].map(size => (
                            <button
                              key={size}
                              onClick={() => { sounds.playClick(); setBrushSize(size); }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${brushSize === size ? 'bg-pink-500 scale-110 shadow-md' : 'bg-white hover:bg-pink-100'}`}
                            >
                              <div 
                                className={`${brushSize === size ? 'bg-white' : 'bg-pink-400'}`} 
                                style={{ 
                                  width: Math.min(24, Math.max(4, size/1.5)) + 'px', 
                                  height: Math.min(24, Math.max(4, size/1.5)) + 'px', 
                                  borderRadius: '50%' 
                                }} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                  </div>
               </div>
            </div>
          ) : (
            <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => { sounds.playWrong(); alert("¡Ups! Intenta de nuevo, Jana."); }} />
          )}
        </div>

        {showCelebration && (
          <div className="absolute inset-0 bg-pink-500/95 flex flex-col items-center justify-center z-50 animate-fade-in text-white text-center p-8">
            <div className="text-[160px] mb-8 animate-bounce drop-shadow-2xl">🌟</div>
            <h2 className="text-6xl md:text-8xl font-fredoka mb-4 uppercase tracking-tighter shadow-sm">¡EXCELENTE!</h2>
            <p className="text-2xl md:text-4xl font-bold bg-white/20 px-8 py-4 rounded-3xl backdrop-blur-sm shadow-xl">{celebrationQuote}</p>
          </div>
        )}
      </div>
    );
  };

  const renderGallery = () => (
    <div className="h-full flex flex-col p-6 bg-purple-50">
      <div className="flex items-center gap-6 mb-10">
        <IconButton icon="fa-arrow-left" onClick={() => navigateTo('menu')} colorClass="bg-purple-600" />
        <h2 className="text-5xl font-fredoka text-purple-600">Galería K-Pop</h2>
      </div>
      <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-32 px-2">
        {progress.gallery.length === 0 ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center text-purple-300 gap-6">
            <i className="fas fa-palette text-[120px] opacity-20"></i>
            <p className="text-2xl font-bold italic opacity-40">¡Aún no hay pinturas guardadas!</p>
          </div>
        ) : (
          progress.gallery.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-[2.5rem] shadow-2xl border-4 border-white transform hover:scale-105 transition-all group">
              <div className="relative overflow-hidden rounded-3xl shadow-inner border bg-white">
                <img src={item.dataUrl} alt={item.title} className="w-full h-auto aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                    onClick={() => {
                      sounds.playClick();
                      const link = document.createElement('a');
                      link.href = item.dataUrl;
                      link.download = `Jana-Artista-${item.id}.webp`;
                      link.click();
                    }}
                    className="bg-white text-purple-600 p-4 rounded-full shadow-2xl"
                  >
                    <i className="fas fa-download text-2xl"></i>
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-xl font-fredoka text-purple-500 truncate">{item.title}</p>
                <p className="text-xs text-gray-400 font-bold">{new Date(item.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <main className="fixed inset-0 select-none bg-pink-50 touch-none overflow-hidden">
      {screen === 'splash' && renderSplashScreen()}
      {screen === 'menu' && renderMenu()}
      {screen === 'levels' && renderLevels()}
      {screen === 'game' && renderGame()}
      {screen === 'gallery' && renderGallery()}
    </main>
  );
};

export default App;
