import React from 'react';
import { Header } from '../components';
import type { HeaderProps } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  headerProps: HeaderProps;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, headerProps }) => {
  return (
    <>
      <style>{`
        :root { 
          --uma-blue: #3b82f6; 
          --uma-purple: #8b5cf6; 
        } 
        .container { 
          @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; 
        } 
        .text-shadow { 
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3); 
        } 
        .card { 
          @apply bg-white rounded-xl shadow-md overflow-hidden; 
        } 
        .card-hover-effect { 
          @apply card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2; 
        } 
        .bg-speed-tag { background-color: #ef4444; } 
        .bg-stamina-tag { background-color: #f97316; } 
        .bg-power-tag { background-color: #eab308; } 
        .bg-guts-tag { background-color: #84cc16; } 
        .bg-intellect-tag { background-color: #22c55e; } 
        .bg-friend-tag { background-color: #3b82f6; } 
        .bg-unique-tag { background-color: #a855f7; } 
        .bg-uma-blue { background-color: var(--uma-blue); } 
        .bg-uma-purple { background-color: var(--uma-purple); } 
        .text-uma-blue { color: var(--uma-blue); } 
        .from-uma-blue { 
          --tw-gradient-from: var(--uma-blue); 
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); 
        } 
        .to-uma-purple { 
          --tw-gradient-to: var(--uma-purple); 
        } 
        .btn-action { 
          @apply px-6 py-3 rounded-lg font-semibold text-white transition-transform duration-200 ease-in-out active:scale-95; 
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50">
        <Header {...headerProps} />
        {children}
        <footer className="bg-gray-800 text-white py-8 text-center mt-12 sm:mt-16">
          <p className="text-gray-300">
            © 2025 Uma Notes Database. Dibuat dengan antusias oleh penggemar.
          </p>
        </footer>
      </div>
    </>
  );
};