// 代码生成时间: 2025-08-26 21:57:32
// folder_structure_optimizer.js

// 引入fs和path模块用于文件系统操作
const fs = require('fs');
const path = require('path');

// 定义一个函数来整理文件夹结构
function optimizeFolderStructure(sourceDir, targetDir) {
  // 检查源文件夹是否存在
  if (!fs.existsSync(sourceDir)) {
    console.error('源文件夹不存在:', sourceDir);
    return;
  }

  // 检查目标文件夹是否存在，不存在则创建
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 读取源文件夹中的所有文件和文件夹
  fs.readdirSync(sourceDir).forEach(item => {
    // 获取完整的文件或文件夹路径
    const itemPath = path.join(sourceDir, item);
    const stats = fs.statSync(itemPath);

    // 如果是文件，则移动到目标文件夹
    if (stats.isFile()) {
      const targetItemPath = path.join(targetDir, item);
      fs.renameSync(itemPath, targetItemPath);
      console.log('文件移动成功:', itemPath, '->', targetItemPath);
    }

    // 如果是文件夹，则递归调用函数处理子文件夹
    if (stats.isDirectory()) {
      optimizeFolderStructure(itemPath, targetDir);
    }
  });
}

// 错误处理函数
function handleError(error) {
  console.error('发生错误:', error);
}

// 使用示例
try {
  // 指定源文件夹和目标文件夹路径
  const sourceDir = './source';
  const targetDir = './target';
  
  // 调用函数整理文件夹结构
  optimizeFolderStructure(sourceDir, targetDir);
} catch (error) {
  handleError(error);
}