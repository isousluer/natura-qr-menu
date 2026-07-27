# System Patterns

## Mimari Genel Bakış
İki ana bölüm: Public menü sayfası + Admin yönetim paneli.

## Veri Modeli

### categories
- id (uuid)
- name (text)
- image_url (text, nullable) — kategori arka plan görseli
- display_order (integer)
- is_active (boolean)
- created_at (timestamptz)

### items
- id (uuid)
- category_id (uuid, FK → categories, cascade delete)
- name (text)
- description (text, default '')
- price (text) — numeric değil, text
- image_url (text, nullable)
- display_order (integer)
- is_active (boolean)
- created_at (timestamptz)

## UI Patterns

### Public Menü
- Logo: Natura (yeşil, Georgia serif) + BISTRO (kahverengi) + gradient çizgi + MENÜ
- Accordion: kategori başlığına tıklanınca yemekler açılır/kapanır, kapalı başlar
- Kategori başlığı: h-24, karartılmış arka plan görseli, beyaz yazı (text-3xl bold)
- Yemekler: grid-cols-2 (mobil) / grid-cols-3 (md+)
- Yemek kartı: kare görsel (img tag) + isim + açıklama + fiyat
- Görsele tıklayınca lightbox (bg-black/80, dışarı tıklayınca kapanır)
- Görsel yoksa 🍽️ placeholder

### Admin Panel
- Cookie tabanlı auth (httpOnly, 7 gün), proxy.ts ile /admin/* korunuyor
- Yeni kategori butonu: varsayılan görünür, forma basınca kaybolur
- Yeni kategori formu: butona basınca açılır, iptal ile kapanır
- Kategori düzenleme formu: kategorinin hemen altında açılır
- Kategori ve ürün sıralama: sürükle-bırak
  - @dnd-kit/core + @dnd-kit/sortable
  - Sadece PointerSensor (TouchSensor mobilde scroll ile çakışıyor)
  - DragHandle: `touch-action: none`, listeners doğrudan handle span'a bağlı
  - Drag end'de tüm sıra API'ye toplu yazılıyor (Promise.all)
- Ürün düzenleme formu: ürünün hemen altında açılır
- Yeni ürün formu: kategorinin en altında + Ürün Ekle butonu
- ImageUpload bileşeni: gizli file input, styled buton, async yükleme

## API Yapısı
- GET  /api/admin/categories         → tüm kategoriler (display_order sıralı)
- POST /api/admin/categories         → kategori ekle
- PUT  /api/admin/categories/[id]    → kategori güncelle + eski görseli sil
- DEL  /api/admin/categories/[id]    → kategori sil + görselini sil
- GET  /api/admin/menu-items         → items (category_id filtresi, display_order sıralı)
- POST /api/admin/menu-items         → ürün ekle
- PUT  /api/admin/menu-items/[id]    → ürün güncelle + eski görseli sil
- DEL  /api/admin/menu-items/[id]    → ürün sil + görselini sil
- POST /api/admin/upload             → Supabase Storage'a yükle → publicUrl döner
- POST /api/admin/login              → cookie set
- POST /api/admin/logout             → cookie sil

## Supabase
- Proje: kvdbfpsmrciobcvbnzqe.supabase.co
- RLS: public SELECT, INSERT/UPDATE/DELETE herkese açık (API cookie kontrolü yapıyor)
- Storage: menu-images bucket (public), tüm operasyonlara izin var
- deleteStorageImage(): URL'den dosya adını parse eder, storage'dan siler
