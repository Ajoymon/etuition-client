import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookOpen,
  FaRegUser,
  FaBook,
  FaClock,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { PiStudentDuotone } from 'react-icons/pi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaRegCalendarDays } from 'react-icons/fa6';
import Loging from '../../Loding/Loging';
import useRole from '../../hooks/useRole';

const TuitionDetails = () => {
  const { role } = useRole();
  const { id } = useParams();
  const axiosPublic = useAxios();

  const { data: tuition, isLoading } = useQuery({
    queryKey: ['tuitionDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tuitionPosts/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loging></Loging>;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl">
            {tuition?.subjects} Tutor Needed
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="badge badge-soft badge-success border-green-300 border-1">
              <PiStudentDuotone />
              {tuition?.class}
            </div>
            <div className="badge badge-soft badge-primary border-blue-300 border-1">
              <FaBook />
              {tuition?.medium}
            </div>
            <div className="badge badge-soft badge-secondary border border-red-300 bg-red-100 text-red-600">
              <MdOutlineLocationOn />
              {tuition?.location}
            </div>
          </div>
        </div>
        <div className="self-start">
          <div className="badge badge-soft badge-success border-green-300 border-1 rounded-3xl">
            {tuition?.status}
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-5 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Salary */}
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl hover:border border-green-600">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <GiMoneyStack className="text-green-600 text-2xl md:text-3xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Salary</div>
                <div className="font-bold text-lg md:text-xl">
                  ৳ {tuition?.salary} / month
                </div>
              </div>
            </div>

            {/* Weekly Days */}
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl hover:border border-blue-600">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <FaCalendarAlt className="text-blue-600 text-2xl md:text-3xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Weekly Days</div>
                <div className="font-bold text-lg md:text-xl">
                  {tuition?.days} Days/Week
                </div>
              </div>
            </div>

            {/* Preferred Tutor */}
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl hover:border border-purple-600">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <FaRegUser className="text-purple-600 text-2xl md:text-3xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Preferred Tutor</div>
                <div className="font-bold text-lg md:text-xl">
                  {tuition?.gender}
                </div>
              </div>
            </div>

            {/* Preferred Time */}
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl hover:border border-orange-600">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <FaClock className="text-orange-600 text-2xl md:text-3xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Preferred Time</div>
                <div className="font-bold text-lg md:text-xl">
                  {tuition?.preferredTime}
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-7">
            <div className="flex items-center gap-2 mb-3">
              <IoCheckmarkCircle className="text-2xl md:text-3xl text-green-600" />
              <div className="font-bold text-xl md:text-2xl">
                Requirements & Details
              </div>
            </div>
            <div className="bg-gray-100 p-5 md:p-7 rounded-2xl text-sm md:text-base">
              {tuition?.description}
            </div>
          </div>

          {/* Apply Button */}
          {role === 'Tutor' && (
            <button className="btn btn-primary w-full mt-6">
              Apply for this Tuition
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="w-full lg:w-72 h-fit bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
          <div className="text-sm text-gray-400 font-semibold self-start">
            Posted By
          </div>

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {tuition?.userName?.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <div className="font-bold text-xl">{tuition?.userName}</div>

          {/* Posted time */}
          <div className="flex flex-col gap-3 w-full mt-2">
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
              <FaClock className="text-blue-500 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Posted</div>
                <div className="font-semibold text-sm">
                  {tuition?.createdAt &&
                    formatDistanceToNow(new Date(tuition.createdAt), {
                      addSuffix: true,
                    })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
              <FaRegCalendarDays className="text-purple-500 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Date</div>
                <div className="font-semibold text-sm">
                  {tuition?.createdAt &&
                    new Date(tuition.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
