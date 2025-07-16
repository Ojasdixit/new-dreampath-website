import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useLocation } from "react-router-dom";
import "@fontsource/inter";

import Navigation from "./components/Navigation";
import CloudParticles from "./components/CloudParticles";
import { useSnapScroll } from "./hooks/useSnapScroll";

// Import Pages
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Chatbox from "./components/Chatbox";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Enable snap scrolling only on the home page
  useSnapScroll(location.pathname === '/');

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger to recalculate positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100); // Delay to allow DOM to update

    return () => clearTimeout(timer);
  }, [location.pathname]);

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

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
      </Routes>

      {/* Chatbox */} 
      <Chatbox />
    </div>
  );
}

export default App;
