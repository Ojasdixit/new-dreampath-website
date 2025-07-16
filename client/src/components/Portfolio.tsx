import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate portfolio items
      gsap.from(".portfolio-item", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });

      // Hover animations for portfolio items
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item.querySelector('.portfolio-overlay'), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item.querySelector('.portfolio-overlay'), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  const portfolioItems = [
    {
      title: "TechCorp Website",
      category: "Web Design",
      description: "Modern corporate website with interactive elements and smooth animations."
    },
    {
      title: "FashionBrand Identity",
      category: "Branding",
      description: "Complete brand identity package including logo, colors, and guidelines."
    },
    {
      title: "E-Shop Platform",
      category: "E-commerce",
      description: "Full-featured e-commerce platform with advanced filtering and checkout."
    },
    {
      title: "FitApp Mobile",
      category: "Mobile App",
      description: "Health and fitness tracking app with social features and gamification."
    },
    {
      title: "ArtGallery Portal",
      category: "Web Design",
      description: "Virtual art gallery with 3D exhibitions and interactive viewing experience."
    },
    {
      title: "StartupBrand Package",
      category: "Branding",
      description: "Complete startup branding including logo, website, and marketing materials."
    }
  ];

  return (
    <section
      id="portfolio"
      ref={portfolioRef}
      className="relative min-h-screen py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ParallaxText speed={0.3} className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Work
          </ParallaxText>
          <ParallaxText speed={0.4} className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped businesses achieve their digital dreams.
          </ParallaxText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="portfolio-item relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
            >
              {/* Placeholder for project image */}
              <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-purple-400/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🎨</div>
                </div>
                
                {/* Overlay */}
                <div className="portfolio-overlay absolute inset-0 bg-black/50 opacity-0 flex items-center justify-center transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300">
                    View Project
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-white/60 mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
