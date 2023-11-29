import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

const TotalRoomsCount = () => {
  const { data: totalRoomCount, error, isLoading } = useQuery({
    queryKey: 'totalRoomCount',
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/apartments/count');
        return response.data;
      } catch (error) {
        console.error('Error fetching total apartments count:', error);
        throw error; // Rethrow the error to let React Query handle it
      }
    },
  });

  if (isLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (error) {
    console.error('Error fetching total rooms count:', error);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  return <p>Total rooms: {totalRoomCount}</p>;
};

export default TotalRoomsCount;
