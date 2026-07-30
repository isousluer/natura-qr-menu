# Active Context

## Mevcut Durum
Proje canlıda ve tam çalışır durumda. Tüm temel özellikler tamamlandı.

## Odak Noktası
Yeni özellik talepleri.

## Sonraki Adımlar
- [ ] Arama / filtreleme
- [ ] QR kod oluşturucu
- [ ] Kampanya banner'ı
- [ ] Stok durumu gösterimi
- [ ] Analytics dashboard
- [ ] PWA desteği

## Kesinleşen Kararlar
- Next.js 16 + Turbopack (`next dev --turbo`)
- Kategori görselleri: arka planda karartılmış tam genişlik, üstünde beyaz yazı (text-3xl bold)
- Yemekler: mobilde 2 sütun, md ve üstünde 3 sütun grid
- Kategoriler sayfa açılışında kapalı
- Görsele tıklayınca lightbox açılıyor
- Görsel render: düz img tag (next/image fill kullanılmıyor)
- Logo: Natura (yeşil #3a7d44, Georgia serif, text-3xl) + BISTRO (kahverengi #7c5c3e, text-xl) tek satırda
- Admin panel: formlar varsayılan kapalı, düzenleme formu ilgili öğenin hemen altında açılıyor
- Kategori ve ürün sıralama: sürükle-bırak (@dnd-kit/core + @dnd-kit/sortable)
- dnd-kit sensor: sadece PointerSensor (TouchSensor kullanılmıyor — mobilde scroll ile çakışıyor)
- DragHandle: touch-action: none, listeners doğrudan handle'a bağlı
- revalidate = 30 saniye

## Önemli Notlar
- next/image fill + aspect-square birlikte kullanılmamalı
- Görsel yükleme async — "Görsel yüklendi ✓" yazısını bekle
- Supabase RLS: SELECT herkese açık, yazma işlemleri API üzerinden
- Next.js 16: proxy.ts, export adı `proxy` olmalı
- price alanı text tipinde, toFixed() kullanılmamalı
- VS Code auto push: "git.postCommitCommand": "push" ayarı aktif
