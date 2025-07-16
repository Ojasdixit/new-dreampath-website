import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fontsource/inter";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";

import Services from "./components/Services";
import Contact from "./components/Contact";
import CloudParticles from "./components/CloudParticles";
import ParallaxTransition from "./components/ParallaxTransition";
import ScrollIndicator from "./components/ScrollIndicator";
import { useSnapScroll } from "./hooks/useSnapScroll";


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enable snap scrolling
  useSnapScroll();

  useEffect(() => {
    // Initialize smooth scrolling
    const ctx = gsap.context(() => {
      // Smooth scroll setup
      gsap.to(containerRef.current, {
        duration: 1,
        ease: "power2.out"
      });

      // Refresh ScrollTrigger on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #B6E5F7 25%, #E0F6FF 50%, #B6E5F7 75%, #87CEEB 100%)',
      }}
    >
      {/* Fixed Three.js Canvas for 3D effects */}
      <div className="fixed inset-0 pointer-events-none">
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            alpha: true
          }}
        >
          <Suspense fallback={null}>
            <CloudParticles />
            <ambientLight intensity={0.6} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={0.4}
              color="#ffffff"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <section id="hero" className="relative">
          <Hero />
          <ScrollIndicator nextSection="about" />
        </section>
        
        <ParallaxTransition variant="default" />
        
        <section id="about" className="relative">
          <About />
          <ScrollIndicator nextSection="services" />
        </section>
        
        <ParallaxTransition variant="blue" />
        
        <section id="services" className="relative">
          <Services />
          <ScrollIndicator nextSection="contact" />
        </section>
        
        <ParallaxTransition variant="purple" />
        
        <section id="contact" className="relative">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
