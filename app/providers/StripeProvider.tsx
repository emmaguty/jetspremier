'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }: StripeProviderProps) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
