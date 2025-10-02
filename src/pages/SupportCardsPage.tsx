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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="bg-gray-50 rounded-xl p-4 sticky top-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearAllFilters}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
            >
              {isCollapsed ? '▼' : '▲'}
            </button>
          </div>
        </div>
        
        <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block space-y-6`}>
          {/* Rarity Filter */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-1">
              Rarity
            </h4>
            <div className="flex flex-wrap gap-2">
              {rarityOptions.map(rarity => (
                <label 
                  key={rarity}
                  className={`
                    inline-flex items-center cursor-pointer
                    px-3 py-2 text-sm font-bold rounded
                    border transition-all duration-200
                    ${(filters.rarity || []).includes(rarity)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input 
                    type="checkbox"
                    checked={(filters.rarity || []).includes(rarity)}
                    onChange={() => handleRarityToggle(rarity)}
                    className="sr-only"
                  />
                  {rarity}
                </label>
              ))}
            </div>
          </div>
          
          {/* Card Type Filter */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-1">
              Card Type
            </h4>
            <div className="flex flex-col gap-2">
              {cardTypeOptions.map(cardType => (
                <label 
                  key={cardType}
                  className={`
                    inline-flex items-center cursor-pointer
                    px-3 py-2 text-sm rounded
                    border transition-all duration-200
                    ${(filters.card_type || []).includes(cardType)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input 
                    type="checkbox"
                    checked={(filters.card_type || []).includes(cardType)}
                    onChange={() => handleCardTypeToggle(cardType)}
                    className="sr-only"
                  />
                  {cardType}
                </label>
              ))}
            </div>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Support Cards</h2>
          
          <div className="mb-4 sm:mb-6">
            <SearchBar onSearch={handleSearch} placeholder="Cari nama Support Card..." />
          </div>
          
          {/* Status bar */}
          <div className="card p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div>
              <span className="font-bold text-gray-800 text-sm sm:text-base">
                {filteredCards.length} of {mockSupportCards.length} Support Cards
              </span>
              {searchTerm && (
                <span className="ml-4 text-gray-600 text-xs sm:text-sm">
                  searching for "{searchTerm}"
                </span>
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <div className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-full text-xs sm:text-sm font-medium">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </div>
            )}
          </div>
        </div>

        {/* Layout utama dengan sidebar dan konten */}
        <div className="flex flex-col lg:flex-row gap-6">
          <SupportCardFilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
          
          <div className="flex-1">
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCards.map(card => (
                  <SupportCardCard 
                    key={card.id} 
                    {...card}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center p-8 sm:p-12">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🃏</div>
                <h3 className="text-gray-600 mb-4 text-lg sm:text-xl lg:text-2xl font-semibold">No Support Cards found</h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setSearchTerm('');
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
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