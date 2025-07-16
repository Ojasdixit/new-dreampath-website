import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Services: React.FC = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards on scroll
      gsap.fromTo(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for service cards
      gsap.to(".service-card", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
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

  return (
    <section id="services" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ParallaxText speed={0.8} className="text-6xl font-bold text-white mb-6">
            Our Services
          </ParallaxText>
          <div className="w-32 h-1 bg-white/30 mx-auto mb-8"></div>
          <ParallaxText speed={0.6} className="text-xl text-white/90 max-w-3xl mx-auto">
            We specialize in creating digital solutions that transform ideas into reality. 
            From concept to deployment, we deliver excellence in every project.
          </ParallaxText>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative overflow-hidden bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/80 leading-relaxed text-lg mb-8 group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Animated Button */}
                <button className="relative overflow-hidden bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                  <span className="relative z-10">Learn More →</span>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 rounded-tr-lg"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 rounded-bl-lg"></div>
              
              {/* Floating Particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 right-8 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;