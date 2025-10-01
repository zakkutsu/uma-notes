// src/types/index.ts
// TypeScript interfaces berdasarkan ERD yang diperbaiki

// Enums untuk aptitude ratings
export type AptitudeRating = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

// Enums untuk skill types
export type SkillRarity = 'Normal' | 'Rare' | 'Unique';
export type SkillType = 'Recovery' | 'Speed' | 'Acceleration' | 'Position' | 'Debuff' | 'Buff' | 'Passive';

// Enums untuk support card types  
export type SupportCardRarity = 'SSR' | 'SR' | 'R';
export type SupportCardType = 'Speed' | 'Stamina' | 'Power' | 'Guts' | 'Wit' | 'Friend' | 'Group';

// Enums untuk factor types
export type FactorType = 'Stat' | 'Distance' | 'Surface' | 'Strategy' | 'Skill';
export type FactorColor = 'Blue' | 'Red' | 'Green' | 'White';

// 1. Umas - Master Karakter Uma Musume
export interface Uma {
  id: number;
  name: string;
  star_initial: number; // Star rating awal (1-3)
  
  // Stats aptitude
  speed_aptitude: AptitudeRating;
  stamina_aptitude: AptitudeRating;
  power_aptitude: AptitudeRating;
  guts_aptitude: AptitudeRating;
  wit_aptitude: AptitudeRating;
  
  // Surface aptitude
  turf_aptitude: AptitudeRating;
  dirt_aptitude: AptitudeRating;
  
  // Distance aptitude
  sprint_aptitude: AptitudeRating;
  mile_aptitude: AptitudeRating;
  medium_aptitude: AptitudeRating;
  long_aptitude: AptitudeRating;
  
  // Strategy aptitude
  runner_aptitude: AptitudeRating;
  leader_aptitude: AptitudeRating;
  betweener_aptitude: AptitudeRating;
  chaser_aptitude: AptitudeRating;
  
  // Additional UI fields
  imageUrl?: string;
  description?: string;
}

// 2. Skills - Master Semua Skill
export interface Skill {
  id: number;
  skill_name: string;
  skill_effect: string;
  skill_rarity: SkillRarity;
  skill_type: SkillType;
  
  // Additional UI fields
  iconUrl?: string;
  cooldown?: number; // untuk skill aktif
  duration?: number; // untuk skill buff/debuff
}

// 3. SupportCards - Master Support Card
export interface SupportCard {
  id: number;
  card_name: string;
  rarity: SupportCardRarity;
  card_type: SupportCardType;
  
  // Additional UI fields
  imageUrl?: string;
  max_level?: number;
  base_stats?: {
    speed?: number;
    stamina?: number;
    power?: number;
    guts?: number;
    wit?: number;
  };
}

// 4. Factors - Master Faktor Warisan/Legacy
export interface Factor {
  id: number;
  factor_name: string;
  factor_type: FactorType;
  color: FactorColor;
  
  // Additional UI fields
  description?: string;
  effect_value?: number; // nilai efek faktor
}

// 5. Uma_Skills - Skill bawaan Uma
export interface UmaSkill {
  uma_id: number;
  skill_id: number;
  skill_category: 'unique' | 'initial' | 'awakening_lv2' | 'awakening_lv3' | 'awakening_lv4' | 'awakening_lv5';
}

// 6. SupportCard_Skills - Skill yang diberikan Support Card
export interface SupportCardSkill {
  support_card_id: number;
  skill_id: number;
}

// 7. TrainedUmas - Uma hasil pelatihan
export interface TrainedUma {
  id: number;
  base_uma_id: number;
  nickname?: string;
  
  // Stats akhir
  final_speed: number;
  final_stamina: number;
  final_power: number;
  final_guts: number;
  final_wit: number;
  
  // Parent references
  parent1_id?: number;
  parent2_id?: number;
  
  // Additional training info
  training_date?: Date;
  trainer_name?: string;
}

// 8. TrainedUma_Factors - Faktor yang dimiliki Uma hasil latihan
export interface TrainedUmaFactor {
  trained_uma_id: number;
  factor_id: number;
  star_rating: 1 | 2 | 3; // bintang faktor
}

// 9. TrainedUma_AcquiredSkills - Skill yang dipelajari Uma hasil latihan
export interface TrainedUmaAcquiredSkill {
  trained_uma_id: number;
  skill_id: number;
  skill_level?: number; // level skill yang dipelajari
}

// Extended interfaces untuk UI dengan relasi
export interface UmaWithSkills extends Uma {
  skills: Array<Skill & { category: UmaSkill['skill_category'] }>;
}

export interface SupportCardWithSkills extends SupportCard {
  skills: Skill[];
}

export interface TrainedUmaDetailed extends TrainedUma {
  base_uma: Uma;
  factors: Array<Factor & { star_rating: number }>;
  acquired_skills: Array<Skill & { skill_level?: number }>;
  parent1?: TrainedUmaDetailed;
  parent2?: TrainedUmaDetailed;
}

// Filter interfaces untuk UI
export interface UmaFilters {
  name?: string;
  star_initial?: number[];
  aptitudes?: {
    speed?: AptitudeRating[];
    stamina?: AptitudeRating[];
    power?: AptitudeRating[];
    guts?: AptitudeRating[];
    wit?: AptitudeRating[];
    turf?: AptitudeRating[];
    dirt?: AptitudeRating[];
    sprint?: AptitudeRating[];
    mile?: AptitudeRating[];
    medium?: AptitudeRating[];
    long?: AptitudeRating[];
    runner?: AptitudeRating[];
    leader?: AptitudeRating[];
    betweener?: AptitudeRating[];
    chaser?: AptitudeRating[];
  };
  skills?: number[]; // skill IDs
}

export interface SkillFilters {
  name?: string;
  skill_rarity?: SkillRarity[];
  skill_type?: SkillType[];
}

export interface SupportCardFilters {
  name?: string;
  rarity?: SupportCardRarity[];
  card_type?: SupportCardType[];
  skills?: number[]; // skill IDs
}