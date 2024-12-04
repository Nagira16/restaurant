"use client";

import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { StripeElements } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import { updatePaymentStatus } from "@/actions";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { useCart } from "./providers/CartContext";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type CheckoutFormProps = {
    clientSecret: string | null;
};

const CheckoutForm = ({ clientSecret }: CheckoutFormProps): JSX.Element => {
    const stripe: Stripe | null = useStripe();
    const router: AppRouterInstance = useRouter();
    const elements: StripeElements | null = useElements();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { clearCart }: { clearCart: () => void } = useCart();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        const paymentElement = elements.getElement(PaymentElement);
        if (paymentElement) {
            await elements.submit();
        }

        const paymentIntentId = clientSecret.split("_secret_")[0];

        const result: PaymentIntentResult = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000`
            },
            redirect: "if_required",
            clientSecret
        });

        if (result.error) {
            Swal.fire({
                title: "Payment Failed",
                text: result.error.message,
                icon: "error",
                confirmButtonText: "Close"
            });

            await updatePaymentStatus(paymentIntentId, "FAILED");
        } else if (result.paymentIntent.status === "succeeded") {
            Swal.fire({
                title: "Payment succeeded!",
                icon: "success",
                didClose() {
                    router.push("/");
                    clearCart();
                },
                confirmButtonText: "Close"
            });

            if (result.paymentIntent.id) {
                await updatePaymentStatus(result.paymentIntent.id, "SUCCESS");
            }
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
