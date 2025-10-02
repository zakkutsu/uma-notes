// src/pages/HomePage.tsx
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { SupportCardCard } from '../components/SupportCardCard';
import { mockUmasData, mockSupportCards } from '../data';

export const HomePage = () => {
  const navigate = useNavigate();
  
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      // Navigate ke halaman Uma list dengan search term
      navigate(`/uma?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Ambil beberapa Uma unggulan untuk ditampilkan
  const featuredUmas = mockUmasData.slice(0, 4);
  
  // Ambil beberapa Support Card unggulan
  const featuredSupportCards = mockSupportCards.filter(card => card.rarity === 'SSR').slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uma-blue to-uma-purple text-white py-12 sm:py-16 lg:py-20">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
            🐎 Uma Notes Database
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
            Temukan semua informasi tentang karakter Uma Musume favoritmu. 
            Database lengkap dengan stats, skills, aptitude, dan support cards.
          </p>
          
          <div className="mb-8">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Cari Uma Musume atau Support Card..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/uma" 
              className="
                inline-block px-6 py-3 sm:px-8 sm:py-4
                bg-white text-uma-blue 
                rounded-xl font-semibold text-lg
                shadow-lg hover:shadow-xl
                transition-all duration-200
                hover:scale-105
                no-underline
              "
            >
              🐎 Browse Uma Musume
            </Link>
            <Link 
              to="/support-cards" 
              className="
                inline-block px-6 py-3 sm:px-8 sm:py-4
                bg-white/20 text-white border-2 border-white/30
                rounded-xl font-semibold text-lg
                backdrop-blur-sm
                hover:bg-white/30 hover:border-white/50
                transition-all duration-200
                no-underline
              "
            >
              🃏 Support Cards
            </Link>
          </div>
        </div>
      </section>

      <main className="container py-8 sm:py-12">
        {/* Featured Uma Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              ⭐ Featured Uma Musume
            </h2>
            <Link 
              to="/uma" 
              className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredUmas.map(uma => (
              <UmaCard key={uma.id} {...uma} />
            ))}
          </div>
        </section>

        {/* Featured Support Cards Section */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              🃏 Featured Support Cards
            </h2>
            <Link 
              to="/support-cards" 
              className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredSupportCards.map(card => (
              <SupportCardCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="card text-center p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
            📊 Database Statistics
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-6 sm:mt-8">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 mb-2">
                {mockUmasData.length}
              </div>
              <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Uma Musume</div>
            </div>
            
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-500 mb-2">
                {mockSupportCards.length}
              </div>
              <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Support Cards</div>
            </div>
            
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
                15
              </div>
              <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Aptitude Types</div>
            </div>
            
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500 mb-2">
                ∞
              </div>
              <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Possibilities</div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center mt-12 sm:mt-16">
        <p className="text-gray-300">
          © 2025 Uma Notes Database. Data structures based on improved ERD design.
        </p>
      </footer>
    </div>
  );
};