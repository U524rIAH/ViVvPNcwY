// 代码生成时间: 2025-09-02 11:12:49
const express = require('express');
const app = express();
const port = 3000;

// 数据分析器类
class DataAnalyzer {
  // 构造函数
  constructor() {
    this.data = [];
  }

  // 添加数据
  addData(point) {
    this.data.push(point);
  }

  // 获取平均值
  getMean() {
    if (this.data.length === 0) throw new Error('No data available');
    const sum = this.data.reduce((a, b) => a + b, 0);
    return sum / this.data.length;
  }

  // 获取中位数
  getMedian() {
    if (this.data.length === 0) throw new Error('No data available');
    const sortedData = [...this.data].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 !== 0 ? sortedData[middleIndex] : 
      (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
  }

  // 获取最大值
  getMax() {
    if (this.data.length === 0) throw new Error('No data available');
    return Math.max(...this.data);
  }

  // 获取最小值
  getMin() {
    if (this.data.length === 0) throw new Error('No data available');
    return Math.min(...this.data);
  }
}

// 创建数据分析器实例
const analyzer = new DataAnalyzer();

// API端点：添加数据点
app.post('/add-data', (req, res) => {
  try {
    const { point } = req.body;
    analyzer.addData(point);
    return res.status(200).send('Data point added successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API端点：计算平均值
app.get('/mean', (req, res) => {
  try {
    const mean = analyzer.getMean();
    return res.status(200).send({ mean });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API端点：计算中位数
app.get('/median', (req, res) => {
  try {
    const median = analyzer.getMedian();
    return res.status(200).send({ median });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API端点：获取最大值
app.get('/max', (req, res) => {
  try {
    const max = analyzer.getMax();
    return res.status(200).send({ max });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API端点：获取最小值
app.get('/min', (req, res) => {
  try {
    const min = analyzer.getMin();
    return res.status(200).send({ min });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Data Analysis Service running on port ${port}`);
});