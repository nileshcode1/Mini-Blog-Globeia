const fs = require('fs');
const path = require('path');

const fileHelper = {
  deleteFile: (filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File deleted: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
    }
  },

  ensureDirectoryExists: (dirPath) => {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
      }
    } catch (error) {
      console.error(`Error creating directory ${dirPath}:`, error);
    }
  },

  getFileExtension: (filename) => {
    return path.extname(filename).toLowerCase();
  },

  generateUniqueFilename: (originalName, prefix = '') => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(originalName);
    return `${prefix}${uniqueSuffix}${fileExtension}`;
  }
};

module.exports = fileHelper;