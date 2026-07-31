import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/admin');
      return res.data;
    },
  });

  const { data: tuitions = [] } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tuitionPosts');
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ['adminPayments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/admin');
      return res.data;
    },
  });

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  // Monthly revenue
  const monthlyData = payments.reduce((acc, p) => {
    const month = new Date(p.paidAt).toLocaleString('default', {
      month: 'short',
    });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.revenue += p.amount;
    } else {
      acc.push({ month, revenue: p.amount });
    }
    return acc;
  }, []);

  // Users by role
  const userChartData = [
    {
      name: 'Students',
      value: users.filter(u => u.role === 'student').length,
      color: '#3B82F6',
    },
    {
      name: 'Tutors',
      value: users.filter(u => u.role === 'tutor').length,
      color: '#8B5CF6',
    },
    {
      name: 'Admins',
      value: users.filter(u => u.role === 'admin').length,
      color: '#EF4444',
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard 🛡️</h2>
        <p className="text-gray-500 mt-1">
          Manage the platform and monitor all activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="font-bold text-2xl">{users.length}</div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex items-center gap-4">
          <FaClipboardList className="text-3xl text-purple-500" />
          <div>
            <div className="text-sm text-gray-500">Total Tuitions</div>
            <div className="font-bold text-2xl">{tuitions.length}</div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Total Payments</div>
            <div className="font-bold text-2xl">{payments.length}</div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center gap-4">
          <FaMoneyBillWave className="text-3xl text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="font-bold text-2xl">৳ {totalRevenue}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Bar Chart - Monthly Revenue */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={value => `৳ ${value}`} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Users by Role */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Users by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {userChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Student</th>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id}>
                  <td>{p.studentEmail}</td>
                  <td className="font-bold">{p.tutorName}</td>
                  <td>{p.tuitionSubject}</td>
                  <td className="font-bold text-green-600">৳ {p.amount}</td>
                  <td>{p.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
