// 代码生成时间: 2025-09-16 01:32:26
const crypto = require('crypto');

// 密码加密解密工具
class EncryptionDecryptionTool {
  // 使用AES-256-CBC模式加密
  static encrypt(text, key, iv) {
    try {
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return {
        success: true,
        data: encrypted.toString('hex')
      };
    } catch (error) {
      return {
        success: false,
        message: `Encryption failed: ${error.message}`
      };
    }
  }

  // 使用AES-256-CBC模式解密
  static decrypt(encryptedText, key, iv) {
    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
      let decrypted = decipher.update(encryptedText, 'hex');
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return {
        success: true,
        data: decrypted.toString()
      };
    } catch (error) {
      return {
        success: false,
        message: `Decryption failed: ${error.message}`
      };
    }
  }
}

// 示例用法
const key = '16-character-key'; // 密钥长度必须为16个字符
const iv = '8-character-iv'; // 初始向量长度必须为8个字符

const plainText = 'Hello, world!';

const encryptedData = EncryptionDecryptionTool.encrypt(plainText, key, iv);
if (encryptedData.success) {
  console.log('Encrypted:', encryptedData.data);
} else {
  console.error(encryptedData.message);
}

const decryptedData = EncryptionDecryptionTool.decrypt(encryptedData.data, key, iv);
if (decryptedData.success) {
  console.log('Decrypted:', decryptedData.data);
} else {
  console.error(decryptedData.message);
}