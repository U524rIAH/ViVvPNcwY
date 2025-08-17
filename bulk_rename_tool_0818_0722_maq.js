// 代码生成时间: 2025-08-18 07:22:00
const fs = require('fs').promises;
const path = require('path');

// 批量文件重命名工具
class BulkRenameTool {
  // 构造函数，接收目录路径和重命名规则
  constructor(directoryPath, renameRule) {
    this.directoryPath = directoryPath;
    this.renameRule = renameRule;
  }

  // 执行批量文件重命名
  async renameFiles() {
    try {
      const files = await this.listFiles();
      for (const file of files) {
        await this.renameFile(file);
      }
    } catch (error) {
      console.error('批量重命名失败:', error.message);
    }
  }

  // 列出目录中所有文件
  async listFiles() {
    try {
      const files = await fs.readdir(this.directoryPath, { withFileTypes: true });
      return files.filter(file => file.isFile());
    } catch (error) {
      throw new Error(`读取目录失败: ${error.message}`);
    }
  }

  // 重命名单个文件
  async renameFile(file) {
    const oldPath = path.join(this.directoryPath, file.name);
    const newPath = path.join(this.directoryPath, this.renameRule(file.name));
    try {
      await fs.rename(oldPath, newPath);
      console.log(`文件 ${file.name} 已重命名为 ${newPath}`);
    } catch (error) {
      throw new Error(`重命名文件 ${file.name} 失败: ${error.message}`);
    }
  }
}

// 使用示例
(async () => {
  // 重命名规则：添加前缀'new_'
  const renameRule = filename => 'new_' + filename;
  const tool = new BulkRenameTool('./path/to/your/directory', renameRule);
  await tool.renameFiles();
})();
