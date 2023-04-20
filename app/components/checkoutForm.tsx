'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface CheckoutFormProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Error: no se puede encontrar el elemento de tarjeta.");
      return;
    }

    const result = await stripe.createToken(cardElement);

    if (result.error) {
      setError(result.error.message ?? "Error desconocido.");
    } else {
      // Envía el token a tu servidor para realizar el cargo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="card-element">Tarjeta de crédito o débito</label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button onClick={onClick} 
              disabled={disabled} 
              className="btn btn-primary">
            {label}
      </button>
    </form>
  );
};

export default CheckoutForm;
