"use client";
import { useTranslation } from "react-i18next";

export default function FilterSidebar({
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categoryOptions,
    selectedCategories,
    setSelectedCategories,
    showFavoritesOnly,
    setShowFavoritesOnly,
}) {
    const { t } = useTranslation();

    const handleCategoryChange = (categoryID) => {
        if (categoryID === 0) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories((prev) => {
                const updated = prev.includes(categoryID)
                    ? prev.filter((id) => id !== categoryID)
                    : [...prev, categoryID];
                return updated.filter(id => id !== 0);
            });
        }
    };

    return (
        <aside className="bg-white dark:bg-gray-800 h-min rounded shadow p-4 w-full sticky top-4">
            <input
                type="text"
                placeholder={t("filter.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-2 border border-gray-500 rounded mb-4 text-black dark:text-white"
            />

            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    placeholder={t("filter.minPrice")}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-500 rounded text-black dark:text-white"
                />
                <input
                    type="number"
                    placeholder={t("filter.maxPrice")}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-gray-500 rounded text-black dark:text-white"
                />
            </div>

            <div className="border border-gray-500 p-4 rounded mb-4">
                <h3 className="text-md font-semibold mb-2">{t("filter.categories")}</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
                    {Array.isArray(categoryOptions) && categoryOptions.map((cat) => {
                        const isTumu = cat.productCategoryID === 0;
                        const isChecked = isTumu
                            ? selectedCategories.length === 0
                            : selectedCategories.includes(cat.productCategoryID);

                        return (
                            <label key={cat.productCategoryID} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCategoryChange(cat.productCategoryID)}
                                />
                                <span>{cat.categoryName}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <label className="flex items-center gap-2 border border-gray-500 rounded p-2">
                <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                />
                <span>{t("filter.favoritesOnly")}</span>
            </label>
        </aside>
    );
}