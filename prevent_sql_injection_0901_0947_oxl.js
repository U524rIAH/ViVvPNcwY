// 代码生成时间: 2025-09-01 09:47:15
const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
  user: 'yourUsername',
  host: 'yourHost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

// 函数：防止SQL注入的安全查询
async function safeQuery(text, params) {
  try {
    // 使用参数化查询防止SQL注入
    const res = await pool.query(text, params);
    return res.rows;
  } catch (err) {
    // 错误处理
    console.error('Database query error:', err);
    throw err;
  }
}

// 示例：安全获取用户信息
async function getUserById(userId) {
  // 使用参数占位符防止SQL注入
  const queryText = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await safeQuery(queryText, [userId]);
  return rows;
}

// 示例：添加用户信息
async function addUser(userData) {
  // 验证用户数据
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required');
  }
  // 使用参数占位符防止SQL注入
  const queryText = 'INSERT INTO users (name, email) VALUES ($1, $2)';
  await safeQuery(queryText, [userData.name, userData.email]);
}

// 示例：更新用户信息
async function updateUser(userId, userData) {
  // 验证用户数据
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required');
  }
  // 使用参数占位符防止SQL注入
  const queryText = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
  await safeQuery(queryText, [userData.name, userData.email, userId]);
}

// 示例：删除用户
async function deleteUser(userId) {
  // 使用参数占位符防止SQL注入
  const queryText = 'DELETE FROM users WHERE id = $1';
  await safeQuery(queryText, [userId]);
}

// 导出函数
module.exports = {
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};