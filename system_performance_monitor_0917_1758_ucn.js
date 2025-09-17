// 代码生成时间: 2025-09-17 17:58:00
const os = require('os');
const { NextResponse } = require('next');

// 获取系统负载信息
async function getSystemLoad() {
  try {
    return os.loadavg();
  } catch (error) {
    console.error('Error fetching system load:', error);
    throw new Error('Failed to fetch system load');
  }
}

// 获取CPU信息
async function getCPUInfo() {
  try {
    const cpus = os.cpus();
    return cpus.map(cpu => ({
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times
    }));
  } catch (error) {
    console.error('Error fetching CPU info:', error);
    throw new Error('Failed to fetch CPU info');
  }
}

// 获取内存信息
async function getMemoryInfo() {
  try {
    const mem = os.totalmem();
    const usedMem = os.freemem();
    return {
      total: mem,
      used: usedMem,
      free: mem - usedMem
    };
  } catch (error) {
    console.error('Error fetching memory info:', error);
    throw new Error('Failed to fetch memory info');
  }
}

// 性能监控页面
async function performanceMonitorPage(req) {
  try {
    const systemLoad = await getSystemLoad();
    const cpuInfo = await getCPUInfo();
    const memoryInfo = await getMemoryInfo();

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: {
          systemLoad,
          cpuInfo,
          memoryInfo
        }
      }),
      {
        status: 200
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
       }),
      {"status": 500}
    );
  }
}

module.exports = performanceMonitorPage;