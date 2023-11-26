import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import Swal from 'sweetalert2';

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

  const handleDeleteMember = async (memberId) => {
    try {
      // Show confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Delete that member",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
  
      // Check if the user confirmed the deletion
      if (result.isConfirmed) {
        // Perform deletion if user confirms
        await axiosSecure.delete('/deleteMember', {
          data: {
            memberId,
          },
        });
  
        // Show success message using SweetAlert
        Swal.fire({
          title: 'Deleted!',
          text: 'That member and that member all agreements has deleted',
          icon: 'success',
        });
  
        // Refetch the members data after deletion
        refetch();
      }
    } catch (error) {
      // Show error message using SweetAlert
      Swal.fire({
        title: 'Error!',
        text: `Error deleting member: ${error.message}`,
        icon: 'error',
      });
  
      console.error('Error deleting member:', error.message);
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
                onClick={() => handleDeleteMember(member._id)}
                className="mt-4 p-2 bg-red-500 text-white rounded-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
