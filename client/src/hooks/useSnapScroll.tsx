import { useEffect } from 'react';

export const useSnapScroll = () => {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const sections = ['hero', 'about', 'services', 'contact'];
    let currentSection = 0;

    const scrollToSection = (index: number) => {
      const section = document.getElementById(sections[index]);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        currentSection = index;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      isScrolling = true;
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        currentSection++;
        scrollToSection(currentSection);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        currentSection--;
        scrollToSection(currentSection);
      }
      
      // Clear timeout if it exists
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set timeout to reset scrolling flag
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          if (currentSection < sections.length - 1) {
            e.preventDefault();
            isScrolling = true;
            currentSection++;
            scrollToSection(currentSection);
            scrollTimeout = setTimeout(() => {
              isScrolling = false;
            }, 1000);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          if (currentSection > 0) {
            e.preventDefault();
            isScrolling = true;
            currentSection--;
            scrollToSection(currentSection);
            scrollTimeout = setTimeout(() => {
              isScrolling = false;
            }, 1000);
          }
          break;
        case 'Home':
          e.preventDefault();
          isScrolling = true;
          currentSection = 0;
          scrollToSection(currentSection);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1000);
          break;
        case 'End':
          e.preventDefault();
          isScrolling = true;
          currentSection = sections.length - 1;
          scrollToSection(currentSection);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1000);
          break;
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Update current section based on scroll position
    const updateCurrentSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop - windowHeight / 2 && 
              scrollPosition < sectionBottom - windowHeight / 2) {
            currentSection = i;
            break;
          }
        }
      }
    };

    // Initialize current section
    updateCurrentSection();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);
};