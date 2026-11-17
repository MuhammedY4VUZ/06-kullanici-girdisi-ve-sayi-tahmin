# DOT311 — Hafta 6: Kullanıcı Girdisi (TextInput, Pressable, Olaylar) ve Sayı Tahmin Oyunu

Bu proje, 6. Hafta ders notunda yer alan temel kullanıcı etkileşimi araçlarını ve **Sayı Tahmin Oyunu** ödevini içermektedir.

## İçerik ve Özellikler

### 1. 🎯 Sayı Tahmin Oyunu (Ana Ödev)
- **Rastgele Sayı:** 1 ile 100 arasında rastgele gizli sayı üretilip state'te saklanır (`Math.floor(Math.random() * 100) + 1`).
- **Girdi Kutusu:** Sadece rakam klavyesi açan `TextInput` (`keyboardType="numeric"`, `maxLength={3}`).
- **Özel Buton:** `Pressable` ile basıldığında küçülme ve opaklık animasyonu olan "Tahmin Et" butonu.
- **Yönlendirme & Geri Bildirim:**
  - Sayı küçükse: "Daha büyük! ⬆️"
  - Sayı büyükse: "Daha küçük! ⬇️"
  - Doğruysa: "Bildin! 🥳"
- **Validasyon:** Boş veya 1–100 harici değer girilince anında hata uyarısı.
- **Sayaç:** Kaçıncı tahminde bulunulduğunu sayar.
- **Kutu Temizleme:** Her tahminden sonra girdi kutusu sıfırlanır.
- **Geçmiş Listesi:** Önceki tahminleri oklar eşliğinde ekranda listeler.
- **Bonus:** Oyun bittiğinde "Yeniden Oyna" butonu belirir ve yeni sayı ile oyunu baştan başlatır.

### 2. ⚔️ Savaş Ekranı (Uygulama 2)
- Özel `OyunButonu` bileşeni (`onPress`, `onLongPress` kalkan savunması).
- Mana ve Düşman Canı yönetimi, yetersiz manada büyü butonunun pasifleşmesi (`pasif={mana < 30}`).
- Düşman canı 0 olunca Zafer ekranı.

### 3. 🛡️ Karakter Formu (Uygulama 3)
- Ad ve yaş (10–99 kontrolü) validasyonu.
- 4 sınıf seçimi (Savaşçı, Büyücü, Okçu ve bonus sınıf olan Şifacı).
- Dinamik karakter rozet kartı.

## WebStorm'da Çalıştırma ve Expo Go Testi
1. WebStorm'da bu klasörü açın.
2. Terminalde:
   ```bash
   npx expo start
   ```
3. Telefonunuzdaki **Expo Go** uygulaması ile QR kodu tarayın.
