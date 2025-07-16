import React from "react";

interface ScrollIndicatorProps {
  nextSection: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ nextSection }) => {
  const scrollToSection = () => {
    const element = document.getElementById(nextSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={scrollToSection}
        className="group flex flex-col items-center text-white hover:text-white/80 transition-all duration-300"
        aria-label={`Scroll to ${nextSection}`}
      >
        {/* Mouse icon */}
        <div className="w-6 h-10 border-2 border-white/60 rounded-full mb-2 relative group-hover:border-white/80 transition-colors duration-300">
          <div className="w-1 h-2 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce group-hover:bg-white/80"></div>
        </div>
        
        {/* Scroll text */}
        <span className="text-sm font-medium tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          Scroll Down
        </span>
        
        {/* Arrow */}
        <div className="mt-2 animate-bounce">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;