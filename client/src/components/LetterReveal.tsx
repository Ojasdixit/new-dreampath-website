import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LetterRevealProps {
  children: React.ReactNode;
  className?: string;
  trigger?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

const LetterReveal: React.FC<LetterRevealProps> = ({
  children,
  className = "",
  trigger,
  stagger = 0.03,
  duration = 0.8,
  delay = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const text = element.textContent || "";
    
    // Split text into individual letters
    element.innerHTML = text
      .split("")
      .map((char, index) => 
        char === " " 
          ? " " 
          : `<span class="letter" style="display: inline-block; opacity: 0; transform: translateY(50px);">${char}</span>`
      )
      .join("");

    const letters = element.querySelectorAll(".letter");

    const animateLetters = () => {
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 50,
          rotationX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: "back.out(1.7)"
        }
      );
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 80%",
        onEnter: animateLetters,
        once: true
      });
    } else {
      setTimeout(animateLetters, delay * 1000);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [children, trigger, stagger, duration, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default LetterReveal;