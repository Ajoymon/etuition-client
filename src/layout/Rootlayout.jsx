import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';

const Rootlayout = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Rootlayout;
