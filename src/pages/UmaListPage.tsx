// src/pages/UmaListPage.tsx
import React from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';

export const UmaListPage = () => {
  // Data ini akan diganti dengan data dari API
  const mockUma = { name: 'Special Week', imageUrl: 'path/to/image.png', rarity: '3 Star' };

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>Daftar Karakter Uma Musume</h2>
        <SearchBar />
        {/* Nanti di sini ada FilterSidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {/* Contoh penggunaan UmaCard dengan data tiruan */}
          <UmaCard name={mockUma.name} imageUrl={mockUma.imageUrl} rarity={mockUma.rarity} />
          {/* Kartu lain akan di-render di sini */}
        </div>
      </main>
    </div>
  );
};