import React from "react";

const SectionTransition: React.FC = () => {
  return (
    <div className="relative h-32 bg-gradient-to-b from-sky-400 to-blue-500 overflow-hidden">
      {/* Dotted pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Central divider line */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
        <div className="w-full h-px bg-white/40"></div>
        <div 
          className="w-full h-px bg-white/20 mt-1"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, white 0, white 8px, transparent 8px, transparent 16px)`,
          }}
        ></div>
      </div>
      
      {/* Floating particles for visual interest */}
      <div className="absolute top-4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute top-8 right-1/4 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default SectionTransition;