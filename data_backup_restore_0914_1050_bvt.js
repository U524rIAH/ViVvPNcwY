// 代码生成时间: 2025-09-14 10:50:45
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// 配置备份和恢复的路径
const backupDir = './backups';
const restoreDir = './data';

// 创建备份文件夹
async function createBackup() {
  // 获取当前日期作为备份文件名
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '') + 'T' + new Date().toISOString().split('T')[1].split('.')[0];
  const backupFileName = `backup_${currentDate}.tar.gz`;
  const backupPath = path.join(backupDir, backupFileName);

  try {
    // 检查备份目录是否存在，如果不存在则创建
    await fs.ensureDir(backupDir);
    // 使用tar命令打包备份文件
    const command = `tar -czf ${backupPath} -C ${restoreDir} .`;
    const { stdout, stderr } = await exec(command);
    if (stderr) throw new Error(`Error creating backup: ${stderr}`);
    console.log(`Backup created successfully: ${stdout}`);
  } catch (error) {
    console.error('Error creating backup:', error);
    throw error;
  }
}

// 恢复数据
async function restoreData(backupFileName) {
  const backupPath = path.join(backupDir, backupFileName);
  try {
    // 检查备份文件是否存在
    await fs.pathExists(backupPath);
    // 使用tar命令解压备份文件
    const command = `tar -xzf ${backupPath} -C ${restoreDir}`;
    const { stdout, stderr } = await exec(command);
    if (stderr) throw new Error(`Error restoring data: ${stderr}`);
    console.log(`Data restored successfully: ${stdout}`);
  } catch (error) {
    console.error('Error restoring data:', error);
    throw error;
  }
}

// 导出函数
module.exports = {
  createBackup,
  restoreData
};