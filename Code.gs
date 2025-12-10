// ============================================================================
// GOOGLE APPS SCRIPT UNTUK WEDDING INVITATION - WINDA & WISNU
// ============================================================================
// INSTRUKSI:
// 1. Buka Google Sheet di https://sheets.google.com
// 2. Buat 2 sheet: "RSVP" dan "Ucapan"
// 3. Tambahkan header di masing-masing sheet
// 4. Buka Apps Script: Extensions > Apps Script
// 5. Copy paste code ini ke editor
// 6. Deploy as Web App (Execute as: "Me", Allow access: "Anyone")
// 7. Copy URL yang dihasilkan dan paste di index.html bagian scriptURL
// ============================================================================

// KONFIGURASI - GANTI DENGAN SPREADSHEET ID ANDA
const SPREADSHEET_ID = "1-O3eIRZJDVJ5Vv4Y2dfUIMJ6llzCOyXiVBCXu8SCN5o"; // Ganti dengan ID spreadsheet Anda
const DEPLOYMENT_ID = "AKfycbzQYPTV30ah6pur4xyErdegET7GKVcTzhWLW2_O2MmP0Y08BEOnELqbrWL2sq0kFgxnQw"; // Deployment ID Apps Script
const RSVP_SHEET_NAME = "RSVP";
const GREETING_SHEET_NAME = "Ucapan";

// ============================================================================
// FUNGSI UTAMA - doGet untuk handle GET request
// ============================================================================
function doGet(e) {
  try {
    const action = e.parameter.action;
    const formType = e.parameter.formType;

    // Handle GET request untuk fetch ucapan
    if (action === 'getGreetings') {
      return getGreetings();
    }

    // Handle POST data (RSVP dan Ucapan)
    if (formType === 'rsvp') {
      return saveRSVP(e.parameter);
    } else if (formType === 'greeting') {
      return saveGreeting(e.parameter);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid request' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// FUNGSI SIMPAN RSVP
// ============================================================================
function saveRSVP(params) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(RSVP_SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + RSVP_SHEET_NAME + '" tidak ditemukan');
    }

    // Ambil data dari form
    const nama = params.nama || '';
    const status = params.status || '';
    const jumlah = params.jumlah || '';
    const timestamp = new Date();

    // Tambahkan row baru
    sheet.appendRow([
      timestamp,
      nama,
      status,
      jumlah
    ]);

    Logger.log('RSVP saved: ' + nama);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'RSVP berhasil disimpan' 
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in saveRSVP: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// FUNGSI SIMPAN UCAPAN
// ============================================================================
function saveGreeting(params) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(GREETING_SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + GREETING_SHEET_NAME + '" tidak ditemukan');
    }

    // Ambil data dari form
    const nama = params.nama || '';
    const ucapan = params.ucapan || '';
    const timestamp = new Date();

    // Tambahkan row baru
    sheet.appendRow([
      timestamp,
      nama,
      ucapan
    ]);

    Logger.log('Greeting saved: ' + nama);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Ucapan berhasil disimpan' 
    }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in saveGreeting: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// FUNGSI AMBIL UCAPAN (untuk Live Chat)
// ============================================================================
function getGreetings() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(GREETING_SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + GREETING_SHEET_NAME + '" tidak ditemukan');
    }

    // Ambil semua data
    const data = sheet.getDataRange().getValues();
    const greetings = [];

    // Loop dari row 2 (skip header)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][1] && data[i][2]) {
        greetings.push({
          timestamp: new Date(data[i][0]).getTime(),
          nama: data[i][1],
          ucapan: data[i][2]
        });
      }
    }

    // Sort by timestamp descending (terbaru di atas)
    greetings.sort((a, b) => b.timestamp - a.timestamp);

    // Return max 50 ucapan terbaru
    return ContentService.createTextOutput(JSON.stringify(greetings.slice(0, 50)))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in getGreetings: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// FUNGSI HELPER - Setup awal (jalankan 1x saja)
// ============================================================================
function setupSheets() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Setup RSVP Sheet
    let rsvpSheet = ss.getSheetByName(RSVP_SHEET_NAME);
    if (!rsvpSheet) {
      rsvpSheet = ss.insertSheet(RSVP_SHEET_NAME);
      rsvpSheet.appendRow(['Waktu', 'Nama', 'Status', 'Jumlah Orang']);
    }

    // Setup Greeting Sheet
    let greetingSheet = ss.getSheetByName(GREETING_SHEET_NAME);
    if (!greetingSheet) {
      greetingSheet = ss.insertSheet(GREETING_SHEET_NAME);
      greetingSheet.appendRow(['Waktu', 'Nama', 'Ucapan']);
    }

    Logger.log('Setup selesai!');
  } catch (error) {
    Logger.log('Error in setupSheets: ' + error.toString());
  }
}
