// src/data/mockUmas.ts
import type { Uma, UmaSkill } from '../types';

// Data Uma Musume lengkap berdasarkan struktur ERD baru
export const mockUmasData: Uma[] = [
  {
    id: 1,
    name: "Special Week",
    star_initial: 3,
    
    // Stats aptitude
    speed_aptitude: 'B',
    stamina_aptitude: 'A',
    power_aptitude: 'A',
    guts_aptitude: 'B',
    wit_aptitude: 'A',
    
    // Surface aptitude
    turf_aptitude: 'A',
    dirt_aptitude: 'G',
    
    // Distance aptitude
    sprint_aptitude: 'F',
    mile_aptitude: 'A',
    medium_aptitude: 'A',
    long_aptitude: 'A',
    
    // Strategy aptitude
    runner_aptitude: 'F',
    leader_aptitude: 'A',
    betweener_aptitude: 'A',
    chaser_aptitude: 'D',
    
    // UI fields
    imageUrl: "/images/uma/special_week.png",
    description: "日本一のウマ娘になることを夢見る、天真爛漫な少女。"
  },
  {
    id: 2,
    name: "Silence Suzuka",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'A',
    power_aptitude: 'B',
    guts_aptitude: 'B',
    wit_aptitude: 'A',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'G',
    
    sprint_aptitude: 'E',
    mile_aptitude: 'A',
    medium_aptitude: 'B',
    long_aptitude: 'F',
    
    runner_aptitude: 'A',
    leader_aptitude: 'B',
    betweener_aptitude: 'F',
    chaser_aptitude: 'G',
    
    imageUrl: "/images/uma/silence_suzuka.png",
    description: "沈黙の日曜日の伝説を持つ、クールで知的なウマ娘。"
  },
  {
    id: 3,
    name: "Tokai Teio",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'A',
    power_aptitude: 'B',
    guts_aptitude: 'A',
    wit_aptitude: 'B',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'G',
    
    sprint_aptitude: 'D',
    mile_aptitude: 'B',
    medium_aptitude: 'A',
    long_aptitude: 'A',
    
    runner_aptitude: 'G',
    leader_aptitude: 'B',
    betweener_aptitude: 'A',
    chaser_aptitude: 'A',
    
    imageUrl: "/images/uma/tokai_teio.png",
    description: "皇帝と呼ばれる気高き帝王、自信に満ちたウマ娘。"
  },
  {
    id: 4,
    name: "Oguri Cap",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'S',
    power_aptitude: 'A',
    guts_aptitude: 'A',
    wit_aptitude: 'B',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'A',
    
    sprint_aptitude: 'E',
    mile_aptitude: 'A',
    medium_aptitude: 'A',
    long_aptitude: 'B',
    
    runner_aptitude: 'G',
    leader_aptitude: 'F',
    betweener_aptitude: 'A',
    chaser_aptitude: 'A',
    
    imageUrl: "/images/uma/oguri_cap.png",
    description: "怪物と呼ばれた伝説のウマ娘、マイペースな性格。"
  },
  {
    id: 5,
    name: "Gold Ship",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'A',
    power_aptitude: 'A',
    guts_aptitude: 'B',
    wit_aptitude: 'C',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'G',
    
    sprint_aptitude: 'G',
    mile_aptitude: 'F',
    medium_aptitude: 'A',
    long_aptitude: 'A',
    
    runner_aptitude: 'G',
    leader_aptitude: 'G',
    betweener_aptitude: 'B',
    chaser_aptitude: 'A',
    
    imageUrl: "/images/uma/gold_ship.png",
    description: "予測不可能な言動で周囲を驚かせる、天才肌のウマ娘。"
  },
  {
    id: 6,
    name: "Vodka",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'A',
    power_aptitude: 'B',
    guts_aptitude: 'A',
    wit_aptitude: 'B',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'F',
    
    sprint_aptitude: 'F',
    mile_aptitude: 'A',
    medium_aptitude: 'A',
    long_aptitude: 'B',
    
    runner_aptitude: 'G',
    leader_aptitude: 'D',
    betweener_aptitude: 'A',
    chaser_aptitude: 'B',
    
    imageUrl: "/images/uma/vodka.png",
    description: "クールでストイックな努力家、常に完璧を求める。"
  },
  {
    id: 7,
    name: "Daiwa Scarlet",
    star_initial: 3,
    
    speed_aptitude: 'A',
    stamina_aptitude: 'B',
    power_aptitude: 'A',
    guts_aptitude: 'A',
    wit_aptitude: 'B',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'F',
    
    sprint_aptitude: 'F',
    mile_aptitude: 'A',
    medium_aptitude: 'A',
    long_aptitude: 'B',
    
    runner_aptitude: 'G',
    leader_aptitude: 'A',
    betweener_aptitude: 'B',
    chaser_aptitude: 'F',
    
    imageUrl: "/images/uma/daiwa_scarlet.png",
    description: "情熱的で負けず嫌い、常に全力でレースに挑む。"
  },
  {
    id: 8,
    name: "Taiki Shuttle",
    star_initial: 3,
    
    speed_aptitude: 'S',
    stamina_aptitude: 'C',
    power_aptitude: 'A',
    guts_aptitude: 'B',
    wit_aptitude: 'A',
    
    turf_aptitude: 'A',
    dirt_aptitude: 'A',
    
    sprint_aptitude: 'A',
    mile_aptitude: 'A',
    medium_aptitude: 'E',
    long_aptitude: 'F',
    
    runner_aptitude: 'A',
    leader_aptitude: 'A',
    betweener_aptitude: 'F',
    chaser_aptitude: 'G',
    
    imageUrl: "/images/uma/taiki_shuttle.png",
    description: "短距離のスペシャリスト、スピードに特化したウマ娘。"
  }
];

