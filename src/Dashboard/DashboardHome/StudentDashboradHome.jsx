import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [] } = useQuery({
    queryKey: ['myTuitions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myTuitions?email=${user?.email}`);
      return res.data;
    },
  });

  const total = tuitions.length;
  const pending = tuitions.filter(t => t.status === 'Pending').length;
  const approved = tuitions.filter(t => t.status === 'Approved').length;
  const rejected = tuitions.filter(t => t.status === 'Rejected').length;

  const chartData = [
    { name: 'Pending', value: pending, color: '#EAB308' },
    { name: 'Approved', value: approved, color: '#22C55E' },
    { name: 'Rejected', value: rejected, color: '#EF4444' },
  ];

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome, {user?.displayName}! 👋</h2>
        <p className="text-gray-500 mt-1">
          Manage your tuition posts and hired tutors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
          <FaClipboardList className="text-3xl text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Total Posts</div>
            <div className="font-bold text-2xl">{total}</div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center gap-4">
          <FaClock className="text-3xl text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">Pending</div>
            <div className="font-bold text-2xl">{pending}</div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Approved</div>
            <div className="font-bold text-2xl">{approved}</div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4">
          <FaTimesCircle className="text-3xl text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Rejected</div>
            <div className="font-bold text-2xl">{rejected}</div>
          </div>
        </div>
      </div>

      {/* Chart + Table */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Pie Chart */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Posts Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right - Table */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>

          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tuitions.map(t => (
                  <tr key={t._id}>
                    <td className="font-bold">{t.subjects}</td>
                    <td>{t.class}</td>
                    <td>৳ {t.salary}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.status === 'Approved'
                            ? 'badge-success'
                            : t.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-error'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
