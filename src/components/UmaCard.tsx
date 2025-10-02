// src/components/UmaCard.tsx
import { Link } from 'react-router-dom';
import type { Uma } from '../data';

type UmaCardProps = Uma;

export const UmaCard = ({ 
  id, name, imageUrl, star_initial, 
  speed_aptitude, stamina_aptitude, power_aptitude, guts_aptitude, wit_aptitude,
  turf_aptitude, dirt_aptitude, 
  sprint_aptitude, mile_aptitude, medium_aptitude, long_aptitude,
  runner_aptitude, leader_aptitude, betweener_aptitude, chaser_aptitude,
  description 
}: UmaCardProps) => {
  return (
    <Link to={`/uma/${id}`} className="block no-underline text-inherit">
      <div className="card h-full flex flex-col text-center hover:scale-105 transition-transform duration-200 cursor-pointer">
        {/* Image */}
        <div className="flex justify-center mb-3">
          <img 
            src={imageUrl || 'https://via.placeholder.com/150'} 
            alt={name} 
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
          />
        </div>
        
        {/* Name */}
        <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight min-h-[2.5em] flex items-center justify-center px-1">
          {name}
        </h3>
        
        {/* Star Rating */}
        <div className="mb-3">
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            ★{star_initial} Star
          </span>
        </div>
        
        {/* Stats Aptitudes */}
        <div className="mb-4 flex-1">
          <div className="text-xs font-bold mb-1 text-gray-700">Stats</div>
          <div className="grid grid-cols-5 gap-1 text-xs">
            <span className={`aptitude-${speed_aptitude.toLowerCase()} font-semibold`}>Sp:{speed_aptitude}</span>
            <span className={`aptitude-${stamina_aptitude.toLowerCase()} font-semibold`}>St:{stamina_aptitude}</span>
            <span className={`aptitude-${power_aptitude.toLowerCase()} font-semibold`}>Pw:{power_aptitude}</span>
            <span className={`aptitude-${guts_aptitude.toLowerCase()} font-semibold`}>Gt:{guts_aptitude}</span>
            <span className={`aptitude-${wit_aptitude.toLowerCase()} font-semibold`}>Wt:{wit_aptitude}</span>
          </div>
        </div>
        
        {/* Surface & Distance */}
        <div className="mb-4">
          <div className="text-xs font-bold mb-1 text-gray-700">Surface & Distance</div>
          <div className="grid grid-cols-3 gap-1 text-xs mb-1">
            <span className={`aptitude-${turf_aptitude.toLowerCase()} font-semibold`}>芝:{turf_aptitude}</span>
            <span className={`aptitude-${dirt_aptitude.toLowerCase()} font-semibold`}>ダ:{dirt_aptitude}</span>
            <span></span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-xs">
            <span className={`aptitude-${sprint_aptitude.toLowerCase()} font-semibold`}>短:{sprint_aptitude}</span>
            <span className={`aptitude-${mile_aptitude.toLowerCase()} font-semibold`}>マ:{mile_aptitude}</span>
            <span className={`aptitude-${medium_aptitude.toLowerCase()} font-semibold`}>中:{medium_aptitude}</span>
            <span className={`aptitude-${long_aptitude.toLowerCase()} font-semibold`}>長:{long_aptitude}</span>
          </div>
        </div>
        
        {/* Strategy Aptitudes */}
        <div className="mb-3">
          <div className="text-xs font-bold mb-1 text-gray-700">Strategy</div>
          <div className="grid grid-cols-4 gap-1 text-xs">
            <span className={`aptitude-${runner_aptitude.toLowerCase()} font-semibold`}>逃:{runner_aptitude}</span>
            <span className={`aptitude-${leader_aptitude.toLowerCase()} font-semibold`}>先:{leader_aptitude}</span>
            <span className={`aptitude-${betweener_aptitude.toLowerCase()} font-semibold`}>差:{betweener_aptitude}</span>
            <span className={`aptitude-${chaser_aptitude.toLowerCase()} font-semibold`}>追:{chaser_aptitude}</span>
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-xs text-gray-600 mt-auto line-clamp-2 overflow-hidden leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};