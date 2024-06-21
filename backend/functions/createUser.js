const { appendRow } = require('../sheets.js');

const spreadsheetId = '1kvgpO5QP0NYuSp0bPN-mDniKvK6j3PUN6DirH64guUo'; // Replace with your actual spreadsheet ID
const range = 'A2:D2'; // Adjust the range to match where you want to append the user data

exports.handler = async (event, context) => {
  try {
    console.log('Received event:', event);

    const user = JSON.parse(event.body);
    console.log('Parsed user:', user);

    const { firstName, lastName, email, password } = user;
    if (!firstName || !lastName || !email || !password) {
      throw new Error('Missing required user fields');
    }

    const values = [[firstName, lastName, email, password]];
    console.log('Values to append:', values);

    await appendRow(spreadsheetId, range, values);
    console.log('User added successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (error) {
    console.error('Error adding user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Failed to create user' }),
    };
  }
};