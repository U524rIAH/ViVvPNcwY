// 代码生成时间: 2025-08-08 22:45:59
 * @description A simple hash calculator that can be easily integrated into larger applications.
 */

const crypto = require('crypto'); // Import the crypto module for hashing capabilities

// A utility function to calculate hash
const calculateHash = (algorithm, data) => {
  // Validate the input algorithm and data
  if (!algorithm || !data) {
    throw new Error('Invalid algorithm or data for hash calculation.');
  }
  
  // Return a promise that resolves with the hash
  return new Promise((resolve, reject) => {
    crypto
      .createHash(algorithm)
      .update(data, 'utf8')
      .digest('hex')
      .then(hash => resolve(hash))
      .catch(err => reject(err));
  });
};

// A Next.js API route to handle hash calculation requests
module.exports = async (req, res) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the algorithm and data from the request body
  const { algorithm, data } = req.body;

  // Check if the required parameters are present
  if (!algorithm || !data) {
    return res.status(400).json({ error: 'Algorithm and data are required' });
  }

  try {
    // Calculate the hash and send the response
    const hash = await calculateHash(algorithm, data);
    res.status(200).json({
      hash,
      message: 'Hash calculation successful',
    });
  } catch (error) {
    // Handle any errors that occur during hash calculation
    res.status(500).json({ error: error.message });
  }
};