
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
  mathData?: {
    op: string;
    v1: number;
    v2: number;
  };
  visual?: string; 
  options?: QuizOption[];
  rewardId: string;
  scientificData?: {
    hiddenItems: { id: string, label: string, x: number, y: number, icon: string, symbol?: string, desc?: string }[];
  };
  readingData?: {
    title: string;
    content: string;
    vocabulary: { word: string, meaning: string }[];
    questions: { question: string, options: string[], correct: number }[];
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
  gallery: any[];
  totalPoints: number;
  powerUps: any;
}
