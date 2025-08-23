// 代码生成时间: 2025-08-24 01:02:08
const { Pool } = require('pg'); // 使用pg库连接PostgreSQL数据库

// 配置数据库连接参数
const pool = new Pool({
    user: 'your_database_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

// 防止SQL注入的函数
async function safeQuery(query, values) {
    // 验证输入，确保query是字符串，values是数组
    if (typeof query !== 'string' || !Array.isArray(values)) {
        throw new Error('Invalid input types for query and values');
    }

    try {
        // 使用参数化查询来防止SQL注入
        const res = await pool.query(query, values);
        return res.rows;
    } catch (error) {
        // 错误处理
        console.error('Database query failed:', error);
        throw error;
    }
}

// 示例：安全地查询数据库中的用户
async function getUserById(userId) {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const result = await safeQuery(queryText, [userId]);
    return result;
}

// 导出函数
module.exports = {
    safeQuery,
    getUserById,
};

// 使用示例
// const user = await getUserById(1);
// console.log(user);
