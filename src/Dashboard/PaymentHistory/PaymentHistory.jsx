import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecur from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-payments?email=${user?.email}`,
      );
      return res.data;
    },
  });
  return (
    <div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">Payment History</h2>

        <p className="text-gray-500 mb-6">
          Track your successful payment history.
        </p>

        {payments.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 text-xl">
            You have not made any payment yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th>#</th>
                  <th>Tutor</th>
                  <th>Tuition</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td className="font-bold">{payment.tutorName}</td>
                    <td>{payment.tuitionSubject}</td>
                    <td>
                      {payment.amount} {payment.currency?.toUpperCase()}
                    </td>
                    <td className="font-bold text-green-600">
                      {payment.paymentStatus}
                    </td>
                    <td>{payment.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
