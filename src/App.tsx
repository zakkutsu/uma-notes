// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UmaListPage } from './pages/UmaListPage';
import { UmaDetailPage } from './pages/UmaDetailPage';

function App() {
  return (
    <Routes>
      {/* Rute untuk Halaman Utama */}
      <Route path="/" element={<HomePage />} />

      {/* Rute untuk Halaman Daftar Uma */}
      <Route path="/uma" element={<UmaListPage />} />

      {/* Rute untuk Halaman Detail Uma */}
      {/* ":id" adalah parameter dinamis, bisa berupa angka atau nama */}
      <Route path="/uma/:id" element={<UmaDetailPage />} />
    </Routes>
  );
}

export default App;