const { google } = require('googleapis');
const { getClient } = require('./auth');
const sheets = google.sheets('v4');

async function getSheet(spreadsheetId, range) {
  const client = await getClient();
  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });
  return res.data.values;
}

async function appendRow(spreadsheetId, range, values) {
  const client = await getClient();
  const resource = { values };
  await sheets.spreadsheets.values.append({
    auth: client,
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });
}

module.exports = {
  getSheet,
  appendRow,
};