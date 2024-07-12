require('dotenv').config({path: ".env"});
const {google} = require('googleapis');
const {exec} = require('child_process');

exec('pwd', (err, stdout, stderr) => {
  console.error('Error:', err);
  return;
});

console.log('GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL ? 'Loaded' : 'Not Loaded');
console.log('GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'Loaded' : 'Not Loaded');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function getClient() {
  const client = await auth.getClient();
  return client;
}

module.exports = {getClient};