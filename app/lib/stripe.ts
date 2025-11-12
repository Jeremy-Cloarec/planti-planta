import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-03-31.basil",
});

export default stripe