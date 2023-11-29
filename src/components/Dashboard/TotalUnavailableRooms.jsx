import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

const TotalUnavailableRooms = () => {
  const { data: totalUnavailableRooms, error, isLoading } = useQuery({
    queryKey: 'totalUnavailableRooms',
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/agreements/totalUnavailableRooms');
        return response.data;
      } catch (error) {
        console.error('Error fetching total unavailable rooms:', error);
        throw error;
      }
    },
  });

  // Assuming you have state or data for totalRoomCount
  const totalRoomCount = 100; // Replace this with the actual total room count

  if (isLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (error) {
    console.error('Error fetching total unavailable rooms:', error);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  return (
    <>
      <p>Total Booked Rooms: {totalUnavailableRooms}</p>
      <p>Percentage of Booked Rooms: {((totalUnavailableRooms / totalRoomCount) * 100).toFixed(2)}%</p>
    </>
  );
};

export default TotalUnavailableRooms;
