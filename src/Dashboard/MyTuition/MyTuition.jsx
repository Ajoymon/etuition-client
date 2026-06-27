import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

import { CiUser } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyTuition = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ['myTuition', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/tuitionPosts?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const hendeleCardDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitionPosts/${id}`).then(res => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="mt-[50px] ml-[30px]">
        <h2 className="text-4xl font-bold">My Tuitions</h2>
        <p className="text-gray-500">
          Manage your posts. You can hire tutors once your post is
          <span className="font-bold text-blue-600">Approved</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 m-8">
        {tuitions.map(tuition => (
          <div
            key={tuition._id}
            className="bg-white rounded-2xl shadow-md p-5 min-h-[350px] flex flex-col "
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span
                className={`badge badge-outline p-4 ${
                  tuition.status === 'Pending'
                    ? 'badge-warning'
                    : tuition.status === 'Approved'
                      ? 'badge-success'
                      : 'badge-error'
                }`}
              >
                {tuition.status}
              </span>
              <p className="flex items-center gap-2 text-gray-500 bg-gray-200 p-2 rounded-2xl">
                <FaClock className="text-blue-500" />
                {new Date(tuition.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
            {/* subjit */}
            <h2 className="text-2xl font-bold mt-5">{tuition.subjects}</h2>
            {/* Info */}
            <div className="flex flex-wrap gap-5  text-gray-600">
              <p className="flex items-center gap-2">
                <FaBookOpen />
                {tuition.class} - {tuition.medium}
              </p>
            </div>

            <div className="space-y-4 text-gray-700 mt-5 ">
              {/* loction */}
              <p className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-blue-500 text-lg" />
                </div>
                {tuition.location}
              </p>

              <p className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaMoneyBillWave className="text-blue-500 text-lg" />
                </div>
                ৳ <span className="font-bold text-black">{tuition.salary}</span>
                / month
              </p>

              <p className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                  <FaCalendarAlt className="text-blue-500 text-lg" />
                </div>
                {tuition.days} Days/Week
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {tuition.status?.toLowerCase() === 'approved' ? (
                <button className="btn btn-soft btn-info flex-1 text-black">
                  View Applications
                </button>
              ) : (
                <button disabled className="btn btn-soft btn-disabled flex-1">
                  {tuition.status}
                </button>
              )}

              <button
                onClick={() => hendeleCardDelete(tuition._id)}
                className="btn btn-outline btn-error btn-square"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTuition;
