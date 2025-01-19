const fs = require('fs/promises');
const path = require('path');

async function displayInfo() {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (!file.isFile()) continue;
      const filepath = path.join(folderPath, file.name);
      const stats = await fs.stat(filepath);
      const fileName = path.parse(filepath).name;
      const fileExtname = path.extname(file.name).slice(1);
      const fileSize = `${(stats.size / 1024).toFixed(3)}kb`;
      console.log(`${fileName} - ${fileExtname} - ${fileSize}`);
    }
  } catch (error) {
    console.error('Error reading folder:', error.message);
  }
}
displayInfo();
