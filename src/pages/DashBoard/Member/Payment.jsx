import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/Dashboard/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const price = parseFloat(queryParams.get("price")) || 0;
  const selectedMonth = queryParams.get("month") || "";
  const agreementId = queryParams.get("agreementId") || "";
  const floorNo = queryParams.get("floorNo") || "";
  const blockName = queryParams.get("blockName") || "";
  const apartmentNo = queryParams.get("apartmentNo") || "";

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={price}
          selectedMonth={selectedMonth}
          agreementId={agreementId}
          floorNo={floorNo}
          blockName={blockName}
          apartmentNo={apartmentNo}
        />
      </Elements>
    </div>
  );
};

export default Payment;