"use client";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/app/context/CartContext";
import CartDrawer from "./CartDrawer";
import { Switch } from "@/components/ui/switch";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { IoBagHandleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { cartItems } = useContext(CartContext);
    const [theme, setTheme] = useState("light");
    const { currency, toggleCurrency } = useContext(CurrencyContext);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
        }
    }, []);
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md relative z-99 dark:bg-gray-900 dark:text-white transition-all duration-300 ease-in-out">
                <Link href="/tr"><h1 className="text-xl font-bold cursor-pointer">HyperCase</h1></Link>

                <div className="flex justify-center item-center gap-5">
                    <Link href="#">
                        {t("header.myOrders")}
                    </Link>
                    <Link href="#">
                        {t("header.myAccount")}
                    </Link>
                    <Link href="#">
                        {t("header.publishers")}
                    </Link>
                    <Link href="#" className="text-orange-500 dark:text-white cursor-pointer">
                        {t("header.addListing")}
                    </Link>
                    <Link href="#" className="text-green-500 dark:text-white cursor-pointer">
                        {t("header.loadBalance")}
                    </Link></div>
                <div className="flex justify-center gap-5">
                    <select
                        value={currency}
                        onChange={(e) => toggleCurrency(e.target.value)}
                        style={{ textAlign: "center" }}
                        className="appearance-none pl-4 pr-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white text-sm font-medium leading-tight"
                    >
                        <option value="TL">{t("header.currencyTL")}</option>
                        <option value="USD">{t("header.currencyUSD")}</option>
                    </select>
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="appearance-none pl-4 pr-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white text-sm font-medium leading-tight flex items-center"
                    >
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                    </select>
                    <div className="flex items-center gap-2 z-999 item-center">
                        <Switch
                            checked={theme === "dark"}
                            onCheckedChange={toggleTheme}
                            className="data-[state=checked]:bg-blue-600"
                        />
                        <span className="text-sm">
                            {theme === "dark" ? `🌙` : `☀️`}
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <button><CgProfile className="w-5 h-5 cursor-pointer" />
                        </button>

                        <button className="cursor-pointer" onClick={() => setDrawerOpen((prev) => !prev)}><IoBagHandleOutline className="w-5 h-5" /></button>
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 m-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                        <CartDrawer
                            isOpen={isDrawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            cartItems={cartItems}
                        />
                    </div>
                </div>

            </header>
            <div className="w-full bg-white dark:bg-gray-900 shadow-sm">
                <div className="overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-2 border-b item-center flex justify-center">
                    {[
                        { icon: "📂", name: t("header.allCategories") },
                        { name: t("header.marketplace") },
                        { name: t("header.knightOnline") },
                        { name: t("header.valorantVp") },
                        { name: t("header.lolRp") },
                        { name: t("header.pubgMobile") },
                        { name: t("header.giftCards") },
                        { icon: "🎁", name: t("header.giftSystem") },
                    ].map((cat, index) => (
                        <Link href="/tr"
                            key={index}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition whitespace-nowrap cursor-pointer transition-all duration-300"
                        >
                            {cat.icon && <span className="mr-1">{cat.icon}</span>}
                            {cat.name}
                        </Link>
                    ))}
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400" />
            </div>
        </div>
    );
}