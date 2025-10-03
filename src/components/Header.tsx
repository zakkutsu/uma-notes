import React, { useState, useEffect, useRef } from 'react';
import type { HeaderProps } from '../types';
import { homeSectionIdToNavMap, progressSectionIdToNavMap } from '../constants';
import { scrollToSection } from '../utils';

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  activeNav, 
  setActiveNav, 
  activeProgressNav, 
  setActiveProgressNav, 
  currentPage 
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleScrollToSection = (id: string) => {
    scrollToSection(id);
  };
  
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container py-3 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')} 
          className="text-xl font-bold text-uma-blue"
        >
          🐎 Uma Notes
        </button>
        
        <nav className="hidden md:flex items-center text-gray-600 font-medium">
          <div className="flex gap-2 border-r border-gray-200 pr-4 mr-4">
            {currentPage === 'home' 
              ? Object.entries(homeSectionIdToNavMap).map(([id, item]) => (
                  <button 
                    key={item} 
                    onClick={() => { 
                      setActiveNav(item); 
                      handleScrollToSection(id); 
                    }} 
                    className={`px-3 py-2 rounded-md transition-colors text-sm ${
                      activeNav === item 
                        ? 'bg-blue-100 text-uma-blue font-semibold' 
                        : 'hover:bg-blue-50 hover:text-uma-blue'
                    }`}
                  >
                    {item}
                  </button>
                ))
              : Object.entries(progressSectionIdToNavMap).map(([id, item]) => (
                  <button 
                    key={item} 
                    onClick={() => { 
                      setActiveProgressNav(item); 
                      handleScrollToSection(id); 
                    }} 
                    className={`px-3 py-2 rounded-md transition-colors text-sm ${
                      activeProgressNav === item 
                        ? 'bg-blue-100 text-uma-blue font-semibold' 
                        : 'hover:bg-blue-50 hover:text-uma-blue'
                    }`}
                  >
                    {item}
                  </button>
                ))
            }
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)} 
              className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uma-blue"
            >
              <img 
                src="https://placehold.co/40x40/e0e0e0/333333?text=P" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account Setting
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            )}
          </div>
        </nav>
        
        <button className="md:hidden text-gray-700">☰</button>
      </div>
    </header>
  );
};