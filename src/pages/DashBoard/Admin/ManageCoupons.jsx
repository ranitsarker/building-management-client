import { useQuery, useQueryClient } from '@tanstack/react-query'

import axiosSecure from '../../../api/axiosSecure';
import Modal from '../../../components/Dashboard/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';


const ManageCoupons = () => {
    const queryClient = useQueryClient(); 
  // Use useQuery to fetch coupons
  const { data: coupons, error, isLoading } = useQuery({
    queryKey: 'coupons', // Unique key for this query
    queryFn: async () => {
      const response = await axiosSecure.get('/coupons');
      return response.data;
    },
  });

  // State for modal and form data
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [couponDescription, setCouponDescription] = useState('');

  const handleAddCoupon = async () => {
    // Validate coupon data before submitting
    if (!couponCode || !discountPercentage || !couponDescription) {
        toast.error('Please fill in all fields', {
            duration: 3000,
          });
      return;
    }

    // Submit the coupon data to the database
    try {
      await axiosSecure.post('/coupons', {
        couponCode,
        discountPercentage,
        couponDescription,
      });

      // Refetch the coupons after adding a new one
      queryClient.invalidateQueries('coupons');

      // Close the modal
      setShowModal(false);
      toast.success('Coupon added successfully', {
        duration: 3000,
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
      toast.error('Failed to add coupon', {
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching coupons: {error.message}</p>;
  }

  // Now you can use the 'coupons' data in your component
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Coupons</h2>

      {/* Button to open the modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Add Coupon
      </button>

      {/* Table to display existing coupons */}
      <div className="overflow-x-auto">
        <table className="table-auto mt-4">
            <thead>
            <tr>
                <th className="px-4 py-2">Coupon Code</th>
                <th className="px-4 py-2">Discount Percentage</th>
                <th className="px-4 py-2">Coupon Description</th>
            </tr>
            </thead>
            <tbody>
            {coupons.map((coupon) => (
                <tr key={coupon._id}>
                <td className="border px-4 py-2">{coupon.couponCode}</td>
                <td className="border px-4 py-2">{coupon.discountPercentage}</td>
                <td className="border px-4 py-2">{coupon.couponDescription}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
      {/* Modal for adding a new coupon */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add Coupon</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="couponCode" className="block text-gray-700 text-sm font-bold mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="discountPercentage" className="block text-gray-700 text-sm font-bold mb-2">
                  Discount Percentage
                </label>
                <input
                  type="text"
                  id="discountPercentage"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="couponDescription" className="block text-gray-700 text-sm font-bold mb-2">
                  Coupon Description
                </label>
                <textarea
                  id="couponDescription"
                  value={couponDescription}
                  onChange={(e) => setCouponDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCoupon}
                className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageCoupons;
