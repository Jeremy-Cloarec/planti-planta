"use client"
import { useSearchParams } from "next/navigation"
import {loadStripe} from '@stripe/stripe-js';
import {
    CheckoutProvider
} from '@stripe/react-stripe-js/checkout';
import CheckoutForm from "../ui/stripe/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function Payment() {
    const searchParams = useSearchParams()
    const promise = searchParams?.get('secretClient') ?? ''

    return (
        <>
            <h1>Paiement</h1>
            <CheckoutProvider
                stripe={stripePromise}
                options={{
                    clientSecret: promise,
                }}
            >
                <CheckoutForm />
            </CheckoutProvider>
        </>
    )
}