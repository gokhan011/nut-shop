# Nut Shop - E-Ticaret Projesi

Django backend ve Next.js frontend ile oluşturulmuş kuruyemiş satış platformu.

## 🎯 Özellikler

- 🥜 **30+ Demo Ürün** - İngilizce isimlerle hazır ürünler
- 🖼️ **Gerçek Fotoğraflar** - Her ürün için yüksek kalite görseller
- 🏷️ **8 Kategori** - Almonds, Cashews, Walnuts, Pistachios, Hazelnuts, Pecans, Mixed Nuts, Dried Fruits
- 🛒 **Sepet Sistemi** - LocalStorage ile kalıcı sepet
- 📦 **Sipariş Yönetimi** - Tam özellikli checkout süreci
- 💳 **Checkout Sayfası** - Adres ve iletişim bilgileri formu
- 📱 **Responsive Tasarım** - Mobil ve desktop uyumlu
- 🎨 **Modern UI** - Tailwind CSS ile şık arayüz
- 🔍 **Arama ve Filtreleme** - Kategorilere göre ürün filtreleme

## 🛠️ Teknolojiler

**Backend:**
- Django 4.2.x
- Django REST Framework 3.16.1
- Django CORS Headers 4.9.0
- Pillow 12.1.0 (Image processing)
- SQLite Database

**Frontend:**
- Next.js 16.1.6
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Lucide Icons

## 📦 Demo Ürünler

Proje **30 adet** hazır demo ürünle geliyor:

### Kategoriler:
1. **Almonds** (4 ürün) - $22.50 - $28.99
2. **Cashews** (4 ürün) - $28.99 - $34.99
3. **Walnuts** (3 ürün) - $27.50 - $31.99
4. **Pistachios** (3 ürün) - $36.99 - $42.99
5. **Hazelnuts** (3 ürün) - $24.50 - $28.99
6. **Pecans** (3 ürün) - $34.99 - $38.50
7. **Mixed Nuts** (4 ürün) - $26.99 - $32.99
8. **Dried Fruits** (6 ürün) - $14.99 - $24.99

Tüm ürünler gerçek fotoğraflar, detaylı açıklamalar ve stok bilgileri ile birlikte gelir.

## 🚀 Kurulum

### Backend Kurulumu

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Backend URL:** http://localhost:8000  
**Admin Panel:** http://localhost:8000/admin  
**API Root:** http://localhost:8000/api/

**Admin Bilgileri:**
- Kullanıcı: `gokhant`
- Şifre: `307Z2597?`

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

**Frontend URL:** http://localhost:3000

## 🌐 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/categories/` | Tüm kategorileri listele |
| GET | `/api/categories/{slug}/` | Kategori detayı |
| GET | `/api/products/` | Tüm ürünleri listele (pagination) |
| GET | `/api/products/?category={slug}` | Kategoriye göre filtrele |
| GET | `/api/products/{slug}/` | Ürün detayı |
| POST | `/api/orders/` | Yeni sipariş oluştur |
| GET | `/api/orders/` | Tüm siparişleri listele |
| GET | `/api/orders/{id}/` | Sipariş detayı |

## 📁 Proje Yapısı

```
nut_shop/
├── backend/
│   ├── nutshop/                 # Django ana proje
│   │   ├── settings.py          # Ayarlar (CORS, REST Framework)
│   │   └── urls.py              # API routing
│   ├── products/                # Ürün uygulaması
│   │   ├── models.py            # Category, Product modelleri
│   │   ├── serializers.py       # DRF serializers
│   │   ├── views.py             # API ViewSets
│   │   └── admin.py             # Admin panel özelleştirmeleri
│   ├── orders/                  # Sipariş uygulaması
│   │   ├── models.py            # Order, OrderItem modelleri
│   │   ├── serializers.py       # DRF serializers
│   │   ├── views.py             # API ViewSets
│   │   └── admin.py             # Admin panel
│   ├── media/products/          # Ürün görselleri (30 adet)
│   ├── db.sqlite3               # Demo verili database
│   ├── requirements.txt         # Python dependencies
│   └── manage.py
└── frontend/
    ├── app/
    │   ├── page.tsx             # Ana sayfa
    │   ├── layout.tsx           # Root layout
    │   ├── products/
    │   │   ├── page.tsx         # Ürün listesi
    │   │   └── [slug]/page.tsx  # Ürün detayı
    │   ├── cart/page.tsx        # Sepet sayfası
    │   └── checkout/page.tsx    # Checkout sayfası
    ├── components/
    │   ├── Navbar.tsx           # Navigation bar
    │   └── ProductCard.tsx      # Ürün kartı
    ├── context/
    │   └── CartContext.tsx      # Sepet state yönetimi
    ├── lib/
    │   └── api.ts               # Axios API servisleri
    ├── types/
    │   └── index.ts             # TypeScript interfaces
    └── package.json
```

## 🎯 Kullanım

1. **Backend'i başlatın:**
   ```bash
   cd backend && source venv/bin/activate && python manage.py runserver
   ```

2. **Frontend'i başlatın (yeni terminal):**
   ```bash
   cd frontend && npm run dev
   ```

3. **Siteyi ziyaret edin:**
   - Ana Sayfa: http://localhost:3000
   - Ürünler: http://localhost:3000/products
   - Admin Panel: http://localhost:8000/admin

4. **Demo veriler hazır!** Ürünler ve fotoğraflar otomatik yüklü.

## 🖼️ Ekran Görüntüleri

- **Ana Sayfa:** Hero section, öne çıkan ürünler, kategori kartları
- **Ürünler:** Grid layout, kategori filtresi, sidebar navigation
- **Ürün Detay:** Büyük görsel, açıklama, miktar seçimi, stok durumu
- **Sepet:** Ürün listesi, miktar güncelleme, toplam fiyat
- **Checkout:** Form, sipariş özeti, başarı ekranı

## 🔧 Geliştirme Notları

- Backend API, frontend ile CORS ayarları yapılarak entegre edilmiştir
- Sepet verileri localStorage'da saklanır (refresh sonrası kaybolmaz)
- Ürün görselleri `backend/media/products/` klasöründe saklanır
- Tüm API responses paginated (sayfa başına 12 ürün)
- Image handling için Pillow kullanılır
- Next.js App Router ve Server Components kullanımı
- TypeScript ile tip güvenliği

## 📝 TODO / Geliştirme Fikirleri

- [ ] Kullanıcı kayıt/giriş sistemi
- [ ] Ödeme entegrasyonu (Stripe, PayPal)
- [ ] Ürün yorumları ve değerlendirmeleri
- [ ] Favori ürünler listesi
- [ ] Sipariş takip sistemi
- [ ] Email bildirimleri
- [ ] Çoklu dil desteği (i18n)
- [ ] Kupon/indirim kodu sistemi

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

Ürün görselleri ve demo içerikler yalnızca gösterim amaçlıdır ve bu lisans kapsamında değildir. Ticari kullanım için bunları kendi görsel ve içeriklerinizle değiştirmeniz önerilir.
