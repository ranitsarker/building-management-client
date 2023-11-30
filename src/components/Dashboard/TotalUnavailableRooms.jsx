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

  const { data: totalRoomCount, error: totalRoomCountError, isLoading: totalRoomCountLoading } = useQuery({
    queryKey: 'totalRoomCount',
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/apartments/count');
        return response.data;
      } catch (error) {
        console.error('Error fetching total rooms count:', error);
        throw error;
      }
    },
  });

  if (isLoading || totalRoomCountLoading) {
    return <p>Loading...</p>;
  }

  if (error || totalRoomCountError) {
    console.error('Error fetching data:', error || totalRoomCountError);
    return <p>Error fetching data</p>;
  }

  const totalAvailableRooms = totalRoomCount - totalUnavailableRooms;
  const percentageAvailableRooms = (totalAvailableRooms / totalRoomCount) * 100;
  const percentageBookedRooms = 100 - percentageAvailableRooms;

  return (
    <>
      <p>Total Booked Rooms: {totalUnavailableRooms}</p>
      <p>Percentage of Booked Rooms: {percentageBookedRooms.toFixed(2)}%</p>
    </>
  );
};

export default TotalUnavailableRooms;
