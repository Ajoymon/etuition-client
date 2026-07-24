import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecur from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AppliedTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();
  const { data: myTuitions = [], refetch } = useQuery({
    queryKey: ['myTuition', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutorApplications/Student?email=${user.email}`,
      );
      return res.data;
    },
  });
  // my pmant Handeling
  const handleAccept = async app => {
    const paymentinfo = {
      amount: app.expectedSalary,
      applicationId: app._id,
      tutorName: app.tutorName,
      studentEmail: user?.email,
      studentName: user?.displayName,
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentinfo);
    window.location.replace(res.data.url);
  };
  const updateApplictoneStatus = (app, status) => {
    const updateInfo = { status: status, email: app.email };
    axiosSecure.patch(`/update/Apply/${app._id}`, updateInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleApproval = app => {
    updateApplictoneStatus(app, 'Approved');
  };
  const handleRejiction = app => {
    updateApplictoneStatus(app, 'rejected');
  };
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Applied Tutors</h2>
      <p className="text-gray-500 mb-6">
        Tutors who applied to your tuition posts.
      </p>

      {myTuitions.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-xl">
          No applications yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Tutor</th>
                <th>Qualifications</th>
                <th>Experience</th>
                <th>Expected Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myTuitions.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          {app.tutorPhoto ? (
                            <img src={app.tutorPhoto} alt={app.tutorName} />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {app.tutorName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{app.tutorName}</div>
                        <div className="text-sm text-gray-500">
                          {app.tutorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[150px] truncate">
                    {app.qualifications}
                  </td>
                  <td>{app.experience}</td>
                  <td className="font-bold">৳ {app.expectedSalary}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === 'Pending'
                          ? 'badge-warning'
                          : app.status === 'Approved'
                            ? 'badge-success'
                            : 'badge-error'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {/* my Approvt Buttone */}
                      <button
                        onClick={() => handleAccept(app)}
                        disabled={app.status === 'Approved'}
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      {/* My Regict Buttone */}
                      <button
                        onClick={() => handleRejiction(app)}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </div>
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

export default AppliedTutors;
