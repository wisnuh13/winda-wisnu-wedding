# PANDUAN LENGKAP: INTEGRASI GOOGLE SHEETS UNTUK RSVP & UCAPAN

## 📋 Ringkasan Fitur

Website invitation Anda sekarang akan:
- ✅ **Menerima RSVP** dan menyimpannya ke Google Sheet "RSVP"
- ✅ **Menerima Ucapan/Doa** dan menyimpannya ke Google Sheet "Ucapan"
- ✅ **Menampilkan Live Chat** ucapan terbaru secara real-time (polling setiap 10 detik)
- ✅ **Otomatis refresh** ucapan baru tanpa perlu reload halaman

---

## 🚀 Quick Start

### 1. Siapkan Google Sheet
```
A. Buat spreadsheet baru di https://sheets.google.com
B. Salin Spreadsheet ID dari URL (bagian setelah /d/)
C. Buat 2 sheet: "RSVP" dan "Ucapan" dengan header masing-masing
```

### 2. Deploy Google Apps Script
```
A. Di spreadsheet, buka Extensions > Apps Script
B. Copy paste isi Code.gs ke editor
C. Ganti SPREADSHEET_ID dengan ID Anda
D. Deploy as Web App
E. Copy URL yang dihasilkan
```

### 3. Update index.html
```
A. Cari baris: const scriptURL = 'http://localhost:8000';
B. Ganti dengan URL Apps Script Anda
C. Save dan upload ke server
```

---

## 📖 DETAIL LANGKAH-LANGKAH

### STEP 1: Membuat Google Sheet

#### 1.1 Buat Sheet Baru
- Buka https://sheets.google.com
- Klik **"+ Blank spreadsheet"** (kosongkan)
- Beri nama: **"Winda & Wisnu Wedding"**
- Tunggu hingga selesai dibuat

#### 1.2 Dapatkan Spreadsheet ID
- Lihat URL di address bar
- Format: `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit`
- Salin bagian **XXXXXXXXXXXX** (tanpa /edit)
- Contoh ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

#### 1.3 Setup Tab/Sheet
Spreadsheet Anda harus memiliki 2 sheet dengan nama dan header:

**Sheet 1: RSVP**
```
Kolom A  | Kolom B | Kolom C | Kolom D
---------|---------|---------|----------
Waktu    | Nama    | Status  | Jumlah Orang
```

**Sheet 2: Ucapan**
```
Kolom A  | Kolom B | Kolom C
---------|---------|----------
Waktu    | Nama    | Ucapan
```

---

### STEP 2: Deploy Google Apps Script

#### 2.1 Buka Apps Script Editor
- Di Google Sheet, klik menu **Extensions** (atau Tools)
- Pilih **Apps Script**
- Tunggu hingga editor terbuka

#### 2.2 Copy Code.gs
- Buka file `Code.gs` dari folder proyek
- Copy seluruh isinya
- Paste di Google Apps Script editor
- Hapus code template default jika ada

#### 2.3 Update Spreadsheet ID
Cari baris ini di code:
```javascript
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
```

Ganti `YOUR_SPREADSHEET_ID_HERE` dengan ID yang Anda salin:
```javascript
const SPREADSHEET_ID = "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p";
```

#### 2.4 Save Project
- Klik **Ctrl+S** atau menu File > Save
- Beri nama project: "Wedding RSVP & Ucapan"

#### 2.5 Deploy as Web App
- Klik **Deploy** (tombol biru di kanan atas)
- Pilih **New Deployment**
- Di dropdown **Select type**, pilih **Web app**
- Isi form deployment:
  - Execute as: **pilih email Anda**
  - Who has access: **"Anyone"** ← PENTING!
- Klik **Deploy**
- Akan muncul popup dengan URL Web App

#### 2.6 Copy Deploy URL
URL akan terlihat seperti:
```
https://script.google.com/macros/s/AKfycbx1234567890/usercontent
```
**SALIN dan SIMPAN URL ini** - Anda akan butuh di step berikutnya.

---

### STEP 3: Update index.html

#### 3.1 Edit index.html
- Buka file `index.html` dengan text editor
- Cari baris (sekitar line 330):
```javascript
const scriptURL = 'http://localhost:8000';
```

#### 3.2 Ganti dengan URL Anda
Ganti dengan URL dari step 2.6:
```javascript
const scriptURL = 'https://script.google.com/macros/s/AKfycbx1234567890/usercontent';
```

#### 3.3 Save File
- Save file
- Upload ke server web hosting Anda
- Atau jalankan locally dengan `python -m http.server`

---

## ✅ TESTING

Setelah semua setup selesai:

