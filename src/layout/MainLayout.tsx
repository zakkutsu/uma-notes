import React from 'react';
import { Header } from '../components';
import type { HeaderProps } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  headerProps: HeaderProps;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, headerProps }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header {...headerProps} />
      {children}
      <footer className="bg-gray-800 text-white py-8 text-center mt-12 sm:mt-16">
        <p className="text-gray-300">
          © 2025 Uma Notes Database. Dibuat dengan antusias oleh penggemar.
        </p>
      </footer>
    </div>
  );
};