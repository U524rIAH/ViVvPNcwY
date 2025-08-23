// 代码生成时间: 2025-08-24 04:46:28
const { NextResponse } = require('next/server');

// 验证URL有效性的函数
async function validateUrl(url) {
  try {
    // 使用fetch API来检查URL是否有效
    const response = await fetch(url, { method: 'HEAD' });
    // 检查HTTP状态码是否在200-299范围内
    if (!response.ok) {
      throw new Error(`URL无效或无法访问，状态码：${response.status}`);
    }
    return { valid: true, message: 'URL有效' };
  } catch (error) {
    return { valid: false, message: error.message };
  }
}

// Next.js API路由处理器
export function POST(request) {
  const { url } = request.nextUrl.searchParams;
  if (!url) {
    return new NextResponse('缺少URL参数', { status: 400 });
  }
  // 调用验证函数并将结果返回给客户端
  const result = validateUrl(url);
  return new NextResponse(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

// 注意：
// 1. 这个函数可以直接在Next.js项目中作为一个API路由使用。
// 2. 确保你的Next.js项目安装了必要的依赖，比如node-fetch。
// 3. 这个函数假设请求会发送一个包含URL参数的POST请求。
// 4. 错误处理包括捕获fetch错误和检查HTTP响应状态。
// 5. 这个函数的返回值是一个JSON对象，包含URL是否有效的状态和消息。
