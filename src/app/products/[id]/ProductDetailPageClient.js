"use client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { CartContext } from "@/app/context/CartContext";
import ProductCard from "@/app/components/ProductCard";
import { useTranslation } from "react-i18next";

export default function ProductDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { currency } = useContext(CurrencyContext);
    const { cartItems, setCartItems } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_API_TOKEN;
                const res = await axios.post(
                    "https://api.hyperteknoloji.com.tr/Products/List",
                    { page: 1, pageSize: 1000 },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const found = res.data.data.find(p => p.productID.toString() === id);
                setProduct(found);

                if (found) {
                    const sameCategory = res.data.data.filter(
                        p => p.productCategoryID === found.productCategoryID &&
                            p.productID !== found.productID
                    );
                    setRelatedProducts(sameCategory.slice(0, 6));
                }
            } catch (error) {
                console.error(t("productDetail.fetchError"), error);
            }
        };
        fetchProduct();
    }, [id, t]);

    const toggleFavorite = (productID) => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        let updated;

        if (stored.includes(productID)) {
            updated = stored.filter(id => id !== productID);
        } else {
            updated = [...stored, productID];
        }

        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
    };

    const handleAddToCart = () => {
        const existing = cartItems.find(item => item.productID === product.productID);
        if (existing) {
            const updatedCart = cartItems.map(item =>
                item.productID === product.productID
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    };

    if (!product) return <p className="text-center mt-10">{t("productDetail.loading")}</p>;

    const convertedPrice =
        currency === "TL"
            ? (product.salePrice * quantity).toFixed(2) + " ₺"
            : ((product.salePrice * quantity) / 38).toFixed(2) + " $";

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-2/3">
                    <img
                        src={product.productData?.productMainImage}
                        alt={product.productName}
                        className="w-full h-auto rounded shadow"
                    />
                </div>

                <div className="w-full md:w-1/3 flex flex-col justify-start">
                    <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {convertedPrice}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {product.productData?.productDescription || t("productDetail.noDescription")}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="px-2 py-1 border rounded"
                        >-</button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="px-2 py-1 border rounded"
                        >+</button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 transition-all duration-300"
                    >
                        {t("productDetail.addToCart")}
                    </button>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">{t("productDetail.relatedProducts")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {relatedProducts.map(p => (
                            <ProductCard
                                key={p.productID}
                                product={p}
                                isFavorite={favorites.includes(p.productID)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}