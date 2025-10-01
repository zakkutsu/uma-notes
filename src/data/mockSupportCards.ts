// src/data/mockSupportCards.ts
import type { SupportCard } from '../types';

export const mockSupportCards: SupportCard[] = [
  // SSR Support Cards
  {
    id: 1,
    card_name: "[迫る熱に押されて] キタサンブラック",
    rarity: "SSR",
    card_type: "Speed",
    imageUrl: "/images/support/kitasan_black_ssr.jpg",
    max_level: 50,
    base_stats: {
      speed: 20,
      stamina: 0,
      power: 10,
      guts: 0,
      wit: 10
    }
  },
  {
    id: 2,
    card_name: "[袖振り合えば福となる♪] マチカネフクキタル",
    rarity: "SSR",
    card_type: "Stamina",
    imageUrl: "/images/support/machikane_fukukitaru_ssr.jpg",
    max_level: 50,
    base_stats: {
      speed: 0,
      stamina: 20,
      power: 10,
      guts: 10,
      wit: 0
    }
  },
  {
    id: 3,
    card_name: "[一粒の安らぎ] スーパークリーク",
    rarity: "SSR",
    card_type: "Power",
    imageUrl: "/images/support/super_creek_ssr.jpg",
    max_level: 50,
    base_stats: {
      speed: 10,
      stamina: 0,
      power: 20,
      guts: 10,
      wit: 0
    }
  },
  {
    id: 4,
    card_name: "[夕焼けはあこがれの色] スペシャルウィーク",
    rarity: "SSR",
    card_type: "Guts",
    imageUrl: "/images/support/special_week_ssr.jpg",
    max_level: 50,
    base_stats: {
      speed: 0,
      stamina: 10,
      power: 0,
      guts: 20,
      wit: 10
    }
  },
  {
    id: 5,
    card_name: "[感謝は指先まで込めて] ファインモーション",
    rarity: "SSR",
    card_type: "Wit",
    imageUrl: "/images/support/fine_motion_ssr.jpg",
    max_level: 50,
    base_stats: {
      speed: 10,
      stamina: 0,
      power: 0,
      guts: 10,
      wit: 20
    }
  },
  
  // SR Support Cards
  {
    id: 6,
    card_name: "[一等星を目指して] アドマイヤベガ",
    rarity: "SR",
    card_type: "Speed",
    imageUrl: "/images/support/admire_vega_sr.jpg",
    max_level: 45,
    base_stats: {
      speed: 15,
      stamina: 0,
      power: 5,
      guts: 0,
      wit: 5
    }
  },
  {
    id: 7,
    card_name: "[鍛え抜くトモ] ミホノブルボン",
    rarity: "SR",
    card_type: "Stamina",
    imageUrl: "/images/support/mihono_bourbon_sr.jpg",
    max_level: 45,
    base_stats: {
      speed: 0,
      stamina: 15,
      power: 5,
      guts: 5,
      wit: 0
    }
  },
  {
    id: 8,
    card_name: "[テッペンに立て!] ヒシアマゾン",
    rarity: "SR",
    card_type: "Power",
    imageUrl: "/images/support/hishi_amazon_sr.jpg",
    max_level: 45,
    base_stats: {
      speed: 5,
      stamina: 0,
      power: 15,
      guts: 5,
      wit: 0
    }
  },
  
  // Friend Cards
  {
    id: 9,
    card_name: "[徹底管理主義] 樫本理子",
    rarity: "SSR",
    card_type: "Friend",
    imageUrl: "/images/support/kashimoto_riko.jpg",
    max_level: 50
  },
  {
    id: 10,
    card_name: "[L'aubeは迫りて] 佐岳メイ",
    rarity: "SR",
    card_type: "Friend",
    imageUrl: "/images/support/sadake_mei.jpg",
    max_level: 45
  },
  
  // Group Cards
  {
    id: 11,
    card_name: "[チーム<シリウス>] ユニットカード",
    rarity: "SSR",
    card_type: "Group",
    imageUrl: "/images/support/team_sirius.jpg",
    max_level: 50
  }
];