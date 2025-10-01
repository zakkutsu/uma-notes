// src/components/SupportCardCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { SupportCard } from '../data';

type SupportCardCardProps = SupportCard;

// Helper function untuk warna berdasarkan rarity
const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    'SSR': '#ff6b6b',
    'SR': '#4ecdc4', 
    'R': '#96c93d'
  };
  return colors[rarity] || '#ddd';
};

// Helper function untuk warna berdasarkan card type
const getCardTypeColor = (cardType: string) => {
  const colors: Record<string, string> = {
    'Speed': '#ff6b6b',
    'Stamina': '#4ecdc4',
    'Power': '#45b7d1',
    'Guts': '#96c93d',
    'Wit': '#feca57',
    'Friend': '#ff9ff3',
    'Group': '#ff7675'
  };
  return colors[cardType] || '#ddd';
};

export const SupportCardCard = ({ 
  id, card_name, rarity, card_type, imageUrl, max_level, base_stats 
}: SupportCardCardProps) => {
  return (
    <Link to={`/support-cards/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ 
        border: '1px solid #eee', 
        padding: '1rem', 
        textAlign: 'center', 
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Rarity banner */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          backgroundColor: getRarityColor(rarity),
          color: '#fff',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.8em',
          fontWeight: 'bold',
          zIndex: 1
        }}>
          {rarity}
        </div>

        {/* Card type indicator */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          backgroundColor: getCardTypeColor(card_type),
          color: '#fff',
          padding: '0.25rem 0.5rem',
          borderRadius: '8px',
          fontSize: '0.7em',
          fontWeight: 'bold',
          zIndex: 1
        }}>
          {card_type}
        </div>
        
        <img 
          src={imageUrl || 'https://via.placeholder.com/200x280'} 
          alt={card_name} 
          style={{ 
            width: '100%', 
            maxWidth: '180px', 
            height: '250px',
            objectFit: 'cover',
            borderRadius: '8px', 
            marginBottom: '0.75rem',
            marginTop: '2rem'
          }} 
        />
        
        <h3 style={{ 
          marginBottom: '0.75rem', 
          fontSize: '1rem',
          lineHeight: '1.3',
          height: '2.6em',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {card_name}
        </h3>
        
        {max_level && (
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.9em', color: '#666' }}>
              Max Level: {max_level}
            </span>
          </div>
        )}
        
        {/* Base stats untuk non-Friend/Group cards */}
        {base_stats && card_type !== 'Friend' && card_type !== 'Group' && (
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.8em', marginBottom: '0.5rem', fontWeight: 'bold' }}>Base Stats</div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.25rem',
              fontSize: '0.75em'
            }}>
              {base_stats.speed && base_stats.speed > 0 && (
                <span style={{ color: '#ff6b6b' }}>Sp: +{base_stats.speed}</span>
              )}
              {base_stats.stamina && base_stats.stamina > 0 && (
                <span style={{ color: '#4ecdc4' }}>St: +{base_stats.stamina}</span>
              )}
              {base_stats.power && base_stats.power > 0 && (
                <span style={{ color: '#45b7d1' }}>Pw: +{base_stats.power}</span>
              )}
              {base_stats.guts && base_stats.guts > 0 && (
                <span style={{ color: '#96c93d' }}>Gt: +{base_stats.guts}</span>
              )}
              {base_stats.wit && base_stats.wit > 0 && (
                <span style={{ color: '#feca57' }}>Wt: +{base_stats.wit}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};