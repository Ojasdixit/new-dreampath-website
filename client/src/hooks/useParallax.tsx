import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseParallaxOptions {
  speed?: number;
  trigger?: string;
  start?: string;
  end?: string;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const {
    speed = 0.5,
    trigger,
    start = "top bottom",
    end = "bottom top"
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: trigger || element,
          start,
          end,
          scrub: true
        }
      });
    }, element);

    return () => ctx.revert();
  }, [speed, trigger, start, end]);

  return elementRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  animation: gsap.TweenVars,
  options: ScrollTrigger.Vars = {}
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false,
          ...options
        }
      });
    }, element);

    return () => ctx.revert();
  }, [animation, options]);

  return elementRef;
};
