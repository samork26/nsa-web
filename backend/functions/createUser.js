const { appendRow } = require('../sheets.js');

const spreadsheetId = '1kvgpO5QP0NYuSp0bPN-mDniKvK6j3PUN6DirH64guUo'; // Replace with your actual spreadsheet ID
const range = 'A2:D2'; // Adjust the range to match where you want to append the user data

exports.handler = async (event, context) => {
  try {
    const user = JSON.parse(event.body);
    const { firstName, lastName, email, password } = user;
    const values = [[firstName, lastName, email, password]];

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
      body: JSON.stringify({ error: 'Failed to create user' }),
    };
  }
};