import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../../Components/Logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <Logo className=" mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting students with qualified tutors across Bangladesh. Find
              the perfect tutor for your needs today!
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <FaFacebook className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaXTwitter className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                <FaYoutube className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="hover:text-white transition">
                  All Tuitions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-white transition">
                  All Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">For Users</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register as Tutor
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400 shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-red-400 shrink-0" />
                <span>support@etuitionbd.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>
            Copyright {new Date().getFullYear()} eTuitionBD. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
