// 代码生成时间: 2025-09-23 22:00:10
const express = require('express');
const next = require('next');

// Initialize Next.js app
const app = next({ dev: process.env.NODE_ENV !== 'production' });

// Initialize server and required middleware
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Define API endpoint for sending notifications
  server.post('/api/send-notification', async (req, res) => {
    try {
      // Validate request body
      if (!req.body || !req.body.message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Simulate sending notification logic
      console.log('Sending notification:', req.body.message);

      // Respond with success status
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  });

  // Handle all other requests by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Listen on the desired port
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// Export the server for testing purposes
module.exports = server;