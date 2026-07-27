import { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We will get back to you soon.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-3">Contact Us</h2>
        <p className="text-gray-500">
          Have any questions? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <div className="font-bold text-gray-700">Email</div>
                <div className="text-gray-500 text-sm">
                  support@etuitionbd.com
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <FaPhone className="text-white text-xl" />
              </div>
              <div>
                <div className="font-bold text-gray-700">Phone</div>
                <div className="text-gray-500 text-sm">+880 1234 567890</div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <div className="font-bold text-gray-700">Address</div>
                <div className="text-gray-500 text-sm">Dhaka, Bangladesh</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <div className="font-bold text-gray-700">Working Hours</div>
                <div className="text-gray-500 text-sm">
                  Sat - Thu: 9AM - 6PM
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white rounded-2xl shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-semibold block mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold block mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message here..."
                required
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
