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
      title: "Web Development",
      description: "Full-stack web development using modern technologies to build powerful, scalable applications.",
      icon: "⚡"
    },
    {
      title: "Web Design",
      description: "Creating stunning, responsive websites that captivate and convert visitors into customers.",
      icon: "🎨"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that engage users on any device.",
      icon: "📱"
    },
    {
      title: "3D Designs & Models",
      description: "Creating immersive 3D experiences, models, and interactive visualizations for your projects.",
      icon: "🎯"
    },
    {
      title: "Agency Websites",
      description: "Specialized websites for agencies with portfolio showcases, client management, and lead generation.",
      icon: "🏢"
    },
    {
      title: "Digital Strategy",
      description: "Comprehensive digital strategies to help your business thrive in the digital landscape.",
      icon: "🚀"
    }
  ];

  return (
    <section
      id="services"
      ref={servicesRef}
      className="relative min-h-screen py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ParallaxText speed={0.3} className="text-5xl md:text-6xl font-bold text-black mb-6">
            Our Services
          </ParallaxText>
          <ParallaxText speed={0.4} className="text-xl text-black max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the digital landscape.
          </ParallaxText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-black/30 hover:border-black/50 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-black leading-relaxed">{service.description}</p>
              <button className="mt-6 text-black hover:text-gray-800 transition-colors font-medium">
                Learn More →
              </button>
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
