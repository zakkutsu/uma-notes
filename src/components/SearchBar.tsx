// src/components/SearchBar.tsx
import { useState } from 'react';
import '../styles/responsive.css';

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
    <form onSubmit={handleSubmit} className="search-container">
      <input 
        type="text" 
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="search-input"
      />
      <button 
        type="submit"
        className="btn btn-primary"
      >
        Cari
      </button>
      {searchTerm && (
        <button 
          type="button"
          onClick={() => {
            setSearchTerm('');
            onSearch('');
          }}
          className="btn btn-secondary"
        >
          Clear
        </button>
      )}
    </form>
  );
};