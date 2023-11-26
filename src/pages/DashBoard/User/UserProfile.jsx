import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  console.log('current user: ', user);
  const { data: userData, error, isLoading } = useQuery({
    queryKey: 'user-profile',
    queryFn: async () => {
      const response = await axiosSecure.get('/fetchUserProfile', {
        params: {
          email: user.email,
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching user profile: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div
        className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        <p className="text-xl font-semibold mb-2">Name: {userData?.name}</p>
        <p>Email: {userData?.email}</p>
        <p>Profile Image: <img src={user.photoURL} alt={user.name} className="mt-2 w-20 h-20 object-cover rounded-md" /></p>
      </div>
    </div>
  );
};

export default UserProfile;
