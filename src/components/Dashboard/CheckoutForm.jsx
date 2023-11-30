import { useState, useEffect } from "react";
import axiosSecure from "../../api/axiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import CouponForm from "./CouponForm";
import toast from "react-hot-toast";

const CheckoutForm = ({ price, selectedMonth, agreementId, floorNo, blockName, apartmentNo, rent }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState('');

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const calculateDiscountedTotal = () => {
    if (appliedCoupon) {
      const discountPercentage = parseFloat(appliedCoupon.discountPercentage);
      const discountMultiplier = 1 - discountPercentage / 100;
      return (price * discountMultiplier).toFixed(2);
    }
    return price.toFixed(2);
  };

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', {
      price: calculateDiscountedTotal(),
      selectedMonth,
      agreementId,
    })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [price, appliedCoupon, selectedMonth, agreementId]);

  const handleSubmitCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      console.log('confirm error')
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const paymentSave = {
          agreementId: agreementId,
          email: user.email,
          price: calculateDiscountedTotal(),
          transactionId: paymentIntent.id,
          date: new Date(),
          month: selectedMonth,
          floorNo: floorNo,
          blockName: blockName,
          apartmentNo: apartmentNo,
          rent: rent,
        };

        const res = await axiosSecure.post('/payments', paymentSave);
        console.log('payment save:', res);
        toast.success('Payment has been successful and saved in payment history!');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      <CouponForm onApplyCoupon={handleApplyCoupon} />
      {appliedCoupon && (
        <div className="mb-4">
          <p className="text-green-600">Discounted Total: ${calculateDiscountedTotal()}</p>
        </div>
      )}
      <form onSubmit={handleSubmitCheckout}>
        <div className="mb-4">
          <label htmlFor="cardElement" className="block text-gray-700 text-sm font-bold mb-2">
            Card Information
          </label>
          <CardElement
            id="cardElement"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Pay Now
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;