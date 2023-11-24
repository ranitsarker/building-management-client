import  { useState, useEffect } from 'react';
import Container from '../../components/Shared/Container';
import useAuth from '../../hooks/useAuth';
import handleAgreement from '../../components/handleAgreement';


const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/apartments.json');
        const data = await response.json();
        setApartments(data.apartments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

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
                onClick={() => handleAgreement(apartment, user)}
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
