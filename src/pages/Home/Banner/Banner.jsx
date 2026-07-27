import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import banner1 from '../../../assets/vitaly-gariev-KOTQ96r2m6E-unsplash.jpg';
import banner2 from '../../../assets/vitaly-gariev-5jeHKPNLdLY-unsplash.jpg';
import banner3 from '../../../assets/vitaly-gariev-wGlgRXVax5c-unsplash.jpg';

const Banner = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
    >
      {[banner1, banner2, banner3].map((img, i) => (
        <div key={i} className="relative">
          {/* Image */}
          <img
            className="w-full object-cover max-h-[600px]"
            src={img}
            alt="banner"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text & Buttons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Find Your Perfect
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-blue-600">
              Tutor in Minutes
            </h1>
            <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-xl">
              Post tuition jobs for free, receive applications from verified
              tutors, hire the best match, and pay securely — all in one unified
              platform designed for your success.
            </p>
            <div className="flex gap-4">
              <Link
                to="/tuitions"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition"
              >
                Browse Tuitions
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
