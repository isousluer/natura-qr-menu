# Active Context

## Mevcut Durum
Proje canlıda. Vercel'e deploy edildi, Supabase bağlantısı çalışıyor. Admin panelden kategori ve yemek yönetimi yapılabiliyor.

## Odak Noktası
Yeni özellik ve iyileştirmeler.

## Sonraki Adımlar
- İsteğe bağlı: Supabase Transform ile görsel optimizasyonu

## Kesinleşen Kararlar
- Next.js 16 + Turbopack (`next dev --turbo`)
- Kategori görselleri: arka planda karartılmış tam genişlik, üstünde beyaz yazı (text-3xl bold)
- Yemekler: mobilde 2 sütun, md ve üstünde 3 sütun grid
- Kategoriler sayfa açılışında kapalı
- Görsele tıklayınca lightbox açılıyor
- Görsel render: düz img tag (next/image fill kullanılmıyor)
- Admin panelde ürün satırında 40x40 küçük görsel
- Eski görseller kategori/ürün güncellenince veya silinince storage'dan otomatik siliniyor
- Logo: Natura (yeşil #3a7d44, Georgia serif, text-5xl) + BISTRO (kahverengi #7c5c3e, text-3xl) tek satırda, altında gradient çizgi ve MENÜ yazısı

## Önemli Notlar
- next/image fill + aspect-square birlikte kullanılmamalı
- Görsel yükleme async — "Görsel yüklendi ✓" yazısını bekle
- Supabase RLS: SELECT herkese açık, yazma işlemleri API üzerinden
- Next.js 16: middleware.ts → proxy.ts, export adı `proxy` olmalı
- VS Code'da auto push: `"git.postCommitCommand": "push"` ayarı aktif
