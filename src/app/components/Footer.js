"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-10 border-t">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
                <div className="col-span-2">
                    <div className="flex justify-between">
                        <div>
                            <Image src="/logo.webp" alt="Logo" width={200} height={50} />
                        </div>
                        <div>
                            <Image src="/etbis.webp" alt="ETBİS" width={75} height={75} />
                        </div>
                    </div>
                    <p className="text-sm text-center mt-4">
                        {t("footer.description")}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">{t("footer.corporate")}</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#">{t("footer.about")}</Link></li>
                        <li><Link href="#">{t("footer.supportCenter")}</Link></li>
                        <li><Link href="#">{t("footer.dealerApplication")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">{t("footer.agreements")}</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="#">{t("footer.privacyPolicy")}</Link></li>
                        <li><Link href="#">{t("footer.userAgreement")}</Link></li>
                        <li><Link href="#">{t("footer.salesAgreement")}</Link></li>
                        <li><Link href="#">{t("footer.refundPolicy")}</Link></li>
                        <li><Link href="#">{t("footer.kvkk")}</Link></li>
                        <li><Link href="#">{t("footer.cookiePolicy")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">{t("footer.popularListings")}</h3>
                    <ul className="space-y-1 text-sm">
                        <li>{t("footer.pubgRandom")}</li>
                        <li>{t("footer.mlbbAccount")}</li>
                        <li>{t("footer.steamKey")}</li>
                        <li>{t("footer.robloxAccount")}</li>
                        <li>{t("footer.discordNitro")}</li>
                        <li>{t("footer.instagramFollowers")}</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">{t("footer.bestSellers")}</h3>
                    <ul className="space-y-1 text-sm">
                        <li>{t("footer.lolRp")}</li>
                        <li>{t("footer.pubgUc")}</li>
                        <li>{t("footer.valorantVp")}</li>
                        <li>{t("footer.mlbbDiamonds")}</li>
                        <li>{t("footer.robux")}</li>
                        <li>{t("footer.brawlStarsDiamonds")}</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 border-t pt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                <div className="mb-2">
                    <p>info@hyperteknoloji.com</p>
                    <p>{t("footer.address")}</p>
                </div>
                <p className="mb-4">© 2025 <strong>Hyper Teknoloji Ltd. Şti.</strong> {t("footer.rightsReserved")}</p>
            </div>
        </footer>
    );
}