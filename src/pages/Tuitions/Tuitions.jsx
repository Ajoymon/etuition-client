import React from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegUser,
} from 'react-icons/fa';
import { FaRegCalendarDays } from 'react-icons/fa6';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';

const Tuitions = () => {
  const axiosPublic = useAxios();

  const { data: tuitions = [] } = useQuery({
    queryKey: ['tuitionPosts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/Tution/tuitionPosts');
      return Array.isArray(res.data)
        ? res.data
        : (res.data.result ?? res.data.data ?? []);
    },
  });

  return (
    <div>
      <div className="mt-[50px] ml-[30px]">
        <h2 className="text-4xl font-bold">All Tuitions</h2>
        <p className="text-gray-500">
          Browse all available tuition posts. Find your perfect tutor today!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 m-8">
        {tuitions.map(tuition => (
          <div
            key={tuition._id}
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
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-blue-500 text-lg" />
                </div>
                {tuition.location}
              </div>

              {/* Salary */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMoneyBillWave className="text-blue-500 text-lg" />
                </div>
                ৳ <span className="font-bold text-black">{tuition.salary}</span>
                / month
              </div>

              {/* Days */}
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
                {formatDistanceToNow(new Date(tuition.createdAt), {
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tuitions;
