
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
<div className="bg-white p-8 rounded-md shadow-md">
  <h2 className="text-3xl font-bold mb-6">Payment History</h2>
  {paymentHistory.length > 0 ? (
    <ul className="list-disc pl-6">
      {paymentHistory.map((payment) => (
        <li key={payment.transactionId} className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">Transaction ID:</span> {payment.transactionId}
            </div>
            <div>
              <span className="font-bold">Price:</span> ${payment.price.toFixed(2)}
            </div>
            <div>
              <span className="font-bold">Date:</span> {new Date(payment.date).toLocaleDateString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No payment history available.</p>
  )}
</div>

  );
};

export default PaymentHistory;
