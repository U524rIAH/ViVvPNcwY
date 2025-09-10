// 代码生成时间: 2025-09-11 00:11:20
const { NextApiRequest, NextApiResponse } = require('next');

// 模拟数据库中的用户数据
const users = {
  'john.doe@example.com': {
    email: 'john.doe@example.com',
    password: 'securepassword123',
  },
};

// 加密工具（这里只是示例，实际生产中需要使用更安全的加密方法）
const encryptPassword = (password) => password;

// 验证用户登录的函数
const verifyLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  // 从请求中获取用户输入的邮箱和密码
  const { email, password } = req.body;

  // 检查邮箱是否存在于数据库中
  if (!users[email]) {
    return res.status(404).json({ error: 'User not found' });
  }

  // 检查密码是否匹配
  const encryptedPassword = encryptPassword(password);
  if (encryptedPassword !== users[email].password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 如果验证成功，返回成功消息
  return res.status(200).json({ message: 'Login successful', user: email });
};

// 导出函数以便在Next.js中使用
module.exports = { verifyLogin };

// 注意：在实际的生产环境中，您需要使用更安全的密码存储和验证机制，
// 比如使用bcrypt来哈希密码，并使用JWT或类似机制来处理会话。