// 代码生成时间: 2025-08-09 20:15:52
// Import necessary modules
const { NextResponse } = require('next/server');

// A simple in-memory store for cart items
const cartItems = [];

// A function to add an item to the cart
function addItemToCart(productId, quantity) {
  // Check if the item already exists in the cart
  const itemIndex = cartItems.findIndex(item => item.productId === productId);

  // If the item exists, update the quantity
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += quantity;
  } else {
    // Otherwise, add the new item to the cart
    cartItems.push({ productId, quantity });
  }
}

// A function to get all items in the cart
function getCartItems() {
  // Return a copy of the cart items to prevent direct mutations
  return [...cartItems];
}

// A function to remove an item from the cart
function removeItemFromCart(productId) {
  const itemIndex = cartItems.findIndex(item => item.productId === productId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
  }
}

// A Next.js API route to handle cart operations
async function handler(req) {
  try {
    switch (req.method) {
      case 'POST':
        // Handle adding an item to the cart
        const { productId, quantity } = await req.json();
        addItemToCart(productId, quantity);
        return NextResponse.json({ message: 'Item added to cart' });
      case 'GET':
        // Handle getting all items in the cart
        return NextResponse.json(getCartItems());
      case 'DELETE':
        // Handle removing an item from the cart
        const { productId } = await req.json();
        removeItemFromCart(productId);
        return NextResponse.json({ message: 'Item removed from cart' });
      default:
        return NextResponse.json({ message: 'Invalid request method' }, 405);
    }
  } catch (error) {
    // Handle any errors that may occur
    return NextResponse.json({ message: 'An error occurred', error: error.message }, 500);
  }
}

// Export the handler function
export { handler };
