// 代码生成时间: 2025-08-11 02:47:39
const fs = require('fs').promises;
const path = require('path');
const { copyFileSync } = require('fs');
const { execSync } = require('child_process');

// 文件备份和同步工具
class FileBackupSyncTool {
  // 构造函数，接收源目录和目标目录
  constructor({ sourceDir, destDir }) {
    this.sourceDir = sourceDir;
    this.destDir = destDir;
  }

  // 同步文件
  async syncFiles() {
    try {
      // 确保目标目录存在
      await this.ensureDestDirExists();

      // 获取源目录中的所有文件
      const files = await this.listFiles(this.sourceDir);

      // 遍历文件并同步
      for (const file of files) {
        const srcPath = path.join(this.sourceDir, file);
        const destPath = path.join(this.destDir, file);
        await this.copyFile(srcPath, destPath);
      }

      console.log('文件同步完成');
    } catch (error) {
      console.error('文件同步失败:', error.message);
    }
  }

  // 确保目标目录存在
  async ensureDestDirExists() {
    try {
      await fs.access(this.destDir);
    } catch {
      await fs.mkdir(this.destDir, { recursive: true });
      console.log(`目标目录不存在，已创建：${this.destDir}`);
    }
  }

  // 列出目录中的所有文件
  async listFiles(dir) {
    const files = await fs.readdir(dir);
    return files;
  }

  // 复制文件
  async copyFile(srcPath, destPath) {
    try {
      await fs.copyFile(srcPath, destPath);
      console.log(`文件已同步：${srcPath} -> ${destPath}`);
    } catch (error) {
      console.error(`文件同步失败：${srcPath} -> ${destPath}`, error.message);
    }
  }
}

// 使用示例
(async () => {
  const sourceDir = './source';
  const destDir = './backup';
  const tool = new FileBackupSyncTool({ sourceDir, destDir });
  await tool.syncFiles();
})();