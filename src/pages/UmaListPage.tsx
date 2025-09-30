// src/pages/UmaListPage.tsx
import React from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { FilterSidebar } from '../components/FilterSidebar'; // 1. Import FilterSidebar
import { mockUmasData } from '../data/mockUmas';

export const UmaListPage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>Daftar Karakter Uma Musume</h2>
        <SearchBar />

        {/* 2. Buat layout utama dengan flexbox */}
        <div style={{ display: 'flex', marginTop: '1.5rem' }}>
          <FilterSidebar />
          
          <div style={{ flex: 1 }}> {/* Area konten utama */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {mockUmasData.map(uma => (
                // 3. Pastikan semua props yang dibutuhkan UmaCard sudah di-pass
                <UmaCard 
                  key={uma.id} 
                  name={uma.name} 
                  imageUrl={uma.imageUrl} 
                  rarity={uma.rarity}
                  aptitudes={uma.aptitudes} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};