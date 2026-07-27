import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import {
  FaBookOpen,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRegUser,
} from 'react-icons/fa';
import { FaRegCalendarDays } from 'react-icons/fa6';
import { formatDistanceToNow } from 'date-fns';

const LatestTuitions = () => {
  const axiosPublic = useAxios();

  const { data: tuitions = [] } = useQuery({
    queryKey: ['latestTuitions'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tuitionPosts/latest');
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tuitions.map((tuition, index) => (
          <motion.div
            key={tuition._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-5 min-h-[350px] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{tuition.subjects}</h2>
              <span className="badge badge-outline p-4 badge-success">
                {tuition.status}
              </span>
            </div>

            {/* Class & Medium */}
            <div className="flex flex-wrap gap-5 text-gray-600 mt-2">
              <p className="flex items-center gap-2">
                <FaBookOpen />
                {tuition.class} - {tuition.medium}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4 text-gray-700 mt-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-blue-500 text-lg" />
                </div>
                {tuition.location}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMoneyBillWave className="text-blue-500 text-lg" />
                </div>
                ৳ <span className="font-bold text-black">{tuition.salary}</span>
                / month
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaCalendarAlt className="text-blue-500 text-lg" />
                </div>
                {tuition.days} Days/Week
              </div>
            </div>

            {/* User & Date */}
            <div className="flex items-center justify-between my-7 bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <FaRegUser />
                {tuition.userName}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaRegCalendarDays />
                {tuition.createdAt &&
                  formatDistanceToNow(new Date(tuition.createdAt), {
                    addSuffix: true,
                  })}
              </div>
            </div>

            {/* Button */}
            <Link to={`/tuitions/${tuition._id}`} className="mt-auto">
              <button className="btn btn-outline btn-primary w-full">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-8">
        <Link to="/tuitions" className="btn btn-primary px-10">
          View All Tuitions
        </Link>
      </div>
    </div>
  );
};

export default LatestTuitions;
