const { createUser } = require('./createUser'); // Adjust the path to your createUser.js

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let user;
  try {
    user = JSON.parse(event.body);
    console.log('User:', user);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON input' }),
    };
  }

  try {
    const result = await createUser('1kvgpO5QP0NYuSp0bPN-mDniKvK6j3PUN6DirH64guUo', user); // Your spreadsheet ID
    if (result.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: result.message }),
      };
    } else {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: result.message }),
      };
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error registering user' }),
    };
  }
};