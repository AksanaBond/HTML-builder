const fs = require('fs/promises');
const path = require('path');

async function createBundle() {
  try {
    const folderProjectPath = path.join(__dirname, 'project-dist');
    const fileBundlePath = path.join(folderProjectPath, 'bundle.css');
    const stylesPath = path.join(__dirname, 'styles');
    const filesCopy = await fs.readdir(stylesPath);
    let styleAll = '';

    for (const file of filesCopy) {
      const filepath = path.join(__dirname, 'styles', file);
      const stats = await fs.stat(filepath);
      if (stats.isFile() && path.extname(file) === '.css') {
        const style = await fs.readFile(filepath, 'utf-8');
        styleAll += style + '\n';
      }
    }
    await fs.writeFile(fileBundlePath, styleAll.trim(), 'utf8');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
createBundle();
