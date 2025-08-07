// 代码生成时间: 2025-08-07 14:48:33
 * and follows JS best practices for maintainability and scalability.
 */

// Next.js server-side code
const { NextResponse } = require('next/server');

// Define different sorting algorithms
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

// Fetching and sorting data
export function GET(req) {
  // Error handling for invalid requests
  if (!req.nextUrl.searchParams.has('data')) {
    return new NextResponse('Missing data parameter', { status: 400 });
  }

  // Extracting data from the request
  const data = req.nextUrl.searchParams.get('data').split(',').map(Number);

  try {
    // Sorting the data using bubble sort
    const sortedData = bubbleSort([...data]);

    // Returning the sorted data in JSON format
    return new NextResponse(JSON.stringify(sortedData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    // Catching and handling any errors that occur during sorting
    return new NextResponse(`Error while sorting: ${error.message}`, { status: 500 });
  }
}

// Client-side code for Next.js
// This would be in a separate file, e.g., `pages/index.js`
function ClientComponent() {
  return (
    <div>
      <h1>Sorting App</h1>
      // Form to submit data
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter numbers separated by commas" name="data" required />
        <button type="submit">Sort</button>
      </form>
    </div>
  );
}

// Function to handle form submission and send request
async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target).get('data');
  const response = await fetch('/api/sort', {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
    next: {
      data: data,
    },
  });

  if (response.ok) {
    const sortedData = await response.json();
    console.log('Sorted Data:', sortedData);
    // Display sorted data on the client side
  } else {
    console.error('Failed to sort data:', response.statusText);
  }
}

export default ClientComponent;