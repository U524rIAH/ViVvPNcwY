// 代码生成时间: 2025-07-31 01:40:28
const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');

/**
 * 解压文件到指定目录
 * @param {string} sourcePath - 源文件路径
 * @param {string} targetPath - 目标解压目录
 * @returns {Promise<void>} - 解压结果
 */
async function unzipFile(sourcePath, targetPath) {
  // 校验路径是否存在
  if (!await fs.pathExists(sourcePath)) {
    throw new Error(`源文件路径不存在: ${sourcePath}`);
  }
  if (!await fs.pathExists(targetPath)) {
    // 如果目标路径不存在，则创建
    await fs.ensureDir(targetPath);
  }

  // 创建AdmZip实例
  const zip = new AdmZip(sourcePath);
  try {
    // 解压文件
    zip.extractAllTo(targetPath, /* overwrite */true);
  } catch (error) {
    // 错误处理
    throw new Error(`解压文件时发生错误: ${error.message}`);
  }
}

/**
 * 处理上传文件并解压
 * @param {string} fileBuffer - 文件缓冲区
 * @param {string} targetDir - 目标目录
 * @returns {Promise<void>} - 处理结果
 */
async function handleUploadAndUnzip(fileBuffer, targetDir) {
  const tempFilePath = path.join('./uploads', 'temp.zip');
  try {
    // 将文件缓冲区写入临时文件
    await fs.writeFile(tempFilePath, fileBuffer);
    // 调用解压函数
    await unzipFile(tempFilePath, targetDir);
    // 删除临时文件
    await fs.remove(tempFilePath);
  } catch (error) {
    console.error('处理上传文件并解压时发生错误:', error);
    throw error;
  }
}

module.exports = {
  unzipFile,
  handleUploadAndUnzip
};
