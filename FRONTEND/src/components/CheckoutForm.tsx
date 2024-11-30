"use client";

import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { Button } from "./ui/button";

const CheckoutForm = () => {
    const stripe: Stripe | null = useStripe();
    const elements: StripeElements | null = useElements();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-success"
            }
        });

        if (error) {
            setErrorMessage(error.message || "Payment failed");
        }

        setIsLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-full px-7 space-y-5 my-5"
        >
            <PaymentElement />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Button
                type="submit"
                disabled={!stripe || isLoading}
                className="bg-green-600 text-white rounded-2xl px-20"
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
};

export default CheckoutForm;
