import React from 'react';
import type { Uma, SupportCard, Skill, Factor, TrainedUma } from '../types';

export const UmaCard: React.FC<Uma> = ({ name, rarity, imgUrl }) => (
  <div className="card-hover-effect group">
    <img 
      src={imgUrl} 
      alt={name} 
      className="w-full h-auto object-cover rounded-t-lg" 
    />
    <div className="p-4">
      <h3 className="font-bold text-lg text-gray-800 group-hover:text-uma-blue transition-colors">
        {name}
      </h3>
      <div className="flex mt-1">
        {'★'.repeat(rarity).padEnd(5, '☆')}
      </div>
    </div>
  </div>
);

export const SupportCardCard: React.FC<SupportCard> = ({ name, type, imgUrl }) => (
  <div className="card-hover-effect group">
    <img 
      src={imgUrl} 
      alt={name} 
      className="w-full h-auto object-cover rounded-t-lg" 
    />
    <div className="p-4">
      <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white bg-${type.toLowerCase()}-tag`}>
        {type}
      </span>
      <h3 className="font-bold text-lg text-gray-800 mt-2 group-hover:text-uma-blue transition-colors">
        {name}
      </h3>
    </div>
  </div>
);

export const SkillCard: React.FC<Skill> = ({ name, icon, description, imageUrl }) => (
  <div className="card p-4 flex flex-col items-center text-center group card-hover-effect h-full">
    <div className="w-16 h-16 rounded-lg flex-shrink-0 mb-3 overflow-hidden flex items-center justify-center bg-gray-200">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`${name} icon`} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className={`w-full h-full bg-${icon}-tag flex items-center justify-center text-white font-bold text-2xl`}>
          {icon.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
    <h3 className="font-bold text-lg text-gray-800 group-hover:text-uma-blue transition-colors">
      {name}
    </h3>
    <p className="text-gray-500 text-sm mt-1 flex-grow">
      {description}
    </p>
  </div>
);

export const FactorCard: React.FC<Factor> = ({ name, stars, type }) => (
  <div className="card p-4 text-center group card-hover-effect">
    <h3 className="font-bold text-lg text-gray-800 group-hover:text-uma-blue transition-colors">
      {name}
    </h3>
    <div className="flex justify-center mt-2 text-yellow-400 text-xl">
      {'★'.repeat(stars).padEnd(3, '☆')}
    </div>
    <span className="text-xs font-semibold mt-3 inline-block px-2 py-1 rounded-full text-white bg-gray-500">
      {type}
    </span>
  </div>
);

export const TrainedUmaCard: React.FC<TrainedUma> = ({ name, rarity, imgUrl, level, stats, rank }) => {
  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'SS': return 'text-purple-600 bg-purple-100';
      case 'S': return 'text-red-600 bg-red-100';
      case 'A': return 'text-orange-600 bg-orange-100';
      case 'B': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 1200) return 'text-red-600';
    if (value >= 1000) return 'text-orange-600';
    if (value >= 800) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-105">
      <div className="relative">
        <img 
          src={imgUrl} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {[...Array(rarity)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">⭐</span>
          ))}
        </div>
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-bold ${getRankColor(rank)}`}>
          {rank}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          Lv.{level}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{name}</h3>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Speed:</span>
            <span className={`font-semibold ${getStatColor(stats.speed)}`}>{stats.speed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stamina:</span>
            <span className={`font-semibold ${getStatColor(stats.stamina)}`}>{stats.stamina}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Power:</span>
            <span className={`font-semibold ${getStatColor(stats.power)}`}>{stats.power}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guts:</span>
            <span className={`font-semibold ${getStatColor(stats.guts)}`}>{stats.guts}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Intellect:</span>
            <span className={`font-semibold ${getStatColor(stats.intellect)}`}>{stats.intellect}</span>
          </div>
        </div>
      </div>
    </div>
  );
};