import React from 'react';
import logo from '../../assets/pngegg.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 ">
      <img
        src={logo}
        alt="etuitiondb logo"
        className="w-10 h-10 object-contain"
      />
      <h3 className="text-3xl -ms-2.5 font-bold leading-none text-primary">
        <span className="text-primary">etuition</span>
        <span className="text-red-500 font-black ml-1">DB</span>
      </h3>
    </div>
  );
};

export default Logo;
