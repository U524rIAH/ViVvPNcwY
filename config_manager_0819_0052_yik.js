// 代码生成时间: 2025-08-19 00:52:58
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify the fs.readFile and fs.writeFile functions for easier use with async/await
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Define the path to the configuration file
const configFilePath = path.join(process.cwd(), 'config.json');

class ConfigManager {
  // Loads configuration from the config.json file
  static async loadConfig() {
    try {
      const data = await readFileAsync(configFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Handle case where config file does not exist or is corrupted
      console.error('Error loading configuration:', error);
      throw new Error('Configuration file not found or corrupted.');
    }
  }

  // Saves configuration to the config.json file
  static async saveConfig(config) {
    try {
      const data = JSON.stringify(config, null, 2);
      await writeFileAsync(configFilePath, data);
    } catch (error) {
      // Handle case where there is an issue writing to the config file
      console.error('Error saving configuration:', error);
      throw new Error('Failed to save configuration.');
    }
  }

  // Updates a specific key in the configuration object
  static async updateConfig(key, value) {
    try {
      const config = await this.loadConfig();
      config[key] = value;
      await this.saveConfig(config);
    } catch (error) {
      console.error('Error updating configuration:', error);
      throw new Error('Failed to update configuration.');
    }
  }
}

// Example usage of the ConfigManager
(async () => {
  try {
    const config = await ConfigManager.loadConfig();
    console.log('Loaded config:', config);

    await ConfigManager.updateConfig('exampleKey', 'exampleValue');
    console.log('Updated config successfully.');

    const updatedConfig = await ConfigManager.loadConfig();
    console.log('Updated config:', updatedConfig);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();