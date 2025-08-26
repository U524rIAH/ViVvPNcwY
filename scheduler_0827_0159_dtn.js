// 代码生成时间: 2025-08-27 01:59:56
const cron = require('node-cron');
const logger = require('./logger'); // 假设有一个日志模块

class Scheduler {
  // 构造函数，初始化定时任务
  constructor() {
    this.tasks = [];
  }

  // 添加任务
  addTask(taskName, schedule, callback) {
    try {
      // 创建一个新的cron任务
      const task = cron.schedule(schedule, callback, { scheduled: true });
      this.tasks.push({
        name: taskName,
        task
      });
      logger.info(`Scheduled task '${taskName}' added successfully`);
    } catch (error) {
      logger.error(`Failed to add task '${taskName}': ${error.message}`);
      throw error;
    }
  }

  // 获取所有任务
  getTasks() {
    return this.tasks;
  }

  // 停止特定任务
  stopTask(taskName) {
    const task = this.tasks.find(t => t.name === taskName);
    if (!task) {
      logger.error(`Task '${taskName}' not found`);
      return;
    }
    task.task.stop();
    logger.info(`Task '${taskName}' stopped successfully`);
  }

  // 停止所有任务
  stopAllTasks() {
    this.tasks.forEach(task => {
      task.task.stop();
      logger.info(`Task '${task.name}' stopped successfully`);
    });
  }
}

// 使用示例
const scheduler = new Scheduler();

// 添加一个定时任务，每5秒执行一次
scheduler.addTask('pingTask', '*/5 * * * * *', () => {
  console.log('Pinging...');
});

// 停止所有任务
// scheduler.stopAllTasks();

module.exports = Scheduler;