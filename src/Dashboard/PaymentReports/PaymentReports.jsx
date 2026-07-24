import React from 'react';
import useAxiosSecur from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentReports = () => {
  const axiosSecure = useAxiosSecur();

  const { data: payments = [] } = useQuery({
    queryKey: ['adminPayments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/admin');
      return res.data;
    },
  });

  // Total earnings calculate
  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Reports & Analytics</h2>
      <p className="text-gray-500 mb-6">All platform transactions.</p>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">Total Transactions</div>
          <div className="font-bold text-2xl">{payments.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">Total Earnings</div>
          <div className="font-bold text-2xl text-green-600">
            ৳ {totalEarnings}
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">This Month</div>
          <div className="font-bold text-2xl text-purple-600">
            ৳{' '}
            {payments
              .filter(
                p => new Date(p.paidAt).getMonth() === new Date().getMonth(),
              )
              .reduce((sum, p) => sum + p.amount, 0)}
          </div>
        </div>
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-xl">
          No transactions yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Student</th>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td className="text-xs text-gray-500">
                    {payment.transactionId?.slice(0, 15)}...
                  </td>
                  <td>{payment.studentEmail}</td>
                  <td>{payment.tutorName}</td>
                  <td>{payment.tuitionSubject}</td>
                  <td className="font-bold text-green-600">
                    ৳ {payment.amount}
                  </td>
                  <td>{payment.paymentDate}</td>
                  <td>
                    <span className="badge badge-success">
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentReports;