// Uma Skills mapping - skills yang dimiliki setiap Uma
export const mockUmaSkills: UmaSkill[] = [
  // Special Week
  { uma_id: 1, skill_id: 1, skill_category: 'unique' }, // 末脚
  { uma_id: 1, skill_id: 4, skill_category: 'initial' }, // コーナー回復○
  { uma_id: 1, skill_id: 5, skill_category: 'awakening_lv2' }, // 直線一気
  
  // Silence Suzuka
  { uma_id: 2, skill_id: 2, skill_category: 'unique' }, // 大逃げ
  { uma_id: 2, skill_id: 7, skill_category: 'initial' }, // スタミナキープ
  { uma_id: 2, skill_id: 8, skill_category: 'awakening_lv3' }, // 円弧のマエストロ
  
  // Tokai Teio
  { uma_id: 3, skill_id: 3, skill_category: 'unique' }, // 勝利への執念
  { uma_id: 3, skill_id: 6, skill_category: 'initial' }, // 先頭プライド
  { uma_id: 3, skill_id: 10, skill_category: 'awakening_lv2' }, // アガってきた!
  
  // Oguri Cap
  { uma_id: 4, skill_id: 7, skill_category: 'initial' }, // スタミナキープ
  { uma_id: 4, skill_id: 9, skill_category: 'awakening_lv4' }, // 弧線のプロフェッサー
  
  // Gold Ship
  { uma_id: 5, skill_id: 4, skill_category: 'initial' }, // コーナー回復○
  { uma_id: 5, skill_id: 8, skill_category: 'awakening_lv3' }, // 円弧のマエストロ
  
  // Vodka
  { uma_id: 6, skill_id: 5, skill_category: 'initial' }, // 直線一気
  { uma_id: 6, skill_id: 6, skill_category: 'awakening_lv2' }, // 先頭プライド
  
  // Daiwa Scarlet
  { uma_id: 7, skill_id: 6, skill_category: 'initial' }, // 先頭プライド
  { uma_id: 7, skill_id: 10, skill_category: 'awakening_lv3' }, // アガってきた!
  
  // Taiki Shuttle
  { uma_id: 8, skill_id: 5, skill_category: 'initial' }, // 直線一気
  { uma_id: 8, skill_id: 8, skill_category: 'awakening_lv2' }, // 円弧のマエストロ
];

// Utility function untuk mendapatkan skills Uma
export const getUmaSkills = (umaId: number) => {
  return mockUmaSkills.filter(us => us.uma_id === umaId);
};