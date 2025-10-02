import React from 'react';
import type { SearchBarProps } from '../types';

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => (
  <div className="relative max-w-2xl mx-auto">
    <input 
      type="search" 
      placeholder={placeholder} 
      className="w-full px-6 py-4 rounded-full text-gray-800 text-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-white/50" 
      onChange={(e) => onSearch(e.target.value)} 
    />
    <svg 
      className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  </div>
);