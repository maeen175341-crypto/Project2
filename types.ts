
export interface Wisdom {
  text: string;
  author: string;
  source: string;
  moodColor: string;
  category?: string; // المجال أو الموضوع
}

export interface Contemplation {
  surfaceMeaning: string;
  deepMeaning: string;
  practicalApplication: string;
}

export enum AppState {
  INTRO = 'INTRO',
  SUMMONING = 'SUMMONING',
  REVELATION = 'REVELATION',
  CONTEMPLATION = 'CONTEMPLATION',
  LEGACY = 'LEGACY'
}

export interface LegacyEntry {
  id: string;
  content: string;
  authorName: string;
  status: 'pending' | 'approved';
  timestamp: number;
}
