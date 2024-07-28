const { getSheet, appendRow } = require('../sheets');

async function createUser(spreadsheetId, user) {
  try {
    const range = 'A1:F1000'; // Adjust the range to read existing data
    const data = await getSheet(spreadsheetId, range);
    
    // Check for duplicates based on email
    const duplicate = data && data.some(row => row[2] === user.email);
    if (duplicate) {
      console.log('User with this email already exists');
      return;
    }

    // Append the new user data if no duplicate is found
    const appendRange = 'A1:F1'; // Adjust the range if needed
    await appendRow(spreadsheetId, appendRange, [[user.firstName, user.lastName, user.email, user.password, user.year, user.major]]);
    console.log('User added to sheet');

    // Verify writing by reading the updated data
    const updatedData = await getSheet(spreadsheetId, range);
    console.log('Updated data read from sheet:', updatedData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = {
  createUser
};