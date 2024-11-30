"use client";

import React from "react";
import { useCart } from "@/components/providers/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                Your Shopping Cart
            </h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-600">
                        Your cart is currently empty.
                    </p>
                    <button
                        onClick={() => router.push("/menus")}
                        className="mt-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div>
                    <div className="space-y-4">
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
                                            ${item.price.toFixed(2)} x{" "}
                                            {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-lg font-bold text-right">
                        Total: $
                        {cartItems
                            .reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </div>
                    <button
                        onClick={clearCart}
                        className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
