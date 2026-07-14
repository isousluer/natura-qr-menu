# Active Context

## Mevcut Durum
Temel geliştirme tamamlandı. Arayüz çalışıyor, Supabase bağlantısı henüz yapılmadı. Şu an mock data ile test ediliyor.

## Odak Noktası
Supabase kurulumu ve gerçek veri bağlantısı.

## Sonraki Adımlar
1. Supabase projesi oluştur
2. supabase-schema.sql çalıştır
3. Storage bucket oluştur (menu-images)
4. .env.local dosyasını doldur
5. page.tsx'teki mock datayı gerçek Supabase sorgusuyla değiştir
6. Vercel'e deploy

## Kesinleşen Kararlar
- Next.js 16 + Turbopack kullanılıyor (`next dev --turbo`)
- Kategori görselleri: arka plan olarak karartılmış tam genişlik görsel
- Yemekler: 2 sütunlu grid, kare görsel + isim + açıklama + fiyat
- Kategoriler sayfa açılışında kapalı gelir
- Görsel render: `next/image` yerine düz `<img>` tag kullanılıyor (fill+aspect-square çakışması nedeniyle)

## Önemli Notlar
- `next/image` fill prop'u ile aspect-square CSS birlikte kullanılmamalı, sonsuz döngüye giriyor
- Admin panelinde hem kategori hem yemek için görsel yükleme mevcut
