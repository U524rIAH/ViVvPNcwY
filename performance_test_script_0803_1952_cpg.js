// 代码生成时间: 2025-08-03 19:52:27
// Import necessary modules
const { NextApiRequest, NextApiResponse } = require('next')
const axios = require('axios')
const chalk = require('chalk')
const { performance } = require('perf_hooks')

// Define the performance test route
const performanceTestRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Define the target URL for the performance test
  const targetUrl = req.body.url

  // Check if the URL is provided
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL' })
  }

  try {
    // Start performance measurement
    const start = performance.now()

    // Perform the GET request to the target URL
    const response = await axios.get(targetUrl)

    // Measure the elapsed time
    const elapsed = performance.now() - start

    // Log the performance result
    console.log(chalk.green(`Performance Test: ${targetUrl}`))
    console.log(chalk.green(`Status Code: ${response.status}`))
    console.log(chalk.green(`Elapsed Time: ${elapsed} ms`))

    // Return the performance test result
    res.status(200).json({
      url: targetUrl,
      statusCode: response.status,
      elapsedTime: elapsed
    })
  } catch (error) {
    // Handle any errors that occur during the performance test
    console.error(chalk.red(`Error: ${error.message}`))
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Export the performance test route handler
module.exports = { performanceTestRoute }
