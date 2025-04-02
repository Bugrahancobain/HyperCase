"use client";
import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "@/app/context/CartContext";
import CartDrawer from "./CartDrawer";
import { Switch } from "@/components/ui/switch";
import { CurrencyContext } from "@/app/context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { IoBagHandleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
    const { t, i18n } = useTranslation();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md relative z-50 dark:bg-gray-900 dark:text-white transition-all duration-300 ease-in-out">
                <Link href="/tr">
                    <h1 className="text-xl font-bold cursor-pointer">HyperCase</h1>
                </Link>
                <button onClick={() => setMobileMenuOpen(prev => !prev)} className="md:hidden text-2xl">
                    <FiMenu />
                </button>
                {/* Masaüstü Menü */}
                <div className="hidden md:flex gap-5 items-center">
                    <Link href="#">{t("header.myOrders")}</Link>
                    <Link href="#">{t("header.myAccount")}</Link>
                    <Link href="#">{t("header.publishers")}</Link>
                    <Link href="#" className="text-orange-500 dark:text-white">{t("header.addListing")}</Link>
                    <Link href="#" className="text-green-500 dark:text-white">{t("header.loadBalance")}</Link>
                    <select value={currency} onChange={(e) => toggleCurrency(e.target.value)} className="px-2 py-1 rounded border text-sm bg-white dark:bg-gray-800 dark:text-white">
                        <option value="TL">{t("header.currencyTL")}</option>
                        <option value="USD">{t("header.currencyUSD")}</option>
                    </select>
                    <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} className="px-2 py-1 rounded border text-sm bg-white dark:bg-gray-800 dark:text-white">
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                    </select>
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                    <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
                    <button><CgProfile className="w-5 h-5 cursor-pointer" /></button>
                    <button className="cursor-pointer" onClick={() => setDrawerOpen((prev) => !prev)}>
                        <IoBagHandleOutline className="w-5 h-5" />
                    </button>
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 m-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    )}
                    <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} cartItems={cartItems} />
                </div>
            </header>

            {/* Mobil Menü */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-[998] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
            >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">{t("header.menu")}</h2>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">×</button>
                </div>
                <div className="flex flex-col gap-4 px-4 py-6">
                    <Link href="#">{t("header.myOrders")}</Link>
                    <Link href="#">{t("header.myAccount")}</Link>
                    <Link href="#">{t("header.publishers")}</Link>
                    <Link href="#" className="text-orange-500">{t("header.addListing")}</Link>
                    <Link href="#" className="text-green-500">{t("header.loadBalance")}</Link>
                    <select className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white" value={currency} onChange={(e) => toggleCurrency(e.target.value)}>
                        <option value="TL">{t("header.currencyTL")}</option>
                        <option value="USD">{t("header.currencyUSD")}</option>
                    </select>
                    <select className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                        <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <Link href="#">
                            <CgProfile className="w-5 h-5 cursor-pointer" />
                        </Link>
                        <button onClick={() => setDrawerOpen(true)}>
                            <IoBagHandleOutline className="w-5 h-5 cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white dark:bg-gray-900 shadow-sm">
                <div className="overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-2 border-b justify-center">
                    {[{ icon: "📂", name: t("header.allCategories") }, { name: t("header.marketplace") }, { name: t("header.knightOnline") }, { name: t("header.valorantVp") }, { name: t("header.lolRp") }, { name: t("header.pubgMobile") }, { name: t("header.giftCards") }, { icon: "🎁", name: t("header.giftSystem") }].map((cat, index) => (
                        <Link
                            href="/tr"
                            key={index}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-semibold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition whitespace-nowrap cursor-pointer"
                        >
                            {cat.icon && <span className="mr-1">{cat.icon}</span>}
                            {cat.name}
                        </Link>
                    ))}
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400" />
            </div>
            {/* Header bileşeninin sonunda, tüm drawer'lardan sonra */}
            <CartDrawer
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                cartItems={cartItems}
            />
        </div>
    );
}
