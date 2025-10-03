import React, { useState, useMemo } from 'react';
import type { Uma, SupportCard, Skill, Factor, TrainedUma } from '../types';
import { UmaCard, SupportCardCard, SkillCard, FactorCard, TrainedUmaCard } from '../components/Cards';
import { AddItemModal } from '../components/AddItemModal';

interface ViewAllPageProps {
  type: 'uma' | 'support-card' | 'skill' | 'factor' | 'trained-uma';
  items: (Uma | SupportCard | Skill | Factor | TrainedUma)[];
  onBack: () => void;
  onAddItem: (item: { id: number; name?: string; rarity?: number; imgUrl?: string; type?: string; icon?: string; description?: string; stars?: number; level?: number; stats?: TrainedUma['stats']; rank?: string }) => void;
}

const ITEMS_PER_PAGE = 12;

export const ViewAllPage: React.FC<ViewAllPageProps> = ({ type, items, onBack, onAddItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage]);

  const getPageTitle = () => {
    switch (type) {
      case 'uma':
        return '🐎 All Your Uma Musume';
      case 'support-card':
        return '🃏 All Your Support Cards';
      case 'skill':
        return '✨ All Your Skills';
      case 'factor':
        return '🌟 All Your Factors';
      case 'trained-uma':
        return '🏆 All Your Trained Uma';
      default:
        return 'All Items';
    }
  };

  const getAddButtonText = () => {
    switch (type) {
      case 'uma':
        return '🐎 Add New Uma';
      case 'support-card':
        return '🃏 Add New Support Card';
      case 'skill':
        return '✨ Add New Skill';
      case 'factor':
        return '🌟 Add New Factor';
      case 'trained-uma':
        return '🏆 Add New Trained Uma';
      default:
        return 'Add New Item';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-uma-blue border border-uma-blue rounded-lg hover:bg-uma-blue hover:text-white transition-colors"
        >
          ←
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 border rounded-lg transition-colors ${
            i === currentPage
              ? 'bg-uma-blue text-white border-uma-blue'
              : 'text-uma-blue border-uma-blue hover:bg-uma-blue hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-uma-blue border border-uma-blue rounded-lg hover:bg-uma-blue hover:text-white transition-colors"
        >
          →
        </button>
      );
    }

    return pages;
  };

  const renderItem = (item: Uma | SupportCard | Skill | Factor | TrainedUma) => {
    if (type === 'uma' && 'rarity' in item && !('type' in item) && !('icon' in item) && !('stars' in item) && !('level' in item)) {
      return <UmaCard key={item.id} {...(item as Uma)} />;
    } else if (type === 'support-card' && 'type' in item && !('icon' in item) && !('stars' in item) && !('level' in item)) {
      return <SupportCardCard key={item.id} {...(item as SupportCard)} />;
    } else if (type === 'skill' && 'icon' in item && 'description' in item && !('stats' in item) && !('rank' in item)) {
      return <SkillCard key={item.id} {...(item as Skill)} />;
    } else if (type === 'factor' && 'stars' in item && 'type' in item && !('icon' in item) && !('level' in item)) {
      return <FactorCard key={item.id} {...(item as Factor)} />;
    } else if (type === 'trained-uma' && 'level' in item && 'stats' in item && 'rank' in item) {
      return <TrainedUmaCard key={item.id} {...(item as TrainedUma)} />;
    }
    return null;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-uma-blue to-uma-purple text-white py-12 sm:py-16">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {getPageTitle()}
              </h1>
              <p className="text-lg sm:text-xl opacity-90">
                Total: {items.length} items • Page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/30 hover:border-white/50 transition-all duration-200"
              >
                ← Back
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 bg-uma-gold text-uma-blue border-2 border-uma-gold rounded-xl font-semibold hover:bg-uma-gold/90 transition-all duration-200"
              >
                {getAddButtonText()}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          {currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {currentItems.map(renderItem)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  {renderPageNumbers()}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Items Found
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't added any {type.replace('-', ' ')} yet.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 bg-uma-blue text-white rounded-xl font-semibold hover:bg-uma-blue/90 transition-all duration-200"
              >
                {getAddButtonText()}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type={type}
        onAdd={(item) => {
          onAddItem(item);
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
};