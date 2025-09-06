// 代码生成时间: 2025-09-06 08:54:50
const fs = require('fs-extra');
const path = require('path');

// ConfigManager class to handle configuration files
class ConfigManager {
  // Constructor to initialize the ConfigManager with the path to the config directory
  constructor(configPath) {
    this.configPath = configPath;
  }

  // Method to read a configuration file
  async readConfigFile(filename) {
    try {
      const configFilePath = path.join(this.configPath, filename);
      const fileExists = await fs.pathExists(configFilePath);

      if (!fileExists) {
        throw new Error(`Configuration file ${filename} not found`);
      }

      const configContent = await fs.readFile(configFilePath, 'utf8');
      return JSON.parse(configContent);
    } catch (error) {
      console.error(`Error reading configuration file: ${error.message}`);
      throw error;
    }
  }

  // Method to write to a configuration file
  async writeConfigFile(filename, configData) {
    try {
      const configFilePath = path.join(this.configPath, filename);
      await fs.ensureFile(configFilePath);
      await fs.writeJSON(configFilePath, configData, { spaces: 2 });
    } catch (error) {
      console.error(`Error writing to configuration file: ${error.message}`);
      throw error;
    }
  }
}

// Export the ConfigManager class for use in other parts of the application
module.exports = ConfigManager;