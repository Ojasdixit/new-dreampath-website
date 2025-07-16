import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Refund Policy</h1>
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-4 text-gray-300">
          <p>At DreamPath Solutions, we are committed to providing our clients with high-quality services. Our refund policy is designed to be fair and transparent.</p>
          <h2 class="text-2xl font-semibold text-blue-300 pt-4">Digital Services</h2>
          <p>Due to the nature of digital services, we generally do not offer refunds once a project has commenced. This includes but is not limited to web development, design services, and digital marketing campaigns.</p>
          <p>However, we value client satisfaction. If you are not satisfied with our service, please contact us within 7 days of project delivery to discuss your concerns. We may offer a partial refund or credit on a case-by-case basis.</p>
          <h2 class="text-2xl font-semibold text-blue-300 pt-4">Cancellations</h2>
          <p>If you wish to cancel a service, please notify us in writing. If the project has not started, you may be eligible for a full refund of your deposit, minus any processing fees.</p>
          <p>For any questions regarding our refund policy, please contact us at <a href="mailto:info@dreampathsolutions.in" class="text-blue-300 hover:text-blue-200">info@dreampathsolutions.in</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
