# System Patterns

## Mimari Genel Bakış
İki ana bölüm: Public menü sayfası + Admin yönetim paneli.

## Veri Modeli

### Category
- id
- name (kategori adı)
- order (sıralama)
- is_active

### MenuItem
- id
- category_id (FK)
- name (yemek adı)
- description (içerik/açıklama)
- price
- image_url
- order (sıralama)
- is_active

## UI Patterns

### Public Menü
- Accordion bileşeni: kategori başlığına tıklanınca yemekler açılır/kapanır
- Yemek kartı: görsel + isim + içerik + fiyat
- Mobile-first responsive layout

### Admin Panel
- CRUD arayüzü kategoriler için
- Her kategorinin altında yemek CRUD
- Görsel yükleme formu (file input)

## API Yapısı (Taslak)
- GET /api/menu → tüm kategoriler ve yemekler (public)
- CRUD /api/admin/categories
- CRUD /api/admin/menu-items
- POST /api/admin/upload → görsel yükleme
