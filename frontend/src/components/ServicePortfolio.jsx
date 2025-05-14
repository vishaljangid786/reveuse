import React from 'react';

const services = [
  {
    title: 'Advanced Customer Engagement',
    description:
      'Revolutionizing traditional customer service, we offer a comprehensive omnichannel support system encompassing voice, email, chat, and social media interactions. Our objective is to not just meet but exceed customer satisfaction, fostering a deep sense of loyalty and connection to your brand.',
  },
  {
    title: 'Expert Financial Management',
    description:
      'Our financial services, ranging from meticulous accounting to strategic financial analysis, are crafted to provide you with deep insights and accurate financial reporting. This empowers you to make informed, strategic decisions that drive financial health and business growth.',
  },
  {
    title: 'IT and Technical Support Solutions',
    description:
      'In an era where technology is pivotal, our IT support team, equipped with state-of-the-art tools and deep expertise, addresses your technical needs with unmatched efficiency and precision. We ensure your operations are seamless, minimizing downtime and maximizing productivity and innovation.',
  },
  {
    title: 'Human Resource Outsourcing',
    description:
      'We take on the complexities of HR management, including recruitment, payroll processing, and employee engagement. Our services are designed to streamline your HR processes, allowing you to focus on core business functions and strategic growth.',
  },
];

const ServicePortfolio = () => {
  return (
    <div className="bg-blue-600 text-white py-16 px-6">
      <div className="text-center mb-12">
        <h3 className="text-blue-200 uppercase tracking-widest text-sm">Features</h3>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
          Comprehensive Service Portfolio
        </h2>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-blue-500 p-6 rounded-2xl shadow-lg hover:shadow-blue-300/30 transition"
          >
            <h3 className="text-white text-xl font-semibold mb-3">
              {service.title}
            </h3>
            <p className="text-blue-100 mulish leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePortfolio;
