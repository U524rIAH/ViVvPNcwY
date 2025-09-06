// 代码生成时间: 2025-09-06 21:45:17
const axios = require('axios');
const chalk = require('chalk');
const { performance } = require('perf_hooks');

// Configuration for the performance test
const config = {
  baseURL: 'http://localhost:3000', // URL of the Next.js application
  testPath: '/api/performance', // Path to the endpoint you want to test
  numberOfRequests: 100, // Total number of requests to send
  concurrency: 10, // Number of concurrent requests
};

// Function to perform a single performance test
async function performTest() {
  try {
    const start = performance.now();
    await axios.get(`${config.baseURL}${config.testPath}`);
    const end = performance.now();
    console.log(chalk.green(`Request completed in ${end - start} milliseconds`));
  } catch (error) {
    console.error(chalk.red(`Error during request: ${error.message}`));
  }
}

// Function to run the performance test
async function runPerformanceTest() {
  console.log(chalk.blue('Starting performance test...'));

  // Create an array to hold promises for each request
  const promises = [];

  // Loop to create and add promises to the array
  for (let i = 0; i < config.numberOfRequests; i++) {
    promises.push(performTest());
  }

  // Use Promise.all to wait for all requests to complete
  try {
    await Promise.all(promises);
    console.log(chalk.green('All requests completed successfully'));
  } catch (error) {
    console.error(chalk.red(`Error during performance test: ${error.message}`));
  }
}

// Run the performance test when the script is executed
runPerformanceTest();