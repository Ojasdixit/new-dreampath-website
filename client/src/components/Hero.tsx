import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.from(".hero-title", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.2
      });

      gsap.from(".hero-subtitle", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
      });

      gsap.from(".hero-cta", {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1
      });

      // Video parallax effect
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div 
        ref={videoRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <iframe
          src="https://player.gumlet.io/embed/674e4d9a4c9b9b09c7c4c2b4"
          className="w-full h-full object-cover"
          style={{
            border: 'none',
            borderRadius: '0px',
            minHeight: '100%',
            minWidth: '100%'
          }}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <ParallaxText speed={0.5} className="hero-title text-6xl md:text-8xl font-bold mb-6">
          Dream
        </ParallaxText>
        <ParallaxText speed={0.3} className="hero-title text-6xl md:text-8xl font-bold mb-6">
          Path
        </ParallaxText>
        <ParallaxText speed={0.4} className="hero-subtitle text-xl md:text-2xl mb-8 opacity-90">
          Creating Digital Dreams Through Creative Design
        </ParallaxText>
        <ParallaxText speed={0.6} className="hero-cta">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105">
            Start Your Journey
          </button>
        </ParallaxText>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
