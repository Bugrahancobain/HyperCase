"use client";
import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState("TL");

    useEffect(() => {
        const stored = localStorage.getItem("currency");
        if (stored) setCurrency(stored);
    }, []);

    const toggleCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}