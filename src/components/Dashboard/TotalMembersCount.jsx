import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

const TotalMembersCount = ({ role }) => {
  const { data: totalMembersCount, error, isLoading } = useQuery({
    queryKey: ['totalMembersCount', role],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/fetchMembers?role=${role}`);
        return response.data.length; // Assuming the response is an array of members
      } catch (error) {
        console.error(`Error fetching total ${role} members count:`, error);
        throw error; // Rethrow the error to let React Query handle it
      }
    },
  });

  if (isLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (error) {
    console.error(`Error fetching total ${role} members count:`, error);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  return <p>Total {role} : {totalMembersCount}</p>;
};

export default TotalMembersCount;
