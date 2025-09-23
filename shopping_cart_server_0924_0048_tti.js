// 代码生成时间: 2025-09-24 00:48:43
const { NextResponse } = require('next/server');

// In-memory shopping cart storage (for demonstration purposes)
const cartStorage = new Map();

// Helper function to generate a unique cart ID
function generateCartId() {
  return Math.random().toString(36).substr(2, 9);
}

// API endpoint to add items to the cart
async function addCartItem(req) {
  try {
    const cartId = req.nextUrl.searchParams.get('cartId') || generateCartId();
    const productId = req.nextUrl.searchParams.get('productId');
    const quantity = parseInt(req.nextUrl.searchParams.get('quantity') || '1', 10);

    if (!productId || isNaN(quantity) || quantity <= 0) {
      return new NextResponse('Product ID and quantity are required', { status: 400 });
    }

    let cart = cartStorage.get(cartId);
    if (!cart) {
      cart = { items: [] };
      cartStorage.set(cartId, cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return new NextResponse(JSON.stringify({ cartId, cart }), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to add item to cart', { status: 500 });
  }
}

// API endpoint to retrieve the cart details
async function getCart(req) {
  try {
    const cartId = req.nextUrl.searchParams.get('cartId');
    if (!cartId) {
      return new NextResponse('Cart ID is required', { status: 400 });
    }

    const cart = cartStorage.get(cartId);
    if (!cart) {
      return new NextResponse('Cart not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to retrieve cart', { status: 500 });
  }
}

// Export the API routes
export function middleware(request) {
  if (request.nextUrl.pathname === '/api/add-to-cart') {
    return addCartItem(request);
  } else if (request.nextUrl.pathname === '/api/get-cart') {
    return getCart(request);
  }
}
