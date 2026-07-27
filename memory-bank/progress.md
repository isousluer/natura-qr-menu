# Progress

## Tamamlananlar
- [x] Proje gereksinimleri belirlendi
- [x] Memory bank oluşturuldu
- [x] Tech stack kararı (Next.js + Supabase + Vercel)
- [x] Next.js 16 projesi kuruldu, Turbopack aktif
- [x] Supabase client ve tipler
- [x] Public menü sayfası — accordion kategoriler
- [x] Kategori başlıklarına arka plan görseli eklendi
- [x] Yemekler mobilde 2, büyük ekranda 3 sütunlu grid
- [x] Kategoriler sayfa açılışında kapalı
- [x] Görsele tıklayınca lightbox açılıyor
- [x] Logo: Natura (yeşil, Georgia serif) + BISTRO (kahverengi) tek satırda, gradient çizgi, MENÜ yazısı
- [x] Admin login sayfası + httpOnly cookie auth
- [x] Admin panel — kategori CRUD + görsel yükleme
- [x] Admin panel — yemek CRUD + görsel yükleme
- [x] Admin panel — ürün satırında küçük görsel gösterimi
- [x] Admin panel — kategori sıralama (▲▼ butonları)
- [x] Admin panel — kategori ve ürün sıralama: sürükle-bırak (@dnd-kit, sadece PointerSensor)
- [x] Admin panel — yeni kategori formu varsayılan kapalı, butona basınca açılıyor
- [x] Admin panel — kategori düzenleme formu kategorinin hemen altında açılıyor
- [x] Admin panel — ürün düzenleme formu ürünün hemen altında açılıyor
- [x] API routes (categories, menu-items, upload, login, logout)
- [x] proxy.ts — admin route koruması (Next.js 16)
- [x] Supabase bağlantısı kuruldu (yeni proje: kvdbfpsmrciobcvbnzqe)
- [x] Yeni şemaya geçildi (items tablosu, display_order, price text)
- [x] Storage bucket oluşturuldu (menu-images, public)
- [x] RLS + Storage politikaları eklendi
- [x] Eski görseller otomatik storage'dan siliniyor
- [x] Vercel'e deploy edildi, env değişkenleri güncellendi
- [x] revalidate = 30 saniye

## Yapılacaklar
- [ ] Görsel optimizasyonu (Supabase Transform — isteğe bağlı)

## Bilinen Sorunlar
- Henüz yok

## Notlar
- Admin şifresi .env.local ve Vercel Dashboard'da ADMIN_PASSWORD
- next/image fill + aspect-square kullanılmamalı, düz img tag kullanılıyor
- Görsel yükleme async — "Görsel yüklendi ✓" yazısını bekle, sonra kaydet
- Next.js 16: middleware.ts → proxy.ts, export adı `proxy` olmalı
- price alanı text tipinde (numeric değil)
- dnd-kit: TouchSensor + PointerSensor birlikte kullanılmamalı — mobilde scroll ile çakışır, sadece PointerSensor yeterli
