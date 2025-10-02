import { useState, useEffect } from 'react';
import { MainLayout } from './layout';
import { HomePage, ProgressTrackerPage } from './pages';
import { getAppId } from './utils';
import type { Page } from './types';
// import { onAuthStateChanged, User } from 'firebase/auth'; // Uncomment when Firebase is installed

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [activeProgressNav, setActiveProgressNav] = useState<string>('Your Uma');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  
  useEffect(() => {
    // Firebase initialization will be added later when needed
    console.log('App initialized with appId:', getAppId());
  }, []);

  const navigateTo = (page: Page, targetId?: string) => {
    if (page === 'home' && targetId) {
      setScrollTarget(targetId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (page === 'progress') {
      setActiveNav('');
    } else {
      setActiveNav('Home');
    }
    
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage === 'home' && scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        const headerEl = document.querySelector('header');
        if (element && headerEl) {
          const headerHeight = headerEl.offsetHeight;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        setScrollTarget(null);
      }, 100);
    }
  }, [currentPage, scrollTarget]);

  const headerProps = {
    onNavigate: navigateTo,
    activeNav,
    setActiveNav,
    activeProgressNav,
    setActiveProgressNav,
    currentPage
  };
  
  return (
    <MainLayout headerProps={headerProps}>
      {currentPage === 'home' ? (
        <HomePage onNavigate={navigateTo} setActiveNav={setActiveNav} />
      ) : (
        <ProgressTrackerPage onNavigate={navigateTo} setActiveProgressNav={setActiveProgressNav} />
      )}
    </MainLayout>
  );
}