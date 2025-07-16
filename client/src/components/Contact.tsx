import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxText from "./ParallaxText";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact form and info
      gsap.from(".contact-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div
      ref={contactRef}
      className="relative min-h-screen py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ParallaxText speed={0.3} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Create Together
          </ParallaxText>
          <ParallaxText speed={0.4} className="text-xl text-gray-800 max-w-3xl mx-auto">
            Ready to bring your vision to life? Get in touch with us and let's start your digital journey.
          </ParallaxText>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="Project Subject"
                />
              </div>

              <div>
                <label className="block text-gray-800 mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-white/10 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900/20 backdrop-blur-sm border border-gray-900/30 text-gray-900 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900/30 transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-content">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-800 text-xl">📧</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">Email</div>
                    <div className="text-gray-700">hello@dreampath.design</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-800 text-xl">📱</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">Phone</div>
                    <div className="text-gray-700">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Office</div>
                    <div className="text-white/80">123 Creative Street, Design City, DC 12345</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="text-white font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((platform) => (
                    <button
                      key={platform}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <span className="text-white text-sm">{platform[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/20">
          <p className="text-white/80">© 2024 DreamPath Creative Agency. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
