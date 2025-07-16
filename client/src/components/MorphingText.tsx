import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register TextPlugin
gsap.registerPlugin(TextPlugin);

interface MorphingTextProps {
  words: string[];
  className?: string;
  speed?: number;
}

const MorphingText: React.FC<MorphingTextProps> = ({ 
  words, 
  className = "", 
  speed = 2 
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!textRef.current || words.length === 0) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    words.forEach((word, index) => {
      tl
        .to(textRef.current, {
          duration: 0.5,
          text: word,
          ease: "none"
        })
        .to(textRef.current, {
          duration: speed,
          delay: 0.5
        })
        .to(textRef.current, {
          duration: 0.5,
          text: "",
          ease: "none"
        });
    });

    return () => {
      tl.kill();
    };
  }, [words, speed]);

  return (
    <span ref={textRef} className={className}>
      {words[0] || ""}
    </span>
  );
};

export default MorphingText;