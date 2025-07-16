import React from 'react';

const ContactPage = () => {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Contact Us</h1>
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg inline-block">
          <p className="text-lg mb-4 text-gray-300">
            We are a digital-first company. The best way to reach us is via email.
          </p>
          <p className="text-lg text-gray-400">
            For any inquiries, please send us a message at:
          </p>
          <a href="mailto:info@dreampathsolutions.in" className="mt-2 inline-block text-2xl font-semibold text-blue-300 hover:text-blue-200 transition-colors duration-300">
            info@dreampathsolutions.in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
