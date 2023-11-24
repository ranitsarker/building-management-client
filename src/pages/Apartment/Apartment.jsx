import Container from '../../components/Shared/Container';
import { useQuery } from '@tanstack/react-query'; // Assuming you have installed @tanstack/react-query
import axiosSecure from '../../api/axiosSecure';

const Apartment = () => {
  const { data: apartments, error, isLoading } = useQuery({
    queryKey: 'apartments',
    queryFn: async () => {
      const response = await axiosSecure.get('/apartments');
      return response.data;
    },
  });
  

  if (isLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {apartments.map((apartment) => (
            <div key={apartment.apartmentId} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={apartment.image}
                alt={`Apartment ${apartment.apartmentNo}`}
                className="mb-4 w-full h-40 object-cover rounded-md"
              />
              <p className="text-gray-600">Floor no: {apartment.floorNo}</p>
              <p className="text-gray-600">Block name: {apartment.blockName}</p>
              <p className="text-gray-600">Apartment no: {apartment.apartmentNo}</p>
              <p className="text-gray-600">Rent: ${apartment.rent}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Agreement
              </button>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Apartment;
