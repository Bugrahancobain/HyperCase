"use client";
import { useEffect, useState, useMemo, useContext, Suspense, lazy } from "react";
import { CartContext } from "@/app/context/CartContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
const ProductCard = lazy(() => import("./ProductCard"));
import { FavoriteContext } from "@/app/context/FavoriteContext";

export default function ProductList({
    searchTerm,
    minPrice,
    maxPrice,
    selectedCategories,
    showFavoritesOnly,
    pageSize = 15,
    setCategoryOptions
}) {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { setCartItems } = useContext(CartContext);
    const { favorites } = useContext(FavoriteContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_API_TOKEN;
                const response = await axios.get("https://api.hyperteknoloji.com.tr/Categories", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                const all = [{ productCategoryID: 0, categoryName: t("productList.all") }, ...response.data.data];
                setCategoryOptions(all);
            } catch (error) {
                console.error(t("productList.errorLoadingCategories"), error);
            }
        };
        fetchCategories();
    }, [setCategoryOptions, t]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_API_TOKEN;
                const response = await axios.post(
                    "https://api.hyperteknoloji.com.tr/Products/List",
                    {
                        page: 1,
                        pageSize: 500,
                        productCategoryID: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                const data = response.data;
                setProducts(data.data);
            } catch (error) {
                console.error(t("productList.errorLoadingProducts"), error);
            }
        };
        fetchProducts();
    }, [t]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const nameMatch = product.productName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const price = product.salePrice;
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            const priceMatch =
                (isNaN(min) || price >= min) &&
                (isNaN(max) || price <= max);

            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.productCategoryID);

            const favoriteMatch =
                !showFavoritesOnly || favorites.includes(product.productID);

            return nameMatch && priceMatch && categoryMatch && favoriteMatch;
        });
    }, [products, searchTerm, minPrice, maxPrice, selectedCategories, showFavoritesOnly, favorites]);

    const totalCount = filteredProducts.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

    const handleAddToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <Suspense fallback={<p>{t("productList.loading")}</p>}>
                    {currentProducts.map((product) => (
                        <ProductCard key={product.productID} product={product} />
                    ))}
                </Suspense>
            </div>

            <div className="flex justify-center gap-4 mt-8 items-center">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    {t("productList.prev")}
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={currentPage === totalPages}
                >
                    {t("productList.next")}
                </button>
            </div>
        </div>
    );
}