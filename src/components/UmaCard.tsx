// src/components/UmaCard.tsx
import React from 'react';

// Mendefinisikan tipe data untuk props komponen ini
interface UmaCardProps {
  name: string;
  imageUrl: string;
  rarity: string;
}

export const UmaCard = ({ name, imageUrl, rarity }: UmaCardProps) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '1rem', textAlign: 'center' }}>
      <img src={imageUrl} alt={name} width="150" />
      <h3>{name}</h3>
      <p>Rarity: {rarity}</p>
    </div>
  );
};