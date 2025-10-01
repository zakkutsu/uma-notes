// src/pages/HomePage.tsx
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { SupportCardCard } from '../components/SupportCardCard';
import { mockUmasData, mockSupportCards } from '../data';
import '../styles/responsive.css';

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
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            🐎 Uma Notes Database
          </h1>
          <p className="hero-subtitle">
            Temukan semua informasi tentang karakter Uma Musume favoritmu. 
            Database lengkap dengan stats, skills, aptitude, dan support cards.
          </p>
          
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Cari Uma Musume atau Support Card..."
            />
          </div>
          
          <div className="hero-actions">
            <Link 
              to="/uma" 
              className="btn btn-primary"
              style={{
                backgroundColor: '#fff',
                color: '#667eea',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            >
              🐎 Browse Uma Musume
            </Link>
            <Link 
              to="/support-cards" 
              className="btn"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              🃏 Support Cards
            </Link>
          </div>
        </div>
      </section>

      <main className="container" style={{ padding: '2rem 0' }}>
        {/* Featured Uma Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#333',
              margin: '0'
            }}>
              ⭐ Featured Uma Musume
            </h2>
            <Link 
              to="/uma" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: '500'
              }}
            >
              View All →
            </Link>
          </div>
          
          <div className="grid-responsive">
            {featuredUmas.map(uma => (
              <UmaCard key={uma.id} {...uma} />
            ))}
          </div>
        </section>

        {/* Featured Support Cards Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#333',
              margin: '0'
            }}>
              🃏 Featured Support Cards
            </h2>
            <Link 
              to="/support-cards" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: '500'
              }}
            >
              View All →
            </Link>
          </div>
          
          <div className="grid-support-cards">
            {featuredSupportCards.map(card => (
              <SupportCardCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#333',
            marginBottom: '2rem'
          }}>
            📊 Database Statistics
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: 'clamp(1rem, 3vw, 2rem)',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 3rem)', 
                fontWeight: 'bold', 
                color: '#007bff',
                marginBottom: '0.5rem'
              }}>
                {mockUmasData.length}
              </div>
              <div style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Uma Musume</div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 3rem)', 
                fontWeight: 'bold', 
                color: '#28a745',
                marginBottom: '0.5rem'
              }}>
                {mockSupportCards.length}
              </div>
              <div style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Support Cards</div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 3rem)', 
                fontWeight: 'bold', 
                color: '#ffc107',
                marginBottom: '0.5rem'
              }}>
                15
              </div>
              <div style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Aptitude Types</div>
            </div>
            
            <div>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 3rem)', 
                fontWeight: 'bold', 
                color: '#dc3545',
                marginBottom: '0.5rem'
              }}>
                ∞
              </div>
              <div style={{ color: '#666', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>Possibilities</div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#343a40',
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          © 2025 Uma Notes Database. Data structures based on improved ERD design.
        </p>
      </footer>
    </div>
  );
};