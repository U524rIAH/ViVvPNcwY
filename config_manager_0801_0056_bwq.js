// 代码生成时间: 2025-08-01 00:56:32
const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

// Define a class to manage configuration files
class ConfigManager {
  // Constructor to initialize the manager with a config file path
  constructor(configFilePath) {
    this.configFilePath = configFilePath;
  }

  // Load configuration from a specified file path
  async loadConfig() {
    try {
      if (!existsSync(this.configFilePath)) {
        throw new Error(`Configuration file does not exist at ${this.configFilePath}`);
      }

      const data = await fs.readFile(this.configFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Handle errors related to file reading or parsing
      console.error('Error loading configuration:', error.message);
      throw error;
    }
  }

  // Save configuration to a specified file path
  async saveConfig(configData) {
    try {
      const configJson = JSON.stringify(configData, null, 2);
      await fs.writeFile(this.configFilePath, configJson);
    } catch (error) {
      // Handle errors related to file writing
      console.error('Error saving configuration:', error.message);
      throw error;
    }
  }
}

// Export the ConfigManager class for use in other parts of the application
module.exports = ConfigManager;