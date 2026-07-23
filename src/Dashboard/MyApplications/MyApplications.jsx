import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecur from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ['applications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutorApplications/Tutor?email=${user.email}`,
      );
      return res.data;
    },
  });

  const heandelDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(rusult => {
      if (rusult.isConfirmed) {
        axiosSecure.delete(`/tutorApplications/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your application has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">My Applications</h2>
        <p className="text-gray-500 mb-6">
          Track the status of your tuition applications.
        </p>

        {applications.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 text-xl">
            You have not applied to any tuition yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Expected Salary</th>
                  <th>Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td className="font-bold">{app.subjects}</td>
                    <td>{app.class}</td>
                    <td className="font-bold">৳ {app.expectedSalary}</td>
                    <td className="text-sm text-gray-500">
                      {app.appliedAt &&
                        formatDistanceToNow(new Date(app.appliedAt), {
                          addSuffix: true,
                        })}
                    </td>
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
                      <button
                        onClick={() => heandelDelete(app._id)}
                        disabled={app.status === 'Approved'}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Delete
                      </button>
                    </td>
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

export default MyApplications;
