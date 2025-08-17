// 代码生成时间: 2025-08-18 00:51:31
const { escape } = require('html-escaper');

// Middleware to sanitize incoming request bodies
export async function middleware(req) {
  // Check if the request method is POST, PUT, or PATCH to sanitize input
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    try {
      // Sanitize user input by escaping HTML special characters
      req.body = JSON.parse(escape(JSON.stringify(req.body)));
    } catch (error) {
      // Handle errors in case of invalid JSON or other issues
      console.error('Error sanitizing input:', error);
      throw new Error('Invalid input detected');
    }
  }
}

// Example of using the middleware in a Next.js page
// export async function getServerSideProps(context) {
//   await middleware(context.req);
//   // Fetch data and pass to the page via props
//   return {
//     props: {},
//   };
// }

// You can also use this middleware in API routes
// app.post('/api/some-endpoint', async (req, res) => {
//   await middleware(req);
//   // Process the sanitized input
// });
