// src/components/SupportCardCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { SupportCard } from '../data';

type SupportCardCardProps = SupportCard;

// Helper function untuk warna berdasarkan rarity
const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    'SSR': 'bg-red-500',
    'SR': 'bg-teal-500', 
    'R': 'bg-green-500'
  };
  return colors[rarity] || 'bg-gray-400';
};

// Helper function untuk warna berdasarkan card type
const getCardTypeColor = (cardType: string) => {
  const colors: Record<string, string> = {
    'Speed': 'bg-red-500',
    'Stamina': 'bg-teal-500',
    'Power': 'bg-blue-500',
    'Guts': 'bg-green-500',
    'Wit': 'bg-yellow-500',
    'Friend': 'bg-pink-500',
    'Group': 'bg-red-400'
  };
  return colors[cardType] || 'bg-gray-400';
};

export const SupportCardCard = ({ 
  id, card_name, rarity, card_type, imageUrl, max_level, base_stats 
}: SupportCardCardProps) => {
  return (
    <Link to={`/support-cards/${id}`} className="block no-underline text-inherit">
      <div className="card h-full flex flex-col text-center hover:scale-105 transition-transform duration-200 cursor-pointer relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          <span className={`${getCardTypeColor(card_type)} text-white px-2 py-1 rounded text-xs font-bold`}>
            {card_type}
          </span>
          <span className={`${getRarityColor(rarity)} text-white px-2 py-1 rounded text-xs font-bold`}>
            {rarity}
          </span>
        </div>
        
        {/* Image */}
        <div className="flex justify-center mt-8 mb-3">
          <img 
            src={imageUrl || 'https://via.placeholder.com/200x280'} 
            alt={card_name} 
            className="w-full max-w-44 h-60 object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Card Name */}
        <h3 className="text-sm sm:text-base font-semibold mb-3 leading-tight min-h-[2.6em] flex items-center justify-center px-2 line-clamp-2">
          {card_name}
        </h3>
        
        {/* Max Level */}
        {max_level && (
          <div className="mb-3">
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              Max Level: {max_level}
            </span>
          </div>
        )}
        
        {/* Base stats untuk non-Friend/Group cards */}
        {base_stats && card_type !== 'Friend' && card_type !== 'Group' && (
          <div className="mb-3 flex-1 flex flex-col justify-end">
            <div className="text-xs font-bold mb-2 text-gray-700">Base Stats</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {base_stats.speed && base_stats.speed > 0 && (
                <span className="text-red-500 font-semibold">Sp: +{base_stats.speed}</span>
              )}
              {base_stats.stamina && base_stats.stamina > 0 && (
                <span className="text-teal-500 font-semibold">St: +{base_stats.stamina}</span>
              )}
              {base_stats.power && base_stats.power > 0 && (
                <span className="text-blue-500 font-semibold">Pw: +{base_stats.power}</span>
              )}
              {base_stats.guts && base_stats.guts > 0 && (
                <span className="text-green-500 font-semibold">Gt: +{base_stats.guts}</span>
              )}
              {base_stats.wit && base_stats.wit > 0 && (
                <span className="text-yellow-500 font-semibold">Wt: +{base_stats.wit}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};