// --- Core Types ---

export interface Uma {
  id: number;
  name: string;
  rarity: number;
  imgUrl: string;
}

export interface SupportCard {
  id: number;
  name: string;
  type: 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Intellect' | 'Friend';
  imgUrl: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: 'speed' | 'stamina' | 'power' | 'guts' | 'intellect' | 'unique';
  description: string;
  imageUrl?: string;
}

export interface Factor {
  id: number;
  name: string;
  stars: number;
  type: 'Turf' | 'Speed' | 'Power' | 'URA';
}

export interface TrainedUma {
  id: number;
  name: string;
  rarity: number;
  imgUrl: string;
  level: number;
  stats: {
    speed: number;
    stamina: number;
    power: number;
    guts: number;
    intellect: number;
  };
  rank: 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
}

export type Page = 'home' | 'progress' | 'view-all';

// --- Navigation Types ---
export interface NavigationMaps {
  home: { [key: string]: string };
  progress: { [key: string]: string };
}

// --- Component Props Types ---
export interface HeaderProps {
  onNavigate: (page: Page, targetId?: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  activeProgressNav: string;
  setActiveProgressNav: (nav: string) => void;
  currentPage: Page;
}

export interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

export interface PageProps {
  onNavigate: (page: Page, targetId?: string) => void;
  setActiveNav: (nav: string) => void;
}

export interface ProgressPageProps {
  onNavigate: (page: Page, targetId?: string) => void;
  setActiveProgressNav: (nav: string) => void;
}