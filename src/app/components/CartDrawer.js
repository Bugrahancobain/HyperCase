"use client";
import { useRef, useEffect, useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import Link from "next/link";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { useTranslation } from "react-i18next";

export default function CartDrawer({ isOpen, onClose, cartItems }) {
    const { removeFromCart, updateQuantity } = useContext(CartContext);
    const { currency } = useContext(CurrencyContext);
    const { t } = useTranslation();
    const drawerRef = useRef(null); // ✅

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const convertedPrice = (price) => {
        const numericPrice = Number(price);
        if (isNaN(numericPrice)) return "0.00 ₺";
        return currency === "TL"
            ? `${numericPrice.toFixed(2)} ₺`
            : `${(numericPrice / 38).toFixed(2)} $`;
    };

    return (
        <div
            ref={drawerRef}
            className={`fixed z-[9999] right-4 top-20 w-80 bg-white dark:bg-gray-800 ... ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
        >
            <div className="max-h-64 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">{t("cartDrawer.emptyCart")}</p>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.productID}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div className="flex flex-col text-sm w-40">
                                <span className="font-medium">{item.productName}</span>
                                <span className="text-xs text-gray-500">
                                    {convertedPrice(item.salePrice)} x {item.quantity}
                                </span>
                                <span className="font-bold mt-1">
                                    {convertedPrice(item.salePrice * item.quantity)}
                                </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    className="px-2 py-1 text-sm bg-gray-200 rounded dark:text-black"
                                    onClick={() =>
                                        updateQuantity(item.productID, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                    className="px-2 py-1 text-sm bg-gray-200 rounded dark:text-black"
                                    onClick={() =>
                                        updateQuantity(item.productID, item.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productID)}
                                className="text-red-500 hover:underline text-sm ml-2 transition-all duration-300"
                                title="Ürünü sepetten sil"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="border-t p-4 sticky bottom-0 bg-white dark:bg-gray-800">
                <Link href="/checkout">
                    <button
                        onClick={onClose}
                        className="w-full bg-purple-500 text-white py-2 rounded disabled:opacity-50"
                        disabled={cartItems.length === 0}
                    >
                        {t("cartDrawer.goToCheckout")}
                    </button>
                </Link>
            </div>
        </div>
    );
}