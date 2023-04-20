import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const checkoutSession = async (req, res) => {
    const body = req.body

    const session = await stripe.checkout.session.create({
        payment_method_types: [ 'card' ],
        success_url: `${process.env.API_URL}me/orders?order_success=true`,
        cancel_url: `${process.env.API_URL}`,
        customer_email: req?.user?.email, 
        client_reference_id: req?.user?._id,
        mode: 'payment',
        metadata: {  }
    })
}