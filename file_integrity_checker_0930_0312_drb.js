// 代码生成时间: 2025-09-30 03:12:18
const fs = require('fs').promises;
const crypto = require('crypto');

/**
 * 校验文件的完整性
 * @param {string} filePath - 要校验的文件路径
 * @returns {Promise<string>} - 校验结果，包含文件的SHA-256哈希值
 */
async function checkFileIntegrity(filePath) {
  // 检查文件是否存在
  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    return `Error: File not found - ${filePath}`;
  }

  // 读取文件内容
  try {
    const fileContent = await fs.readFile(filePath);

    // 生成SHA-256哈希值
    const hash = crypto.createHash('sha256');
    hash.update(fileContent);
    const integrityValue = hash.digest('hex');

    return `File integrity check passed. SHA-256 hash: ${integrityValue}`;
  } catch (error) {
    return `Error: Failed to read file - ${error.message}`;
  }
}

// 使用示例
const filePath = 'path/to/your/file.txt';
checkFileIntegrity(filePath)
  .then(result => console.log(result))
  .catch(error => console.error(error));