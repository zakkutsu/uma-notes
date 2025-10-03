import { useState, useEffect } from 'react';
import { MainLayout } from './layout';
import { HomePage, ProgressTrackerPage, ViewAllPage } from './pages';
import { getAppId } from './utils';
import type { Page, Uma, SupportCard, Skill, Factor, TrainedUma } from './types';
// import { onAuthStateChanged, User } from 'firebase/auth'; // Uncomment when Firebase is installed

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [activeProgressNav, setActiveProgressNav] = useState<string>('Your Uma');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  
  // ViewAll page state
  const [viewAllState, setViewAllState] = useState<{
    type: 'uma' | 'support-card' | 'skill' | 'factor' | 'trained-uma' | null;
    items: (Uma | SupportCard | Skill | Factor | TrainedUma)[];
  }>({ type: null, items: [] });
  
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

  const navigateToViewAll = (type: 'uma' | 'support-card' | 'skill' | 'factor' | 'trained-uma', items: (Uma | SupportCard | Skill | Factor | TrainedUma)[]) => {
    setViewAllState({ type, items });
    setCurrentPage('view-all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddItem = (item: { id: number; name?: string; rarity?: number; imgUrl?: string; type?: string; icon?: string; description?: string; stars?: number; level?: number; stats?: TrainedUma['stats']; rank?: string }) => {
    // This will be handled by the ProgressTrackerPage
    console.log('Add item:', item);
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
      ) : currentPage === 'view-all' && viewAllState.type ? (
        <ViewAllPage
          type={viewAllState.type}
          items={viewAllState.items}
          onBack={() => navigateTo('progress')}
          onAddItem={handleAddItem}
        />
      ) : (
        <ProgressTrackerPage 
          onNavigate={navigateTo} 
          setActiveProgressNav={setActiveProgressNav}
          onViewAll={navigateToViewAll}
        />
      )}
    </MainLayout>
  );
}