// src/data/mockFactors.ts
import type { Factor } from '../types';

export const mockFactors: Factor[] = [
  // Stat Factors
  {
    id: 1,
    factor_name: "スピード因子",
    factor_type: "Stat",
    color: "Blue",
    description: "スピードステータスにボーナスを与える",
    effect_value: 10
  },
  {
    id: 2,
    factor_name: "スタミナ因子",
    factor_type: "Stat",
    color: "Red",
    description: "スタミナステータスにボーナスを与える",
    effect_value: 10
  },
  {
    id: 3,
    factor_name: "パワー因子",
    factor_type: "Stat",
    color: "Red",
    description: "パワーステータスにボーナスを与える",
    effect_value: 10
  },
  {
    id: 4,
    factor_name: "根性因子",
    factor_type: "Stat",
    color: "Red",
    description: "根性ステータスにボーナスを与える",
    effect_value: 10
  },
  {
    id: 5,
    factor_name: "賢さ因子",
    factor_type: "Stat",
    color: "Green",
    description: "賢さステータスにボーナスを与える",
    effect_value: 10
  },
  
  // Distance Factors
  {
    id: 6,
    factor_name: "短距離因子",
    factor_type: "Distance",
    color: "Blue",
    description: "短距離レースでの適性を向上させる",
    effect_value: 1
  },
  {
    id: 7,
    factor_name: "マイル因子",
    factor_type: "Distance",
    color: "Blue",
    description: "マイルレースでの適性を向上させる",
    effect_value: 1
  },
  {
    id: 8,
    factor_name: "中距離因子",
    factor_type: "Distance",
    color: "Blue",
    description: "中距離レースでの適性を向上させる",
    effect_value: 1
  },
  {
    id: 9,
    factor_name: "長距離因子",
    factor_type: "Distance",
    color: "Blue",
    description: "長距離レースでの適性を向上させる",
    effect_value: 1
  },
  
  // Surface Factors
  {
    id: 10,
    factor_name: "芝因子",
    factor_type: "Surface",
    color: "Green",
    description: "芝コースでの適性を向上させる",
    effect_value: 1
  },
  {
    id: 11,
    factor_name: "ダート因子",
    factor_type: "Surface",
    color: "Green",
    description: "ダートコースでの適性を向上させる",
    effect_value: 1
  },
  
  // Strategy Factors
  {
    id: 12,
    factor_name: "逃げ因子",
    factor_type: "Strategy",
    color: "White",
    description: "逃げ戦法での適性を向上させる",
    effect_value: 1
  },
  {
    id: 13,
    factor_name: "先行因子",
    factor_type: "Strategy",
    color: "White",
    description: "先行戦法での適性を向上させる",
    effect_value: 1
  },
  {
    id: 14,
    factor_name: "差し因子",
    factor_type: "Strategy",
    color: "White",
    description: "差し戦法での適性を向上させる",
    effect_value: 1
  },
  {
    id: 15,
    factor_name: "追込因子",
    factor_type: "Strategy",
    color: "White",
    description: "追込戦法での適性を向上させる",
    effect_value: 1
  },
  
  // Skill Factors (more rare)
  {
    id: 16,
    factor_name: "スキル因子：末脚",
    factor_type: "Skill",
    color: "White",
    description: "末脚スキルの継承率を向上させる",
    effect_value: 5
  },
  {
    id: 17,
    factor_name: "スキル因子：コーナー回復",
    factor_type: "Skill",
    color: "White",
    description: "コーナー回復系スキルの継承率を向上させる",
    effect_value: 5
  }
];