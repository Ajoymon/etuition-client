import React from 'react';
import { useForm } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PostNewTuition = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async data => {
    const tuitionData = {
      ...data,
      email: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
      status: 'Pending',
    };
    try {
      const res = await axiosSecure.post('/tuitionPosts', tuitionData);

      if (res.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Tuition posted successfully',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Post a New Tuition
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Fill in the details below to find the perfect tutor.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full border-2  bg-white rounded-2xl shadow-md p-6 md:p-8">
          <p className="bg-blue-100 p-4 mt-[-24px] mx-[-24px] md:mt-[-32px] md:mx-[-32px] rounded-t-2xl flex items-center gap-2 text-sm">
            <FaInfoCircle className="text-blue-600 text-lg" />
            Please provide accurate information to get the best tutors.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
            {/* Academic Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                Academic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Class */}
                <div>
                  <label className="font-medium">Class / Grade</label>
                  <select
                    className="select select-bordered w-full mt-2"
                    {...register('class', {
                      required: 'Please select a class',
                    })}
                  >
                    <option value="">Select Class</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="HSC">HSC</option>
                  </select>
                  {errors.class && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.class.message}
                    </p>
                  )}
                </div>

                {/* Medium */}
                <div>
                  <label className="font-medium">Medium</label>
                  <select
                    className="select select-bordered w-full mt-2"
                    {...register('medium', {
                      required: 'Please select a medium',
                    })}
                  >
                    <option value="">Select Medium</option>
                    <option value="Bangla Medium">Bangla Medium</option>
                    <option value="English Medium">English Medium</option>
                  </select>
                  {errors.medium && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.medium.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subjects */}
              <div className="mt-4 md:mt-6">
                <label className="font-medium">Subjects</label>
                <input
                  type="text"
                  placeholder="Math, Physics, Chemistry"
                  className="input input-bordered w-full mt-2"
                  {...register('subjects', {
                    required: 'Subjects field is required',
                  })}
                />
                {errors.subjects && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subjects.message}
                  </p>
                )}
              </div>
            </div>

            {/* Schedule & Budget */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                Schedule & Budget
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Days */}
                <div>
                  <label className="font-medium">Days per Week</label>
                  <select
                    className="select select-bordered w-full mt-2"
                    {...register('days', { required: 'Please select days' })}
                  >
                    <option value="">Select Days</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                  </select>
                  {errors.days && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.days.message}
                    </p>
                  )}
                </div>

                {/* Salary */}
                <div>
                  <label className="font-medium">Salary Budget</label>
                  <input
                    type="number"
                    placeholder="5000"
                    className="input input-bordered w-full mt-2"
                    {...register('salary', {
                      required: 'Salary is required',
                      min: {
                        value: 1000,
                        message: 'Minimum salary should be 1000',
                      },
                    })}
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                {/* Time */}
                <div>
                  <label className="font-medium">Preferred Time</label>
                  <input
                    type="text"
                    placeholder="4:00 PM - 6:00 PM"
                    className="input input-bordered w-full mt-2"
                    {...register('preferredTime', {
                      required: 'Preferred time is required',
                    })}
                  />
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferredTime.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="font-medium">Preferred Gender</label>
                  <select
                    className="select select-bordered w-full mt-2"
                    {...register('gender', {
                      required: 'Please select a gender',
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Any">Any</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Location */}
            <div>
              <label className="font-medium">Location</label>
              <textarea
                className="textarea textarea-bordered w-full mt-2"
                placeholder="e.g. Sonadanga, Khulna"
                {...register('location', {
                  required: 'Location is required',
                })}
              ></textarea>

              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Tuition Description</label>
              <textarea
                className="textarea textarea-bordered w-full mt-2 h-32"
                placeholder="Write tuition details..."
                {...register('description', {
                  required: 'Description field is required',
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full">Post Tuition</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostNewTuition;
