import { motion } from 'framer-motion';
import { Link } from 'react-router';
import notFoundImage from '../../assets/—Pngtree—cartoon hand drawn error computer_5391413.png';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={notFoundImage}
            alt="404 Not Found"
            className="w-64 md:w-80 mx-auto mb-6"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Page Not Found!
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary px-8">
              Go to Home
            </Link>
            <Link to="/tuitions" className="btn btn-outline btn-primary px-8">
              Browse Tuitions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
