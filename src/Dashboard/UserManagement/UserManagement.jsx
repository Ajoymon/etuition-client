import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecur from '../../hooks/useAxiosSecure';

const UserManagement = () => {
  const axiosSecure = useAxiosSecur();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/admin');
      return res.data;
    },
  });

  // Role change
  const handleRoleChange = async (id, role) => {
    const res = await axiosSecure.patch(`/users/${id}/role`, { role });
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Role updated to ${role}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // User delete
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
          });
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">User Management</h2>
      <p className="text-gray-500 mb-6">
        Manage all users, roles and accounts.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="font-bold text-2xl">{users.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="font-bold text-2xl text-green-600">
            {users.filter(u => u.role === 'student').length}
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <div className="text-sm text-gray-500">Total Tutors</div>
          <div className="font-bold text-2xl text-purple-600">
            {users.filter(u => u.role === 'tutor').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.name} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === 'Admin'
                        ? 'badge-error'
                        : user.role === 'Tutor'
                          ? 'badge-primary'
                          : 'badge-success'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-sm text-gray-500">
                  {user.createdAt &&
                    new Date(user.createdAt).toLocaleDateString('en-GB')}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRoleChange(user._id, 'student')}
                      disabled={user.role === 'student'}
                      className={`btn btn-xs ${
                        user.role === 'student'
                          ? 'btn-success'
                          : 'btn-outline btn-success'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, 'tutor')}
                      disabled={user.role === 'tutor'}
                      className={`btn btn-xs ${
                        user.role === 'tutor'
                          ? 'btn-primary'
                          : 'btn-outline btn-primary'
                      }`}
                    >
                      Tutor
                    </button>
                    <button
                      onClick={() => handleRoleChange(user._id, 'admin')}
                      disabled={user.role === 'admin'}
                      className={`btn btn-xs ${
                        user.role === 'admin'
                          ? 'btn-error'
                          : 'btn-outline btn-error'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default UserManagement;
