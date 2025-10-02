// src/components/SearchBar.tsx
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Cari nama karakter..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Real-time search saat user mengetik
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="
              w-full px-4 py-3 
              border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              text-base
              placeholder-gray-500
              transition-all duration-200
            "
          />
          {searchTerm && (
            <button 
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="
                absolute right-3 top-1/2 transform -translate-y-1/2
                text-gray-400 hover:text-gray-600 
                transition-colors duration-200
              "
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        <button 
          type="submit"
          className="
            px-6 py-3 
            bg-blue-500 text-white 
            rounded-lg font-medium
            hover:bg-blue-600 
            transition-colors duration-200
            whitespace-nowrap
            min-w-[80px]
          "
        >
          Cari
        </button>
      </div>
    </form>
  );
};