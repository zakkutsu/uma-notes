// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link

export const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        {/* 2. Ganti <a> dengan <Link> dan href dengan to */}
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/uma" style={{ marginRight: '1rem' }}>Daftar Uma</Link>
      </nav>
    </header>
  );
};