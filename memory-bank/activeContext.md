# Active Context

## Mevcut Durum
Proje çalışır durumda. Supabase bağlantısı kuruldu, admin panelden kategori ve yemek eklenebiliyor, public menü sayfası gerçek verilerle çalışıyor.

## Odak Noktası
Vercel deploy.

## Sonraki Adımlar
1. Vercel'e deploy
2. Vercel Dashboard'a env değişkenlerini ekle
3. İsteğe bağlı: Supabase Transform ile görsel optimizasyonu

## Kesinleşen Kararlar
- Next.js 16 + Turbopack (`next dev --turbo`)
- Kategori görselleri: arka planda karartılmış tam genişlik, üstünde beyaz yazı (text-3xl)
- Yemekler: mobilde 2 sütun, md ve üstünde 3 sütun grid
- Kategoriler sayfa açılışında kapalı
- Görsele tıklayınca lightbox açılıyor, dışarı tıklayınca kapanıyor
- Görsel render: düz img tag (next/image fill kullanılmıyor)
- Admin panelde ürün satırında 40x40 küçük görsel gösterimi

## Önemli Notlar
- next/image fill + aspect-square birlikte kullanılmamalı
- Görsel yükleme async — "Görsel yüklendi ✓" yazısını bekle
- Supabase RLS: SELECT herkese açık, yazma işlemleri API üzerinden
- Storage politikaları SQL Editor'dan eklendi
