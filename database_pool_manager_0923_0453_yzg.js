// 代码生成时间: 2025-09-23 04:53:04
// database_pool_manager.js
// 这个模块负责管理数据库连接池，提供了连接池的创建、获取连接、释放连接和关闭连接池的功能。

const { Pool } = require('pg'); // PostgreSQL client for Node.js

// 配置数据库连接池参数
const config = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
  max: 20, // 最大连接数
  idleTimeoutMillis: 30000, // 连接在一定时间内无操作则会被自动释放
  connectionTimeoutMillis: 2000 // 连接超时时间
};

// 创建数据库连接池
const pool = new Pool(config);

// 获取一个数据库连接对象
async function getPoolConnection() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error acquiring a pool connection', error.stack);
    throw error; // 向外抛出错误，让调用者处理
  }
}

// 释放数据库连接
function releasePoolConnection(client) {
  client.release();
}

// 关闭数据库连接池
function closePoolConnectionPool() {
  pool.end().then(() => {
    console.log('Pool ended successfully');
  }).catch((error) => {
    console.error('Error ending pool', error.stack);
  });
}

// 导出模块
module.exports = {
  getPoolConnection,
  releasePoolConnection,
  closePoolConnectionPool
};