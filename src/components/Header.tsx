// src/components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/responsive.css';

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
    <header className="header">
      <div className="header-content">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
              fontWeight: 'bold',
              color: '#007bff'
            }}
          >
            🐎 Uma Notes
          </Link>
        </div>
        
        <nav className="nav-menu">
          {navLinks.map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`btn ${isActiveLink(link.to) ? 'btn-primary' : ''}`}
              style={{
                backgroundColor: isActiveLink(link.to) ? '#007bff' : 'transparent',
                color: isActiveLink(link.to) ? '#fff' : '#333',
                border: `1px solid ${isActiveLink(link.to) ? '#007bff' : 'transparent'}`,
                fontSize: 'clamp(0.8rem, 2vw, 1rem)'
              }}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};