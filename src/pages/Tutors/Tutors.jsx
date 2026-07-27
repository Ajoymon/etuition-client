import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxios from '../../hooks/useAxios';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Tutors = () => {
  const axiosPublic = useAxios();

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users/tutors');
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-3">Our Tutors</h2>
        <p className="text-gray-500">
          Meet our qualified and experienced tutors
        </p>
      </motion.div>

      {/* Tutors Grid */}
      {tutors.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-xl">
          No tutors found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center bg-gray-200"
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4 ">
                {tutor.photoURL ? (
                  <img
                    src={tutor.photoURL}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  tutor.name?.charAt(0).toUpperCase()
                )}
              </div>

              {/* Name & Role */}
              <h3 className="font-bold text-xl mb-1">{tutor.name}</h3>
              <span className="badge badge-primary mb-4">{tutor.role}</span>

              {/* Info */}
              <div className="w-full space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                  <FaEnvelope className="text-blue-500 shrink-0" />
                  <span className="truncate">{tutor.email}</span>
                </div>
                {tutor.phone && (
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                    <FaPhone className="text-green-500 shrink-0" />
                    <span>{tutor.phone}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;
