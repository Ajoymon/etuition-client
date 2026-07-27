import { motion } from 'framer-motion';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaAward,
} from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About eTuitionBD
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We are on a mission to connect students with the best tutors across
            Bangladesh, making quality education accessible for everyone.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              eTuitionBD was created to solve the real problem of finding
              qualified tutors and verified tuition opportunities across
              Bangladesh. We believe every student deserves access to quality
              education.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our platform connects students with experienced tutors, making the
              process simple, transparent, and secure. From posting tuition
              requirements to hiring the perfect tutor — we handle it all.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 grid grid-cols-2 gap-4"
          >
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-500 mt-1">Students</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-green-600">200+</div>
              <div className="text-gray-500 mt-1">Tutors</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">300+</div>
              <div className="text-gray-500 mt-1">Tuitions Posted</div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-orange-600">150+</div>
              <div className="text-gray-500 mt-1">Successful Hires</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-gray-500 mt-2">
              What makes us different from the rest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUsers className="text-3xl text-blue-500" />,
                bg: 'bg-blue-50',
                title: 'Community First',
                desc: 'We build a trusted community of students and tutors across Bangladesh.',
              },
              {
                icon: (
                  <FaChalkboardTeacher className="text-3xl text-green-500" />
                ),
                bg: 'bg-green-50',
                title: 'Quality Education',
                desc: 'We ensure only qualified and verified tutors are on our platform.',
              },
              {
                icon: <FaShieldAlt className="text-3xl text-purple-500" />,
                bg: 'bg-purple-50',
                title: 'Safe & Secure',
                desc: 'Secure payments and verified profiles keep our platform safe.',
              },
              {
                icon: <FaAward className="text-3xl text-orange-500" />,
                bg: 'bg-orange-50',
                title: 'Excellence',
                desc: 'We strive for excellence in everything we do for our users.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${item.bg} rounded-2xl p-6 text-center`}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Built with ❤️ in Bangladesh
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            eTuitionBD is proudly built by a passionate team dedicated to
            improving education in Bangladesh. We are committed to making
            quality tutoring accessible to every student.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
