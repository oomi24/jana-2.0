
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
  const [showStats, setShowStats] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const story = level.readingData;

  useEffect(() => {
    setCurrentStep('reading');
    setUserAnswers([]);
    setShowStats(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [level.id]);

  if (!story) return null;

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

  const selectAnswer = (qIndex: number, optIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = optIndex;
    setUserAnswers(newAnswers);
    sounds.playClick();
  };

  const checkAnswers = () => {
    const isPerfect = story.questions.every((q, i) => userAnswers[i] === q.correct);
    if (isPerfect) {
      sounds.playCelebration();
      onCorrect(300);
    } else {
      sounds.playWrong();
      onWrong();
    }
  };

  const analyzeText = () => {
    setShowStats(!showStats);
    sounds.playPencil();
  };

  const stats = {
    words: story.content.split(/\s+/).length,
    sentences: story.content.split(/[.!?]+/).length - 1,
    paragraphs: story.content.split(/\n\n/).length
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 bg-gradient-to-br from-indigo-50 to-purple-100 overflow-hidden font-quicksand">
      
      {/* Mentor LECTOR */}
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6 animate-slide-up flex-shrink-0">
        <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-600 rounded-full flex items-center justify-center border-2 md:border-4 border-white shadow-xl">
           <i className="fas fa-book-reader text-white text-xl md:text-3xl"></i>
        </div>
        <div className="bg-white/80 p-2 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border-2 border-purple-200 flex-grow">
           <p className="text-[10px] md:text-lg font-bold text-purple-800">
             {currentStep === 'reading' ? `Explora: "${story.title}" por ${story.author}` : "¡Es hora de demostrar lo que aprendiste!"}
           </p>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* Panel de Lectura / Ejercicios */}
        <div className="flex-grow flex flex-col bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white overflow-hidden relative">
           
           <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-8 leading-relaxed text-gray-800">
              {currentStep === 'reading' ? (
                <div className="animate-fade-in">
                  <h2 className="text-2xl md:text-5xl font-fredoka text-purple-600 mb-4 md:mb-6 text-center">{story.title}</h2>
                  <div className="text-lg md:text-3xl space-y-4 md:space-y-6 text-justify">
                    {story.content.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-slide-up space-y-6 md:space-y-10">
                   <h2 className="text-xl md:text-4xl font-fredoka text-purple-600 mb-4 text-center">Desafío de Comprensión</h2>
                   {story.questions.map((q, qIdx) => (
                     <div key={qIdx} className="bg-purple-50 p-4 md:p-8 rounded-[2rem] border-2 border-purple-100 shadow-sm">
                        <p className="text-lg md:text-2xl font-bold text-gray-800 mb-4">{qIdx + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                           {q.options.map((opt, oIdx) => (
                             <button
                               key={oIdx}
                               onClick={() => selectAnswer(qIdx, oIdx)}
                               className={`p-3 md:p-6 rounded-2xl md:rounded-3xl text-sm md:text-xl font-bold transition-all border-b-4 
                                 ${userAnswers[qIdx] === oIdx ? 'bg-purple-500 border-purple-700 text-white' : 'bg-white text-purple-600 border-purple-100 hover:bg-purple-50'}`}
                             >
                               {opt}
                             </button>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>

           {/* Controles Inferiores del Panel */}
           <div className="p-3 md:p-6 bg-gray-50 border-t-2 border-gray-100 flex justify-between items-center gap-2 flex-shrink-0">
             <div className="flex gap-2">
               {currentStep === 'reading' ? (
                 <>
                   <IconButton icon={isSpeaking ? "fa-stop" : "fa-volume-up"} onClick={handleSpeak} colorClass="bg-blue-500" label="LEER" />
                   <IconButton icon="fa-chart-bar" onClick={analyzeText} colorClass="bg-orange-400" label="INFO" />
                 </>
               ) : (
                 <IconButton icon="fa-book" onClick={() => setCurrentStep('reading')} colorClass="bg-indigo-400" label="VOLVER" />
               )}
             </div>

             {currentStep === 'reading' ? (
               <button 
                 onClick={() => { sounds.playClick(); setCurrentStep('exercises'); }}
                 className="bg-purple-600 text-white px-6 md:px-12 py-3 md:py-5 rounded-2xl md:rounded-[2rem] font-fredoka text-sm md:text-2xl shadow-lg border-b-4 md:border-b-8 border-purple-800 active:scale-95"
               >
                 A LAS PREGUNTAS <i className="fas fa-brain ml-2"></i>
               </button>
             ) : (
               <button 
                 onClick={checkAnswers}
                 disabled={userAnswers.length < story.questions.length || userAnswers.includes(undefined as any)}
                 className="bg-green-500 text-white px-6 md:px-12 py-3 md:py-5 rounded-2xl md:rounded-[2rem] font-fredoka text-sm md:text-2xl shadow-lg border-b-4 md:border-b-8 border-green-700 active:scale-95 disabled:opacity-50"
               >
                 VERIFICAR <i className="fas fa-check-circle ml-2"></i>
               </button>
             )}
           </div>
        </div>

        {/* Panel lateral de Análisis (Desktop/Tablet landscape) */}
        {showStats && (
          <div className="w-full lg:w-72 bg-white rounded-[1.5rem] md:rounded-[3.5rem] p-4 md:p-8 shadow-2xl border-4 md:border-8 border-white animate-fade-in flex flex-col gap-4">
             <h3 className="text-xl md:text-2xl font-fredoka text-purple-600 border-b-2 border-purple-100 pb-2">Análisis de Texto</h3>
             <div className="space-y-4">
                <div className="bg-purple-50 p-3 md:p-4 rounded-2xl">
                   <p className="text-[10px] md:text-xs font-black text-purple-400 uppercase">Estadísticas</p>
                   <p className="text-sm md:text-lg font-bold text-gray-700">Palabras: {stats.words}</p>
                   <p className="text-sm md:text-lg font-bold text-gray-700">Oraciones: {stats.sentences}</p>
                </div>
                <div className="bg-amber-50 p-3 md:p-4 rounded-2xl">
                   <p className="text-[10px] md:text-xs font-black text-amber-500 uppercase">Vocabulario</p>
                   <div className="flex flex-wrap gap-1 mt-2">
                      {story.vocabulary.map((v, i) => (
                        <span key={i} className="bg-white px-2 py-1 rounded-lg text-[9px] md:text-sm font-bold border border-amber-100 text-amber-700 uppercase">
                          {v}
                        </span>
                      ))}
                   </div>
                </div>
                <div className="bg-green-50 p-3 md:p-4 rounded-2xl">
                   <p className="text-[10px] md:text-xs font-black text-green-500 uppercase">Objetivos</p>
                   <ul className="text-[9px] md:text-sm font-bold text-green-700 list-disc ml-4">
                      {story.objectives.map((o, i) => <li key={i}>{o}</li>)}
                   </ul>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingBoard;
