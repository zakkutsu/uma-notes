// src/components/UmaCard.tsx
import { Link } from 'react-router-dom';
import type { Uma } from '../data';
import '../styles/responsive.css';

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
    <Link to={`/uma/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card uma-card">
        <img 
          src={imageUrl || 'https://via.placeholder.com/150'} 
          alt={name} 
          className="uma-card-image"
        />
        
        <h3 className="uma-card-name">{name}</h3>
        
        <div className="uma-card-star">
          <span>★{star_initial} Star</span>
        </div>
        
        {/* Stats Aptitudes */}
        <div className="uma-card-stats">
          <div className="uma-card-section-title">Stats</div>
          <div className="uma-card-stats-grid">
            <span className={`aptitude-${speed_aptitude.toLowerCase()}`}>Sp:{speed_aptitude}</span>
            <span className={`aptitude-${stamina_aptitude.toLowerCase()}`}>St:{stamina_aptitude}</span>
            <span className={`aptitude-${power_aptitude.toLowerCase()}`}>Pw:{power_aptitude}</span>
            <span className={`aptitude-${guts_aptitude.toLowerCase()}`}>Gt:{guts_aptitude}</span>
            <span className={`aptitude-${wit_aptitude.toLowerCase()}`}>Wt:{wit_aptitude}</span>
          </div>
        </div>
        
        {/* Surface & Distance */}
        <div className="uma-card-surface">
          <div className="uma-card-section-title">Surface & Distance</div>
          <div className="uma-card-surface-grid">
            <span className={`aptitude-${turf_aptitude.toLowerCase()}`}>芝:{turf_aptitude}</span>
            <span className={`aptitude-${dirt_aptitude.toLowerCase()}`}>ダ:{dirt_aptitude}</span>
            <span></span>
          </div>
          <div className="uma-card-distance-grid">
            <span className={`aptitude-${sprint_aptitude.toLowerCase()}`}>短:{sprint_aptitude}</span>
            <span className={`aptitude-${mile_aptitude.toLowerCase()}`}>マ:{mile_aptitude}</span>
            <span className={`aptitude-${medium_aptitude.toLowerCase()}`}>中:{medium_aptitude}</span>
            <span className={`aptitude-${long_aptitude.toLowerCase()}`}>長:{long_aptitude}</span>
          </div>
        </div>
        
        {/* Strategy Aptitudes */}
        <div className="uma-card-strategy">
          <div className="uma-card-section-title">Strategy</div>
          <div className="uma-card-strategy-grid">
            <span className={`aptitude-${runner_aptitude.toLowerCase()}`}>逃:{runner_aptitude}</span>
            <span className={`aptitude-${leader_aptitude.toLowerCase()}`}>先:{leader_aptitude}</span>
            <span className={`aptitude-${betweener_aptitude.toLowerCase()}`}>差:{betweener_aptitude}</span>
            <span className={`aptitude-${chaser_aptitude.toLowerCase()}`}>追:{chaser_aptitude}</span>
          </div>
        </div>
        
        {description && (
          <p className="uma-card-description">{description}</p>
        )}
      </div>
    </Link>
  );
};