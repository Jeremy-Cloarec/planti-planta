"use client"
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import CheckoutForm from "../stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function Payment({ clientSecret }: { clientSecret: string }) {
    return (
        <CheckoutProvider
            stripe={stripePromise}
            options={{
                clientSecret: clientSecret,
            }}
        >
            <CheckoutForm />
        </CheckoutProvider>
    )
}