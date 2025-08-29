// 代码生成时间: 2025-08-30 07:53:06
const { NextResponse } = require('next/server');

// Bubble Sort Algorithm
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Quick Sort Algorithm
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Sorting API route handler
export function GET(request) {
  try {
    const { sortType, numbers } = JSON.parse(request.nextUrl.searchParams.get('query'));
    const arr = numbers ? JSON.parse(numbers) : [];
    
    if (!Array.isArray(arr)) {
      return new NextResponse('Invalid input: numbers should be an array', { status: 400 });
    }
    
    switch (sortType) {
      case 'bubble':
        return new NextResponse(JSON.stringify(bubbleSort(arr)), { status: 200 });
      case 'quick':
        return new NextResponse(JSON.stringify(quickSort(arr)), { status: 200 });
      default:
        return new NextResponse('Invalid sort type', { status: 400 });
    }
  } catch (error) {
    return new NextResponse('Error processing request: ' + error.message, { status: 500 });
  }
}

// Export the handler to be used in Next.js API routes
export const config = {
  runtime: 'edge',
};