import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();
  const handleRegistration = data => {
    console.log('after registr', data);
    registerUser(data.email, data.password)
      .then(rusult => {
        console.log(rusult.user);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input"
            placeholder="Your name"
          />
          {errors.name?.type === 'required' && (
            <p role="alert" className="text-red-600">
              First name is required
            </p>
          )}
          {/* poto */}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input"
            placeholder="Your photo"
          />
          {errors.photo?.type === 'required' && (
            <p role="alert" className="text-red-600">
              First photo is required
            </p>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p role="alert" className="text-red-600">
              First email is required
            </p>
          )}
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
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-600">
              password mast have at least one uppercase, at laeast one
              lowercase,at laeart one numbar and at last one special characters
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
