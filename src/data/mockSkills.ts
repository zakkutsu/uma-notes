// src/data/mockSkills.ts
import type { Skill } from '../types';

export const mockSkills: Skill[] = [
  // Unique Skills
  {
    id: 1,
    skill_name: "末脚",
    skill_effect: "直線で速度がわずかに上がる",
    skill_rarity: "Unique",
    skill_type: "Speed",
    iconUrl: "/icons/skills/suashi.png"
  },
  {
    id: 2,
    skill_name: "大逃げ",
    skill_effect: "スタート時に前の方の位置取りしやすくなる<br>かかりにくくなる",
    skill_rarity: "Unique",
    skill_type: "Position",
    iconUrl: "/icons/skills/dainage.png"
  },
  {
    id: 3,
    skill_name: "勝利への執念",
    skill_effect: "レース終盤に順位が上がりにくくなる状態の時、わずかに持久力が回復する",
    skill_rarity: "Unique",
    skill_type: "Recovery",
    iconUrl: "/icons/skills/victory_will.png"
  },
  
  // Common Skills - Speed type
  {
    id: 4,
    skill_name: "コーナー回復○",
    skill_effect: "コーナーで持久力がわずかに回復する",
    skill_rarity: "Normal",
    skill_type: "Recovery",
    iconUrl: "/icons/skills/corner_recovery.png"
  },
  {
    id: 5,
    skill_name: "直線一気",
    skill_effect: "直線で加速力がわずかに上がる",
    skill_rarity: "Normal",
    skill_type: "Acceleration",
    iconUrl: "/icons/skills/straight_rush.png"
  },
  {
    id: 6,
    skill_name: "先頭プライド",
    skill_effect: "1位でレースしている時わずかに能力が上がる",
    skill_rarity: "Rare",
    skill_type: "Buff",
    iconUrl: "/icons/skills/leader_pride.png"
  },
  
  // More skills
  {
    id: 7,
    skill_name: "スタミナキープ",
    skill_effect: "持久力の消費をわずかに抑える",
    skill_rarity: "Normal",
    skill_type: "Passive",
    iconUrl: "/icons/skills/stamina_keep.png"
  },
  {
    id: 8,
    skill_name: "円弧のマエストロ",
    skill_effect: "コーナーが得意になり速度がわずかに上がる",
    skill_rarity: "Rare",
    skill_type: "Speed",
    iconUrl: "/icons/skills/arc_maestro.png"
  },
  {
    id: 9,
    skill_name: "弧線のプロフェッサー",
    skill_effect: "コーナーがとても得意になり速度が上がる",
    skill_rarity: "Rare",
    skill_type: "Speed",
    iconUrl: "/icons/skills/arc_professor.png"
  },
  {
    id: 10,
    skill_name: "アガってきた!",
    skill_effect: "最終コーナーで前の方にいる時、加速力がわずかに上がる",
    skill_rarity: "Normal",
    skill_type: "Acceleration",
    iconUrl: "/icons/skills/agatte_kita.png"
  }
];