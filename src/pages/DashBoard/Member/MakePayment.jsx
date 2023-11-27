import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';

const MakePayment = () => {
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



  const handlePaymentSubmit = async () => {
    // Perform payment submission logic
    // You can use axios.post to send payment data to the server
    // Include selectedMonth, user details, and agreement information in the request body
    // Display success/failure message based on the server response
  };

  if (apartmentLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching agreements: {error.message}</p>;
  }
  // Filter agreements based on the condition
  const filteredAgreements = agreements.filter(
    (agreement) =>
      agreement.status === 'accepted' && agreement.userInfo.email === user.email
  );


  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAgreements.map((agreement) => (
          <div
            key={agreement._id}
            className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {/* Column 1 */}
              <div>
                <label htmlFor="userName">Name:</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={user.displayName}
                  readOnly
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="userEmail">Email:</label>
                <input
                  type="text"
                  id="userEmail"
                  name="userEmail"
                  value={user.email}
                  readOnly
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="floorNo">Floor No:</label>
                <input
                  type="text"
                  id="floorNo"
                  name="floorNo"
                  value={agreement.apartmentInfo.floorNo}
                  readOnly
                  className="form-input"
                />
              </div>
  
              {/* Column 2 */}
              <div>
                <label htmlFor="blockName">Block Name:</label>
                <input
                  type="text"
                  id="blockName"
                  name="blockName"
                  value={agreement.apartmentInfo.blockName}
                  readOnly
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="apartmentNo">Apartment No:</label>
                <input
                  type="text"
                  id="apartmentNo"
                  name="apartmentNo"
                  value={agreement.apartmentInfo.apartmentNo}
                  readOnly
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="rent">Rent:</label>
                <input
                  type="text"
                  id="rent"
                  name="rent"
                  value={`$${agreement.apartmentInfo.rent}`}
                  readOnly
                  className="form-input"
                />
              </div>
  
              {/* Add form fields for payment, including selectedMonth */}
                <div>
                    <label htmlFor="selectedMonth">Select Month:</label>
                    <select
                        id="selectedMonth"
                        name="selectedMonth"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        required
                        className="form-select"
                    >
                        <option value="" disabled>Select a month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div>
                    <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Submit Payment
                    </button>
                </div>
            </form>
        </div>
        ))}
        </div>
      <hr className="my-4" />
    </div>
  );
};

export default MakePayment;
