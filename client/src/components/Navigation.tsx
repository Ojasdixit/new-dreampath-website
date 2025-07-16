import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: element,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className={`text-2xl font-bold cursor-pointer transition-colors ${
              isScrolled ? 'text-white hover:text-blue-300' : 'text-white hover:text-blue-200'
            }`}
            onClick={() => scrollToSection('hero')}
          >
            DreamPath
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'About', id: 'about' },
              { name: 'Services', id: 'services' },
              { name: 'Portfolio', id: 'portfolio' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium relative group transition-colors ${
                  isScrolled 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-blue-400' : 'bg-white'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className={`transition-colors ${
              isScrolled ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
