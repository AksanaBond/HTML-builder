const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const folderPathCopy = path.join(__dirname, 'files-copy');
  const folderPath = path.join(__dirname, 'files');
  try {
    await fs.mkdir(folderPathCopy, { recursive: true });
    const sourceFiles = await fs.readdir(folderPath);
    const existingCopyFiles = await fs.readdir(folderPathCopy);
    for (const file of existingCopyFiles) {
      if (!sourceFiles.includes(file)) {
        await fs.unlink(path.join(folderPathCopy, file));
      }
    }
    for (const file of sourceFiles) {
      const filepath = path.join(folderPath, file);
      const filepathCopy = path.join(folderPathCopy, file);
      const stats = await fs.stat(filepath);
      if (stats.isFile()) {
        await fs.copyFile(filepath, filepathCopy);
      }
    }
  } catch (error) {
    console.error('Error copy directory:', error);
  }
}

copyDir();
