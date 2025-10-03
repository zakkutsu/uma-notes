import type { Uma, SupportCard, Skill, Factor, TrainedUma } from '../types';

// --- Placeholder Data ---
export const featuredUmas: Uma[] = [
  { 
    id: 1, 
    name: 'Special Week', 
    rarity: 3, 
    imgUrl: 'https://placehold.co/400x600/a3bfb2/ffffff?text=Special+Week' 
  },
  { 
    id: 2, 
    name: 'Silence Suzuka', 
    rarity: 3, 
    imgUrl: 'https://placehold.co/400x600/d1b3b5/ffffff?text=Silence+Suzuka' 
  },
  { 
    id: 3, 
    name: 'Tokai Teio', 
    rarity: 3, 
    imgUrl: 'https://placehold.co/400x600/b3c5d1/ffffff?text=Tokai+Teio' 
  },
  { 
    id: 4, 
    name: 'Gold Ship', 
    rarity: 3, 
    imgUrl: 'https://placehold.co/400x600/d1c3b3/ffffff?text=Gold+Ship' 
  },
];

export const featuredSupportCards: SupportCard[] = [
  { 
    id: 1, 
    name: 'Kitasan Black', 
    type: 'Speed', 
    imgUrl: 'https://placehold.co/400x300/c7b2a5/ffffff?text=Kitasan+Black' 
  },
  { 
    id: 2, 
    name: 'Tazuna', 
    type: 'Friend', 
    imgUrl: 'https://placehold.co/400x300/a5c7b2/ffffff?text=Tazuna' 
  },
  { 
    id: 3, 
    name: 'Super Creek', 
    type: 'Stamina', 
    imgUrl: 'https://placehold.co/400x300/b2a5c7/ffffff?text=Super+Creek' 
  },
];

export const featuredSkills: Skill[] = [
  { 
    id: 1, 
    name: 'Arc Maestro', 
    icon: 'stamina', 
    description: 'Greatly recovers stamina on a corner.', 
    imageUrl: 'https://placehold.co/128x128/f97316/ffffff?text=Recovery' 
  },
  { 
    id: 2, 
    name: 'Angry Waves', 
    icon: 'unique', 
    description: 'Increases speed towards the end of the race.', 
    imageUrl: 'https://placehold.co/128x128/a855f7/ffffff?text=Speed' 
  },
  { 
    id: 3, 
    name: 'Concentration', 
    icon: 'intellect', 
    description: 'Improves starting gate exit.', 
    imageUrl: 'https://placehold.co/128x128/22c55e/ffffff?text=Start' 
  },
];

export const featuredFactors: Factor[] = [
  { id: 1, name: 'URA Scenario', stars: 3, type: 'URA' },
  { id: 2, name: 'Turf Aptitude', stars: 2, type: 'Turf' },
  { id: 3, name: 'Speed Boost', stars: 1, type: 'Speed' },
  { id: 4, name: 'Power Inheritance', stars: 3, type: 'Power' },
];

export const featuredTrainedUmas: TrainedUma[] = [
  {
    id: 1,
    name: 'Special Week',
    rarity: 3,
    imgUrl: 'https://placehold.co/256x384/3b82f6/ffffff?text=Special+Week',
    level: 50,
    stats: { speed: 1200, stamina: 1000, power: 900, guts: 800, intellect: 1100 },
    rank: 'S'
  },
  {
    id: 2,
    name: 'Silence Suzuka',
    rarity: 3,
    imgUrl: 'https://placehold.co/256x384/8b5cf6/ffffff?text=Silence+Suzuka',
    level: 45,
    stats: { speed: 1300, stamina: 800, power: 950, guts: 750, intellect: 1050 },
    rank: 'A'
  },
  {
    id: 3,
    name: 'Tokai Teio',
    rarity: 3,
    imgUrl: 'https://placehold.co/256x384/f59e0b/ffffff?text=Tokai+Teio',
    level: 48,
    stats: { speed: 1100, stamina: 1100, power: 1000, guts: 900, intellect: 950 },
    rank: 'A'
  },
  {
    id: 4,
    name: 'Vodka',
    rarity: 2,
    imgUrl: 'https://placehold.co/256x384/ef4444/ffffff?text=Vodka',
    level: 42,
    stats: { speed: 1000, stamina: 950, power: 1050, guts: 850, intellect: 900 },
    rank: 'B'
  },
];