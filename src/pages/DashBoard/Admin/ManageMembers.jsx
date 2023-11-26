import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import toast from 'react-hot-toast';

const ManageMembers = () => {
  const { data: members, error, isLoading, refetch } = useQuery({
    queryKey: 'manage-members',
    queryFn: async () => {
      const response = await axiosSecure.get('/fetchMembers', {
        params: {
          role: 'member',
        },
      });
      return response.data;
    },
  });

  const backToUserRole = async (memberId, userEmail) => {
    try {
      // Update user role to 'user'
      await axiosSecure.put(`/updateUserRole/${userEmail}`, { role: 'user' });

      // Show success toast notification for role change
      toast.success('Member role has been changed to user');

      // Refetch the members data after role change
      refetch();
    } catch (error) {
      // Show error toast notification
      toast.error(`Error changing member role: ${error.message}`);

      console.error('Error changing member role:', error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching members: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      {members.length === 0 ? (
        <p>No member yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              <p className="text-xl font-semibold mb-2">Name: {member.name}</p>
              <p>Email: {member.email}</p>
              <button
                onClick={() => backToUserRole(member._id, member.email)}
                className="mt-4 p-2 bg-blue-500 text-white rounded-full"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
