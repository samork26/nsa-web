const { getSheet } = require('../sheets');

async function loginUser(spreadsheetId, username, password) {
  try {
    const range = 'A1:F1000'; // Adjust the range to read existing data
    const data = await getSheet(spreadsheetId, range);

    // Find the user based on the username and password
    const user = data.find(row => row[2] === username && row[3] === password);
    if (user) {
      console.log('User logged in successfully');
      return {
        success: true,
        firstName: user[0],
        lastName: user[1],
      };
    } else {
      console.log('Invalid username or password');
      return { success: false };
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}

module.exports = {
  loginUser
};