// 代码生成时间: 2025-09-19 22:14:42
// imageResizerApp.js\
import { createNext, FileRef } from 'e2e-utils';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp'; // 使用sharp库进行图片处理

// 图片尺寸批量调整器类
class ImageResizer {
  // 构造函数，接收图片文件夹路径
  constructor(srcFolderPath) {
    this.srcFolderPath = srcFolderPath;
  }

  // 获取文件夹内所有图片文件
  async getImagePaths() {
    const files = await fs.promises.readdir(this.srcFolderPath, { withFileTypes: true });
    return files
      .filter(file => file.isFile() && ['.jpg', '.jpeg', '.png'].includes(file.name.slice(-4).toLowerCase()))
      .map(file => join(this.srcFolderPath, file.name));
  }

  // 调整图片尺寸
  async resizeImages(targetSize) {
    const imagePaths = await this.getImagePaths();
    const resized = [];
    for (const imagePath of imagePaths) {
      try {
        // 使用sharp库读取图片、调整尺寸并输出到新文件
        const resizedPath = imagePath.replace(/src/(.*)\.(jpg|jpeg|png)/, 'resized/$1-resized.$2');
        if (!existsSync(resizedPath)) {
          const output = await sharp(imagePath).resize(targetSize).toFile(resizedPath);
          resized.push(output);
        }
      } catch (error) {
        console.error(`Error resizing image ${imagePath}: ${error.message}`);
      }
    }
    return resized;
  }
}

// 使用示例
const srcFolderPath = './images';
const targetSize = 800; // 目标尺寸

async function main() {
  try {
    const imageResizer = new ImageResizer(srcFolderPath);
    const resizedImages = await imageResizer.resizeImages(targetSize);
    console.log('Resized images:', resizedImages.length);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();