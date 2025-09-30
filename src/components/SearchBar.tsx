// src/components/SearchBar.tsx
import React from 'react';

export const SearchBar = () => {
  return (
    <div>
      <input type="text" placeholder="Cari nama karakter..." style={{ padding: '0.5rem', width: '300px' }}/>
      <button style={{ padding: '0.5rem' }}>Cari</button>
    </div>
  );
};