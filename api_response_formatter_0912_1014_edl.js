// 代码生成时间: 2025-09-12 10:14:57
const { NextResponse } = require('next/server');

// This function formats the API response
// It accepts data and an optional status code, and returns a formatted response
function formatResponse(data, statusCode = 200) {
  // Validate the data to ensure it's not null or undefined
  if (!data) {
    return new NextResponse('Invalid data', { status: 400 });
  }

  // Create a new response with the given data and status code
  return new NextResponse(JSON.stringify({
    status: 'success',
    data
  }), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// This function handles errors and formats the API response
// It accepts an error and an optional status code, and returns a formatted error response
function formatErrorResponse(error, statusCode = 500) {
  // Log the error for debugging purposes
  console.error(error);

  // Create a new response with the error message and status code
  return new NextResponse(JSON.stringify({
    status: 'error',
    message: error.message
  }), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Export the functions for usage in Next.js API routes
module.exports = { formatResponse, formatErrorResponse };