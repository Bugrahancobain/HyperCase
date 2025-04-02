"use client";
import { useState } from "react";
import FilterSidebar from "@/app/components/FilterSidebar";
import ProductList from "@/app/components/ProductList";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4">
            <FilterSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                categoryOptions={categoryOptions}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
            />
            <ProductList
                searchTerm={searchTerm}
                minPrice={minPrice}
                maxPrice={maxPrice}
                selectedCategories={selectedCategories}
                showFavoritesOnly={showFavoritesOnly}
                categoryOptions={categoryOptions}
                setCategoryOptions={setCategoryOptions}
            />
        </div>
    );
}