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
      title: "Web Design",
      description: "Creating stunning, responsive websites that captivate and convert visitors into customers.",
      icon: "🎨"
    },
    {
      title: "Brand Identity",
      description: "Developing unique brand identities that tell your story and connect with your audience.",
      icon: "✨"
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions to grow your online presence and reach.",
      icon: "📱"
    },
    {
      title: "E-commerce",
      description: "Building powerful online stores that drive sales and enhance customer experience.",
      icon: "🛍️"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that engage users on any device.",
      icon: "📲"
    },
    {
      title: "SEO Optimization",
      description: "Optimizing your digital presence to rank higher and attract more organic traffic.",
      icon: "🔍"
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
          <ParallaxText speed={0.3} className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </ParallaxText>
          <ParallaxText speed={0.4} className="text-xl text-white/90 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the digital landscape.
          </ParallaxText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/90 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-white/80 hover:text-white transition-colors font-medium">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <ParallaxText speed={0.5} className="text-2xl text-white/90 mb-8">
            Ready to start your project?
          </ParallaxText>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
