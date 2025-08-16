// 代码生成时间: 2025-08-16 20:32:05
const { NextResponse } = require('next/server');

// 缓存策略枚举
const CACHE_STRATEGY = {
  "TIMES": 'times',
  "DURATION": 'duration'
};

// 默认缓存策略
const defaultCacheStrategy = {
  strategy: CACHE_STRATEGY.TIMES,
  value: 5
};

// 缓存中间件
async function cacheMiddleware(req) {
  const { strategy, value } = req.nextUrl.searchParams;

  // 检查缓存策略参数
  if (strategy && value) {
    const strategyValue = parseInt(value, 10);
    if (isNaN(strategyValue) || strategyValue < 0) {
      return new NextResponse('Invalid cache strategy value', { status: 400 });
    }
  } else {
    return new NextResponse('Cache strategy parameters are required', { status: 400 });
  }

  // 根据缓存策略进行处理
  switch (strategy) {
    case CACHE_STRATEGY.TIMES:
      return new NextResponse('Cached response for ' + value + ' times', { status: 200, headers: { 'Cache-Control': `max-age=0, s-maxage=${60 * 60 * strategyValue}` } });
    case CACHE_STRATEGY.DURATION:
      return new NextResponse('Cached response for ' + value + ' seconds', { status: 200, headers: { 'Cache-Control': `max-age=${value}, s-maxage=${value}` } });
    default:
      return new NextResponse('Invalid cache strategy', { status: 400 });
  }
}

// 导出中间件
export default cacheMiddleware;