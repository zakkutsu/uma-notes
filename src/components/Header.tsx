// src/components/Header.tsx
import React from 'react';

export const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        <a href="/" style={{ marginRight: '1rem' }}>Home</a>
        <a href="/uma" style={{ marginRight: '1rem' }}>Daftar Uma</a>
        {/* Link lain bisa ditambahkan di sini */}
      </nav>
    </header>
  );
};