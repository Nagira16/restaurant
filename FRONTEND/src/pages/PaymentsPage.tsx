"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "@/actions";
import CheckoutForm from "@/components/CheckoutForm";
import { useAuth } from "@clerk/nextjs";
import { CartItem } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const calculateCartTotal = (
    cart: { price: number; quantity: number }[]
): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const PaymentPage = () => {
    const { getToken } = useAuth();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const cart: CartItem[] = [
        {
            menu_id: "tacos",
            menu_name: "aaa",
            price: 10,
            quantity: 1
        },
        {
            menu_id: "aaa",
            menu_name: "sss",
            price: 22,
            quantity: 5
        },
        {
            menu_id: "aaas",
            menu_name: "fff",
            price: 34,
            quantity: 11
        }
    ];

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const token: string | null = await getToken();
                if (token) {
                    if (cart.length > 0) {
                        const total = calculateCartTotal(cart);
                        const method = "credit";
                        setTotalAmount(total);

                        const secret = await getClientSecret(
                            token,
                            total,
                            method
                        );
                        console.log(secret);

                        setClientSecret(secret);
                    } else alert("Cart Is Empty");
                }
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        fetchClientSecret();
    }, []);

    return (
        <div className="text-center mt-4 w-full h-full">
            <h1 className="text-5xl font-bold">Payment</h1>
            <div className="my-5">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <ul className="flex justify-center items-center space-x-10 my-3">
                    {cart.map((item, index) => (
                        <li key={index}>
                            {`Item ${index + 1}: $${item.price} x ${
                                item.quantity
                            }`}
                        </li>
                    ))}
                </ul>
                <h3 className="text-xl font-bold my-5">
                    Total: ${calculateCartTotal(cart).toFixed(2)}
                </h3>
            </div>
            {clientSecret ? (
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: Math.round(totalAmount * 100),
                        currency: "cad"
                    }}
                >
                    <CheckoutForm />
                </Elements>
            ) : (
                <p className="font-bold animate-pulse mt-7">
                    Loading payment form...
                </p>
            )}
        </div>
    );
};

export default PaymentPage;
