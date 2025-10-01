// src/pages/UmaListPage.tsx
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { mockUmasData, type UmaFilters, type Uma } from '../data';
import '../styles/responsive.css';

// Helper function untuk filter Uma berdasarkan criteria
const filterUmas = (umas: Uma[], filters: UmaFilters, searchTerm: string): Uma[] => {
  return umas.filter(uma => {
    // Filter berdasarkan nama (search)
    if (searchTerm && !uma.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter berdasarkan star rating
    if (filters.star_initial && filters.star_initial.length > 0) {
      if (!filters.star_initial.includes(uma.star_initial)) {
        return false;
      }
    }
    
    // Filter berdasarkan aptitudes
    if (filters.aptitudes) {
      for (const [aptitudeType, selectedRatings] of Object.entries(filters.aptitudes)) {
        if (selectedRatings && selectedRatings.length > 0) {
          const umaRating = uma[`${aptitudeType}_aptitude` as keyof Uma] as string;
          if (!selectedRatings.includes(umaRating as any)) {
            return false;
          }
        }
      }
    }
    
    return true;
  });
};

export const UmaListPage = () => {
  const [filters, setFilters] = useState<UmaFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Filter dan search menggunakan useMemo untuk performance
  const filteredUmas = useMemo(() => {
    return filterUmas(mockUmasData, filters, searchTerm);
  }, [filters, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: UmaFilters) => {
    setFilters(newFilters);
  };

  // Helper untuk menghitung jumlah filter aktif
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.star_initial && filters.star_initial.length > 0) count++;
    if (filters.aptitudes) {
      count += Object.values(filters.aptitudes).filter(arr => arr && arr.length > 0).length;
    }
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ padding: '2rem 0' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            color: '#333',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)'
          }}>Daftar Karakter Uma Musume</h2>
          
          <div className="search-container">
            <SearchBar onSearch={handleSearch} placeholder="Cari nama Uma Musume..." />
          </div>
          
          {/* Status bar */}
          <div className="card" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontWeight: 'bold', color: '#333', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {filteredUmas.length} of {mockUmasData.length} Uma Musume
              </span>
              {searchTerm && (
                <span style={{ marginLeft: '1rem', color: '#666', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                  searching for "{searchTerm}"
                </span>
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <div className="filter-option active" style={{ 
                padding: '0.5rem 1rem',
                borderRadius: '20px'
              }}>
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </div>
            )}
          </div>
        </div>

        {/* Layout utama dengan sidebar dan konten */}
        <div className="layout-main">
          <div className="sidebar">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="content-area">
            {filteredUmas.length > 0 ? (
              <div className="grid-responsive">
                {filteredUmas.map(uma => (
                  <UmaCard 
                    key={uma.id} 
                    {...uma}
                  />
                ))}
              </div>
            ) : (
              <div className="card" style={{ 
                textAlign: 'center', 
                padding: 'clamp(2rem, 5vw, 4rem)'
              }}>
                <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ color: '#666', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>No Uma Musume found</h3>
                <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchTerm('');
                  }}
                  className="btn btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};