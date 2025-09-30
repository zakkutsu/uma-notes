// src/components/UmaCard.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { Uma } from '../data/mockUmas';

// 2. Tambahkan 'id' ke dalam props
type UmaCardProps = Uma;

export const UmaCard = ({ id, name, imageUrl, rarity, aptitudes }: UmaCardProps) => {
  return (
    // 3. Bungkus semuanya dengan komponen Link
    <Link to={`/uma/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #eee', padding: '1rem', textAlign: 'center', borderRadius: '8px' }}>
        <img src={imageUrl} alt={name} style={{ width: '100%', maxWidth: '150px', borderRadius: '4px' }} />
        <h3 style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>{name}</h3>
        <p style={{ margin: '0.25rem 0' }}>Rarity: {rarity}</p>
        <div style={{ fontSize: '0.9em', color: '#555' }}>
          <span>Turf: {aptitudes.turf}</span> | <span>Long: {aptitudes.long}</span>
        </div>
      </div>
    </Link>
  );
};