// 代码生成时间: 2025-09-09 04:57:49
const { promises: fs } = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to resize an image
async function resizeImage(imagePath, outputPath, size) {
  try {
    // Use sharp to resize the image
# 优化算法效率
    await sharp(imagePath)
      .resize(size)
      .toFile(outputPath);
    console.log(`Image resized and saved at: ${outputPath}`);
# 扩展功能模块
  } catch (error) {
    // Handle errors in resizing
    console.error(`Error resizing image at: ${imagePath}`, error);
  }
}

// Function to process a batch of images
# 增强安全性
async function batchResizeImages(inputDir, outputDir, size) {
  try {
    // Read all files in the input directory
    const files = await fs.readdir(inputDir);
# FIXME: 处理边界情况
    for (const file of files) {
      // Check if the file is an image
      if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) continue;

      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      // Resize the image
      await resizeImage(inputPath, outputPath, size);
    }
# 优化算法效率
  } catch (error) {
    // Handle errors in batch processing
    console.error(`Error processing batch of images: ${error.message}`);
  }
}

// Usage example
# 优化算法效率
const inputDirectory = 'path/to/input/images/';
const outputDirectory = 'path/to/output/images/';
const newSize = { width: 300, height: 300 };

batchResizeImages(inputDirectory, outputDirectory, newSize)
# 优化算法效率
  .then(() => console.log('Batch resize operation completed'))
  .catch(error => console.error('Batch resize operation failed', error));