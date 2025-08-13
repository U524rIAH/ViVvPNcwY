// 代码生成时间: 2025-08-13 09:01:38
const fs = require('fs/promises');
const csv = require('csv-parser');
const { Transform } = require('stream');

// CSV文件批次处理函数
async function processCsvFiles(basePath, filenames, processRow) {
  for (const filename of filenames) {
    try {
      // 读取CSV文件
      const filePath = `${basePath}/${filename}`;
      const fileStream = fs.createReadStream(filePath);
      const parser = fileStream.pipe(csv());
      const resultStream = parser.pipe(new Transform({
        objectMode: true,
        transform(chunk, _, callback) {
          try {
            // 调用传入的函数处理每一行数据
            processRow(chunk);
            callback();
          } catch (error) {
            callback(error);
          }
        },
      }));
      await new Promise((resolve, reject) => {
        resultStream.on('end', resolve);
        resultStream.on('error', reject);
      });
    } catch (error) {
      // 处理文件读取或解析错误
      console.error("Error processing file: ", filename, error);
    }
  }
}

// 示例：处理CSV文件中的每行数据
function handleRow(row) {
  // 这里可以根据需要对行数据进行处理
  console.log('Processing row:', row);
}

// 使用函数
async function main() {
  // CSV文件所在的基本路径
  const basePath = './csv_files';
  // 要处理的CSV文件列表
  const filenames = ['data1.csv', 'data2.csv', 'data3.csv'];
  // 调用函数处理CSV文件
  await processCsvFiles(basePath, filenames, handleRow);
}

// 启动程序
main();
