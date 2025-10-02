import React, { useEffect } from 'react';
import { SearchBar, UmaCard, SupportCardCard, SkillCard, FactorCard } from '../components';
import { 
  featuredUmas, 
  featuredSupportCards, 
  featuredSkills, 
  featuredFactors,
  homeSectionIdToNavMap 
} from '../constants';
import type { PageProps } from '../types';

export const HomePage: React.FC<PageProps> = ({ onNavigate, setActiveNav }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          const navItem = homeSectionIdToNavMap[intersectingEntry.target.id];
          if (navItem) setActiveNav(navItem);
        }
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const sections = Object.keys(homeSectionIdToNavMap).map(id => document.getElementById(id));
    sections.forEach(sec => { if (sec) observer.observe(sec); });
    return () => { sections.forEach(sec => { if (sec) observer.unobserve(sec); }); };
  }, [setActiveNav]);

  return (
    <>
      <section id="home-section" className="bg-gradient-to-br from-uma-blue to-uma-purple text-white py-12 sm:py-16 lg:py-20">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
            🐎 Uma Notes Database
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
            Temukan semua informasi tentang karakter Uma Musume favoritmu. Database lengkap dengan stats, skills, aptitude, dan support cards.
          </p>
          <div className="mb-8">
            <SearchBar onSearch={() => {}} placeholder="Cari Uma Musume atau Support Card..." />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 no-underline">
              🐎 Browse Database
            </button>
            <button 
              onClick={() => onNavigate('progress')} 
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/30 hover:border-white/50 transition-all duration-200 no-underline"
            >
              📈 Track Your Progress
            </button>
          </div>
        </div>
      </section>
      
      <main className="container py-8 sm:py-12">
        <section id="featured-uma-musume" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">⭐ Featured Uma</h2>
            <a href="#" className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredUmas.map(uma => <UmaCard key={uma.id} {...uma} />)}
          </div>
        </section>
        
        <section id="featured-support-cards" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">🃏 Featured Support Cards</h2>
            <a href="#" className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredSupportCards.map(card => <SupportCardCard key={card.id} {...card} />)}
          </div>
        </section>
        
        <section id="featured-skills" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">✨ Featured Skills</h2>
            <a href="#" className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredSkills.map(skill => <SkillCard key={skill.id} {...skill} />)}
          </div>
        </section>
        
        <section id="featured-factors" className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">🧬 Featured Factors</h2>
            <a href="#" className="text-blue-500 hover:text-blue-600 text-lg font-medium transition-colors no-underline">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredFactors.map(factor => <FactorCard key={factor.id} {...factor} />)}
          </div>
        </section>
        
        <section id="database-statistics" className="card text-center p-6 sm:p-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
            📊 Database Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2">
                {featuredUmas.length * 15}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">Uma Musume</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-500 mb-2">
                {featuredSupportCards.length * 20}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">Support Cards</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-500 mb-2">
                {featuredSkills.length * 120}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">Skills</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-pink-500 mb-2">
                {featuredFactors.length * 80}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">Factors</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-2">15</div>
              <div className="text-gray-600 text-sm sm:text-base">Aptitude Types</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">∞</div>
              <div className="text-gray-600 text-sm sm:text-base">Possibilities</div>
            </div>
          </div>
        </section>
        
        <section id="about-section">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
              Tentang Kami
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
              Uma Notes Database adalah proyek yang dibuat oleh penggemar untuk penggemar. 
              Tujuan kami adalah menyediakan sumber data yang komprehensif dan mudah diakses 
              untuk semua hal terkait Uma Musume: Pretty Derby. Kami berdedikasi untuk menjaga 
              agar data tetap akurat dan terbaru.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};