import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const navigat = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async data => {
    try {
      const rusult = await registerUser(data.email, data.password);
      await updateUserProfile(data.name);

      const res = await axiosSecure.post('/users', data);

      if (res.data.insertedId) {
        console.log('mongodb doun');
        Swal.fire({
          title: 'Success!',
          text: 'Data saved in MongoDB',
          icon: 'success',
        });
      }

      navigat(location.state || '/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          title: 'Email Already Exists',
          text: 'Please login with this email',
          icon: 'warning',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-gray-500">Register to continue</p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-600">Name is required</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-600">Email is required</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === 'required' && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-600">Minimum 6 characters</p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="text-red-600">
                Must include uppercase, lowercase, number & special char
              </p>
            )}

            {/* Role (Student / Tutor) */}
            <label className="label">Select Role</label>
            <select
              {...register('role', { required: true })}
              className="select select-bordered"
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
            {errors.role && <p className="text-red-600">Role is required</p>}

            {/* Phone */}
            <label className="label">Phone</label>
            <input
              type="tel"
              {...register('phone', { required: true })}
              className="input"
              placeholder="Your phone number"
            />
            {errors.phone && <p className="text-red-600">Phone is required</p>}

            {/* Submit Button */}
            <button className="btn btn-primary mt-4 text-black">
              Register
            </button>
            <p>
              Don’t have any account?{' '}
              <Link state={location.state} className="text-primary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
