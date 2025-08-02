// 代码生成时间: 2025-08-03 02:22:05
// fileExtractor.js
// 使用JS和NEXT框架实现的文件解压工具

const { createWriteStream, createReadStream } = require('fs');
const path = require('path');
const archiver = require('archiver');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件用于解析请求体中的JSON数据
app.use(express.json());

// 解压文件的函数
async function extractFile(filePath, outputDirectory) {
  return new Promise((resolve, reject) => {
    // 创建一个可写流到输出目录
    const output = createWriteStream(path.join(outputDirectory, path.basename(filePath, '.zip')));
    // 创建一个读取流从文件路径
    const input = createReadStream(filePath);
    // 创建一个解压缩器
    const extract = archiver('zip', { zlib: { level: 9 } });
    // 监听错误事件
    extract.on('error', (err) => reject(err));
    // 监听完成事件
    extract.on('finish', () => {
      input.close();
      resolve(output);
    });
    // 管道连接读取流、解压缩器和写入流
    input.pipe(extract).pipe(output);
  });
}

// API端点用于处理文件解压请求
app.post('/extract', async (req, res) => {
  try {
    // 从请求体中获取文件路径和输出目录
    const { filePath, outputDirectory } = req.body;
    // 检查所需的参数是否齐全
    if (!filePath || !outputDirectory) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    // 调用解压文件的函数
    const outputFile = await extractFile(filePath, outputDirectory);
    // 返回成功结果
    res.status(200).json({ message: 'File extracted successfully', outputPath: outputFile.path });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to extract file', details: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`File Extractor Server is running on http://localhost:${PORT}`);
});
