import React, { useEffect, useState } from 'react';
import Logo from '../Components/Logo/Logo';

const Loging = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100">
        {/* Logo / Title */}
        <Logo></Logo>

        {/* Spinner */}
        <span className="loading loading-dots loading-lg text-secondary"></span>

        {/* Text */}
        <p className="mt-3 text-gray-700">Preparing your dashboard...</p>
      </div>
    </div>
  );
};

export default Loging;
