import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaEye,
  FaHeadset,
  FaUsers,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-blue-500" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'Verified Tutors',
    desc: 'All tutors are background-checked and verified to ensure safety and quality education.',
  },
  {
    icon: <FaLock className="text-3xl text-green-500" />,
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'Secure Payment',
    desc: '100% safe payment via Stripe. Pay securely only after you have hired your preferred tutor.',
  },
  {
    icon: <FaBolt className="text-3xl text-yellow-500" />,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    title: 'Fast Hiring',
    desc: 'Get tutor applications within hours of posting. Save time with our quick matching system.',
  },
  {
    icon: <FaEye className="text-3xl text-purple-500" />,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'Transparent Process',
    desc: 'No hidden fees. You have full control over hiring, negotiation, and payment terms.',
  },
  {
    icon: <FaHeadset className="text-3xl text-orange-500" />,
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    title: '24/7 Support',
    desc: 'Our dedicated support team is always here to help you with any queries or issues.',
  },
  {
    icon: <FaUsers className="text-3xl text-pink-500" />,
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    title: 'Trusted by Thousands',
    desc: 'Join 10,000+ students and parents who found their perfect tutor through eTuitionBD.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose eTuitionBD?
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We provide a safe, secure, and efficient platform to connect
            students with the best tutors in Bangladesh.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.bg} border ${feature.border} rounded-2xl p-6 flex gap-4 hover:shadow-md transition`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center shrink-0 border ${feature.border}`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
