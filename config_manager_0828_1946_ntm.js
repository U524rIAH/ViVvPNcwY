// 代码生成时间: 2025-08-28 19:46:41
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify the readFile and writeFile functions for easier use with async/await
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ConfigManager {
  // Constructor to initialize the ConfigManager with a configuration file path
  constructor(configFilePath) {
    this.configFilePath = configFilePath;
    this.config = {};
  }

  // Asynchronously reads the configuration file and returns the configuration object
  async loadConfig() {
    try {
      const data = await readFile(this.configFilePath, 'utf8');
      this.config = JSON.parse(data);
    } catch (error) {
      console.error('Error loading configuration:', error);
      throw error;
    }
  }

  // Asynchronously writes the updated configuration to the file
  async saveConfig() {    try {
      const data = JSON.stringify(this.config, null, 2);
      await writeFile(this.configFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error saving configuration:', error);
      throw error;
    }
  }

  // Sets a configuration value by key and value
  setConfig(key, value) {
    this.config[key] = value;
    return this.saveConfig();
  }

  // Gets a configuration value by key
  getConfig(key) {
    return this.config[key];
  }
}

// Export the ConfigManager class
module.exports = ConfigManager;
