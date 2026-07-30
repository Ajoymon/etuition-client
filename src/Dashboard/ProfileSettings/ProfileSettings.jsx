import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUser, FaEnvelope, FaPhone, FaCamera } from 'react-icons/fa';

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      phone: '',
      photoURL: user?.photoURL || '',
    },
  });

  // Live preview এর জন্য
  const watchPhotoURL = watch('photoURL');
  const watchName = watch('name');

  const onSubmit = async data => {
    try {
      // Firebase update
      await updateUserProfile(data.name, data.photoURL);

      // MongoDB update
      await axiosSecure.patch(`/users/update/${user?.email}`, {
        name: data.name,
        phone: data.phone,
        photoURL: data.photoURL,
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Something went wrong. Try again.',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
      <p className="text-gray-500 mb-8">
        Update your personal information here.
      </p>

      <div className="bg-white rounded-2xl shadow-md p-8">
        {/* Avatar Preview */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
              {watchPhotoURL ? (
                <img
                  src={watchPhotoURL}
                  alt={watchName}
                  className="w-full h-full object-cover"
                  onError={e => (e.target.style.display = 'none')}
                />
              ) : (
                watchName?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FaCamera className="text-white text-xs" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Update your photo URL below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-semibold block mb-2">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Your full name"
                className={`input input-bordered w-full pl-10 ${
                  errors.name ? 'input-error' : ''
                }`}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email (read only) */}
          <div>
            <label className="font-semibold block mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold block mb-2">Phone Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="+880 1234 567890"
                className={`input input-bordered w-full pl-10 ${
                  errors.phone ? 'input-error' : ''
                }`}
                {...register('phone', {
                  pattern: {
                    value: /^[0-9+\s-]{11,14}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-semibold block mb-2">Photo URL</label>
            <div className="relative">
              <FaCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="https://your-photo-url.com"
                className={`input input-bordered w-full pl-10 ${
                  errors.photoURL ? 'input-error' : ''
                }`}
                {...register('photoURL', {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Invalid URL format',
                  },
                })}
              />
            </div>
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
