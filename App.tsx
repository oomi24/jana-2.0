
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

type Screen = 'splash' | 'menu' | 'levels' | 'game' | 'gallery';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedModule, setSelectedModule] = useState<ModuleId>('color');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({
    levelsCompleted: [],
    stars: {},
    totalPoints: 0,
    gallery: [],
    powerUps: {}
  });

  const [brushColor, setBrushColor] = useState('#ec4899');
  const [brushSize, setBrushSize] = useState(30);
  const [brushShape, setBrushShape] = useState<BrushShape>('round');
  const [tool, setTool] = useState<DrawingTool>('brush');

  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => loading.style.display = 'none', 500);
      }, 1000);
    }
  }, []);

  const handleLevelSelect = (l: Level) => {
    sounds.playClick();
    setCurrentLevel(l);
    setScreen('game');
  };

  const completeLevel = () => {
    if (!currentLevel) return;
    sounds.playCelebration();
    setShowCelebration(true);
    setProgress(prev => ({
      ...prev,
      levelsCompleted: [...new Set([...prev.levelsCompleted, currentLevel.id])],
      totalPoints: prev.totalPoints + 100
    }));
    setTimeout(() => {
      setShowCelebration(false);
      setScreen('levels');
    }, 3000);
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col font-quicksand bg-[#fdf2f8]">
      
      {screen === 'splash' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 text-white p-6">
          <div className="mb-8 animate-bounce">
            <i className="fas fa-star text-8xl text-yellow-300 drop-shadow-xl"></i>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 text-center leading-none uppercase" style={{ fontFamily: 'Fredoka One' }}>K-POP<br/>WARRIORS</h1>
          <p className="text-xl md:text-2xl font-bold opacity-90 tracking-widest mb-12">PAINT & LEARN • ACADEMIA JANA</p>
          <button onClick={() => { sounds.unlockAudio(); setScreen('menu'); }} className="bg-white text-pink-600 px-20 py-6 rounded-full text-3xl font-black shadow-2xl active:scale-95 transition-all">¡ENTRAR!</button>
        </div>
      )}

      {screen === 'menu' && (
        <div className="p-6 flex-grow flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-pink-500 uppercase" style={{ fontFamily: 'Fredoka One' }}>Elige tu Misión</h2>
            <div className="flex gap-4">
               <IconButton icon="fa-images" onClick={() => setScreen('gallery')} colorClass="bg-purple-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(WARRIORS).map(w => (
              <div key={w.id} onClick={() => { setSelectedModule(w.id); setScreen('levels'); sounds.playClick(); }} 
                className={`p-8 rounded-[3rem] bg-gradient-to-br ${w.gradient} text-white cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-xl h-56 flex flex-col justify-between border-4 border-white/20 relative overflow-hidden group`}>
                <i className={`fas ${w.icon} text-8xl absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-all`}></i>
                <h3 className="text-4xl font-black uppercase relative z-10" style={{ fontFamily: 'Fredoka One' }}>{w.name}</h3>
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest relative z-10">{w.subject}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'levels' && (
        <div className="p-6 flex-grow flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('menu')} colorClass="bg-gray-400" />
            <h2 className="text-3xl font-black text-pink-500 uppercase" style={{ fontFamily: 'Fredoka One' }}>Niveles de {WARRIORS[selectedModule].name}</h2>
          </div>
          <div className="flex-grow overflow-y-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4 pb-12 px-2">
            {LEVELS.filter(l => l.moduleId === selectedModule).map(l => {
              const completed = progress.levelsCompleted.includes(l.id);
              const unlocked = l.index === 1 || progress.levelsCompleted.includes(`${l.moduleId}_${l.index - 1}`);
              return (
                <button 
                  key={l.id} 
                  disabled={!unlocked}
                  onClick={() => handleLevelSelect(l)}
                  className={`aspect-square rounded-3xl font-black text-2xl shadow-md flex items-center justify-center transition-all border-b-4 active:translate-y-1 active:border-b-0
                    ${completed ? 'bg-pink-500 text-white border-pink-700' : 
                      unlocked ? 'bg-white text-pink-500 border-pink-100' : 
                      'bg-gray-200 text-gray-400 border-gray-300 opacity-60'}`}
                >
                  {unlocked ? l.index : <i className="fas fa-lock text-sm"></i>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {screen === 'game' && currentLevel && (
        <div className="flex-grow flex flex-col overflow-hidden h-full relative">
          <div className="p-4 bg-white/90 backdrop-blur-md flex justify-between items-center border-b-2 border-pink-50 z-20">
            <IconButton icon="fa-arrow-left" onClick={() => setScreen('levels')} colorClass="bg-gray-400" />
            <h3 className="font-black text-gray-600 uppercase tracking-widest">{currentLevel.objective}</h3>
            {currentLevel.type === 'paint' ? (
               <IconButton icon="fa-check" onClick={completeLevel} colorClass="bg-green-500" />
            ) : <div className="w-12"></div>}
          </div>

          <div className="flex-grow flex items-center justify-center p-4">
             {currentLevel.moduleId === 'math' ? (
               <MathBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => {}} />
             ) : currentLevel.type === 'paint' ? (
               <div className="w-full h-full flex flex-col gap-4">
                  <CanvasBoard brushColor={brushColor} brushSize={brushSize} brushShape={brushShape} tool={tool} silhouette={currentLevel.visual} levelId={currentLevel.id} onSave={(url) => setProgress(p => ({...p, gallery: [url, ...p.gallery].slice(0, 20)}))} />
                  <div className="bg-white p-4 rounded-3xl shadow-lg flex gap-4 overflow-x-auto no-scrollbar">
                    {['#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#000000', '#ffffff'].map(c => (
                      <button key={c} onClick={() => setBrushColor(c)} className={`w-12 h-12 rounded-full border-4 flex-shrink-0 transition-all ${brushColor === c ? 'border-pink-500 scale-110' : 'border-white'}`} style={{backgroundColor: c}} />
                    ))}
                  </div>
               </div>
             ) : (
               <QuizBoard level={currentLevel} onCorrect={completeLevel} onWrong={() => {}} />
             )}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-pink-500/90 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8 animate-fade-in text-center">
          <div className="text-[12rem] mb-4 animate-bounce">🏆</div>
          <h2 className="text-6xl md:text-8xl font-black mb-4 uppercase" style={{ fontFamily: 'Fredoka One' }}>¡GENIAL!</h2>
          <p className="text-2xl font-bold opacity-80 uppercase tracking-widest">Misión Cumplida Jana</p>
        </div>
      )}

    </div>
  );
};

export default App;
