
export type ModuleId = 'color' | 'math' | 'english' | 'geo' | 'science' | 'reading';
export type LevelType = 'paint' | 'quiz' | 'math-master' | 'lingua-flow' | 'science-lab' | 'reading-adventure' | 'art-technique';
export type DrawingTool = 'brush' | 'pencil' | 'magic' | 'eraser' | 'fill';
export type BrushShape = 'round' | 'square';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface Level {
  id: string;
  moduleId: ModuleId;
  type: LevelType;
  index: number;
  objective: string;
  help: string;
  question?: string;
  visual?: string; 
  answer?: any;
  options?: QuizOption[];
  mathData?: { op: string; v1: number; v2: number; obj?: string };
  scientificData?: { hiddenItems: any[] };
  readingData?: any;
  artData?: any;
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
  totalPoints: number;
  gallery: any[];
  powerUps: any;
}
