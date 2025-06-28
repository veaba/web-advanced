const fs = require('fs');
const path = require('path');

function renameReadmeToIndexSync(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      renameReadmeToIndexSync(fullPath);
    } else if (file.isFile() && file.name.toLowerCase() === 'readme.md') {
      const newPath = path.join(directory, 'index.md');

      try {
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } catch (err) {
        console.error(`Error renaming ${fullPath} to ${newPath}:`, err);
      }
    }
  });
}

// 使用示例
const targetDirectory = './docs';
renameReadmeToIndexSync(targetDirectory);
