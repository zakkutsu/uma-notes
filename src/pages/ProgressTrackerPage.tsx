import React, { useEffect, useState } from 'react';
import { SearchBar, UmaCard, SupportCardCard, TrainedUmaCard, AddItemModal } from '../components';
import { 
  featuredUmas, 
  featuredSupportCards, 
  featuredTrainedUmas
} from '../constants';
import { progressSectionIdToNavMap } from '../constants/navigation';
import type { ProgressPageProps, Uma, SupportCard, TrainedUma } from '../types';

interface ProgressTrackerPageProps extends ProgressPageProps {
  onViewAll: (type: 'uma' | 'support-card' | 'trained-uma', items: (Uma | SupportCard | TrainedUma)[]) => void;
}

export const ProgressTrackerPage: React.FC<ProgressTrackerPageProps> = ({ onNavigate, setActiveProgressNav, onViewAll }) => {
  // User collections state
  const [userUmas, setUserUmas] = useState<Uma[]>(featuredUmas);
  const [userSupportCards, setUserSupportCards] = useState<SupportCard[]>(featuredSupportCards);
  const [userTrainedUmas, setUserTrainedUmas] = useState<TrainedUma[]>(featuredTrainedUmas);
  
  // Modal state for Add functionality
  const [addModal, setAddModal] = useState<{ isOpen: boolean; type: 'uma' | 'support-card' | 'trained-uma' | null }>({
    isOpen: false,
    type: null
  });

  const handleViewAll = (type: 'uma' | 'support-card' | 'trained-uma', items: (Uma | SupportCard | TrainedUma)[]) => {
    onViewAll(type, items);
  };

  const handleAddItem = (item: { id: number; name?: string; rarity?: number; imgUrl?: string; type?: string; icon?: string; description?: string; stars?: number; level?: number; stats?: TrainedUma['stats']; rank?: string }) => {
    if (addModal.type === 'uma' && item.name && typeof item.rarity === 'number' && item.imgUrl) {
      const newUma: Uma = {
        id: item.id,
        name: item.name,
        rarity: item.rarity,
        imgUrl: item.imgUrl
      };
      setUserUmas(prev => [...prev, newUma]);
    } else if (addModal.type === 'support-card' && item.name && item.type && item.imgUrl) {
      const newSupportCard: SupportCard = {
        id: item.id,
        name: item.name,
        type: item.type as SupportCard['type'],
        imgUrl: item.imgUrl
      };
      setUserSupportCards(prev => [...prev, newSupportCard]);
    } else if (addModal.type === 'trained-uma' && item.name && typeof item.rarity === 'number' && item.imgUrl && item.level && item.stats && item.rank) {
      const newTrainedUma: TrainedUma = {
        id: item.id,
        name: item.name,
        rarity: item.rarity,
        imgUrl: item.imgUrl,
        level: item.level,
        stats: item.stats,
        rank: item.rank as TrainedUma['rank']
      };
      setUserTrainedUmas(prev => [...prev, newTrainedUma]);
    }
    
    setAddModal({ isOpen: false, type: null });
  };

  // Navigation scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          const navItem = progressSectionIdToNavMap[intersectingEntry.target.id];
          if (navItem) setActiveProgressNav(navItem);
        }
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const sections = Object.keys(progressSectionIdToNavMap).map(id => document.getElementById(id));
    sections.forEach(sec => { if (sec) observer.observe(sec); });
    return () => { sections.forEach(sec => { if (sec) observer.unobserve(sec); }); };
  }, [setActiveProgressNav]);

  return (
    <>
      {/* Hero Section */}
      <section id="progress-home-section" className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white py-12 sm:py-16 lg:py-20">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
            🐎 Your Collection
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
            Kelola dan lacak semua progres Uma Musume, Support Card, dan item lainnya yang telah Anda kumpulkan.
          </p>
          <div className="mb-8">
            <SearchBar 
              onSearch={() => {}} 
              placeholder="Cari Uma Musume atau Support Card di koleksi Anda..." 
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => onNavigate('home')} 
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/30 hover:border-white/50 transition-all duration-200 no-underline"
            >
              🐎 Browse Database
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('your-uma');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-uma-gold to-yellow-500 text-uma-blue rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-yellow-400 hover:to-orange-500 transition-all duration-200 hover:scale-105 no-underline"
            >
              📊 Track Your Progress
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-uma-blue mb-2">{userUmas.length}</div>
              <div className="text-gray-600">Uma Musume</div>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-uma-purple mb-2">{userSupportCards.length}</div>
              <div className="text-gray-600">Support Cards</div>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-uma-gold mb-2">{userTrainedUmas.length}</div>
              <div className="text-gray-600">Trained Uma</div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Uma Musume Section */}
      <section id="your-uma" className="py-16 bg-white">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                🐎 Your Uma Musume
              </h2>
              <p className="text-gray-600 text-lg">
                Koleksi Uma Musume yang sudah Anda dapatkan ({userUmas.length} total)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleViewAll('uma', userUmas)}
                className="px-6 py-3 bg-uma-blue text-white rounded-xl font-semibold hover:bg-uma-blue/90 transition-all duration-200"
              >
                View All ({userUmas.length})
              </button>
              <button 
                onClick={() => setAddModal({ isOpen: true, type: 'uma' })}
                className="px-6 py-3 bg-uma-gold text-uma-blue border-2 border-uma-gold rounded-xl font-semibold hover:bg-uma-gold/90 transition-all duration-200"
              >
                🐎 Add New Uma
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userUmas.slice(0, 8).map((uma) => (
              <UmaCard key={uma.id} {...uma} />
            ))}
          </div>
          
          {userUmas.length > 8 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => handleViewAll('uma', userUmas)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Show {userUmas.length - 8} More Uma Musume
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Support Cards Section */}
      <section id="your-support-cards" className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                🃏 Your Support Cards
              </h2>
              <p className="text-gray-600 text-lg">
                Support Card yang membantu meningkatkan kemampuan Uma Musume ({userSupportCards.length} total)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleViewAll('support-card', userSupportCards)}
                className="px-6 py-3 bg-uma-purple text-white rounded-xl font-semibold hover:bg-uma-purple/90 transition-all duration-200"
              >
                View All ({userSupportCards.length})
              </button>
              <button 
                onClick={() => setAddModal({ isOpen: true, type: 'support-card' })}
                className="px-6 py-3 bg-uma-gold text-uma-blue border-2 border-uma-gold rounded-xl font-semibold hover:bg-uma-gold/90 transition-all duration-200"
              >
                🃏 Add New Card
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userSupportCards.slice(0, 8).map((card) => (
              <SupportCardCard key={card.id} {...card} />
            ))}
          </div>
          
          {userSupportCards.length > 8 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => handleViewAll('support-card', userSupportCards)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Show {userSupportCards.length - 8} More Support Cards
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trained Uma Section */}
      <section id="trained-uma" className="py-16 bg-white">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                🏆 Trained Uma Musume
              </h2>
              <p className="text-gray-600 text-lg">
                Uma Musume yang telah Anda latih dengan level dan stats tinggi ({userTrainedUmas.length} total)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleViewAll('trained-uma', userTrainedUmas)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                View All ({userTrainedUmas.length})
              </button>
              <button 
                onClick={() => setAddModal({ isOpen: true, type: 'trained-uma' })}
                className="px-6 py-3 bg-uma-gold text-uma-blue border-2 border-uma-gold rounded-xl font-semibold hover:bg-uma-gold/90 transition-all duration-200"
              >
                � Add Trained Uma
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userTrainedUmas.slice(0, 8).map((trainedUma) => (
              <TrainedUmaCard key={trainedUma.id} {...trainedUma} />
            ))}
          </div>
          
          {userTrainedUmas.length > 8 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => handleViewAll('trained-uma', userTrainedUmas)}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Show {userTrainedUmas.length - 8} More Trained Uma
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Database Section */}
      <section id="database-section" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              📊 Collection Statistics
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Ringkasan lengkap koleksi Uma Musume Anda dan progres yang telah dicapai.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-uma-blue to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold mb-2">{userUmas.length}</div>
              <div className="text-blue-100">Uma Musume Collected</div>
              <div className="text-sm text-blue-200 mt-2">
                {Math.round((userUmas.length / (featuredUmas.length * 2)) * 100)}% Complete
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-uma-purple to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold mb-2">{userSupportCards.length}</div>
              <div className="text-purple-100">Support Cards</div>
              <div className="text-sm text-purple-200 mt-2">
                {Math.round((userSupportCards.length / (featuredSupportCards.length * 3)) * 100)}% Complete
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-uma-gold to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold mb-2">{userTrainedUmas.filter(uma => uma.rank === 'SS' || uma.rank === 'S').length}</div>
              <div className="text-yellow-100">Top Ranked Uma</div>
              <div className="text-sm text-yellow-200 mt-2">
                {userTrainedUmas.length > 0 ? Math.round((userTrainedUmas.filter(uma => uma.rank === 'SS' || uma.rank === 'S').length / userTrainedUmas.length) * 100) : 0}% S/SS Rank
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold mb-2">{userTrainedUmas.length > 0 ? Math.round(userTrainedUmas.reduce((sum, uma) => sum + uma.level, 0) / userTrainedUmas.length) : 0}</div>
              <div className="text-green-100">Average Level</div>
              <div className="text-sm text-green-200 mt-2">
                {userTrainedUmas.length} Uma Trained
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-block bg-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h3>
              <div className="text-4xl font-bold text-uma-blue mb-2">
                {Math.round(((userUmas.length + userSupportCards.length + userTrainedUmas.length) / 
                  ((featuredUmas.length * 2) + (featuredSupportCards.length * 3) + (featuredTrainedUmas.length * 2))) * 100)}%
              </div>
              <div className="text-gray-600">Collection Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Add New Item Modal */}
      <AddItemModal
        isOpen={addModal.isOpen}
        onClose={() => setAddModal({ isOpen: false, type: null })}
        type={addModal.type as 'uma' | 'support-card' | 'trained-uma'}
        onAdd={handleAddItem}
      />
    </>
  );
};