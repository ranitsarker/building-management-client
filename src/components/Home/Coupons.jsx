import { motion } from "framer-motion";
const Coupons = ({ coupons }) => {
  if (!coupons || coupons.length === 0) {
    return <p>No coupons available.</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Special Offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <motion.div key={coupon._id} className="bg-white p-4 rounded-md shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          >
            <h3 className="text-xl font-semibold mb-2">{coupon.couponCode}</h3>
            <p className="text-gray-600 mb-4">Discount: {coupon.discountPercentage}%</p>
            <p className="text-gray-700">{coupon.couponDescription}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
