import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const OngoingTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [] } = useQuery({
    queryKey: ['ongoingTuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutorApplications/ongoing?email=${user?.email}`,
      );
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Ongoing Tuitions</h2>
      <p className="text-gray-500 mb-6">
        Tuitions where you have been hired as a tutor.
      </p>

      {tuitions.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-xl">
          No ongoing tuitions yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tuitions.map(tuition => (
            <div
              key={tuition._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{tuition.tuitionSubject}</h2>
                <span className="badge badge-success gap-1">
                  <FaCheckCircle />
                  Approved
                </span>
              </div>

              {/* Class */}
              <div className="flex items-center gap-2 text-gray-600">
                <FaBookOpen />
                {tuition.subjects}
              </div>

              {/* Details */}
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <FaMoneyBillWave className="text-green-500" />
                  </div>
                  ৳ <span className="font-bold">{tuition.expectedSalary}</span>/
                  month
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaCalendarAlt className="text-blue-500" />
                  </div>
                  {tuition.appliedAt &&
                    formatDistanceToNow(new Date(tuition.appliedAt), {
                      addSuffix: true,
                    })}
                </div>
              </div>

              {/* Student Info */}
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
                <FaEnvelope className="text-blue-500 shrink-0" />
                <div>
                  <div className="text-xs text-gray-400">Student Email</div>
                  <div className="text-sm font-semibold text-gray-700 truncate">
                    {tuition.studentEmail}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
