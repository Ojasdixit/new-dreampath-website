import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-400 hover:underline">Go back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`p-8 rounded-xl bg-gradient-to-br ${service.gradient} mb-12`}>
          <div className="text-6xl mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
        </div>
        
        <div className="bg-gray-800/50 p-8 rounded-lg">
          <p className="text-lg text-gray-300 leading-relaxed">
            {service.longDescription}
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
