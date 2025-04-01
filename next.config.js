const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    // next-i18next konfigürasyonunu buraya dahil et
    i18n: {
        defaultLocale: "tr",
        locales: ["tr", "en"],
    },
};

module.exports = nextConfig;