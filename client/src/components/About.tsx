import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content on scroll
      gsap.from(".about-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });

      // Stats animation
      gsap.from(".stat-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen py-20 px-6"
      style={{
        backgroundImage: 'url(/images/about-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <ParallaxText speed={0.3} className="about-content text-5xl md:text-6xl font-bold text-white mb-6">
            About DreamPath
          </ParallaxText>
          <ParallaxText speed={0.4} className="about-content text-xl text-white/90 max-w-3xl mx-auto">
            We are a creative design agency that transforms ideas into stunning digital experiences. 
            Our team of dreamers and creators craft unique solutions that elevate brands to new heights.
          </ParallaxText>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="about-content bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              At DreamPath, we believe in the power of creativity to transform businesses and inspire audiences. 
              Every project is a journey toward bringing your vision to life through innovative design and 
              cutting-edge technology.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed">
              We don't just create designs; we craft experiences that resonate, engage, and leave lasting impressions. 
              Our collaborative approach ensures that every dream becomes a reality.
            </p>
          </div>

          <div className="about-content">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/about-hero.jpg" 
                alt="DreamPath Creative Team" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <div className="bg-white/95 backdrop-blur-sm rounded-tr-2xl p-6 m-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h3>
                  <ul className="space-y-2 text-gray-800 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Creative strategy and brand positioning
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      User-centered design methodology
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Cutting-edge technology integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Continuous collaboration and feedback
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "150+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="stat-item text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
