# System Patterns

## Mimari Genel Bakış
İki ana bölüm: Public menü sayfası + Admin yönetim paneli.

## Veri Modeli

### Category
- id (uuid)
- name
- image_url (kategori arka plan görseli)
- sort_order
- is_active

### MenuItem
- id (uuid)
- category_id (FK → categories, cascade delete)
- name
- description
- price (numeric 10,2)
- image_url
- sort_order
- is_active

## UI Patterns

### Public Menü
- Accordion: kategori başlığına tıklanınca yemekler açılır/kapanır
- Kategoriler sayfa açılışında kapalı
- Kategori başlığı: h-24, arka planda karartılmış görsel, üstünde beyaz yazı (text-3xl bold)
- Yemekler: grid-cols-2 (mobil) / grid-cols-3 (md+), kare görsel + isim + açıklama + fiyat
- Görsele tıklayınca lightbox (bg-black/80, tam ekran, dışarı tıklayınca kapanır)
- Görsel yoksa 🍽️ placeholder
- Görsel render: düz img tag (next/image fill kullanılmıyor)

### Admin Panel
- Cookie tabanlı auth (httpOnly, 7 gün), middleware ile /admin/* korunuyor
- Kategori formu: isim + görsel yükleme butonu
- Kategori listesi: accordion, her kategoride ürün listesi + ürün formu
- Ürün satırı: 40x40 görsel + isim + fiyat + düzenle/sil butonları
- ImageUpload bileşeni: gizli file input, styled buton, async yükleme

## API Yapısı
- GET  /api/admin/categories         → tüm kategoriler
- POST /api/admin/categories         → kategori ekle (name, image_url, sort_order)
- PUT  /api/admin/categories/[id]    → kategori güncelle
- DEL  /api/admin/categories/[id]    → kategori sil
- GET  /api/admin/menu-items         → yemekler (category_id filtresi)
- POST /api/admin/menu-items         → yemek ekle
- PUT  /api/admin/menu-items/[id]    → yemek güncelle
- DEL  /api/admin/menu-items/[id]    → yemek sil
- POST /api/admin/upload             → Supabase Storage'a görsel yükle → publicUrl döner
- POST /api/admin/login              → cookie set
- POST /api/admin/logout             → cookie sil

## Supabase RLS Politikaları
- categories: Public SELECT, authenticated INSERT/UPDATE/DELETE
- menu_items: Public SELECT, authenticated INSERT/UPDATE/DELETE
- storage.objects (menu-images): Public SELECT/INSERT/UPDATE/DELETE
