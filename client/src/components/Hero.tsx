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
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <ParallaxText speed={0.5} className="hero-title text-4xl md:text-5xl font-bold mb-4" style={{
          textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)",
          WebkitTextStroke: "1px black"
        }}>
          Dream
        </ParallaxText>
        <ParallaxText speed={0.3} className="hero-title text-4xl md:text-5xl font-bold mb-4" style={{
          textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)",
          WebkitTextStroke: "1px black"
        }}>
          Path
        </ParallaxText>
        <ParallaxText speed={0.4} className="hero-subtitle text-lg md:text-xl mb-6" style={{
          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 4px rgba(0,0,0,0.8)",
          WebkitTextStroke: "0.5px black"
        }}>
          Creative Website Design Agency
        </ParallaxText>
        
        {/* Rotating Companies */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-6 overflow-hidden">
            <div className="animate-scroll-loop flex space-x-8">
              {["Figma", "Framer", "Dribbble", "Blender", "Three.js", "WebGL", "Spline", "Cinema 4D"].map((company, index) => (
                <span 
                  key={index}
                  className="text-white/80 font-medium whitespace-nowrap"
                  style={{
                    fontSize: "20px",
                    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    WebkitTextStroke: "0.5px black"
                  }}
                >
                  {company}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {["Figma", "Framer", "Dribbble", "Blender", "Three.js", "WebGL", "Spline", "Cinema 4D"].map((company, index) => (
                <span 
                  key={`duplicate-${index}`}
                  className="text-white/80 font-medium whitespace-nowrap"
                  style={{
                    fontSize: "20px",
                    textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    WebkitTextStroke: "0.5px black"
                  }}
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ParallaxText speed={0.6} className="hero-cta">
          <button className="bg-black/40 backdrop-blur-sm border-2 border-black text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-black/60 transition-all duration-300 hover:scale-105 shadow-2xl" style={{
            textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
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
