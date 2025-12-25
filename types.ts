
export type ModuleId = 'color' | 'math' | 'english' | 'geo' | 'science';

export type LevelType = 'paint' | 'quiz' | 'math-master';

export type DrawingTool = 'brush' | 'pencil' | 'magic' | 'eraser' | 'fill';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface FactCard {
  title: string;
  curiosity: string;
}

export interface Level {
  id: string;
  moduleId: ModuleId;
  type: LevelType;
  index: number;
  objective: string;
  help: string;
  question?: string;
  answer?: number;
  operation?: 'mult' | 'div' | 'mix';
  visual?: string; 
  options?: QuizOption[];
  factCard?: FactCard;
  rewardId: string;
  hints?: string[];
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
  powerUps: {
    doubleXP: number;
    hint: number;
    extraTime: number;
    autoSolve: number;
  };
}

export interface GalleryItem {
  id: string;
  timestamp: number;
  dataUrl: string;
  title: string;
}
