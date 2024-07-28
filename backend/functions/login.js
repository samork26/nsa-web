const { loginUser } = require('./loginUser'); // Adjust the path to your loginUser.js

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let credentials;
  try {
    credentials = JSON.parse(event.body);
    console.log('Credentials:', credentials);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON input' }),
    };
  }

  try {
    const result = await loginUser('1kvgpO5QP0NYuSp0bPN-mDniKvK6j3PUN6DirH64guUo', credentials.username, credentials.password); // Your spreadsheet ID
    if (result.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful!', firstName: result.firstName }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username or password' }),
      };
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error logging in user' }),
    };
  }
};