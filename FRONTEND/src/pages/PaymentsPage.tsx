"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getClientSecret } from "@/actions";
import CheckoutForm from "@/components/CheckoutForm";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/components/providers/CartContext";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CartItem } from "@/types";

const stripePromise: Promise<Stripe | null> = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const calculateCartTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const PaymentPage = (): JSX.Element => {
    const { getToken } = useAuth();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const router: AppRouterInstance = useRouter();
    const { cartItems }: { cartItems: CartItem[] } = useCart();

    useEffect(() => {
        const fetchClientSecret = async (): Promise<void> => {
            try {
                if (cartItems.length === 0) {
                    Swal.fire({
                        title: "Cart Is Empty",
                        text: "Please add items to your cart before proceeding.",
                        icon: "warning",
                        confirmButtonText: "Go To Menu",
                        didClose() {
                            router.push("/menus");
                        }
                    });
                    return;
                }

                const token: string | null = await getToken();
                if (token) {
                    const total: number = calculateCartTotal(cartItems);
                    setTotalAmount(total);

                    const method: string = "card";
                    const secret: string | null = await getClientSecret(
                        token,
                        total,
                        method
                    );

                    setClientSecret(secret);
                }
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        fetchClientSecret();
    }, [getToken]);

    return (
        <div className="text-center mt-4 w-full h-full">
            <h1 className="text-5xl font-bold">Payment</h1>
            <div className="my-5">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="flex justify-center items-center space-x-10 my-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={item.image || "/placeholder.png"}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        $
                                        {parseFloat(
                                            item.price?.toString() || "0"
                                        ).toFixed(2)}
                                        x {item.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="text-xl font-bold my-5">
                    Total: ${calculateCartTotal(cartItems).toFixed(2)}
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
                    <CheckoutForm clientSecret={clientSecret} />
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
