// src/data/index.ts
// Central export untuk semua mock data

// Export types
export type { 
  Uma, 
  Skill, 
  SupportCard, 
  Factor, 
  TrainedUma,
  UmaSkill,
  SupportCardSkill,
  TrainedUmaFactor,
  TrainedUmaAcquiredSkill,
  UmaWithSkills,
  SupportCardWithSkills,
  TrainedUmaDetailed,
  UmaFilters,
  SkillFilters,
  SupportCardFilters,
  AptitudeRating,
  SkillRarity,
  SkillType,
  SupportCardRarity,
  SupportCardType,
  FactorType,
  FactorColor
} from '../types';

// Export data
export { mockUmasData, mockUmaSkills, getUmaSkills } from './mockUmas';
export { mockSkills } from './mockSkills';
export { mockSupportCards } from './mockSupportCards';
export { mockFactors } from './mockFactors';

// Import untuk digunakan dalam utility functions
import { mockSkills } from './mockSkills';
import { mockUmasData } from './mockUmas';
import { mockSupportCards } from './mockSupportCards';
import { mockFactors } from './mockFactors';

// Additional mock data untuk relasi
import type { SupportCardSkill } from '../types';

// Support Card Skills mapping
export const mockSupportCardSkills: SupportCardSkill[] = [
  // Kitasan Black SSR - Speed card
  { support_card_id: 1, skill_id: 5 }, // 直線一気
  { support_card_id: 1, skill_id: 6 }, // 先頭プライド
  
  // Machikane Fukukitaru SSR - Stamina card
  { support_card_id: 2, skill_id: 4 }, // コーナー回復○
  { support_card_id: 2, skill_id: 7 }, // スタミナキープ
  
  // Super Creek SSR - Power card
  { support_card_id: 3, skill_id: 8 }, // 円弧のマエストロ
  { support_card_id: 3, skill_id: 10 }, // アガってきた!
  
  // Special Week SSR - Guts card
  { support_card_id: 4, skill_id: 1 }, // 末脚
  { support_card_id: 4, skill_id: 4 }, // コーナー回復○
  
  // Fine Motion SSR - Wit card
  { support_card_id: 5, skill_id: 9 }, // 弧線のプロフェッサー
  { support_card_id: 5, skill_id: 7 }, // スタミナキープ
  
  // SR Cards have fewer skills
  { support_card_id: 6, skill_id: 5 }, // Admire Vega - 直線一気
  { support_card_id: 7, skill_id: 4 }, // Mihono Bourbon - コーナー回復○
  { support_card_id: 8, skill_id: 10 }, // Hishi Amazon - アガってきた!
];

// Utility functions
export const getSupportCardSkills = (supportCardId: number) => {
  return mockSupportCardSkills.filter(scs => scs.support_card_id === supportCardId);
};

export const getSkillById = (skillId: number) => {
  return mockSkills.find(skill => skill.id === skillId);
};

export const getUmaById = (umaId: number) => {
  return mockUmasData.find(uma => uma.id === umaId);
};

export const getSupportCardById = (supportCardId: number) => {
  return mockSupportCards.find(card => card.id === supportCardId);
};

export const getFactorById = (factorId: number) => {
  return mockFactors.find(factor => factor.id === factorId);
};