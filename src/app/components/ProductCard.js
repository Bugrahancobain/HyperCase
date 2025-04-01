"use client";
import React, { useContext } from "react";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { CartContext } from "@/app/context/CartContext";
import { FavoriteContext } from "@/app/context/FavoriteContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function ProductCard({ product }) {
    const { t } = useTranslation();
    const { currency } = useContext(CurrencyContext);
    const { addToCart } = useContext(CartContext);
    const { isFavorite, toggleFavorite } = useContext(FavoriteContext);

    const convertedPrice = product?.salePrice
        ? currency === "TL"
            ? product.salePrice.toFixed(2) + " ₺"
            : (product.salePrice / 38).toFixed(2) + " $"
        : t("productCard.noPrice");

    return (
        <div className="w-full h-100 relative group border p-4 rounded-xl shadow transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white hover:shadow-lg overflow-hidden">
            <img
                src={product?.productData?.productMainImage || "/placeholder.jpg"}
                alt={product?.productName}
                className="w-full h-70 object-cover rounded"
            />

            <h2 className="text-md font-medium mt-3">{product?.productName}</h2>

            <p className="text-black dark:text-white font-bold mt-1">{convertedPrice}</p>

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="absolute top-2 left-2">
                    <button
                        onClick={() => toggleFavorite(product.productID)}
                        className="text-2xl"
                        title={t("productCard.addToFavorites")}
                    >
                        {isFavorite(product.productID) ? "❤️" : "🤍"}
                    </button>
                </div>
                <div className="flex flex-col gap-2 w-3/4 mt-10">
                    <Link
                        href={`/products/${product?.productID}`}
                        className="w-full text-center bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition transition-all duration-300"
                    >
                        {t("productCard.view")}
                    </Link>
                    <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full bg-purple-600 text-white py-1 rounded hover:bg-purple-700 transition transition-all duration-300"
                    >
                        {t("productCard.addToCart")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProductCard);