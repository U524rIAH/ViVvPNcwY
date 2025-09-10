// 代码生成时间: 2025-09-10 10:47:56
 * @summary RESTful API endpoints.
 * @author Your Name
 * @version 1.0.0
 */

// Importing required dependencies
const { NextResponse } = require('next/server');

// Mock data for demonstration purposes
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  // ... more users
];

// Helper function to find a user by ID
const findUserById = (id) => users.find((user) => user.id === id);

// API endpoint to get all users
export function GET_users() {
  return NextResponse.json(users);
}

// API endpoint to get a single user by ID
export function GET_user(id) {
  const user = findUserById(id);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  return NextResponse.json(user);
}

// API endpoint to create a new user
export function POST_users(request) {
  const data = request.json();
  if (!data.name) {
    return new Response('Name is required', { status: 400 });
  }
  const newUser = { id: users.length + 1, name: data.name };
  users.push(newUser);
  return NextResponse.json(newUser);
}

// API endpoint to update a user
export function PATCH_user(id, request) {
  const data = request.json();
  const user = findUserById(id);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  if (data.name) user.name = data.name;
  return NextResponse.json(user);
}

// API endpoint to delete a user
export function DELETE_user(id) {
  const user = findUserById(id);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  users = users.filter((user) => user.id !== id);
  return new Response('User deleted', { status: 200 });
}
