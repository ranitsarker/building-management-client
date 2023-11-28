

import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const fetchPaymentHistory = async (email) => {
  const response = await axiosSecure.get('/payments/history', {
    params: {
      email: email,
    },
  });
  return response.data;
};

const PaymentHistory = () => {
  const { user } = useAuth();

  const { data: paymentHistory, error, isLoading } = useQuery({
    queryKey: ['paymentHistory', user.email],
    queryFn: () => fetchPaymentHistory(user.email),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching payment history: {error.message}</p>;
  }

  return (
<div className="container mx-auto mt-8">
  <h2 className="text-3xl font-bold mb-6">Payment History</h2>
  {paymentHistory.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {paymentHistory.map((payment) => (
        <div key={payment.transactionId} className="bg-white p-6 rounded-md shadow-md mb-4">
          <div className="mb-4">
            <span className="font-bold">Transaction ID:</span>
            <div className="text-gray-700">{payment.transactionId}</div>
          </div>
          <div className="mb-4">
            <span className="font-bold">Price:</span>{' '}
            {!isNaN(Number(payment.price))
              ? `$${Number(payment.price).toFixed(2)}`
              : 'Invalid Price'}
          </div>
          <div>
            <span className="font-bold">Date:</span>{' '}
            {new Date(payment.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No payment history available.</p>
  )}
</div>


  );
};

export default PaymentHistory;
