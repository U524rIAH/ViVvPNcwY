// 代码生成时间: 2025-09-16 07:36:47
// log_parser.js

const fs = require('fs'); // 引入文件系统模块
const path = require('path'); // 引入路径模块
const LogParser = require('./LogParser'); // 引入LogParser模块
const NextLog = require('./NextLog'); // 引入NextLog模块

// 函数：解析日志文件
async function parseLogFile(logFilePath) {
  // 检查文件是否存在
  if (!fs.existsSync(logFilePath)) {
    throw new Error('Log file not found.');
  }

  // 读取日志文件内容
  const logData = fs.readFileSync(logFilePath, 'utf8');

  // 创建LogParser实例
  const logParser = new LogParser();

  // 解析日志文件内容
  try {
    const parsedLogs = logParser.parse(logData);

    // 创建NextLog实例
    const nextLog = new NextLog(parsedLogs);

    // 输出解析后的日志
    console.log(nextLog.format());
  } catch (error) {
    console.error('Error parsing log file:', error.message);
  }
}

// 主函数
async function main() {
  // 日志文件路径
  const logFilePath = path.join(__dirname, 'logs', 'app.log');

  // 调用解析日志文件函数
  await parseLogFile(logFilePath);
}

// 调用主函数
main();