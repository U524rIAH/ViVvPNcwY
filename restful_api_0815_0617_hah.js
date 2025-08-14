// 代码生成时间: 2025-08-15 06:17:59
// restful_api.js
// 使用Next.js框架创建RESTful API接口

const { NextResponse } = require('next/server');

// 创建一个API接口供前端调用，返回固定的响应数据
export async function GET(request) {
  // 检查请求方法是否为GET
  if (request.method !== 'GET') {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  // 模拟从数据库获取数据
  const data = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
  };

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// 错误处理示例
// 如果你需要捕获错误，可以在这里进行处理，然后返回适当的响应
// try {
//   // 尝试执行一些可能会出错的操作
// } catch (error) {
//   // 如果有错误发生，返回错误响应
//   return new NextResponse(JSON.stringify({ error: error.message }), {
//     status: 500,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// }
