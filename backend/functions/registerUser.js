// netlify/functions/registerUser.js
const { createUser } = require('./createUser'); // Adjust the path to your createUser.js

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const user = JSON.parse(event.body);
  console.log('User:', user);

  try {
    await createUser('1kvgpO5QP0NYuSp0bPN-mDniKvK6j3PUN6DirH64guUo', user); // Your spreadsheet ID
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully!' }),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error registering user' }),
    };
  }
};