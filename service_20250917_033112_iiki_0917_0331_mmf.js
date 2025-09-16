// 代码生成时间: 2025-09-17 03:31:12
const fs = require('fs').promises;
const path = require('path');

// Helper function to recursively organize a directory
async function organizeFolderContents(folderPath) {
  // Read the contents of the folder
  const dirContents = await fs.readdir(folderPath, { withFileTypes: true });

  // Create a map to keep track of file types
  const fileMap = new Map();

  // Iterate over the directory contents and categorize files
  for (const dirent of dirContents) {
    if (dirent.isDirectory()) {
      // Recursively organize sub-directories
      await organizeFolderContents(path.join(folderPath, dirent.name));
    } else {
      // Get the file extension
      const fileExtension = path.extname(dirent.name).slice(1).toLowerCase();

      // Initialize the array if it doesn't exist
      if (!fileMap.has(fileExtension)) {
        fileMap.set(fileExtension, []);
      }

      // Add the file to the appropriate category
      fileMap.get(fileExtension).push(dirent.name);
    }
  }

  // Sort the files in each category
  for (const [fileType, files] of fileMap) {
    files.sort();

    // Move each file to a sub-folder based on its type
    const targetFolderPath = path.join(folderPath, fileType);
    await fs.mkdir(targetFolderPath, { recursive: true });
    for (const fileName of files) {
      const sourceFilePath = path.join(folderPath, fileName);
      const targetFilePath = path.join(targetFolderPath, fileName);
      await fs.rename(sourceFilePath, targetFilePath);
    }
  }
}

// Entry point to start organizing the folder structure
async function main(targetFolderPath) {
  try {
    // Check if the provided path is a directory
    const stats = await fs.stat(targetFolderPath);
    if (!stats.isDirectory()) {
      throw new Error('The provided path is not a directory.');
    }

    // Organize the folder contents
    await organizeFolderContents(targetFolderPath);
    console.log('Folder structure organized successfully.');
  } catch (error) {
    console.error('Failed to organize folder structure:', error.message);
  }
}

// Example usage
// Uncomment the line below to use the function with a specific folder path
// main('/path/to/your/folder').catch(console.error);
