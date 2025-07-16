import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fontsource/inter";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import CloudParticles from "./components/CloudParticles";
import FloatingElements from "./components/FloatingElements";
import AnimatedBackground from "./components/AnimatedBackground";
import InteractiveOrb from "./components/InteractiveOrb";
import ScrollParticles from "./components/ScrollParticles";
import ParticleField from "./components/ParticleField";
import MorphingGeometry from "./components/MorphingGeometry";
import DynamicLighting from "./components/DynamicLighting";
import InteractiveFeedback from "./components/InteractiveFeedback";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

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
            <AnimatedBackground />
            <ParticleField count={100} size={0.8} speed={0.001} color="#E0F6FF" />
            <CloudParticles />
            <FloatingElements />
            <MorphingGeometry />
            <InteractiveOrb />
            <DynamicLighting />
            <ambientLight intensity={0.4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Interactive Feedback */}
      <InteractiveFeedback />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default App;
