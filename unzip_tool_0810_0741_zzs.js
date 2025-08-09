// 代码生成时间: 2025-08-10 07:41:19
const { createUnzip } = require('unzipper');
const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');

// 创建一个Express应用
const app = express();

// 使用express-fileupload中间件来处理文件上传
app.use(fileUpload());

// 定义一个路由来上传文件
app.post('/upload', async (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  const zipFile = req.files.zipFile;
  if (!zipFile) return res.status(400).send('No zip file was uploaded.');

  // 确保文件名唯一，防止覆盖
  const uniqueFileName = `.${path.sep}${Date.now()}-${zipFile.name}`;
  // 将上传的ZIP文件保存到服务器上
  const fileLocation = path.join(__dirname, 'uploads', uniqueFileName);
  zipFile.mv(fileLocation, (err) => {
    if (err) return res.status(500).send(err);

    // 使用unzipper解压文件
    fs.createReadStream(fileLocation)
      .pipe(createUnzip({ path: path.join(__dirname, 'uploads/extracted') }))
      .on('close', () => {
        // 删除原始的ZIP文件
        fs.unlink(fileLocation, (err) => {
          if (err) console.error('Error deleting zip file', err);
          res.send('File has been successfully uploaded and extracted.');
        });
      })
      .on('error', (err) => {
        // 删除原始的ZIP文件
        fs.unlink(fileLocation, (err) => {
          if (err) console.error('Error deleting zip file', err);
        });
        return res.status(500).send(err);
      });
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
 * 代码说明：
 * 这个程序实现了一个基于Node.js和Express框架的简单文件解压工具。
 * 用户可以通过POST请求到/upload路由上传ZIP文件。
 * 上传的文件会被保存到'uploads'目录，并使用unzipper库解压到'uploads/extracted'目录。
 * 解压完成后，原始的ZIP文件会被删除。
 *
 * 错误处理：
 * 程序包含了基本的错误处理，包括文件上传错误、文件保存错误和文件解压错误。
 * 在发生错误时，程序会返回相应的HTTP状态码和错误信息。
 *
 * 注意：
 * 这个程序只处理单个文件上传，如果需要处理多个文件或目录上传，需要进行相应的扩展。
 * 此外，程序没有实现文件类型检查和大小限制，这些功能可以根据需要添加。
 *
 * 依赖库：
 * express-fileupload: 用于处理文件上传
 * unzipper: 用于解压ZIP文件
 */