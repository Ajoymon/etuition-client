import React from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from 'react-icons/fa';

const Tuitions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-5">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h2 className="text-2xl font-bold">all</h2>

        <span className="badge badge-success badge-outline p-4">sds</span>
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-5 mt-4 text-gray-600">
        <p className="flex items-center gap-2">
          <FaBookOpen />
          ejfhdu
        </p>

        <p>dfdui</p>
      </div>

      <div className="divider"></div>

      <div className="space-y-4 text-gray-700">
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-green-500" />
          efuyeui
        </p>

        <p className="flex items-center gap-3">
          <FaMoneyBillWave className="text-green-500" />৳ sdgsuyg / month
        </p>

        <p className="flex items-center gap-3">
          <FaCalendarAlt className="text-green-500" />
          dshgdyu Days/Week
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center mt-5 text-gray-500">
        <p className="flex items-center gap-2">
          <FaUser />
          sdfg
        </p>

        <p className="flex items-center gap-2">
          <FaClock />
          Just now
        </p>
      </div>

      <button className="btn btn-outline btn-success w-full mt-5">
        View Details
      </button>
    </div>
  );
};

export default Tuitions;
