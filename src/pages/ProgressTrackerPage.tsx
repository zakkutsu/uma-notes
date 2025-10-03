import React, { useEffect } from 'react';
import { UmaCard, SupportCardCard, SkillCard, FactorCard, SearchBar } from '../components';
import { 
  featuredUmas, 
  featuredSupportCards, 
  featuredSkills, 
  featuredFactors,
  progressSectionIdToNavMap 
} from '../constants';
import type { ProgressPageProps } from '../types';

export const ProgressTrackerPage: React.FC<ProgressPageProps> = ({ onNavigate, setActiveProgressNav }) => {
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
      <section id="progress-home-section" className="bg-gradient-to-br from-uma-blue to-uma-purple text-white py-12 sm:py-16 lg:py-20">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
            🐎 Your Collection
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
            Kelola dan lacak semua progres Uma Musume, Support Card, dan item lainnya yang telah Anda kumpulkan.
          </p>
          <div className="mb-8">
            <SearchBar onSearch={() => {}} placeholder="Cari Uma Musume atau Support Card di koleksi Anda..." />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button 
              onClick={() => onNavigate('home')} 
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/30 hover:border-white/50 transition-all duration-200 no-underline"
            >
              🐎 Browse Database
            </button>
            <button className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 no-underline">
              📈 Your Progress
            </button>
          </div>
        </div>
      </section>
      
      <main className="container py-8 sm:py-12">
        <section id="your-uma" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">⭐ Your Uma</h2>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors no-underline">
                View All →
              </a>
              <button className="bg-uma-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                Add New +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredUmas.map(uma => <UmaCard key={uma.id} {...uma} />)}
          </div>
        </section>
        
        <section id="your-support-cards" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🃏 Your Support Cards</h2>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors no-underline">
                View All →
              </a>
              <button className="bg-uma-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                Add New +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredSupportCards.map(card => <SupportCardCard key={card.id} {...card} />)}
          </div>
        </section>
        
        <section id="your-skills" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">✨ Your Skills</h2>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors no-underline">
                View All →
              </a>
              <button className="bg-uma-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                Add New +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredSkills.map(skill => <SkillCard key={skill.id} {...skill} />)}
          </div>
        </section>
        
        <section id="your-factors" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🧬 Your Factors</h2>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors no-underline">
                View All →
              </a>
              <button className="bg-uma-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                Add New +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredFactors.map(factor => <FactorCard key={factor.id} {...factor} />)}
          </div>
        </section>
        
        <section id="database-section" className="mb-12 sm:mb-16">
          <div className="card text-center p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
              📊 Your Collection Statistics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2">
                  {featuredUmas.length}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Uma Musume Owned</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-green-500 mb-2">
                  {featuredSupportCards.length}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Support Cards</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-500 mb-2">
                  {featuredSkills.length}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Skills Unlocked</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-pink-500 mb-2">
                  {featuredFactors.length}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Factors Collected</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">85%</div>
                <div className="text-gray-600 text-sm sm:text-base">Collection Rate</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">12</div>
                <div className="text-gray-600 text-sm sm:text-base">Races Won</div>
              </div>
            </div>
            <div className="mt-8">
              <button 
                onClick={() => onNavigate('home')}
                className="bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                🔍 Explore Full Database
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};