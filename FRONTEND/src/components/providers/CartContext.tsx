"use client";

import { CartItem } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Swal from "sweetalert2";

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { isSignedIn } = useAuth();

    const addToCart = (item: CartItem) => {
        if (!isSignedIn) {
            return Swal.fire({
                title: "User Not Signed In",
                text: "Please sign in to add items to your cart.",
                icon: "error",
                confirmButtonText: "Okay"
            });
        }

        setCartItems((prev) => {
            const existingItem = prev.find(
                (cartItem) => cartItem.id === item.id
            );
            if (existingItem) {
                return prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? {
                              ...cartItem,
                              quantity: cartItem.quantity + item.quantity
                          }
                        : cartItem
                );
            }
            return [...prev, item];
        });

        Swal.fire({
            title: "Added to Cart",
            text: `${item.name} has been added successfully.`,
            icon: "success",
            confirmButtonText: "Okay"
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
