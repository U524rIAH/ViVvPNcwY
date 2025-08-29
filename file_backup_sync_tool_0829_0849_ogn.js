// 代码生成时间: 2025-08-29 08:49:13
// 引入必要的模块
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// 配置文件路径和备份路径
const sourcePath = '/path/to/source';
const backupPath = '/path/to/backup';

// 文件备份和同步工具类
class FileBackupSyncTool {
  // 构造函数，初始化源路径和备份路径
  constructor(source, backup) {
    this.source = source;
    this.backup = backup;
  }

  // 同步文件方法
  async syncFiles() {
    try {
      // 检查源路径和备份路径是否存在
      if (!(await this.checkPaths())) {
        throw new Error('Source or backup path does not exist');
      }

      // 获取源路径中的所有文件
      const files = await this.getFiles(this.source);

      // 遍历所有文件并进行同步
      for (const file of files) {
        const filePath = path.join(this.source, file);
        const backupFilePath = path.join(this.backup, file);
        if (!(await this.checkFileExists(backupFilePath))) {
          // 如果备份路径中不存在文件，则复制文件
          await this.copyFile(filePath, backupFilePath);
        } else {
          // 如果备份路径中存在文件，则检查文件是否需要更新
          const sourceFileStats = await fs.stat(filePath);
          const backupFileStats = await fs.stat(backupFilePath);
          if (sourceFileStats.mtime > backupFileStats.mtime) {
            // 如果源文件更新时间大于备份文件，则更新备份文件
            await this.copyFile(filePath, backupFilePath);
          }
        }
      }

      console.log('Files have been synced successfully.');
    } catch (error) {
      // 错误处理
      console.error('Error syncing files:', error.message);
    }
  }

  // 检查路径是否存在方法
  async checkPaths() {
    try {
      await Promise.all([fs.access(this.source), fs.access(this.backup)]);
      return true;
    } catch (error) {
      return false;
    }
  }

  // 获取指定路径下所有文件的方法
  async getFiles(dir) {
    const files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // 如果是目录，则递归获取目录下的文件
        files.push(...(await this.getFiles(fullPath)));
      } else {
        files.push(entry.name);
      }
    }
    return files;
  }

  // 检查文件是否存在的方法
  async checkFileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  // 复制文件的方法
  async copyFile(sourcePath, destPath) {
    await fs.copyFile(sourcePath, destPath);
    console.log(`File ${sourcePath} has been copied to ${destPath}`);
  }
}

// 创建文件备份和同步工具实例
const fileBackupSyncTool = new FileBackupSyncTool(sourcePath, backupPath);

// 调用同步文件方法
fileBackupSyncTool.syncFiles();