import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import ParallaxTransition from '../components/ParallaxTransition';
import ScrollIndicator from '../components/ScrollIndicator';

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
