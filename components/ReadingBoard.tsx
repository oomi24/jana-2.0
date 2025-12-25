
import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types';
import { sounds } from '../utils/audio';
import IconButton from './IconButton';

interface ReadingBoardProps {
  level: Level;
  onCorrect: (points: number) => void;
  onWrong: () => void;
}

const ReadingBoard: React.FC<ReadingBoardProps> = ({ level, onCorrect, onWrong }) => {
  const [currentStep, setCurrentStep] = useState<'reading' | 'exercises'>('reading');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const story = level.readingData;

  useEffect(() => {
    setCurrentStep('reading');
    setUserAnswers([]);
    setScrollPercent(0);
    setShowAnalysis(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [level.id]);

  if (!story) return null;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight === clientHeight) {
       setScrollPercent(100);
       return;
    }
    const winScroll = scrollTop;
    const height = scrollHeight - clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollPercent(scrolled);
  };

  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(story.content);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    sounds.playClick();
  };

  const checkAnswers = () => {
    const isPerfect = story.questions.every((q, i) => userAnswers[i] === q.correct);
    if (isPerfect) {
      sounds.playCelebration();
      onCorrect(500);
    } else {
      sounds.playWrong();
      onWrong();
    }
  };

  const stats = {
    words: story.content.split(/\s+/).length,
    speed: Math.round(story.content.split(/\s+/).length / (parseInt(story.estimatedTime) || 1)),
    paragraphs: story.content.split(/\n\n/).length
  };

  return (
    <div className="w-full h-full flex flex-col p-2 md:p-6 bg-[#f0f2f5] overflow-hidden font-quicksand">
      
      {/* HUD Superior con Botón de Test Directo */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 mb-4 bg-white/80 backdrop-blur-md p-3 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100">
         <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="stroke-gray-100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="stroke-purple-500 transition-all duration-300" strokeWidth="3" strokeDasharray={`${scrollPercent}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center text-[8px] md:text-[10px] font-black text-purple-600">
                  {Math.round(scrollPercent)}%
               </div>
            </div>
            <div>
               <h2 className="text-sm md:text-xl font-fredoka text-gray-800 truncate max-w-[150px] md:max-w-xs">{story.title}</h2>
               <p className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Nivel {level.index} • {story.estimatedTime}</p>
            </div>
         </div>

         <div className="flex gap-2">
            {currentStep === 'reading' ? (
              <IconButton icon="fa-tasks" onClick={() => { sounds.playClick(); setCurrentStep('exercises'); }} colorClass="bg-green-500" label="Test" />
            ) : (
              <IconButton icon="fa-book-open" onClick={() => { sounds.playClick(); setCurrentStep('reading'); }} colorClass="bg-purple-500" label="Lectura" />
            )}
            <IconButton icon={isSpeaking ? "fa-stop" : "fa-volume-up"} onClick={handleSpeak} colorClass="bg-blue-500" label="Voz" />
            <IconButton icon="fa-brain" onClick={() => setShowAnalysis(!showAnalysis)} colorClass="bg-orange-400" label="Análisis" />
         </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
        <div className="flex-grow flex flex-col bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-xl border-4 md:border-8 border-white overflow-hidden relative">
           <div 
             ref={scrollRef} 
             onScroll={handleScroll}
             className="flex-grow overflow-y-auto p-4 md:p-12 text-gray-700 leading-relaxed custom-scrollbar"
           >
              {currentStep === 'reading' ? (
                <article className="animate-fade-in max-w-4xl mx-auto">
                   <header className="mb-8 md:mb-12 text-center">
                      <p className="text-purple-400 font-black text-[10px] md:text-sm uppercase tracking-[0.3em] mb-2">Biblioteca Jana</p>
                      <h1 className="text-3xl md:text-6xl font-fredoka text-gray-800 leading-tight mb-4">{story.title}</h1>
                      <p className="text-sm md:text-xl text-gray-400 italic">Escrito por {story.author}</p>
                   </header>
                   <div className="text-lg md:text-3xl space-y-6 md:space-y-10 text-justify font-medium">
                      {story.content.split('\n\n').map((p, i) => (
                        <p key={i} className="first-letter:text-5xl first-letter:font-fredoka first-letter:text-purple-500 first-letter:mr-2 first-letter:float-left">{p}</p>
                      ))}
                   </div>
                   
                   {/* Botón final de lectura para pasar al test */}
                   <div className="mt-16 flex justify-center pb-12">
                      <button 
                        onClick={() => { sounds.playCelebration(); setCurrentStep('exercises'); }}
                        className="bg-green-500 text-white px-12 py-6 rounded-full font-fredoka text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all border-b-8 border-green-700"
                      >
                         ¡YA TERMINÉ! IR AL TEST <i className="fas fa-check-circle ml-2"></i>
                      </button>
                   </div>
                </article>
              ) : (
                <div className="animate-slide-up space-y-8 md:space-y-12 max-w-4xl mx-auto py-4 pb-20">
                   <div className="text-center mb-10">
                      <h2 className="text-2xl md:text-5xl font-fredoka text-purple-600 uppercase">Test de Comprensión</h2>
                      <p className="text-gray-400 font-bold uppercase text-[10px] md:text-sm tracking-widest">Demuestra lo que aprendiste</p>
                   </div>
                   {story.questions.map((q, qIdx) => (
                     <div key={qIdx} className="bg-purple-50/50 p-6 md:p-10 rounded-[2.5rem] border-2 border-purple-100">
                        <p className="text-xl md:text-3xl font-bold text-gray-800 mb-6 flex gap-4">
                           <span className="bg-purple-600 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">{qIdx + 1}</span>
                           {q.question}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                           {q.options.map((opt, oIdx) => (
                             <button
                               key={oIdx}
                               onClick={() => {
                                 const n = [...userAnswers]; n[qIdx] = oIdx; setUserAnswers(n);
                                 sounds.playClick();
                               }}
                               className={`p-4 md:p-8 rounded-2xl md:rounded-[2rem] text-left text-sm md:text-2xl font-bold transition-all border-b-8 active:scale-95
                                 ${userAnswers[qIdx] === oIdx ? 'bg-purple-500 border-purple-700 text-white shadow-xl' : 'bg-white text-purple-600 border-purple-100 hover:bg-white'}`}
                             >
                               {opt}
                             </button>
                           ))}
                        </div>
                     </div>
                   ))}
                   <div className="mt-8">
                      <button 
                        onClick={checkAnswers}
                        disabled={userAnswers.length < story.questions.length}
                        className="w-full bg-green-500 text-white py-6 md:py-10 rounded-[2rem] md:rounded-[3rem] font-fredoka text-xl md:text-5xl shadow-xl border-b-[12px] border-green-700 active:translate-y-2 active:border-b-4 transition-all disabled:opacity-50"
                      >
                         COMPLETAR MISIÓN <i className="fas fa-trophy ml-3"></i>
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>

        {showAnalysis && (
          <aside className="w-full lg:w-80 flex flex-col gap-4 animate-fade-in">
             <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-lg border border-gray-100 h-full overflow-y-auto">
                <h3 className="text-xl font-fredoka text-purple-600 mb-6 border-b pb-2 flex items-center gap-2">
                   <i className="fas fa-microscope"></i> Laboratorio
                </h3>
                <div className="space-y-6">
                   <section>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Vocabulario</p>
                      <div className="flex flex-col gap-3">
                         {story.vocabulary.map((v, i) => (
                           <div key={i}>
                              <p className="text-sm md:text-lg font-bold text-purple-500 underline decoration-dotted">{v.word}</p>
                              <p className="text-[10px] md:text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mt-1">{v.meaning}</p>
                           </div>
                         ))}
                      </div>
                   </section>
                </div>
             </div>
          </aside>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e9d5ff; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ReadingBoard;
