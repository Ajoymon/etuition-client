import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Navigate } from 'react-router';

const Login = () => {
  const navgiat = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const handelLogin = data => {
    signInUser(data.email, data.password)
      .then(result => {
        navgiat(location.state || '/');
      })
      .catch(error => {
        console.log('LOGIN ERROR:', error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-2 mt-2">
          Welcome Back 👋
        </h2>
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to Your Account
        </h2>
        <form className="card-body" onSubmit={handleSubmit(handelLogin)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />

            {errors.email?.type === 'required' && (
              <p className="text-red-600">first name is required</p>
            )}
            {/* password */}
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
              <p className="text-red-600"> Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-600">
                Password must be 6 characters or longer
              </p>
            )}

            {errors.password?.type === 'pattern' && (
              <p className="text-red-600">
                password mast have at least one uppercase, at laeast one
                lowercase,at laeart one numbar and at last one special
                characters
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-primary text-black mt-4">Login</button>
            <p>
              Don’t have any account?{' '}
              <Link
                state={location.state}
                className="text-primary"
                to="/register"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
