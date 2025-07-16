import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '+8062407920';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Bubble Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Popup Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 max-w-sm">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Have questions? Chat with us on WhatsApp for a quick response!
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
