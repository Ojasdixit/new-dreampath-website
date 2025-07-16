import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollRef.current;
      const container = containerRef.current;
      
      if (!scrollContainer || !container) return;

      // Calculate scroll distance (half the width since we duplicated services)
      const singleSetWidth = scrollContainer.scrollWidth / 2;
      
      // Set initial position
      gsap.set(scrollContainer, { x: 0 });
      
      // Create the infinite scroll timeline
      const scrollTl = gsap.timeline({ repeat: -1, ease: "none" });
      scrollTl.to(scrollContainer, {
        x: -singleSetWidth,
        duration: 25, // Slower speed for better readability
        ease: "none"
      });

      // Pause on hover
      const handleMouseEnter = () => {
        scrollTl.pause();
      };
      
      const handleMouseLeave = () => {
        scrollTl.play();
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  const baseServices = [
    {
      title: "Web Development",
      description: "Full-stack web development using modern technologies like React, Node.js, and cloud services to build powerful, scalable applications.",
      icon: "🌐",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "3D Design",
      description: "Creating stunning 3D models, animations, and interactive experiences using cutting-edge tools and rendering technologies.",
      icon: "🎯",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      icon: "📱",
      gradient: "from-green-500 to-blue-600"
    },
    {
      title: "Web Apps Development",
      description: "Progressive web applications with offline capabilities, push notifications, and native app-like experiences.",
      icon: "⚡",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  // Duplicate services for seamless looping
  const services = [...baseServices, ...baseServices];

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/services-bg.jpeg')`
        }}
      ></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ParallaxText speed={0.8} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </ParallaxText>
          <div className="w-32 h-1 bg-white/30 mx-auto mb-8"></div>
          <ParallaxText speed={0.6} className="text-lg text-white/90 max-w-3xl mx-auto">
            We specialize in creating digital solutions that transform ideas into reality. 
            From concept to deployment, we deliver excellence in every project.
          </ParallaxText>
        </div>

        {/* Services Horizontal Scroll */}
        <div 
          ref={containerRef}
          className="services-container overflow-hidden w-full cursor-pointer"
        >
          <div 
            ref={scrollRef}
            className="services-track flex gap-6 w-max"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative overflow-hidden bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl flex-shrink-0 w-80"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/80 leading-relaxed text-sm mb-6 group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Animated Button */}
                  <button className="relative overflow-hidden bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                    <span className="relative z-10">Learn More →</span>
                    <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 rounded-bl-lg"></div>
                
                {/* Floating Particles */}
                <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;