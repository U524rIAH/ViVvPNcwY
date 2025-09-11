// 代码生成时间: 2025-09-12 06:09:33
const { NextResponse } = require('next/server');

// 缓存策略中间件
async function cacheStrategy() {
# 优化算法效率
  // 检查请求的路径
  const { pathname } = new URL(request.url);

  // 定义缓存路径
  const cacheablePaths = [
    "/",
    "/about",
    "/contact"
  ];

  // 检查路径是否在缓存列表中
  if (cacheablePaths.includes(pathname)) {
    // 返回缓存响应
# 改进用户体验
    return new NextResponse("<html><body>This content is cached.</body></html>", {
# 改进用户体验
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600' // 1小时缓存
# 优化算法效率
      }
    });
  } else {
    // 如果不在缓存列表中，返回NextResponse并设置不缓存
    return new NextResponse("<html><body>This content is not cached.</body></html>", {
      status: 200,
      headers: {
        'Cache-Control': 'no-store' // 不缓存
      }
    });
  }
}

// 导出中间件
export default cacheStrategy;