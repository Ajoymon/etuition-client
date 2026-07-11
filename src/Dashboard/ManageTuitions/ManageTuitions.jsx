import { useQuery } from '@tanstack/react-query';
import useAxiosSecur from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecur();

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/tuitionPosts'); // email ছাড়া - সব পোস্ট
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/tuitionPosts/${id}/status`, {
      status: newStatus,
    });
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Tuition status updated to ${newStatus}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">Manage Tuitions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Student Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map(tuition => (
            <tr key={tuition._id}>
              <td>{tuition.subjects}</td>
              <td>{tuition.email}</td>
              <td>
                <span
                  className={`badge ${
                    tuition.status === 'Pending'
                      ? 'badge-warning'
                      : tuition.status === 'Approved'
                        ? 'badge-success'
                        : 'badge-error'
                  }`}
                >
                  {tuition.status}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(tuition._id, 'Approved')}
                  className="btn btn-sm btn-success"
                  disabled={tuition.status === 'Approved'}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(tuition._id, 'Rejected')}
                  className="btn btn-sm btn-error"
                  disabled={tuition.status === 'Rejected'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTuitions;
