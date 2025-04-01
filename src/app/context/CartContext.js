"use client"
import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const updateQuantity = (productID, newQty) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.productID === productID
                    ? { ...item, quantity: newQty }
                    : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.productID === product.productID);
            if (existing) {
                return prev.map((item) =>
                    item.productID === product.productID
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productID) => {
        setCartItems((prev) => prev.filter((item) => item.productID !== productID));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
