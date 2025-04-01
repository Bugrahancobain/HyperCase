"use client";
import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { useTranslation } from "react-i18next";

export default function CheckoutPage() {
    const { cartItems } = useContext(CartContext);
    const { currency } = useContext(CurrencyContext);
    const { t } = useTranslation();
    const convertedPrice = (price) => {
        const numeric = Number(price);
        if (isNaN(numeric)) return "0.00 ₺";
        return currency === "TL"
            ? `${numeric.toFixed(2)} ₺`
            : `${(numeric / 38).toFixed(2)} $`;
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.salePrice * item.quantity,
        0
    );

    return (
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
                <h2 className="text-xl font-semibold">{t("checkoutPage.deliveryInfo")}</h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder={t("checkoutPage.email")}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder={t("checkoutPage.phone")}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder={t("checkoutPage.name")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder={t("checkoutPage.surname")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder={t("checkoutPage.address")}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder={t("checkoutPage.zipcode")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder={t("checkoutPage.city")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-4">{t("checkoutPage.orderSummary")}</h2>
                <div className="space-y-2">
                    {cartItems.map((item) => (
                        <div
                            key={item.productID}
                            className="flex justify-between border-b py-2"
                        >
                            <span>
                                {item.productName} x {item.quantity}
                            </span>
                            <span>{convertedPrice(item.salePrice * item.quantity)}</span>
                        </div>
                    ))}
                </div>
                <p className="text-right font-bold text-lg mt-4">
                    {t("checkoutPage.total")}: {convertedPrice(total)}
                </p>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mt-6">{t("checkoutPage.cardInfo")}</h2>
                    <input
                        type="text"
                        placeholder={t("checkoutPage.cardName")}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder={t("checkoutPage.cardNumber")}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder={t("checkoutPage.expDate")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder={t("checkoutPage.cvc")}
                            className="w-1/2 border px-4 py-2 rounded"
                        />
                    </div>

                    <button className="w-full bg-black text-white py-2 rounded mt-4 cursor-pointer">
                        {t("checkoutPage.payNow")}
                    </button>
                </div>
            </div>
        </div>
    );
}
