import React from 'react';
import type { Uma, SupportCard, Skill, Factor } from '../types';

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