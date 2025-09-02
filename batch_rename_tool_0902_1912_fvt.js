// 代码生成时间: 2025-09-02 19:12:13
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

/*
 * Batch file rename tool using Next.js framework
 *
 * @author Your Name
 * @version 1.0.0
 */

// Function to rename a single file
async function renameFile(filePath, newFileName) {
  try {
    const newFilePath = path.join(path.dirname(filePath), newFileName);
    await fs.rename(filePath, newFilePath);
    console.log(`File renamed: ${filePath} to ${newFilePath}`);
  } catch (error) {
    console.error(`Error renaming file ${filePath}: ${error.message}`);
  }
}

// Function to rename multiple files based on a naming pattern
async function batchRenameFiles(directoryPath, namingPattern) {
  try {
    const files = await fs.readdir(directoryPath);
    files.forEach((file, index) => {
      const originalFilePath = path.join(directoryPath, file);
      const newFileName = `${namingPattern}-${index + 1}${path.extname(file)}`;
      renameFile(originalFilePath, newFileName);
    });
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
  }
}

// Example usage
// This should be replaced with actual directory and naming pattern based on your needs
const directoryPath = 'path/to/your/directory';
const namingPattern = 'newFileName';
batchRenameFiles(directoryPath, namingPattern);