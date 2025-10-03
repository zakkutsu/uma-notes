/**
 * Scroll to a specific section with header offset
 * @param sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  const headerEl = document.querySelector('header');
  
  if (element && headerEl) {
    const headerHeight = headerEl.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16;
    
    window.scrollTo({ 
      top: offsetPosition, 
      behavior: 'smooth' 
    });
  }
};