import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookOpen,
  FaRegUser,
  FaBook,
  FaClock,
  FaRegEnvelope,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { PiStudentDuotone } from 'react-icons/pi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaRegCalendarDays } from 'react-icons/fa6';
import Loging from '../../Loding/Loging';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecur from '../../hooks/useAxiosSecure';

const TuitionDetails = () => {
  const { role } = useRole();
  const { id } = useParams();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecur();
  const ApplyModalRef = useRef();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: tuition, isLoading } = useQuery({
    queryKey: ['tuitionDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tuitionPosts/${id}`);
      return res.data;
    },
  });

  // Akjon Tutor Naxt time Apply korta parba na
  const { data: applicationStatus } = useQuery({
    queryKey: ['checkApplication', id, user?.email],
    enabled: !!user?.email && !!tuition?._id, // tuition আর user দুটোই লোড হবার পরে চলবে
    queryFn: async () => {
      const res = await axiosSecure.get('/tutorApplications/check', {
        params: {
          tuitionId: tuition._id,
          tutorEmail: user.email,
        },
      });
      return res.data;
    },
  });

  const alreadyApplied = applicationStatus?.applied;

  if (isLoading) return <Loging></Loging>;
  const OpenApplyTutorModal = () => {
    ApplyModalRef.current.showModal();
  };

  // Tutor Apply
  const onSubmit = async data => {
    const applicationInfo = {
      ...data,
      tuitionId: tuition._id,
      studentEmail: tuition?.email,
      studentName: tuition?.userName,
      subjects: tuition?.subjects,
      class: tuition?.class,

      tutorName: user?.displayName,
      tutorEmail: user?.email,

      status: 'pending',
      appliedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/tutorApplications', applicationInfo);

      if (res.data.insertedId) {
        Swal.fire('Success!', 'Application submitted successfully!', 'success');
        ApplyModalRef.current.close();
        reset();
        queryClient.invalidateQueries(['checkApplication', id, user?.email]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong. Try again.', 'error');
    }
  };

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
          {role === 'tutor' && (
            <button
              onClick={() => OpenApplyTutorModal(tuition)}
              disabled={alreadyApplied}
              className={`btn w-full mt-6 ${
                alreadyApplied
                  ? 'btn-disabled bg-gray-300 text-gray-500'
                  : 'btn-primary'
              }`}
            >
              {alreadyApplied ? 'Already Applied ✔' : 'Apply for this Tuition'}
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
          <div className="font-bold text-xl">{tuition?.displayName}</div>

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
      {/* Modal */}

      <dialog ref={ApplyModalRef} className="modal">
        <div className="modal-box max-w-3xl p-0 rounded-3xl ">
          {/* Header */}
          <div className="border-b px-8 py-6 bg-gray-100">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost absolute right-5 top-5">
                ✕
              </button>
            </form>

            <h2 className="text-3xl font-bold">Apply for Tuition</h2>

            <p className="text-blue-500 font-semibold mt-1">
              {tuition?.subjects} - {tuition?.class}
            </p>
          </div>

          {/* Body */}
          <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Applicant Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold uppercase text-blue-700 mb-5">
                Applicant Details (From Your Profile)
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaRegUser className="text-blue-600" />
                  <span>{user?.displayName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaRegEnvelope className="text-blue-600" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Salary + Experience */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold block mb-2">
                  Expected Salary (BDT/Month)
                </label>

                <input
                  type="number"
                  placeholder="5000"
                  className="input input-bordered w-full"
                  {...register('expectedSalary', { required: true })}
                />
                {errors.expectedSalary && (
                  <span className="text-red-500 text-sm">
                    Salary is required
                  </span>
                )}
              </div>

              <div>
                <label className="font-semibold block mb-2">Experience</label>

                <input
                  type="text"
                  placeholder="e.g. 2 Years"
                  className="input input-bordered w-full"
                  {...register('experience', { required: true })}
                />
                {errors.experience && (
                  <span className="text-red-500 text-sm">
                    Experience is required
                  </span>
                )}
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label className="font-semibold block mb-2">Qualifications</label>

              <textarea
                rows="5"
                className="textarea textarea-bordered w-full"
                placeholder="Briefly describe your qualifications and teaching style..."
                {...register('qualifications', { required: true })}
              ></textarea>
              {errors.qualifications && (
                <span className="text-red-500 text-sm">
                  Qualifications is required
                </span>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-success w-full bg-blue-600 text-white text-xl rounded-xl"
            >
              Submit Application
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TuitionDetails;
