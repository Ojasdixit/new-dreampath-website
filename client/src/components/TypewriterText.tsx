import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  trigger?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = "",
  speed = 0.05,
  delay = 0,
  trigger
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    
    const typeAnimation = () => {
      let currentIndex = 0;
      setDisplayText("");
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, speed * 1000);
      
      return () => clearInterval(typeInterval);
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 80%",
        onEnter: () => {
          setTimeout(typeAnimation, delay * 1000);
        },
        once: true
      });
    } else {
      setTimeout(typeAnimation, delay * 1000);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [text, speed, delay, trigger]);

  return (
    <span ref={textRef} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;