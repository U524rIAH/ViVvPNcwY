// 代码生成时间: 2025-08-16 06:18:53
 * Features:
 * - Generates a random number within a specified range.
 * - Includes error handling for invalid range inputs.
 * - Follows best practices for JavaScript and Next.js.
 */

const { NextResponse } = require('next/server');

async function generateRandomNumber(min, max) {
  // Ensure the min and max values are valid
  if (typeof min !== 'number' || typeof max !== 'number') {
    return new NextResponse('Invalid input: min and max must be numbers', { status: 400 });
  }

  if (min > max) {
    return new NextResponse('Invalid range: min cannot be greater than max', { status: 400 });
  }

  // Generate a random number between min and max
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return new NextResponse(`Generated random number: ${randomNumber}`, { status: 200 });
}

// Handler for the Next.js server
export function POST(request) {
  const { min, max } = request.nextUrl.searchParams;
  return generateRandomNumber(parseInt(min, 10), parseInt(max, 10));
}
