import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Privacy Policy</h1>
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-4 text-gray-300">
          <p>Your privacy is important to us. It is DreamPath Solutions' policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
          <h2 class="text-2xl font-semibold text-blue-300 pt-4">Information We Collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
          <h2 class="text-2xl font-semibold text-blue-300 pt-4">How We Use Your Information</h2>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
          <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
          <h2 class="text-2xl font-semibold text-blue-300 pt-4">Your Rights</h2>
          <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
          <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us at <a href="mailto:info@dreampathsolutions.in" class="text-blue-300 hover:text-blue-200">info@dreampathsolutions.in</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
