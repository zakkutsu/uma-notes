// src/pages/UmaListPageWithAPI.tsx
// Example of how to integrate the new API hooks into the existing UmaListPage
import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { UmaCard } from '../components/UmaCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { useUmas } from '../api';
import type { UmaFilters, Uma } from '../types';

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

export const UmaListPageWithAPI = () => {
  const [filters, setFilters] = useState<UmaFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Use the API hook to fetch data
  const { data: umasResponse, isLoading, error, isError } = useUmas({ 
    page: currentPage, 
    limit: itemsPerPage 
  });

  // Extract umas from API response
  const apiUmas = umasResponse?.data || [];
  const pagination = umasResponse?.pagination;

  // Filter dan search menggunakan useMemo untuk performance
  const filteredUmas = useMemo(() => {
    return filterUmas(apiUmas, filters, searchTerm);
  }, [apiUmas, filters, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: UmaFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  // Loading state
  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Header />
        <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '400px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <h3 style={{ color: '#666' }}>Loading Uma Musume data...</h3>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Header />
        <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '400px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
              <h3 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Failed to load data</h3>
              <p style={{ color: '#666' }}>
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 2rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Daftar Karakter Uma Musume</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <SearchBar onSearch={handleSearch} placeholder="Cari nama Uma Musume..." />
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
                {filteredUmas.length} of {pagination?.totalRows || 0} Uma Musume
              </span>
              {searchTerm && (
                <span style={{ marginLeft: '1rem', color: '#666' }}>
                  searching for "{searchTerm}"
                </span>
              )}
              {pagination && (
                <span style={{ marginLeft: '1rem', color: '#666' }}>
                  (Page {pagination.currentPage} of {pagination.totalPages})
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
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
          
          <div style={{ flex: 1 }}>
            {filteredUmas.length > 0 ? (
              <>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {filteredUmas.map(uma => (
                    <UmaCard 
                      key={uma.id} 
                      {...uma}
                    />
                  ))}
                </div>
                
                {/* Pagination controls */}
                {pagination && pagination.totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: pagination.hasPrevPage ? '#007bff' : '#e9ecef',
                        color: pagination.hasPrevPage ? '#fff' : '#6c757d',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Previous
                    </button>
                    
                    <span style={{ color: '#666' }}>
                      {pagination.showing}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: pagination.hasNextPage ? '#007bff' : '#e9ecef',
                        color: pagination.hasNextPage ? '#fff' : '#6c757d',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Uma Musume found</h3>
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