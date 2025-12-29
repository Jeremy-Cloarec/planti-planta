import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    BillingAddressElement,
    useCheckout,
    StripeCheckoutValue
} from '@stripe/react-stripe-js/checkout';
import { authClient } from "@/app/lib/auth-client";
import { EmailInputStripe } from "@/app/lib/definitions";

const validateEmail = async (email: string, checkout: StripeCheckoutValue) => {
    const updateResult = await checkout.updateEmail(email);
    const isValid = updateResult.type !== "error";

    return { isValid, message: !isValid ? updateResult.error.message : null };
}

const EmailInput = ({ email, setEmail, error, setError }: EmailInputStripe) => {
    const checkoutState = useCheckout();

    if (checkoutState.type === 'loading') {
        return (
            <div>Loading...</div>
        );
    } else if (checkoutState.type === 'error') {
        return (
            <div>Error: {checkoutState.error.message}</div>
        );
    }

    const { checkout } = checkoutState;

    const handleBlur = async () => {
        if (!email) {
            return;
        }

        const { isValid, message } = await validateEmail(email, checkout);
        if (!isValid) {
            setError(message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setEmail(e.target.value);
    };


    return (
        <>
            <label>
                Email
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={error ? "error" : ""}
                />
            </label>
            {error && <div id="email-errors">{error}</div>}
        </>
    );
};

const CheckoutForm = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkoutState = useCheckout();

    if (checkoutState.type === 'error') {
        return (
            <div>Error: {checkoutState.error.message}</div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (checkoutState.type === 'loading') {
            return;
        }

        const { checkout } = checkoutState;
        setIsLoading(true);

        const { isValid, message } = await validateEmail(email, checkout);

        if (!isValid) {
            setEmailError(message);
            setMessage(message);
            setIsLoading(false);
            return;
        }

        const confirmResult = await checkout.confirm();

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (confirmResult.type === 'error') {
            setMessage(confirmResult.error.message);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmailInput
                email={email}
                setEmail={setEmail}
                error={emailError}
                setError={setEmailError}
            />
            <h4>Billing Address</h4>
            <BillingAddressElement />
            <h4>Payment</h4>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading} id="submit">
                {isLoading || checkoutState.type === 'loading' ? (
                    <div className="spinner"></div>
                ) : (
                    `Pay ${checkoutState.checkout.total.total.amount} now`
                )}
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export default CheckoutForm;