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
      const response = await axiosSecure.get('/fetchAllAgreements');
      return response.data;
    },
  });

  const filteredAgreements = agreements?.filter(
    (agreement) =>
      agreement.status === 'accepted' && agreement.userInfo.email === user.email
  );

  return {
    user,
    selectedMonth,
    setSelectedMonth,
    agreements: filteredAgreements,
    isLoading: apartmentLoading,
    error,
  };
};

export default useMakePayment;
