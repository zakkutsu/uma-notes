// src/components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/uma', label: 'Uma Musume', icon: '🐎' },
    { to: '/support-cards', label: 'Support Cards', icon: '🃏' }
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors no-underline"
            >
              🐎 Uma Notes
            </Link>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`
                  px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base
                  transition-all duration-200 no-underline
                  ${isActiveLink(link.to) 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="sm:hidden">{link.icon}</span>
                <span className="hidden sm:inline">{link.icon} {link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};