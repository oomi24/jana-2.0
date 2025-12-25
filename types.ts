
export type ModuleId = 'color' | 'math' | 'english' | 'geo' | 'science' | 'reading';

export type LevelType = 'paint' | 'quiz' | 'math-master' | 'lingua-flow' | 'science-lab' | 'reading-adventure';

export type DrawingTool = 'brush' | 'pencil' | 'magic' | 'eraser' | 'fill';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface FactCard {
  title: string;
  curiosity: string;
  capital?: string;
  continent?: string;
}

export interface Level {
  id: string;
  moduleId: ModuleId;
  type: LevelType;
  index: number;
  objective: string;
  help: string;
  question?: string;
  answer?: any;
  translation?: string;
  scenario?: string; 
  operation?: 'mult' | 'div' | 'mix';
  visual?: string; 
  options?: QuizOption[];
  factCard?: FactCard;
  rewardId: string;
  hints?: string[];
  scientificData?: {
    category: 'mineral' | 'plant' | 'animal' | 'micro' | 'space';
    discoveries: string[];
    hiddenItems: { id: string, label: string, x: number, y: number, icon: string }[];
  };
  readingData?: {
    title: string;
    content: string;
    author: string;
    vocabulary: { word: string, meaning: string }[];
    objectives: string[];
    difficulty: number;
    estimatedTime: string;
    questions: { question: string, options: string[], correct: number }[];
  };
  englishData?: {
    lessonTitle: string;
    category: string;
    exerciseType: 'multiple-choice' | 'matching' | 'sentence' | 'vocab';
    pronunciation?: string;
    dialogue?: { speaker: string, text: string, translation: string }[];
    matchingPairs?: { english: string, spanish: string }[];
  };
}

export interface Warrior {
  id: ModuleId;
  name: string;
  title: string;
  color: string;
  gradient: string;
  description: string;
  icon: string;
  subject: string;
}

export interface UserProgress {
  levelsCompleted: string[];
  stars: Record<string, number>;
  stickers: string[];
  gallery: GalleryItem[];
  totalPoints: number;
  readingStats?: {
    wordsRead: number;
    booksCompleted: number;
    perfectQuizzes: number;
  };
  powerUps: {
    doubleXP: number;
    hint: number;
    extraTime: number;
    autoSolve: number;
    nativeEar: number;
    contextVision: number;
    darwinLens: number;
    timeWarp: number;
  };
}

export interface GalleryItem {
  id: string;
  timestamp: number;
  dataUrl: string;
  title: string;
}
