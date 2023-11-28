import { useState } from 'react';
import axiosSecure from '../../api/axiosSecure';
import toast from 'react-hot-toast';

const CouponForm = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = async () => {
    try {
      const response = await axiosSecure.get(`/coupons/${couponCode}`);
  
      if (response.data.error) {
        // Coupon not applied successfully
        console.error('Error applying coupon:', response.data.error);
        // Show an error message (you can customize this)
        toast.error(`Error applying coupon: ${response.data.error}`);
      } else {
        // Coupon applied successfully
        onApplyCoupon(response.data);
        // Show a success message (you can customize this)
        toast.success('Coupon applied successfully!');
      }
    } catch (error) {
      console.error('Error applying coupon:', error.message);
      // Show a generic error message (you can customize this)
      toast.error('Your coupon not match. Please try again.');
    }
  };
  
  

  return (
    <div className="mb-4">
      <label htmlFor="couponCode" className="block text-gray-700 text-sm font-bold mb-2">
        Coupon Code
      </label>
      <div className="flex">
        <input
          type="text"
          id="couponCode"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md w-full"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CouponForm;