import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxTransitionProps {
  variant?: "default" | "blue" | "purple" | "green";
}

const ParallaxTransition: React.FC<ParallaxTransitionProps> = ({ variant = "default" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multiple layer parallax effect for smooth blending
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0.3 },
        {
          y: -100,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Layer 1 - slow movement
      gsap.fromTo(
        layer1Ref.current,
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      // Layer 2 - medium movement
      gsap.fromTo(
        layer2Ref.current,
        { y: 80 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Layer 3 - fast movement
      gsap.fromTo(
        layer3Ref.current,
        { y: 120 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const getGradientColors = () => {
    switch (variant) {
      case "blue":
        return "from-sky-300/20 via-blue-400/30 to-indigo-500/40";
      case "purple":
        return "from-blue-400/20 via-purple-400/30 to-pink-500/40";
      case "green":
        return "from-blue-400/20 via-teal-400/30 to-green-500/40";
      default:
        return "from-sky-300/15 via-sky-400/25 to-blue-500/35";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-80 overflow-hidden"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/10 to-sky-500/20"></div>
      
      {/* Layer 1 - Background flow */}
      <div 
        ref={layer1Ref}
        className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} opacity-60`}
      ></div>
      
      {/* Layer 2 - Middle blend */}
      <div 
        ref={layer2Ref}
        className="absolute inset-0 bg-gradient-to-t from-sky-400/20 via-transparent to-sky-300/15 opacity-70"
      ></div>
      
      {/* Layer 3 - Foreground motion */}
      <div 
        ref={layer3Ref}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-sky-300/25 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky-400/25 to-transparent"></div>
      </div>

      {/* Floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse delay-300"></div>
    </div>
  );
};

export default ParallaxTransition;