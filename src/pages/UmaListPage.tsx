// src/pages/UmaListPage.tsx
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { mockUmasData, type UmaFilters, type Uma, type AptitudeRating } from '../data';

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
          const umaRating = uma[`${aptitudeType}_aptitude` as keyof Uma] as AptitudeRating;
          if (!selectedRatings.includes(umaRating)) {
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Daftar Karakter Uma Musume</h2>
          
          <div className="mb-4 sm:mb-6">
            <SearchBar onSearch={handleSearch} placeholder="Cari nama Uma Musume..." />
          </div>
          
          {/* Status bar */}
          <div className="card p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div>
              <span className="font-bold text-gray-800 text-sm sm:text-base">
                {filteredUmas.length} of {mockUmasData.length} Uma Musume
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
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
          
          <div className="flex-1">
            {filteredUmas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredUmas.map(uma => (
                  <UmaCard 
                    key={uma.id} 
                    {...uma}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center p-8 sm:p-12">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🔍</div>
                <h3 className="text-gray-600 mb-4 text-lg sm:text-xl lg:text-2xl font-semibold">No Uma Musume found</h3>
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