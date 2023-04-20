import { useState } from 'react';
import PayPalCheckoutButton from '@paypal/react-paypal-js';
import { PayPalHttpClient, OrdersCreateRequest } from '@paypal/checkout-server-sdk';

const PayPalCheckout = () => {
  const [orderID, setOrderID] = useState(null);

  const createOrder = async () => {
    const request = new OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '100.00'
        }
      }]
    });

    const client = new PayPalHttpClient();
    const response = await client.execute(request);

    if (response.statusCode === 201) {
      setOrderID(response.result.id);
    } else {
      console.error('Failed to create PayPal order:', response);
    }
  };

  return (
    <div>
      {!orderID && (
        <button onClick={createOrder}>Create PayPal Order</button>
      )}
      {orderID && (
        <PayPalCheckoutButton orderID={orderID} />
      )}
    </div>
  );
};

export { PayPalCheckout };
