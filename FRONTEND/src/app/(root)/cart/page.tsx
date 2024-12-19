"use client";

import React from "react";
import { useCart } from "@/components/providers/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    return (
        <Card className="w-full max-w-3xl mx-auto my-5">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Your Shopping Cart
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-4 py-2"
                    >
                        <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-lg">
                                {item.name}
                            </h3>
                            <p className="text-muted-foreground">
                                ${parseFloat(item.price.toString()).toFixed(2)}{" "}
                                x {item.quantity}
                            </p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                {cartItems.length === 0 && (
                    <div className=" text-center">
                        <p className="text-muted-foreground py-8">
                            Your cart is empty
                        </p>
                        <Button
                            onClick={() => router.push("/menus")}
                            className="mt- px-4 bg-red-600 text-white font-semibold hover:bg-red-700 rounded-xl"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                )}
            </CardContent>
            {cartItems.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 p-6">
                        <div className="flex space-x-4">
                            <Button
                                variant="destructive"
                                onClick={clearCart}
                                className="w-full sm:w-auto border rounded-xl"
                            >
                                Clear Cart
                            </Button>
                            <Button
                                onClick={() => router.push("/payment")}
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-xl"
                            >
                                Check Out
                            </Button>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">
                                Total: $
                                {cartItems
                                    .reduce(
                                        (total, item) =>
                                            total + item.price * item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </p>
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default CartPage;
