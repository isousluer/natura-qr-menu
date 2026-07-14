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
- category_id (FK → categories)
- name
- description
- price
- image_url
- sort_order
- is_active

## UI Patterns

### Public Menü
- Accordion: kategori başlığına tıklanınca yemekler açılır/kapanır
- Kategoriler sayfa açılışında kapalı gelir
- Kategori başlığı: tam genişlik, arka planda karartılmış görsel, üstünde beyaz yazı
- Yemekler: 2 sütunlu grid, kare görsel (img tag) + isim + açıklama + fiyat
- Görsel yoksa 🍽️ placeholder gösterilir

### Admin Panel
- Cookie tabanlı auth (httpOnly, 7 gün)
- Middleware ile /admin/* rotaları korunuyor
- Kategori CRUD + görsel yükleme
- Yemek CRUD + görsel yükleme
- Accordion yapısında: kategori açılınca altındaki yemekler ve form görünür

## API Yapısı
- GET  /api/admin/categories         → tüm kategoriler
- POST /api/admin/categories         → kategori ekle
- PUT  /api/admin/categories/[id]    → kategori güncelle
- DEL  /api/admin/categories/[id]    → kategori sil
- GET  /api/admin/menu-items         → yemekler (category_id filtresi ile)
- POST /api/admin/menu-items         → yemek ekle
- PUT  /api/admin/menu-items/[id]    → yemek güncelle
- DEL  /api/admin/menu-items/[id]    → yemek sil
- POST /api/admin/upload             → Supabase Storage'a görsel yükle
- POST /api/admin/login              → cookie set
- POST /api/admin/logout             → cookie sil
