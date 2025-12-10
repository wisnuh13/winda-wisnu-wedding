# Setup Google Sheets & Apps Script untuk RSVP dan Ucapan

## Langkah 1: Buat Google Sheet Baru

1. Buka https://sheets.google.com
2. Klik "Blank spreadsheet" untuk membuat sheet baru
3. Beri nama "Winda & Wisnu Wedding"
4. Salin **Spreadsheet ID** dari URL:
   - URL contoh: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l/edit`
   - ID yang diambil: `1a2b3c4d5e6f7g8h9i0j1k2l` (bagian setelah `/d/`)

## Langkah 2: Setup Sheet Tabs

### Sheet 1: RSVP
1. Rename tab pertama menjadi "RSVP"
2. Tambahkan header di baris pertama:
   - A1: `Waktu`
   - B1: `Nama`
   - C1: `Status`
   - D1: `Jumlah Orang`

### Sheet 2: Ucapan
1. Buat tab baru (klik tombol + di bawah)
2. Rename menjadi "Ucapan"
3. Tambahkan header di baris pertama:
   - A1: `Waktu`
   - B1: `Nama`
   - C1: `Ucapan`

## Langkah 3: Setup Google Apps Script

1. Di Google Sheet, klik **Extensions** > **Apps Script**
2. Hapus code yang ada (template default)
3. Copy-paste seluruh isi dari file `Code.gs` ke editor
4. **Ganti baris ini** dengan Spreadsheet ID Anda:
   ```javascript
   const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
   ```
   Ganti dengan ID yang Anda salin tadi, contoh:
   ```javascript
   const SPREADSHEET_ID = "1a2b3c4d5e6f7g8h9i0j1k2l";
   ```

5. Jalankan fungsi setup (opsional, untuk membuat sheet otomatis):
   - Klik dropdown di atas tombol Run
   - Pilih `setupSheets`
   - Klik tombol Run (▶)
   - Approve permissions jika diminta

## Langkah 4: Deploy Web App

1. Klik **Deploy** > **New deployment**
2. Pilih **Type**: "Web app"
3. Isi konfigurasi:
   - **Execute as**: Your email (atau akun yang akan manage data)
   - **Who has access**: "Anyone"
4. Klik **Deploy**
5. Akan muncul popup dengan URL Web App - **SALIN URL INI** (penting!)
6. Contoh URL: `https://script.google.com/macros/s/AKfycbx...xyz/usercontent`

## Langkah 5: Update HTML dengan URL

1. Buka file `index.html`
2. Cari baris ini (sekitar baris 330):
   ```javascript
   const scriptURL = 'http://localhost:8000';
   ```
3. Ganti dengan URL yang Anda dapatkan:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/AKfycbx...xyz/usercontent';
   ```

## Langkah 6: Test

1. Buka website invitation di browser
2. Isi form RSVP dan ucapan
3. Submit form
4. Cek Google Sheet apakah data masuk
5. Refresh halaman, cek apakah ucapan muncul di Live Chat

## Troubleshooting

### Data tidak masuk ke Sheet
- Pastikan Spreadsheet ID benar di Code.gs
- Cek nama sheet: harus "RSVP" dan "Ucapan" (case-sensitive)
- Buka Google Apps Script > Executions untuk melihat error log

### "Error: Sheet not found"
- Sheet belum dibuat dengan nama yang tepat
- Jalankan fungsi `setupSheets()` untuk membuat otomatis

### Form tidak bisa submit
- Pastikan URL Web App di index.html sudah benar
- Cek console browser (F12 > Console) untuk error message

### Live Chat tidak muncul
- Coba refresh halaman (polling setiap 10 detik)
- Pastikan ada data di sheet "Ucapan"
- Cek format kolom (harus persis: Waktu, Nama, Ucapan)

## Format Kolom Sheet

### RSVP Sheet
| Waktu | Nama | Status | Jumlah Orang |
|-------|------|--------|--------------|
| 12/10/2025 10:30:45 | Budi Santoso | Hadir | 2 |

### Ucapan Sheet
| Waktu | Nama | Ucapan |
|-------|------|--------|
| 12/10/2025 10:31:00 | Siti Nurhaliza | Semoga bahagia selalu! | 

## Notes

- Data RSVP otomatis tersimpan ke sheet "RSVP"
- Data Ucapan otomatis tersimpan ke sheet "Ucapan"
- Live Chat mengambil max 50 ucapan terbaru dari sheet "Ucapan"
- Polling live chat setiap 10 detik

## Support

Jika ada pertanyaan atau error, cek Google Apps Script > Executions tab untuk melihat detailed error messages.
