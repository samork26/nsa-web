const {google} = require('googleapis');
const {auth} = require('./auth');
const {getSheet, appendRow} = require('./sheets');

const testSpreadsheetId = '18ebkd5LGkuy0gaw1IH1Tpey3PZvyT0w04ky-eVEg674'; // Your actual spreadsheet ID
const testRange = 'A1:F1'; // Adjust the range to fit your test needs

async function testGoogleSheets() {
  try {
    // Test reading from the sheet
    const data = await getSheet(testSpreadsheetId, testRange);
    console.log('Data read from sheet:', data);

    // Test writing to the sheet
    const testData = [['Test', 'Data']];
    await appendRow(testSpreadsheetId, testRange, testData);
    console.log('Data appended to sheet');

    // Verify writing by reading again
    const updatedData = await getSheet(testSpreadsheetId, testRange);
    console.log('Updated data read from sheet:', updatedData);
  } catch (error) {
    console.error('Error testing Google Sheets API:', error);
  }
}

testGoogleSheets();