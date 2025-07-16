import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate services cards
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });

      // Hover animations for service cards
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Creative Solutions",
      description: "Innovative design approaches that blend creativity with cutting-edge technology for unique digital experiences.",
      icon: "✨",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "Brand Identity",
      description: "Comprehensive brand development including logos, color schemes, and visual identity systems.",
      icon: "🎨",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      title: "Digital Experiences",
      description: "Interactive web applications and immersive digital platforms that engage and inspire users.",
      icon: "🌟",
      gradient: "from-green-400 to-blue-400"
    },
    {
      title: "Motion Graphics",
      description: "Dynamic animations and motion design that bring your brand story to life with visual impact.",
      icon: "🎬",
      gradient: "from-orange-400 to-red-400"
    },
    {
      title: "User Experience",
      description: "User-centered design methodologies that create intuitive and delightful digital interactions.",
      icon: "👤",
      gradient: "from-teal-400 to-green-400"
    },
    {
      title: "Technology Integration",
      description: "Advanced technical solutions including AI integration, cloud services, and modern frameworks.",
      icon: "⚡",
      gradient: "from-indigo-400 to-purple-400"
    }
  ];

  return (
    <section
      id="services"
      ref={servicesRef}
      className="relative min-h-screen py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image */}
        <div className="relative mb-20 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="/images/services-hero.jpg" 
            alt="Digital Services Team" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <ParallaxText speed={0.3} className="text-5xl md:text-6xl font-bold mb-6">
                Our Services
              </ParallaxText>
              <ParallaxText speed={0.4} className="text-xl max-w-3xl mx-auto">
                We offer comprehensive digital solutions to help your business thrive in the digital landscape.
              </ParallaxText>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Floating Animation */}
              <div className="relative z-10">
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Animated Button */}
                <button className="relative overflow-hidden bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform group-hover:scale-105">
                  <span className="relative z-10">Explore →</span>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
              </div>
              
              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 group-hover:border-white/60 transition-colors duration-300"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 group-hover:border-white/60 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <ParallaxText speed={0.5} className="text-2xl text-black mb-8">
            Ready to start your project?
          </ParallaxText>
          <button className="bg-black/20 backdrop-blur-sm border border-black/30 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-black/30 transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
