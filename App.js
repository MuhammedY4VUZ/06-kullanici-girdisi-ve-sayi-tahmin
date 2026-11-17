import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Ozel OyunButonu Bileseni (Pressable, basili animasyon, pasiflik, onLongPress destegi)
function OyunButonu({ baslik, renk = '#2563eb', onPress, onLongPress, pasif = false }) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={pasif}
      style={({ pressed }) => [
        styles.oyunButon,
        { backgroundColor: renk },
        pasif && styles.butonPasif,
        pressed && !pasif && styles.butonBasili,
      ]}
    >
      <Text style={styles.oyunButonYazi}>{baslik}</Text>
    </Pressable>
  );
}

export default function App() {
  const [aktifSekme, setAktifSekme] = useState('tahmin'); // 'tahmin' | 'savas' | 'form'

  // ==========================================
  // 1. BOLUM: SAYI TAHMIN OYUNU (ANA ODEV)
  // ==========================================
  const [gizliSayi, setGizliSayi] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [tahminGirdisi, setTahminGirdisi] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [mesajTuru, setMesajTuru] = useState(''); // 'hata' | 'ipucu' | 'basari'
  const [denemeSayisi, setDenemeSayisi] = useState(0);
  const [oyunBitti, setOyunBitti] = useState(false);
  const [tahminGecmisi, setTahminGecmisi] = useState([]);

  const tahminEt = () => {
    if (oyunBitti) return;

    const sayi = Number(tahminGirdisi.trim());

    // Dogrulama (Validasyon)
    if (tahminGirdisi.trim() === '' || isNaN(sayi) || sayi < 1 || sayi > 100) {
      setMesaj('⚠️ Lutfen 1 ile 100 arasinda gecerli bir sayi girin!');
      setMesajTuru('hata');
      return;
    }

    const yeniDeneme = denemeSayisi + 1;
    setDenemeSayisi(yeniDeneme);

    if (sayi < gizliSayi) {
      setMesaj(`Daha buyuk! ⬆️ (Tahminin: ${sayi})`);
      setMesajTuru('ipucu');
      setTahminGecmisi((prev) => [`${sayi} → Daha buyuk! ⬆️`, ...prev]);
    } else if (sayi > gizliSayi) {
      setMesaj(`Daha kucuk! ⬇️ (Tahminin: ${sayi})`);
      setMesajTuru('ipucu');
      setTahminGecmisi((prev) => [`${sayi} → Daha kucuk! ⬇️`, ...prev]);
    } else {
      setMesaj(`🎉 Bildin! 🥳 Tebrikler! (${yeniDeneme}. denemede buldun)`);
      setMesajTuru('basari');
      setOyunBitti(true);
      setTahminGecmisi((prev) => [`${sayi} → BILDIN! 🏆`, ...prev]);
    }

    // Her tahminden sonra kutuyu temizle
    setTahminGirdisi('');
  };

  const yenidenBaslat = () => {
    setGizliSayi(Math.floor(Math.random() * 100) + 1);
    setTahminGirdisi('');
    setMesaj('');
    setMesajTuru('');
    setDenemeSayisi(0);
    setOyunBitti(false);
    setTahminGecmisi([]);
  };

  // ==========================================
  // 2. BOLUM: SAVAS EKRANI (UYGULAMA 2)
  // ==========================================
  const [dusmanCan, setDusmanCan] = useState(100);
  const [mana, setMana] = useState(60);
  const [savasMesaji, setSavasMesaji] = useState('Dusmanla karsilastin. Hamleni sec!');

  const saldir = () => {
    setDusmanCan((prev) => Math.max(0, prev - 15));
    setSavasMesaji('⚔️ Kilicinla vurdun! Dusmana 15 hasar verdin.');
  };

  const savun = () => {
    setSavasMesaji('🛡️ Savunma pozisyonu aldin. Gelen hasar engellendi.');
  };

  const buyuYap = () => {
    if (mana >= 30) {
      setMana((prev) => prev - 30);
      setDusmanCan((prev) => Math.max(0, prev - 35));
      setSavasMesaji('🔥 Ates topu buyusu firlattin! Dusmana 35 hasar verdin.');
    }
  };

  const dinlen = () => {
    setMana((prev) => Math.min(100, prev + 25));
    setSavasMesaji('🌿 Dinlendin ve 25 Mana yeniledin.');
  };

  const savasiSifirla = () => {
    setDusmanCan(100);
    setMana(60);
    setSavasMesaji('Yeni bir dusman belirdi!');
  };

  // ==========================================
  // 3. BOLUM: KARAKTER FORMU (UYGULAMA 3)
  // ==========================================
  const [formAd, setFormAd] = useState('');
  const [formYas, setFormYas] = useState('');
  const [formSinif, setFormSinif] = useState('');
  const [formHata, setFormHata] = useState('');
  const [karakterOlusturuldu, setKarakterOlusturuldu] = useState(false);
  const siniflar = [
    { ad: 'Savasci', ikon: '⚔️' },
    { ad: 'Buyucu', ikon: '🔮' },
    { ad: 'Okcu', ikon: '🏹' },
    { ad: 'Sifaci', ikon: '✨' },
  ];

  const karakteriOlustur = () => {
    if (formAd.trim() === '') {
      setFormHata('Lutfen karakter adini yazin.');
      return;
    }
    const yasSayi = Number(formYas);
    if (isNaN(yasSayi) || yasSayi < 10 || yasSayi > 99) {
      setFormHata('Yas 10 ile 99 arasinda bir sayi olmalidir.');
      return;
    }
    if (formSinif === '') {
      setFormHata('Lutfen bir karakter sinifi secin.');
      return;
    }

    setFormHata('');
    setKarakterOlusturuldu(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Ust Sekme Secici */}
      <View style={styles.sekmeKapsayici}>
        <Pressable
          style={[styles.sekmeButon, aktifSekme === 'tahmin' && styles.sekmeAktif]}
          onPress={() => setAktifSekme('tahmin')}
        >
          <Text style={[styles.sekmeYazi, aktifSekme === 'tahmin' && styles.sekmeYaziAktif]}>
            🎯 Sayi Tahmini
          </Text>
        </Pressable>

        <Pressable
          style={[styles.sekmeButon, aktifSekme === 'savas' && styles.sekmeAktif]}
          onPress={() => setAktifSekme('savas')}
        >
          <Text style={[styles.sekmeYazi, aktifSekme === 'savas' && styles.sekmeYaziAktif]}>
            ⚔️ Savas
          </Text>
        </Pressable>

        <Pressable
          style={[styles.sekmeButon, aktifSekme === 'form' && styles.sekmeAktif]}
          onPress={() => setAktifSekme('form')}
        >
          <Text style={[styles.sekmeYazi, aktifSekme === 'form' && styles.sekmeYaziAktif]}>
            🛡️ Karakter
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.icerik}>
        {/* SEKME 1: SAYI TAHMIN OYUNU (6. HAFTA ANA ODEV) */}
        {aktifSekme === 'tahmin' && (
          <View style={styles.kart}>
            <Text style={styles.kartBaslik}>🎯 1 - 100 Sayi Tahmin Oyunu</Text>
            <Text style={styles.aciklama}>
              Aklimdan 1 ile 100 arasinda gizli bir sayi tuttum. Tahminini yaz ve butona bas!
            </Text>

            <View style={styles.denemeRozeti}>
              <Text style={styles.denemeYazi}>Yapilan Tahmin Sayisi: {denemeSayisi}</Text>
            </View>

            <TextInput
              value={tahminGirdisi}
              onChangeText={setTahminGirdisi}
              placeholder="Tahmininizi girin (orn. 42)"
              keyboardType="numeric"
              maxLength={3}
              editable={!oyunBitti}
              onSubmitEditing={tahminEt}
              style={styles.input}
            />

            {!oyunBitti ? (
              <OyunButonu baslik="Tahmin Et 🎲" renk="#2563eb" onPress={tahminEt} />
            ) : (
              <OyunButonu
                baslik="Yeniden Oyna 🔄"
                renk="#16a34a"
                onPress={yenidenBaslat}
              />
            )}

            {mesaj !== '' && (
              <View
                style={[
                  styles.mesajKutusu,
                  mesajTuru === 'basari' && styles.mesajBasari,
                  mesajTuru === 'hata' && styles.mesajHata,
                  mesajTuru === 'ipucu' && styles.mesajIpucu,
                ]}
              >
                <Text
                  style={[
                    styles.mesajYazi,
                    mesajTuru === 'basari' && styles.mesajYaziBasari,
                    mesajTuru === 'hata' && styles.mesajYaziHata,
                    mesajTuru === 'ipucu' && styles.mesajYaziIpucu,
                  ]}
                >
                  {mesaj}
                </Text>
              </View>
            )}

            {tahminGecmisi.length > 0 && (
              <View style={styles.gecmisKutusu}>
                <Text style={styles.gecmisBaslik}>📜 Tahmin Gecmisi:</Text>
                {tahminGecmisi.map((item, index) => (
                  <Text key={index} style={styles.gecmisSatir}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* SEKME 2: SAVAS EKRANI */}
        {aktifSekme === 'savas' && (
          <View style={styles.kart}>
            <Text style={styles.kartBaslik}>⚔️ Savas Arenasi</Text>
            
            <View style={styles.barKapsayici}>
              <View style={styles.barBilgi}>
                <Text style={styles.barEtiket}>👹 Dusman Cani:</Text>
                <Text style={styles.barDeger}>{dusmanCan} / 100</Text>
              </View>
              <View style={styles.barDis}>
                <View style={[styles.barIc, { width: `${dusmanCan}%`, backgroundColor: '#e11d48' }]} />
              </View>
            </View>

            <View style={styles.barKapsayici}>
              <View style={styles.barBilgi}>
                <Text style={styles.barEtiket}>🔮 Oyuncu Manasi:</Text>
                <Text style={styles.barDeger}>{mana} / 100</Text>
              </View>
              <View style={styles.barDis}>
                <View style={[styles.barIc, { width: `${mana}%`, backgroundColor: '#7c3aed' }]} />
              </View>
            </View>

            <View style={styles.savasMesajKutusu}>
              <Text style={styles.savasMesajYazi}>
                {dusmanCan === 0 ? '🏆 ZAFER! Dusmani alt ettin!' : savasMesaji}
              </Text>
            </View>

            {dusmanCan > 0 ? (
              <View style={styles.butonGrup}>
                <OyunButonu baslik="🗡️ Saldir (15 Hasar)" renk="#dc2626" onPress={saldir} />
                <OyunButonu
                  baslik="🛡️ Savun (Basili Tut: Kalkan!)"
                  renk="#2563eb"
                  onPress={savun}
                  onLongPress={() => setSavasMesaji('🛡️ Kalkani kaldirdin! (Uzun basma tetiklendi)')}
                />
                <OyunButonu
                  baslik="🔥 Buyu (35 Hasar - 30 Mana)"
                  renk="#7c3aed"
                  pasif={mana < 30}
                  onPress={buyuYap}
                />
                <OyunButonu baslik="🌿 Dinlen (+25 Mana)" renk="#16a34a" onPress={dinlen} />
              </View>
            ) : (
              <OyunButonu baslik="Yeni Savas Baslat 🔄" renk="#059669" onPress={savasiSifirla} />
            )}
          </View>
        )}

        {/* SEKME 3: KARAKTER FORMU */}
        {aktifSekme === 'form' && (
          <View style={styles.kart}>
            {!karakterOlusturuldu ? (
              <>
                <Text style={styles.kartBaslik}>🛡️ Yeni Karakter Olustur</Text>

                <Text style={styles.inputEtiket}>Karakter Adi</Text>
                <TextInput
                  value={formAd}
                  onChangeText={setFormAd}
                  placeholder="Orn. Golge Avcisi"
                  maxLength={16}
                  style={styles.input}
                />

                <Text style={styles.inputEtiket}>Yas (10 - 99)</Text>
                <TextInput
                  value={formYas}
                  onChangeText={setFormYas}
                  placeholder="Orn. 24"
                  keyboardType="numeric"
                  maxLength={2}
                  style={styles.input}
                />

                <Text style={styles.inputEtiket}>Sinif Secimi</Text>
                <View style={styles.seceneklerGrid}>
                  {siniflar.map((item) => (
                    <Pressable
                      key={item.ad}
                      onPress={() => setFormSinif(item.ad)}
                      style={[
                        styles.sinifButon,
                        formSinif === item.ad && styles.sinifButonSecili,
                      ]}
                    >
                      <Text style={styles.sinifIkon}>{item.ikon}</Text>
                      <Text
                        style={[
                          styles.sinifYazi,
                          formSinif === item.ad && styles.sinifYaziSecili,
                        ]}
                      >
                        {item.ad}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {formHata !== '' && <Text style={styles.hataMetni}>⚠️ {formHata}</Text>}

                <OyunButonu
                  baslik="Karakteri Olustur ✨"
                  renk="#16a34a"
                  onPress={karakteriOlustur}
                />
              </>
            ) : (
              <View style={styles.ozetKartKapsayici}>
                <Text style={styles.ozetTebrik}>🎉 Karakter Basariyla Olusturuldu!</Text>
                <View style={styles.karakterRozeti}>
                  <Text style={styles.karakterDevIkon}>
                    {siniflar.find((s) => s.ad === formSinif)?.ikon || '🛡️'}
                  </Text>
                  <Text style={styles.karakterBaslik}>{formAd}</Text>
                  <Text style={styles.karakterAlt}>
                    {formSinif} • {formYas} Yasinda
                  </Text>
                  <Text style={styles.karakterDurum}>Seviye 1 • Maceraya Hazir!</Text>
                </View>

                <OyunButonu
                  baslik="Yeni Karakter Olustur 🔄"
                  renk="#2563eb"
                  onPress={() => {
                    setFormAd('');
                    setFormYas('');
                    setFormSinif('');
                    setKarakterOlusturuldu(false);
                  }}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  sekmeKapsayici: {
    flexDirection: 'row',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    gap: 8,
  },
  sekmeButon: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  sekmeAktif: {
    backgroundColor: '#2563eb',
  },
  sekmeYazi: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  sekmeYaziAktif: {
    color: '#ffffff',
  },
  icerik: {
    padding: 18,
    paddingBottom: 40,
  },
  kart: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  kartBaslik: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  aciklama: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
    lineHeight: 20,
  },
  denemeRozeti: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  denemeYazi: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  inputEtiket: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 6,
  },
  oyunButon: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  oyunButonYazi: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  butonBasili: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  butonPasif: {
    opacity: 0.35,
  },
  mesajKutusu: {
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  mesajBasari: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: '#059669',
  },
  mesajHata: {
    backgroundColor: '#450a0a',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  mesajIpucu: {
    backgroundColor: '#1e3a8a',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  mesajYazi: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  mesajYaziBasari: {
    color: '#34d399',
  },
  mesajYaziHata: {
    color: '#f87171',
  },
  mesajYaziIpucu: {
    color: '#93c5fd',
  },
  gecmisKutusu: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  gecmisBaslik: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: 6,
  },
  gecmisSatir: {
    fontSize: 13,
    color: '#cbd5e1',
    marginVertical: 2,
  },
  barKapsayici: {
    marginBottom: 14,
  },
  barBilgi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barEtiket: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  barDeger: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  barDis: {
    height: 12,
    backgroundColor: '#0f172a',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barIc: {
    height: 12,
    borderRadius: 6,
  },
  savasMesajKutusu: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  savasMesajYazi: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    textAlign: 'center',
  },
  butonGrup: {
    gap: 4,
  },
  seceneklerGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  sinifButon: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  sinifButonSecili: {
    backgroundColor: '#2563eb',
    borderColor: '#60a5fa',
  },
  sinifIkon: {
    fontSize: 22,
    marginBottom: 4,
  },
  sinifYazi: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  sinifYaziSecili: {
    color: '#ffffff',
  },
  hataMetni: {
    color: '#f87171',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 12,
  },
  ozetKartKapsayici: {
    alignItems: 'center',
  },
  ozetTebrik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34d399',
    marginBottom: 16,
  },
  karakterRozeti: {
    backgroundColor: '#0f172a',
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  karakterDevIkon: {
    fontSize: 48,
    marginBottom: 8,
  },
  karakterBaslik: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  karakterAlt: {
    fontSize: 15,
    color: '#38bdf8',
    marginTop: 4,
  },
  karakterDurum: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 8,
  },
});
