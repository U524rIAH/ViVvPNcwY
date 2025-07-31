// 代码生成时间: 2025-07-31 10:47:42
const express = require('express');
const app = express();
const port = 3000;

// 数据分析器类
class DataAnalyzer {
  constructor() {
    this.data = [];
  }

  // 添加数据
  addData(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }
    this.data.push(...data);
  }

  // 统计数据的平均值
  calculateMean() {
    if (this.data.length === 0) {
      throw new Error('No data available to calculate mean');
    }
    const sum = this.data.reduce((acc, val) => acc + val, 0);
    return sum / this.data.length;
  }

  // 统计数据的标准差
  calculateStandardDeviation() {
    if (this.data.length === 0) {
      throw new Error('No data available to calculate standard deviation');
    }
    const mean = this.calculateMean();
    const variance = this.data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / this.data.length;
    return Math.sqrt(variance);
  }
}

// 路由处理
app.get('/analyze', (req, res) => {
  try {
    const data = req.query.data;
    if (!data) {
      throw new Error('No data provided');
    }
    const dataPoints = data.split(',').map(Number);
    const analyzer = new DataAnalyzer();
    analyzer.addData(dataPoints);
    const mean = analyzer.calculateMean();
    const standardDeviation = analyzer.calculateStandardDeviation();
    
    res.status(200).json({
      mean: mean,
      standardDeviation: standardDeviation
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Data analysis server listening at http://localhost:${port}`);
});