"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getClientSecret } from "@/actions";
import CheckoutForm from "@/components/CheckoutForm";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/components/providers/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CartItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                    return router.push("/menus");
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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-full sm:max-w-2xl mx-auto space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    Complete Your Payment
                </h1>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cartItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center space-x-4 sm:space-x-6"
                            >
                                <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm sm:text-base">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        $
                                        {parseFloat(
                                            item.price.toString()
                                        ).toFixed(2)}{" "}
                                        x {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 border-t">
                            <div className="flex justify-between">
                                <span className="font-semibold text-sm sm:text-base">
                                    Total:
                                </span>
                                <span className="font-semibold text-sm sm:text-base">
                                    $
                                    {parseFloat(totalAmount.toString()).toFixed(
                                        2
                                    )}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

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
                    <p className="font-bold animate-pulse mt-7 text-sm sm:text-base">
                        Loading payment form...
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
