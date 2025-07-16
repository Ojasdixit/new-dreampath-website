import React from "react";

const SectionTransition: React.FC = () => {
  return (
    <div className="relative h-32 bg-gradient-to-b from-sky-400 to-blue-500 overflow-hidden">

      

      
      {/* Floating particles for visual interest */}
      <div className="absolute top-4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 right-1/3 w-2 h-2 bg-white/15 rounded-full animate-ping"></div>
      <div className="absolute top-8 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default SectionTransition;