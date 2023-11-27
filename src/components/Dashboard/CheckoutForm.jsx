import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState('');

  const priceFromUrl = new URLSearchParams(location.search).get("price");
  const price = parseFloat(priceFromUrl);

    useEffect(() => {
      axiosSecure.post('/create-payment-intent', {price: price})
      .then(res =>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })

    }, [price])

  const handleSubmitCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
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

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: card,
          billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
          }
      }
  })    
  if (confirmError) {
    console.log('confirm error')  
  }else{
    console.log('payment intent', paymentIntent)
    if (paymentIntent.status === 'succeeded') {
      console.log('transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

      // database save
      const paymentSave = {
        email: user.email,
        price: price,
        transactionId: paymentIntent.id,
        data: new Date(),

      }
     const res = await axiosSecure.post('/payments', paymentSave)
     console.log('payment save:', res);

    }
    
  }

  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
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
