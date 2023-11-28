import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';
import useAuth from './useAuth';

const useMakePayment = () => {
    const { user } = useAuth();
    const [selectedMonth, setSelectedMonth] = useState('');
  
    // Fetch apartment information
    const { data: agreements, error, isLoading: apartmentLoading } = useQuery({
      queryKey: 'agreements',
      queryFn: async () => {
        try {
          const response = await axiosSecure.get('/fetchAllAgreements');
          console.log('API Response:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching agreements:', error);
          throw error;
        }
      },
    });
  
    // Add these logs for debugging
    console.log('Filtered Agreements:', agreements);
  
  const filteredAgreements = agreements?.filter(
    (agreement) =>
      agreement.status === 'accepted' && agreement.userInfo.email === user.email
  );

  console.log('Filtered Agreements:', filteredAgreements);

  // to get apartmentInfo
  const apartmentInfoArray = filteredAgreements?.map((agreement) => agreement.apartmentInfo);

  console.log('Apartment Info Array:', apartmentInfoArray);

  if (apartmentInfoArray) {
    apartmentInfoArray.forEach((apartmentInfo) => {
      console.log("Apartment No:", apartmentInfo.apartmentNo);
      console.log("Block Name:", apartmentInfo.blockName);
      console.log("Floor No:", apartmentInfo.floorNo);
      console.log("Image:", apartmentInfo.image);
      console.log("Rent:", apartmentInfo.rent);
      console.log("Status:", apartmentInfo.status);
      console.log("------");
    });
  } else {
    console.log("No apartment information available.");
  }

  // Find apartmentInfo for the current user
  const userApartmentInfo = apartmentInfoArray
    ? apartmentInfoArray.find((info) => info?.userInfo?.email === user?.email)
    : null;

  console.log('User Apartment Info:', userApartmentInfo);

  return {
    user,
    selectedMonth,
    setSelectedMonth,
    agreements: filteredAgreements,
    isLoading: apartmentLoading,
    error,
    apartmentInfoArray,
    userApartmentInfo,
  };
};

export default useMakePayment;
