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
        


        <ParallaxText speed={0.6} className="hero-cta">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white/30 transition-all duration-500 hover:scale-105 shadow-lg animate-float" style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>
            Start Your Journey
          </button>
        </ParallaxText>
      </div>

      {/* Company Logos Container with Radial Movement */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="relative w-96 h-24 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="radial-orbit relative w-80 h-20">
              {[
                { name: "Figma", angle: 0 },
                { name: "Framer", angle: 45 },
                { name: "Dribbble", angle: 90 },
                { name: "Blender", angle: 135 },
                { name: "Three.js", angle: 180 },
                { name: "WebGL", angle: 225 },
                { name: "Spline", angle: 270 },
                { name: "Cinema4D", angle: 315 }
              ].map((logo, index) => (
                <div
                  key={logo.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `radialSpin 20s linear infinite`,
                    animationDelay: `${index * -2.5}s`,
                    transformOrigin: '0 0'
                  }}
                >
                  <div 
                    className="logo-3d transform-gpu"
                    style={{
                      transform: `translate(-50%, -50%) rotateX(15deg) rotateY(${logo.angle}deg) translateZ(120px)`,
                      perspective: '1000px'
                    }}
                  >
                    {logo.name === "Figma" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <path d="M12 12a4 4 0 108 0 4 4 0 00-8 0z"/>
                        <path d="M4 20a4 4 0 004-4v-4H4a4 4 0 000 8z"/>
                        <path d="M4 12a4 4 0 004-4V4H4a4 4 0 000 8z"/>
                        <path d="M4 4a4 4 0 004 4h4V4a4 4 0 00-8 0z"/>
                        <path d="M12 4v8h4a4 4 0 000-8h-4z"/>
                      </svg>
                    )}
                    {logo.name === "Framer" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z"/>
                      </svg>
                    )}
                    {logo.name === "Dribbble" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                    )}
                    {logo.name === "Blender" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1" fill="none"/>
                        <circle cx="12" cy="12" r="2" fill="white"/>
                      </svg>
                    )}
                    {logo.name === "Three.js" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <path d="M2 4L12 2L22 4L12 10L2 4Z" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M2 12L12 10L22 12L12 18L2 12Z" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M2 20L12 18L22 20" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                    )}
                    {logo.name === "WebGL" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M2 17L12 12L22 17" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                    )}
                    {logo.name === "Spline" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <circle cx="6" cy="6" r="3" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="18" cy="6" r="3" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="12" cy="18" r="3" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M6 6L18 6M6 6L12 18M18 6L12 18" stroke="white" strokeWidth="2"/>
                      </svg>
                    )}
                    {logo.name === "Cinema4D" && (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-2xl hover:scale-110 transition-transform">
                        <rect width="20" height="20" x="2" y="2" rx="4" stroke="white" strokeWidth="2" fill="none"/>
                        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">C4D</text>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
