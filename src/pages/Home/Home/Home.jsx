import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookOpen,
  FaUserTie,
  FaClipboardList,
  FaCheckCircle,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import useAxios from '../../../hooks/useAxios';

const Home = () => {
  const axiosPublic = useAxios();

  // Latest Tuitions
  const { data: tuitions = [] } = useQuery({
    queryKey: ['latestTuitions'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tuitionPosts/latest');
      return res.data;
    },
  });

  // Latest Tutors
  const { data: tutors = [] } = useQuery({
    queryKey: ['latestTutors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users/tutors/latest');
      return res.data;
    },
  });

  return (
    <div>
      {/* =================== Hero Section =================== */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Perfect Tutor
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Connect with qualified tutors in your area. Post your tuition
          requirement and get the best tutor for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tuitions"
            className="btn btn-white text-blue-600 font-bold"
          >
            Browse Tuitions
          </Link>
          <Link
            to="/register"
            className="btn btn-outline text-white border-white"
          >
            Get Started
          </Link>
        </div>
      </motion.div>

      {/* =================== Latest Tuitions =================== */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Latest Tuitions</h2>
          <p className="text-gray-500 mt-2">
            Browse the latest tuition posts from students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tuitions.map((tuition, index) => (
            <motion.div
              key={tuition._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{tuition.subjects}</h2>
                <span className="badge badge-outline badge-success">
                  {tuition.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <FaBookOpen />
                {tuition.class} - {tuition.medium}
              </div>

              <div className="space-y-3 text-gray-700 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  {tuition.location}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <FaMoneyBillWave className="text-green-500" />
                  </div>
                  ৳ <span className="font-bold">{tuition.salary}</span> / month
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                    <FaCalendarAlt className="text-purple-500" />
                  </div>
                  {tuition.days} Days/Week
                </div>
              </div>

              <div className="mt-auto pt-4">
                <Link
                  to={`/tuitions/${tuition._id}`}
                  className="btn btn-outline btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/tuitions" className="btn btn-primary">
            View All Tuitions
          </Link>
        </div>
      </div>

      {/* =================== Latest Tutors =================== */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Latest Tutors</h2>
            <p className="text-gray-500 mt-2">
              Meet our qualified tutors ready to help you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tutors.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {tutor.photoURL ? (
                    <img
                      src={tutor.photoURL}
                      alt={tutor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    tutor.name?.charAt(0).toUpperCase()
                  )}
                </div>

                <h3 className="font-bold text-xl">{tutor.name}</h3>
                <p className="text-gray-500 text-sm">{tutor.email}</p>

                <span className="badge badge-primary mt-2">{tutor.role}</span>

                <Link
                  to={`/tutors/${tutor._id}`}
                  className="btn btn-outline btn-primary w-full mt-4"
                >
                  View Profile
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/tutors" className="btn btn-primary">
              View All Tutors
            </Link>
          </div>
        </div>
      </div>

      {/* =================== How it Works =================== */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-gray-500 mt-2">
            Simple steps to find your perfect tutor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaClipboardList className="text-4xl text-blue-500" />,
              title: 'Post Your Tuition',
              desc: 'Create a tuition post with your requirements — subject, class, budget, and location.',
              step: '01',
            },
            {
              icon: <FaUserTie className="text-4xl text-purple-500" />,
              title: 'Tutors Apply',
              desc: 'Qualified tutors will browse your post and apply with their qualifications and experience.',
              step: '02',
            },
            {
              icon: <FaCheckCircle className="text-4xl text-green-500" />,
              title: 'Hire & Start',
              desc: 'Review applications, accept the best tutor, complete payment and start learning!',
              step: '03',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-8 text-center relative"
            >
              <div className="absolute top-4 right-4 text-5xl font-bold text-gray-100">
                {item.step}
              </div>
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =================== Why Choose Us =================== */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose Us
            </h2>
            <p className="text-blue-100 mt-2">
              We make finding the right tutor easy and safe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: 'Verified Tutors',
                desc: 'All tutors are verified by our admin team',
                emoji: '✅',
              },
              {
                title: 'Secure Payment',
                desc: 'Safe and secure payment via Stripe',
                emoji: '🔒',
              },
              {
                title: 'Easy to Use',
                desc: 'Simple and intuitive platform for everyone',
                emoji: '🚀',
              },
              {
                title: '24/7 Support',
                desc: 'We are always here to help you',
                emoji: '💬',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 rounded-2xl p-6 text-center text-white"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
