// src/pages/SupportCardsPage.tsx
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SupportCardCard } from '../components/SupportCardCard';
import { mockSupportCards, type SupportCardFilters, type SupportCard } from '../data';

// Helper function untuk filter Support Cards
const filterSupportCards = (cards: SupportCard[], filters: SupportCardFilters, searchTerm: string): SupportCard[] => {
  return cards.filter(card => {
    // Filter berdasarkan nama
    if (searchTerm && !card.card_name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter berdasarkan rarity
    if (filters.rarity && filters.rarity.length > 0) {
      if (!filters.rarity.includes(card.rarity)) {
        return false;
      }
    }
    
    // Filter berdasarkan card type
    if (filters.card_type && filters.card_type.length > 0) {
      if (!filters.card_type.includes(card.card_type)) {
        return false;
      }
    }
    
    return true;
  });
};

// Filter component untuk Support Cards
const SupportCardFilterSidebar = ({ 
  filters, 
  onFilterChange 
}: { 
  filters: SupportCardFilters;
  onFilterChange: (filters: SupportCardFilters) => void;
}) => {
  const rarityOptions = ['SSR', 'SR', 'R'] as const;
  const cardTypeOptions = ['Speed', 'Stamina', 'Power', 'Guts', 'Wit', 'Friend', 'Group'] as const;

  const handleRarityToggle = (rarity: typeof rarityOptions[number]) => {
    const currentRarities = filters.rarity || [];
    const newRarities = currentRarities.includes(rarity)
      ? currentRarities.filter(r => r !== rarity)
      : [...currentRarities, rarity];
    
    onFilterChange({
      ...filters,
      rarity: newRarities.length > 0 ? newRarities : undefined
    });
  };

  const handleCardTypeToggle = (cardType: typeof cardTypeOptions[number]) => {
    const currentTypes = filters.card_type || [];
    const newTypes = currentTypes.includes(cardType)
      ? currentTypes.filter(t => t !== cardType)
      : [...currentTypes, cardType];
    
    onFilterChange({
      ...filters,
      card_type: newTypes.length > 0 ? newTypes : undefined
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  return (
    <aside style={{ 
      width: '250px', 
      paddingRight: '1rem', 
      backgroundColor: '#f8f9fa', 
      padding: '1rem', 
      borderRadius: '8px',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        <button 
          onClick={clearAllFilters}
          style={{ 
            padding: '0.25rem 0.5rem', 
            fontSize: '0.8em', 
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear All
        </button>
      </div>
      
      {/* Rarity Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
          Rarity
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {rarityOptions.map(rarity => (
            <label 
              key={rarity}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: (filters.rarity || []).includes(rarity) ? '#007bff' : '#fff',
                color: (filters.rarity || []).includes(rarity) ? '#fff' : '#333',
                fontWeight: 'bold'
              }}
            >
              <input 
                type="checkbox"
                checked={(filters.rarity || []).includes(rarity)}
                onChange={() => handleRarityToggle(rarity)}
                style={{ display: 'none' }}
              />
              {rarity}
            </label>
          ))}
        </div>
      </div>
      
      {/* Card Type Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
          Card Type
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {cardTypeOptions.map(cardType => (
            <label 
              key={cardType}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: (filters.card_type || []).includes(cardType) ? '#007bff' : '#fff',
                color: (filters.card_type || []).includes(cardType) ? '#fff' : '#333'
              }}
            >
              <input 
                type="checkbox"
                checked={(filters.card_type || []).includes(cardType)}
                onChange={() => handleCardTypeToggle(cardType)}
                style={{ display: 'none' }}
              />
              {cardType}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export const SupportCardsPage = () => {
  const [filters, setFilters] = useState<SupportCardFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = useMemo(() => {
    return filterSupportCards(mockSupportCards, filters, searchTerm);
  }, [filters, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: SupportCardFilters) => {
    setFilters(newFilters);
  };

  // Helper untuk menghitung jumlah filter aktif
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.rarity && filters.rarity.length > 0) count++;
    if (filters.card_type && filters.card_type.length > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Support Cards</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <SearchBar onSearch={handleSearch} placeholder="Cari nama Support Card..." />
          </div>
          
          {/* Status bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem'
          }}>
            <div>
              <span style={{ fontWeight: 'bold', color: '#333' }}>
                {filteredCards.length} of {mockSupportCards.length} Support Cards
              </span>
              {searchTerm && (
                <span style={{ marginLeft: '1rem', color: '#666' }}>
                  searching for "{searchTerm}"
                </span>
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <div style={{ 
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9em'
              }}>
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </div>
            )}
          </div>
        </div>

        {/* Layout utama dengan sidebar dan konten */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          <SupportCardFilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
          
          <div style={{ flex: 1 }}>
            {filteredCards.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '1.5rem'
              }}>
                {filteredCards.map(card => (
                  <SupportCardCard 
                    key={card.id} 
                    {...card}
                  />
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🃏</div>
                <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Support Cards found</h3>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchTerm('');
                  }}
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
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