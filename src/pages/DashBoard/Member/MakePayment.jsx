import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MakePayment = () => {
  const { user } = useAuth();
  const [selectedMonths, setSelectedMonths] = useState({});
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  console.log('selectedAgreement:', selectedAgreement);

  // Fetch apartment information
  const { data: agreements, error, isLoading: apartmentLoading } = useQuery({
    queryKey: 'agreements',
    queryFn: async () => {
      const response = await axiosSecure.get('/fetchAllAgreements');
      return response.data;
    },
  });

  const handlePaymentSubmit = async (agreement) => {
    setSelectedAgreement(agreement);
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

  const handleMonthChange = (agreementId, selectedMonth) => {
    setSelectedMonths((prevSelectedMonths) => ({
      ...prevSelectedMonths,
      [agreementId]: selectedMonth,
    }));
  };


  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAgreements.map((agreement) => (
          <div
            key={agreement._id}
            className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            <form onSubmit={() => handlePaymentSubmit(agreement)} className="space-y-4">
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
              <div>
                <label htmlFor="selectedMonth">Select Month:</label>
                <select
                  id="selectedMonth"
                  name="selectedMonth"
                  value={selectedMonths[agreement._id] || ''}
                  onChange={(e) =>
                    handleMonthChange(agreement._id, e.target.value)
                  }
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
              <Link
                to={`/dashboard/payment?price=${agreement.apartmentInfo.rent}&month=${selectedMonths[agreement._id] || ''}&agreementId=${agreement._id}&floorNo=${agreement.apartmentInfo.floorNo}&blockName=${agreement.apartmentInfo.blockName}&apartmentNo=${agreement.apartmentInfo.apartmentNo}`}
              >
                <button
                  type="button" // Change to button type
                  onClick={() => handlePaymentSubmit(agreement)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit Payment
                </button>
              </Link>

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