### Test RSVP
1. Buka website di browser
2. Scroll ke slide "Konfirmasi Kehadiran (RSVP)"
3. Isi form dengan data dummy:
   - Nama: "Budi Santoso"
   - Kehadiran: "Akan Hadir"
   - Jumlah: "2"
4. Klik "Kirim Konfirmasi"
5. Tunggu 2-3 detik, seharusnya muncul pesan sukses (hijau)
6. Buka Google Sheet tab "RSVP"
7. Cek apakah data muncul di baris baru

### Test Ucapan
1. Scroll ke slide "Kirim Ucapan & Doa"
2. Isi form dengan:
   - Nama: "Siti Nurhaliza"
   - Ucapan: "Semoga bahagia selamanya!"
3. Klik "Kirim Ucapan"
4. Tunggu 2-3 detik, seharusnya muncul pesan sukses (hijau)
5. Cek Google Sheet tab "Ucapan" - data harus muncul
6. Tunggu maksimal 10 detik, ucapan seharusnya muncul di "Live Chat Ucapan & Doa"

### Test Live Chat
1. Form ucapan akan terus polling setiap 10 detik
2. Jika ada ucapan baru di Sheet, akan otomatis muncul di Live Chat
3. Refresh halaman, ucapan tetap ada

---

## 🔧 TROUBLESHOOTING

### ❌ MASALAH: "Gagal mengirim pesan!"

**Solusi:**
1. Buka Console Browser (F12 > Console tab)
2. Cari error message
3. Cek apakah scriptURL di index.html sudah benar
4. Cek di Google Apps Script > Executions untuk melihat error detail

### ❌ MASALAH: "Sheet not found" atau Data tidak masuk

**Solusi:**
1. Pastikan sheet diberi nama persis:
   - Tab 1: **"RSVP"** (case-sensitive)
   - Tab 2: **"Ucapan"** (case-sensitive)
2. Pastikan header ada di baris pertama:
   - RSVP: Waktu | Nama | Status | Jumlah Orang
   - Ucapan: Waktu | Nama | Ucapan
3. Jalankan fungsi `setupSheets()` di Apps Script untuk auto-create sheets

### ❌ MASALAH: Live Chat tidak update

**Solusi:**
1. Cek apakah ada data di sheet "Ucapan"
2. Buka Console (F12 > Console)
3. Refresh halaman, tunggu 10 detik
4. Cek apakah ada error di console

### ❌ MASALAH: "Error: Cannot find spreadsheet"

**Solusi:**
1. Pastikan SPREADSHEET_ID di Code.gs benar
2. Pastikan ID tidak ada spasi atau karakter tambahan
3. Deploy ulang Apps Script setelah memperbaiki ID

---

## 📊 STRUKTUR DATA DI GOOGLE SHEET

### RSVP Sheet
| Waktu | Nama | Status | Jumlah Orang |
|-------|------|--------|--------------|
| 12/10/2025 10:30:45 | Budi Santoso | Hadir | 2 |
| 12/10/2025 10:35:12 | Siti Nurhaliza | Tidak | 1 |
| 12/10/2025 10:40:28 | Ahmad Wijaya | Hadir | 3 |

### Ucapan Sheet
| Waktu | Nama | Ucapan |
|-------|------|--------|
| 12/10/2025 10:31:00 | Siti Nurhaliza | Semoga bahagia selamanya! |
| 12/10/2025 10:32:15 | Ahmad Wijaya | Doa terbaik untuk Winda & Wisnu |
| 12/10/2025 10:33:45 | Budi Santoso | Selamat menjalani hidup baru! |

---

## 📝 CATATAN PENTING

1. **Spreadsheet ID**: Jangan sampai ketinggalan, simpan di tempat aman
2. **Deploy URL**: Sama pentingnya dengan Spreadsheet ID
3. **Sheet Names**: Case-sensitive! "RSVP" ≠ "rsvp"
4. **Live Chat**: Polling setiap 10 detik (dapat diubah di index.html line 600)
5. **Max Display**: Hanya menampilkan 50 ucapan terbaru (dapat diubah di Code.gs)

---

## 🔒 KEAMANAN

- ✅ Sheet hanya bisa diakses oleh Anda
- ✅ Apps Script berjalan dengan akun Anda
- ✅ Website tidak bisa mengubah data langsung, hanya append
- ✅ Semua request melalui HTTPS (aman)

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada masalah:
1. Buka Google Apps Script editor
2. Klik menu **Executions** (di sebelah kiri)
3. Lihat error log dari eksekusi terakhir
4. Screenshot error dan cari solusi di Google

---

**Selamat! Setup selesai. Nikmati fitur RSVP dan Ucapan otomatis! 🎉**
