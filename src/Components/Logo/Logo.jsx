import React from 'react';
import logo from '../../assets/pngegg.png';

const Logo = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <img
        src={logo}
        alt="etuitiondb logo"
        className="w-10 h-10 object-contain"
      />
      <h3 className="text-3xl -ms-2.5 font-bold leading-none">
        <span className="text-primary">eTuition</span>
        <span className="text-red-500 font-black ml-1">DB</span>
      </h3>
    </div>
  );
};

export default Logo;
