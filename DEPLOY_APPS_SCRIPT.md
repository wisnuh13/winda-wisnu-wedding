# Panduan Deploy Google Apps Script untuk Akses Publik

Ikuti langkah-langkah di bawah untuk mendeploy Apps Script agar bisa menerima request dari website tanpa perlu login.

## Langkah 1: Buka Google Sheet
Buka Google Sheet Anda di:
```
https://docs.google.com/spreadsheets/d/1-O3eIRZJDVJ5Vv4Y2dfUIMJ6llzCOyXiVBCXu8SCN5o/edit
```

## Langkah 2: Buka Apps Script Editor
1. Klik menu **"Extensions"** (atau **"Ekstensi"**)
2. Pilih **"Apps Script"**
3. Tunggu editor Apps Script terbuka

## Langkah 3: Deploy Web App
### Cara A: Menggunakan Tombol Deploy (Recommended)

1. **Cari icon Deploy** (seperti rocket/roket) di bagian atas editor
2. Klik **"Deploy"**
3. Pilih **"New deployment"** atau **"Manage deployments"**

### Cara B: Dari Menu Publish

1. Klik menu **"Publish"** (atau **"Terbitkan"**)
2. Klik **"Deploy as web app"** (atau **"Deploy as Web App"**)

## Langkah 4: Atur Pengaturan Deployment

Di dialog deployment, atur:

```
Type: Web App (jangan pilih Library)

Execute as: 
  → Pilih akun Google Anda (email Anda)
  
Who has access: 
  → Pilih: "Anyone (even anonymous)" atau "Anyone"
  
Jangan pilih: "Only myself" atau "Require user sign-in"
```

## Langkah 5: Deploy dan Copy URL

1. Klik **"Deploy"**
2. Google akan menampilkan konfirmasi dan **URL baru**
3. **Copy URL yang ditampilkan** (format: `https://script.google.com/macros/s/AKfycb.../exec`)

⚠️ **PENTING:** URL baru mungkin berbeda dari URL lama!

## Langkah 6: Update URL di index.html

Jika URL berubah, perbarui di `index.html`:

```javascript
// Cari baris ini (sekitar line 352):
const scriptURL = 'https://script.google.com/macros/s/AKfycb.../exec';

// Ganti dengan URL baru dari Step 5
const scriptURL = 'https://script.google.com/macros/s/[URL_BARU]/exec';
```

## Langkah 7: Test Deployment

Buka URL baru di browser:
```
https://script.google.com/macros/s/[URL_BARU]/exec?nama=TestUser
```

**Hasil yang diharapkan:**
```json
{
  "status": "success",
  "message": "Nama tamu berhasil tercatat",
  "nama": "TestUser"
}
```

Jika melihat halaman login Google, deployment belum benar. Ulangi langkah 4-5.

---

## Troubleshooting

### "Anda tidak memiliki akses" (You don't have access)
→ Pastikan "Who has access" = "Anyone (even anonymous)"

### Masih lihat halaman login Google
→ Deploy belum benar, ulangi langkah 3-5

### Error: "Sheet tidak ditemukan"
→ Pastikan sheet "RSVP", "Ucapan", "Tamu" sudah ada di Google Sheet
→ Jalankan `setupSheets()` function di Apps Script Editor

---

## Menjalankan setupSheets() untuk Setup Awal

Jika sheet belum ada, jalankan setup function:

1. Di Apps Script Editor, klik **"Run"** (atau **"Jalankan"**)
2. Pilih function **"setupSheets"**
3. Tunggu hingga selesai
4. Cek Google Sheet Anda - seharusnya muncul 3 sheet: RSVP, Ucapan, Tamu

---

## Ringkasan URL yang Digunakan

| Endpoint | Purpose |
|----------|---------|
| `/exec?nama=BudiSantoso` | Record guest visit |
| `/exec?action=getGreetings` | Get live greetings |
| `/exec?formType=rsvp&...` | Submit RSVP |
| `/exec?formType=greeting&...` | Submit greeting |

---

**Setelah redeploy, beri tahu URL baru sehingga saya bisa update di `index.html` dan jalankan test lagi.**
