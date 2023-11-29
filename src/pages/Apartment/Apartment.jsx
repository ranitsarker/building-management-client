import { useState } from 'react';
import Container from '../../components/Shared/Container';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 6;

const Apartment = () => {
  const { data: apartments, error, isLoading } = useQuery({
    queryKey: 'apartments',
    queryFn: async () => {
      const response = await axiosSecure.get('/apartments');
      return response.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>; // You can add a loading indicator if needed
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error fetching data</p>; // You can handle errors more gracefully
  }

  const totalPages = Math.ceil(apartments.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const visibleApartments = apartments.slice(startIndex, endIndex);

  const handleAgreementButtonClick = async (apartment) => {
    try {
      if (!isAuthenticated) {
        // If not authenticated, navigate to the login page
        navigate('/login');
        return;
      }
      // Extract specific fields from apartment information
      const { apartmentNo, blockName, floorNo, rent, image } = apartment;

      // Extract specific fields from user information
      const { displayName, email } = user;

      // Prepare the agreement data
      const agreementData = {
        apartmentId: apartment._id,
        userId: user.uid,
        apartmentInfo: {
          image,
          apartmentNo,
          blockName,
          floorNo,
          rent,
          status: 'pending',
        },
        userInfo: {
          displayName,
          email,
        },
      };

      // Make a POST request to save the agreement
      const response = await axiosSecure.post('/saveAgreement', agreementData);

      // Log the response or perform additional actions based on the server's response
      console.log('Agreement saved:', response.data);
      toast.success('Agreement sent successfully');
    } catch (error) {
      console.error('Error saving agreement:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleApartments.map((apartment) => (
            <div key={apartment._id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={apartment.image}
                alt={`Apartment ${apartment.apartmentNo}`}
                className="mb-4 w-full h-40 object-cover rounded-md"
              />
              <p className="text-gray-600">Floor no: {apartment.floorNo}</p>
              <p className="text-gray-600">Block name: {apartment.blockName}</p>
              <p className="text-gray-600">Apartment no: {apartment.apartmentNo}</p>
              <p className="text-gray-600">Rent: ${apartment.rent}</p>
              {user && (
                <>
                  <p className="text-gray-600">Logged in as: {user.displayName}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  {/* Add more user-related information as needed */}
                </>
              )}
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => handleAgreementButtonClick(apartment)}
              >
                Agreement
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 mb-8 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border rounded-full"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 border rounded-full ${
                index + 1 === currentPage ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-2 px-4 py-2 border rounded-full"
          >
            Next
          </button>
        </div>
      </Container>
    </>
  );
};

export default Apartment;
