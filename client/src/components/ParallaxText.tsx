import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  speed = 0.5, 
  className = "" 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxText;
