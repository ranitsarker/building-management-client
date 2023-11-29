import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import TotalRoomsCount from './TotalRoomsCount';

const TotalAvailableRooms = () => {
  const { data: totalRoomCount, error: roomCountError, isLoading: roomCountLoading } = useQuery({
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

  const { data: totalUnavailableRooms, error: unavailableRoomsError, isLoading: unavailableRoomsLoading } = useQuery({
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

  if (roomCountLoading || unavailableRoomsLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (roomCountError || unavailableRoomsError) {
    console.error('Error fetching data:', roomCountError || unavailableRoomsError);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  const totalAvailableRooms = totalRoomCount - totalUnavailableRooms;
  const percentageAvailableRooms = (totalAvailableRooms / totalRoomCount) * 100;

  return (
    <>
      <p>Total Available Rooms: {totalAvailableRooms}</p>
      <p>Percentage of Available Rooms: {percentageAvailableRooms.toFixed(2)}%</p>
    </>
  );
};

export default TotalAvailableRooms;
