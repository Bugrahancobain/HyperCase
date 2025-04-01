"use client";
import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
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

    const toggleFavorite = (productID) => {
        setFavorites((prev) =>
            prev.includes(productID)
                ? prev.filter((id) => id !== productID)
                : [...prev, productID]
        );
    };

    const isFavorite = (productID) => favorites.includes(productID);

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}