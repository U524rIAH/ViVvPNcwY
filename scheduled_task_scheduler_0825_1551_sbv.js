// 代码生成时间: 2025-08-25 15:51:12
const cron = require('node-cron');
const next = require('next');

// 创建Next.js应用实例
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = require('serve-handler');
const server = require('http').createServer((request, response) => {
    handler(request, response, { public: '.next' });
});

// 启动Next.js应用
app.prepare().then(() => {
    server.listen(3000, () => {
        console.log('Next.js app running on http://localhost:3000');
    });
}).catch((error) => {
    console.error('Failed to start Next.js app:', error);
});

/**
 * 定时任务调度器
 * @param {string} cronExpression - 定时任务的Cron表达式
 * @param {Function} taskFunction - 要执行的任务函数
 * @returns {void}
 */
function scheduleTask(cronExpression, taskFunction) {
    try {
        // 使用node-cron库创建定时任务
        const task = cron.schedule(cronExpression, taskFunction, { scheduled: true });
        console.log(`Scheduled task to run every ${cronExpression}`);
    } catch (error) {
        // 错误处理
        console.error('Failed to schedule task:', error);
    }
}

/**
 * 示例任务函数，可以替换成具体的业务逻辑
 * @returns {void}
 */
function exampleTask() {
    console.log('Running scheduled task...');
}

// 调用函数，每天午夜执行任务
scheduleTask('0 0 * * *', exampleTask);
