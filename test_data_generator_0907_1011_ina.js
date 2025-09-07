// 代码生成时间: 2025-09-07 10:11:40
// Import required modules and dependencies
const fs = require('fs');
const path = require('path');

// Define a function to generate random data
function generateRandomData() {
  // This function can be expanded to generate different types of data
  return {
    id: Date.now(),
    name: 'Test User ' + Math.floor(Math.random() * 10000),
    email: 'test' + Math.floor(Math.random() * 10000) + '@example.com',
    age: Math.floor(Math.random() * 100)
  };
}

// Define a function to write generated data to a file
function writeTestDataToFile(data, filename) {
  try {
    // Create the data directory if it does not exist
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
    // Write the data to a JSON file
    const filepath = path.join(__dirname, 'data', filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Test data written to file: ' + filepath);
  } catch (error) {
    console.error('Error writing test data to file:', error.message);
  }
}

// Define the main function to generate and write test data
function generateAndWriteTestData() {
  try {
    const testData = generateRandomData();
    writeTestDataToFile(testData, 'test_data.json');
  } catch (error) {
    console.error('Error generating or writing test data:', error.message);
  }
}

// Export the main function for use in other modules
module.exports = generateAndWriteTestData;

// If this module is run directly, execute the main function
if (require.main === module) {
  generateAndWriteTestData();
}
