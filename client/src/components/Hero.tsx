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
        <div style={{position:"relative", aspectRatio:"16/9", width: "100%", height: "100%"}}>
          <iframe 
            loading="lazy" 
            title="Gumlet video player"
            src="https://play.gumlet.io/embed/6876857be448cc1c325fa72e?background=true&autoplay=true&loop=true&disableControls=true"
            style={{border:"none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%"}}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-blue-500/30"></div>

      {/* Content */}
      <div className="relative z-10 text-left text-white max-w-4xl mx-auto px-6 ml-8">
        <ParallaxText speed={0.5} className="hero-title text-4xl md:text-5xl font-bold mb-4" style={{
          textShadow: "0 4px 8px rgba(0,0,0,0.5)"
        }}>
          DreamPath
        </ParallaxText>
        <ParallaxText speed={0.4} className="hero-subtitle text-lg md:text-xl mb-6" style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.5)"
        }}>
          Creative Website Design Agency
        </ParallaxText>
        
        {/* Rotating Company Logos */}
        <div className="mb-6">
          <div className="flex items-center justify-center overflow-hidden max-w-2xl mx-auto">
            <div className="animate-scroll-loop flex items-center space-x-12">
              {/* Company Logo SVGs */}
              <div className="flex items-center space-x-12">
                {/* Figma */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                  <path d="M12 12a4 4 0 108 0 4 4 0 00-8 0z" fill="#1ABCFE"/>
                  <path d="M4 20a4 4 0 004-4v-4H4a4 4 0 000 8z" fill="#0ACF83"/>
                  <path d="M4 12a4 4 0 004-4V4H4a4 4 0 000 8z" fill="#FF7262"/>
                  <path d="M4 4a4 4 0 004 4h4V4a4 4 0 00-8 0z" fill="#F24E1E"/>
                  <path d="M12 4v8h4a4 4 0 000-8h-4z" fill="#A259FF"/>
                </svg>

                {/* Framer */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                  <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z"/>
                </svg>

                {/* Dribbble */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#EA4C89" className="drop-shadow-lg">
                  <circle cx="12" cy="12" r="12"/>
                  <path d="M20.66 6.98a9.932 9.932 0 0 0-3.641-3.64C15.486 2.447 13.813 2 12 2s-3.486.447-5.02 1.34c-1.533.893-2.747 2.107-3.64 3.64S2 10.187 2 12s.446 3.487 1.34 5.02a9.924 9.924 0 0 0 3.641 3.64C8.514 21.553 10.187 22 12 22s3.486-.447 5.02-1.34a9.932 9.932 0 0 0 3.641-3.64C21.554 15.487 22 13.813 22 12s-.446-3.487-1.34-5.02zM12 3.825c2 0 3.847.614 5.385 1.66-.056.85-.577 2.137-1.757 3.817-1.097-2.025-2.313-3.532-3.628-4.477zm-5.385 1.66A8.14 8.14 0 0 1 12 3.825c-1.315.945-2.531 2.452-3.628 4.477-1.18-1.68-1.701-2.967-1.757-3.817zM4.67 7.715c.83.642 2.077 1.017 3.33 1.017.322 0 .635-.017.94-.051-.525 1.248-.79 2.57-.79 3.969 0 .798.1 1.579.295 2.33-1.88-.7-3.252-2.393-3.775-4.265z" fill="white"/>
                </svg>

                {/* Blender */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5792A" className="drop-shadow-lg">
                  <circle cx="12" cy="12" r="10" fill="#F5792A"/>
                  <circle cx="12" cy="12" r="6" fill="white"/>
                  <circle cx="12" cy="12" r="3" fill="#F5792A"/>
                </svg>

                {/* Three.js */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                  <path d="M.38 0L.48 24 12 18 23.52 24 23.62 0 12 6z"/>
                  <path d="M12 6L23.62 0 12 6 .38 0z" fill="#444"/>
                </svg>

                {/* WebGL */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#990000" className="drop-shadow-lg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                </svg>

                {/* Spline */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#6366F1" className="drop-shadow-lg">
                  <circle cx="6" cy="6" r="4"/>
                  <circle cx="18" cy="6" r="4"/>
                  <circle cx="12" cy="18" r="4"/>
                  <path d="M6 6L18 6M6 6L12 18M18 6L12 18" stroke="#6366F1" strokeWidth="2" fill="none"/>
                </svg>

                {/* Cinema 4D */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#011A6A" className="drop-shadow-lg">
                  <rect width="24" height="24" rx="4" fill="#011A6A"/>
                  <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C4D</text>
                </svg>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-12">
                {/* Figma */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                  <path d="M12 12a4 4 0 108 0 4 4 0 00-8 0z" fill="#1ABCFE"/>
                  <path d="M4 20a4 4 0 004-4v-4H4a4 4 0 000 8z" fill="#0ACF83"/>
                  <path d="M4 12a4 4 0 004-4V4H4a4 4 0 000 8z" fill="#FF7262"/>
                  <path d="M4 4a4 4 0 004 4h4V4a4 4 0 00-8 0z" fill="#F24E1E"/>
                  <path d="M12 4v8h4a4 4 0 000-8h-4z" fill="#A259FF"/>
                </svg>

                {/* Framer */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                  <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z"/>
                </svg>

                {/* Dribbble */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#EA4C89" className="drop-shadow-lg">
                  <circle cx="12" cy="12" r="12"/>
                  <path d="M20.66 6.98a9.932 9.932 0 0 0-3.641-3.64C15.486 2.447 13.813 2 12 2s-3.486.447-5.02 1.34c-1.533.893-2.747 2.107-3.64 3.64S2 10.187 2 12s.446 3.487 1.34 5.02a9.924 9.924 0 0 0 3.641 3.64C8.514 21.553 10.187 22 12 22s3.486-.447 5.02-1.34a9.932 9.932 0 0 0 3.641-3.64C21.554 15.487 22 13.813 22 12s-.446-3.487-1.34-5.02zM12 3.825c2 0 3.847.614 5.385 1.66-.056.85-.577 2.137-1.757 3.817-1.097-2.025-2.313-3.532-3.628-4.477zm-5.385 1.66A8.14 8.14 0 0 1 12 3.825c-1.315.945-2.531 2.452-3.628 4.477-1.18-1.68-1.701-2.967-1.757-3.817zM4.67 7.715c.83.642 2.077 1.017 3.33 1.017.322 0 .635-.017.94-.051-.525 1.248-.79 2.57-.79 3.969 0 .798.1 1.579.295 2.33-1.88-.7-3.252-2.393-3.775-4.265z" fill="white"/>
                </svg>

                {/* Blender */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#F5792A" className="drop-shadow-lg">
                  <circle cx="12" cy="12" r="10" fill="#F5792A"/>
                  <circle cx="12" cy="12" r="6" fill="white"/>
                  <circle cx="12" cy="12" r="3" fill="#F5792A"/>
                </svg>

                {/* Three.js */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                  <path d="M.38 0L.48 24 12 18 23.52 24 23.62 0 12 6z"/>
                  <path d="M12 6L23.62 0 12 6 .38 0z" fill="#444"/>
                </svg>

                {/* WebGL */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#990000" className="drop-shadow-lg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                </svg>

                {/* Spline */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#6366F1" className="drop-shadow-lg">
                  <circle cx="6" cy="6" r="4"/>
                  <circle cx="18" cy="6" r="4"/>
                  <circle cx="12" cy="18" r="4"/>
                  <path d="M6 6L18 6M6 6L12 18M18 6L12 18" stroke="#6366F1" strokeWidth="2" fill="none"/>
                </svg>

                {/* Cinema 4D */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#011A6A" className="drop-shadow-lg">
                  <rect width="24" height="24" rx="4" fill="#011A6A"/>
                  <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C4D</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <ParallaxText speed={0.6} className="hero-cta">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white/30 transition-all duration-500 hover:scale-105 shadow-lg animate-float" style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>
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
