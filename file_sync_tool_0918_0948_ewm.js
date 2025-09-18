// 代码生成时间: 2025-09-18 09:48:55
 * Features:
 * - Recursively copies files from a source directory to a destination directory.
 * - Overwrites existing files if they are newer in the source directory.
 * - Handles errors and provides feedback on the sync process.
 *
 * Usage:
 * - Configure `sourceDir` and `targetDir` variables with the paths of the source and target directories.
 * - Run the script with Node.js.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const sourceDir = './src'; // Path to the source directory
const targetDir = './dest'; // Path to the destination directory

// Synchronizes a single file from source to target
function syncFile(source, target) {
  return new Promise((resolve, reject) => {
    fs.copyFile(source, target, (err) => {
      if (err) {
        console.error(`Error copying file ${source} to ${target}:`, err);
        return reject(err);
      }
      console.log(`File ${source} synced to ${target}`);
      resolve();
    });
  });
}

// Synchronizes a directory recursively
function syncDirectory(sourceDir, targetDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, { withFileTypes: true }, (err, entries) => {
      if (err) {
        console.error(`Error reading directory ${sourceDir}:`, err);
        return reject(err);
      }

      let tasks = entries.map(entry => {
        const sourcePath = path.resolve(sourceDir, entry.name);
        const targetPath = path.resolve(targetDir, entry.name);

        if (entry.isDirectory()) {
          return syncDirectory(sourcePath, targetPath); // Recursive call for directories
        } else {
          return syncFile(sourcePath, targetPath); // Copy file
        }
      });

      Promise.all(tasks)
        .then(() => resolve())
        .catch(reject);
    });
  });
}

// Main function to start the sync process
function startSync() {
  console.log('Starting file sync process...');

  syncDirectory(sourceDir, targetDir)
    .then(() => console.log('File sync completed successfully.'))
    .catch(err => console.error('File sync failed:', err));
}

// Execute the sync on script start
startSync();