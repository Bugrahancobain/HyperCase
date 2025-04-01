
# HyperStore - Frontend Case

Bu proje, [Hyper Teknoloji](https://www.hyperteknoloji.com.tr) tarafından Frontend Developer pozisyonu için verilen teknik değerlendirme çalışmasıdır.

---

## 🔗 Demo

Proje yalnızca local olarak çalıştırılmak üzere hazırlanmıştır. API token’ı gerektirir.

---

## 📦 Kurulum

```bash
git clone https://github.com/bugrahancobain/hyperstore-case.git
cd hyperstore-case
npm install

.env.local dosyası oluşturun:

NEXT_PUBLIC_API_TOKEN=buraya_token

npm run dev
```

---

## 🧩 Proje Açıklaması

Hyper Teknoloji’nin sağladığı gerçek API üzerinden ürünleri listeleyen, kullanıcı dostu, filtrelenebilir, çok dilli ve temalı bir e-ticaret arayüzü geliştirilmiştir. Kullanıcılar ürünleri favorilere ekleyebilir, sepete ürün atabilir ve ödeme ekranına geçebilir.

---

## 🌐 Çok Dilli Destek (i18n)

Bu projede `next-i18next` kullanılarak **Türkçe** ve **İngilizce** dil desteği sunulmuştur.

### 📁 Klasör Yapısı

```
📁 public/
 └── 📁 locales/
      ├── tr/
      │    └── translation.json
      └── en/
           └── translation.json
```

### ➕ Yeni Dil Eklemek

Yeni bir dil desteği eklemek için:
1. `public/locales` dizinine yeni bir klasör oluşturun (`es` gibi).
2. İçerisine `translation.json` dosyası koyun.
3. `next-i18next.config.js` dosyasına yeni dili ekleyin:
```js
module.exports = {
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en", "es"], // yeni dil burada tanımlanmalı
  },
};
```

### 🔤 Çeviri Kullanımı

Tüm metinler bileşenlerde `useTranslation` hook’u ve `{t("anahtar")}` yapısıyla çevrilmiştir:

```jsx
import { useTranslation } from "react-i18next";
const { t } = useTranslation();

return <p>{t("addToCart")}</p>;
```

---

## 🚀 Kullanılan Teknolojiler
- ✅ Next.js 13 (App Router yapısı)
- ✅ Tailwind CSS
- ✅ Axios
- ✅ React Context API
- ✅ Shadcn UI (Switch gibi bileşenlerde)
- ✅ React Hook Form + Yup
- ✅ next-i18next (i18n - çok dilli destek)
- ✅ React.lazy + Suspense (lazy loading)

---

## ✅ Gerçekleştirilen Özellikler

🔹 Temel Görevler
- Gerçek API ile ürün listeleme (POST /Products/List)
- Ürün kartında görsel, başlık, fiyat, “Sepete Ekle” butonu
- Sepete eklenen ürün sayısının gösterimi
- Responsive tasarım
- State yönetimi (Context API ile)
- Tailwind CSS ile modern UI

🔹 Gelişmiş (İsteğe Bağlı) Özellikler
- Arama, fiyat aralığı ve kategori filtreleme
- Favorilere ekleme (localStorage)
- Dark / Light tema geçişi (localStorage ile)
- Lazy loading (React.lazy + Suspense)
- Form validasyonlu ödeme ekranı (React Hook Form + Yup)
- Shadcn UI kullanımı (örneğin toggle switch)
- Çoklu dil desteği (Türkçe & İngilizce - next-i18next)
- Para birimi seçimi (₺ TL / $ USD)
- Ürün detay sayfası (dinamik route)
- Sayfalama (ileri / geri + numaralı)
- Sepet çekmecesi (drawer) + ödeme sayfası

---

## 📝 Notlar
- ❗ Sahte veri veya sahte API KULLANILMAMIŞTIR
- ✅ Tüm kodlar tamamen özgün şekilde tarafımdan yazılmıştır
- 🕒 Proje 4 gün içerisinde tamamlanmıştır
- 🎯 Geri bildirimlere ve geliştirmeye açıktır

---

## 📬 İletişim

📧 demo@hyper.com  
🌐 https://www.hyperteknoloji.com.tr  
👩‍💻 GitHub: github.com/bugrahancobain
