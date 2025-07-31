// 代码生成时间: 2025-07-31 17:13:02
const { NextResponse } = require('next/server');

/**
 * API响应格式化工具
# TODO: 优化性能
 * @param {Object} params - 包含请求数据和配置的数据对象
# 扩展功能模块
 * @param {Object} params.data - 要返回的数据对象
# 增强安全性
 * @param {number} [params.statusCode] - HTTP状态码，默认200
 * @param {string} [params.statusText] - HTTP状态文本，默认'OK'
 * @returns {NextResponse} 格式化后的响应对象
 */
function formatApiResponse({ data, statusCode = 200, statusText = 'OK' }) {
  // 检查数据是否为对象
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object');
  }

  // 创建响应对象
  const response = NextResponse.json(data, { status: statusCode, statusText });

  // 返回响应对象
  return response;
}

// Example usage:
// export function action({ request }) {
//   try {
//     const data = { message: 'Hello, World!' };
//     return formatApiResponse({ data });
//   } catch (error) {
//     return NextResponse.error(error, { status: 500 });
//   }
// }