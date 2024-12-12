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
import {
    saveItemOrderDetails,
    saveOrderDetails,
    updatePaymentStatus
} from "@/actions";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { useCart } from "./providers/CartContext";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Order_Details, Payment } from "@/types";
import { useAuth } from "@clerk/nextjs";

type CheckoutFormProps = {
    clientSecret: string | null;
};

const CheckoutForm = ({ clientSecret }: CheckoutFormProps): JSX.Element => {
    const stripe: Stripe | null = useStripe();
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();
    const elements: StripeElements | null = useElements();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { cartItems, clearCart } = useCart();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const token: string | null = await getToken();

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
            if (result.paymentIntent.id && token) {
                const payment: null | Payment = await updatePaymentStatus(
                    result.paymentIntent.id,
                    "SUCCESS"
                );

                if (!payment) return;

                const orderDetails: Order_Details | null =
                    await saveOrderDetails(token, payment.id, payment.amount);

                if (!orderDetails) return;

                for (const item of cartItems) {
                    await saveItemOrderDetails(
                        token,
                        orderDetails.id,
                        item.id,
                        item.quantity
                    );
                }

                Swal.fire({
                    title: "Payment succeeded!",
                    icon: "success",
                    didClose() {
                        router.push(`/ordersSuccess/${orderDetails.id}`);
                        clearCart();
                    },
                    confirmButtonText: "Next"
                });
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
                {isLoading ? "Processing..." : "Order Confirm"}
            </Button>
        </form>
    );
};

export default CheckoutForm;
