import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ParallaxTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth parallax transition effect
      gsap.fromTo(
        containerRef.current,
        {
          y: 100,
          opacity: 0.5,
        },
        {
          y: -100,
          opacity: 1,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-96 bg-gradient-to-b from-transparent via-sky-400/20 to-sky-400/40 overflow-hidden"
    >
      {/* Flowing transition elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300/10 via-blue-400/20 to-indigo-500/30"></div>
      
      {/* Smooth wave pattern */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
        style={{
          background: `linear-gradient(45deg, 
            rgba(135, 206, 235, 0.1) 0%, 
            rgba(135, 206, 235, 0.3) 50%, 
            rgba(135, 206, 235, 0.1) 100%
          )`
        }}
      ></div>
    </div>
  );
};

export default ParallaxTransition;