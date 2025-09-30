// src/pages/HomePage.tsx
import React from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { Footer } from '../components/Footer'; // Asumsi Footer.tsx juga dibuat

export const HomePage = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Database Uma Musume Project</h1>
        <p>Temukan semua informasi tentang karakter favoritmu.</p>
        <SearchBar />
        {/* Nanti di sini akan ada section untuk "Featured Umas" */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};