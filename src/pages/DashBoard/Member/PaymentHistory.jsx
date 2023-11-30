import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const fetchPaymentHistory = async (email, month = '') => {
  const response = await axiosSecure.get('/payments/history', {
    params: {
      email: email,
      month: month,
    },
  });
  return response.data;
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('');

  const { data: paymentHistory, error, isLoading } = useQuery({
    queryKey: ['paymentHistory', user.email, selectedMonth],
    queryFn: () => fetchPaymentHistory(user.email, selectedMonth),
  });

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>
      <div className="max-w-md mx-auto flex space-x-2">
        <input
          type="text"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          placeholder="Enter the month (e.g., January)"

          className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error fetching payment history: {error.message}</p>}

      {paymentHistory && paymentHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
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
              <div>
                <span className="font-bold">Month:</span>{' '}
                {payment.month}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No payment history available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
