// Google Apps Script code for handling RSVP and Greetings submissions to Google Sheets
// Instructions:
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Paste this code into the script editor.
// 4. Create two sheets in the Google Sheet: "RSVP" and "Greetings".
// 5. For RSVP sheet, add headers: Timestamp, Nama, Status, Jumlah
// 6. For Greetings sheet, add headers: Timestamp, Nama, Ucapan
// 7. Deploy the script as a web app: Publish > Deploy as web app.
// 8. Set "Execute the app as: Me" and "Who has access to the app: Anyone".
// 9. Copy the web app URL and replace the scriptURL in index.html.

function doGet(e) {
  var params = e.parameter;
  var action = params.action;

  if (action === 'getGreetings') {
    return getGreetings();
  } else {
    // Handle form submissions via GET (since the HTML uses fetch with query params)
    return handleSubmission(params);
  }
}

function handleSubmission(params) {
  var formType = params.formType;

  if (formType === 'rsvp') {
    return submitRSVP(params);
  } else if (formType === 'greeting') {
    return submitGreeting(params);
  } else {
    return ContentService
      .createTextOutput(JSON.stringify({error: 'Invalid formType'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function submitRSVP(params) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({error: 'RSVP sheet not found'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var timestamp = new Date();
  var nama = params.nama;
  var status = params.status;
  var jumlah = params.jumlah;

  sheet.appendRow([timestamp, nama, status, jumlah]);

  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function submitGreeting(params) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Greetings');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({error: 'Greetings sheet not found'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var timestamp = new Date();
  var nama = params.nama;
  var ucapan = params.ucapan;

  sheet.appendRow([timestamp, nama, ucapan]);

  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getGreetings() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Greetings');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var greetings = [];

  // Skip header row
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    greetings.push({
      timestamp: row[0],
      nama: row[1],
      ucapan: row[2]
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify(greetings))
    .setMimeType(ContentService.MimeType.JSON);
}
