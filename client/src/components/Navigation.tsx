import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        gsap.to(window, { duration: 1.5, scrollTo: element, ease: "power2.inOut" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', action: () => scrollToSection('hero') },
    { name: 'About', action: () => scrollToSection('about') },
    { name: 'Services', action: () => scrollToSection('services') },
    { name: 'Portfolio', href: 'https://www.fiverr.com/users/ojasvydixit/portfolio' },
    { name: 'Contact', to: '/contact-us' },
    { name: 'Refund Policy', to: '/refund-policy' },
    { name: 'Privacy Policy', to: '/privacy-policy' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage || isMobileMenuOpen
          ? 'bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/30' 
          : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white cursor-pointer hover:text-blue-200 transition-colors">
            DreamPath
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => {
              const commonClasses = "text-white/90 hover:text-white transition-colors font-medium relative group";
              if (item.to) {
                return (
                  <Link key={item.name} to={item.to} className={commonClasses}>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              } else if (item.href) {
                return (
                  <a href={item.href} key={item.name} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                     {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              } else {
                return (
                  <button key={item.name} onClick={item.action} className={commonClasses}>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white/90 hover:text-white transition-colors z-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/20 backdrop-blur-lg shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((item) => {
                const commonClasses = "text-white/90 hover:text-white transition-colors font-medium";
                if (item.to) {
                  return (
                    <Link key={item.name} to={item.to} onClick={() => setMobileMenuOpen(false)} className={commonClasses}>
                      {item.name}
                    </Link>
                  );
                } else if (item.href) {
                  return (
                    <a href={item.href} key={item.name} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                      {item.name}
                    </a>
                  )
                } else {
                  return (
                    <button key={item.name} onClick={item.action} className={commonClasses}>
                      {item.name}
                    </button>
                  );
                }
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
