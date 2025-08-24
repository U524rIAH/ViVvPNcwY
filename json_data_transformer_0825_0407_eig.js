// 代码生成时间: 2025-08-25 04:07:44
const { NextResponse } = require('next/server');

// Define a function to transform JSON data
async function transformJsonData(req) {
  // Parse the incoming request body as JSON
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    // If the body is not valid JSON, return a 400 Bad Request response
    return new NextResponse('Invalid JSON format', { status: 400 });
  }

  // Define the transformation logic here
  // For demonstration, let's assume we want to convert all keys to lowercase
  const transformedData = Object.keys(body).reduce((acc, key) => {
    // Check if the value is an object and recursively transform it
    if (typeof body[key] === 'object' && body[key] !== null) {
      acc[key.toLowerCase()] = transformJsonDataObject(body[key]);
    } else {
      acc[key.toLowerCase()] = body[key];
    }
    return acc;
  }, {});

  // Return a 200 OK response with the transformed JSON data
  return new NextResponse(JSON.stringify(transformedData), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

// Helper function to transform nested objects
function transformJsonDataObject(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
}

// Define the API route
export function GET(request) {
  // Check if the request method is GET
  if (request.method !== 'GET') {
    return new NextResponse('Method not allowed', { status: 405 });
  }
  // Call the transformJsonData function with the request
  return transformJsonData(request);
}