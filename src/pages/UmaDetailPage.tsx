// src/pages/UmaDetailPage.tsx
import React from 'react';
import { Header } from '../components/Header';

export const UmaDetailPage = () => {
  // ID karakter akan didapat dari URL
  const umaName = "Special Week"; // Contoh

  return (
    <div>
      <Header />
      <main style={{ padding: '2rem' }}>
        <section>
          {/* Nanti di sini ada gambar besar karakter */}
          <h1>{umaName}</h1>
        </section>
        <section>
          {/* Nanti di sini ada sistem Tab untuk menampilkan Detail & Bakat, Skills, dll. */}
          <h3>Detail & Bakat (Aptitudes)</h3>
          <p>Informasi bakat akan ditampilkan di sini.</p>
          <h3>Skills</h3>
          <p>Informasi skill bawaan akan ditampilkan di sini.</p>
        </section>
      </main>
    </div>
  );
};