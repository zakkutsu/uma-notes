// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UmaListPage } from './pages/UmaListPage';
import { UmaDetailPage } from './pages/UmaDetailPage';
import { SupportCardsPage } from './pages/SupportCardsPage';

function App() {
  return (
    <Routes>
      {/* Rute untuk Halaman Utama */}
      <Route path="/" element={<HomePage />} />

      {/* Rute untuk Halaman Daftar Uma */}
      <Route path="/uma" element={<UmaListPage />} />

      {/* Rute untuk Halaman Detail Uma */}
      <Route path="/uma/:id" element={<UmaDetailPage />} />

      {/* Rute untuk Halaman Support Cards */}
      <Route path="/support-cards" element={<SupportCardsPage />} />

      {/* Catch all route - redirect ke home */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;