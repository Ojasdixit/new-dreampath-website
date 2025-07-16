import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";
import LetterReveal from "./LetterReveal";
import TypewriterText from "./TypewriterText";

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
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <LetterReveal 
            trigger="#about"
            className="about-content text-5xl md:text-6xl font-bold text-white mb-6"
            stagger={0.05}
            duration={1}
          >
            About DreamPath
          </LetterReveal>
          <ParallaxText speed={0.4} className="about-content text-xl text-white/90 max-w-3xl mx-auto">
            <TypewriterText 
              text="We are a creative design agency that transforms ideas into stunning digital experiences. Our team of dreamers and creators craft unique solutions that elevate brands to new heights."
              speed={0.02}
              delay={1.5}
            />
          </ParallaxText>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="about-content">
            <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              At DreamPath, we believe in the power of creativity to transform businesses and inspire audiences. 
              Every project is a journey toward bringing your vision to life through innovative design and 
              cutting-edge technology.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              We don't just create designs; we craft experiences that resonate, engage, and leave lasting impressions. 
              Our collaborative approach ensures that every dream becomes a reality.
            </p>
          </div>

          <div className="about-content">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h3>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  Creative strategy and brand positioning
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  User-centered design methodology
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  Cutting-edge technology integration
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  Continuous collaboration and feedback
                </li>
              </ul>
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
            <div key={index} className="stat-item text-center">
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
