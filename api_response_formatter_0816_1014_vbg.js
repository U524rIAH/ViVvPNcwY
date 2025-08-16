// 代码生成时间: 2025-08-16 10:14:23
const { NextResponse } = require('next/server');

/**
 * API Response Formatter
 * This function takes in the response data and status code,
 * and returns a properly formatted response for API calls.
 * @param {Object} data - The data to be sent in the response.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - Optional message for the response.
 * @returns {NextResponse} A Next.js response object with formatted data.
 */
async function apiResponseFormatter(data, statusCode, message = 'Success') {
  // Check if statusCode is a valid HTTP status code (200-599)
  if (!Number.isInteger(statusCode) || statusCode < 200 || statusCode > 599) {
    throw new Error('Invalid status code provided.');
  }

  // Create the response body
  const responseBody = {
    status: message,
    data,
  };

  // Return the Next.js response object with the formatted body and status code
  return new NextResponse(JSON.stringify(responseBody), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Example usage:
// This would typically be called within an API route handler in a Next.js app.
// For demonstration purposes, the following line is commented out.
// await apiResponseFormatter({ users: [] }, 200);

module.exports = apiResponseFormatter;