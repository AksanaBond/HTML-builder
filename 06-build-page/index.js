const fs = require('fs/promises');
const path = require('path');

async function createHTML() {
  try {
    const folderProjectPath = path.join(__dirname, 'project-dist');
    fs.mkdir(folderProjectPath, { recursive: true });

    const fileHtmlPath = path.join(folderProjectPath, 'index.html');
    const fileTemplatePath = path.join(__dirname, 'template.html');
    const componentsPath = path.join(__dirname, 'components');
    const components = await fs.readdir(componentsPath);
    let contentTemplate = await fs.readFile(fileTemplatePath, 'utf-8');
    for (const file of components) {
      const filepath = path.join(componentsPath, file);
      const stats = await fs.stat(filepath);
      if (stats.isFile() && path.extname(file) === '.html') {
        const content = await fs.readFile(filepath, 'utf-8');
        const fileName = path.parse(file).name;
        if (contentTemplate.includes(`{{${fileName}}}`)) {
          contentTemplate = contentTemplate.replace(
            `{{${fileName}}}`,
            `${content}`,
          );
        }
      }
    }
    await fs.writeFile(fileHtmlPath, contentTemplate.trim(), 'utf-8');
  } catch (err) {
    console.error('Error:', err);
  }
}
createHTML();
async function createBundle() {
  try {
    const folderProjectPath = path.join(__dirname, 'project-dist');
    fs.mkdir(folderProjectPath, { recursive: true });
    const fileBundlePath = path.join(folderProjectPath, 'style.css');
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

async function copyDir(fromPath, toPath) {
  const folderProjectPath = path.join(__dirname, 'project-dist');
  const folderPathCopy = toPath || path.join(folderProjectPath, 'assets');
  const folderPath = fromPath || path.join(__dirname, 'assets');
  try {
    await fs.mkdir(folderPathCopy, { recursive: true });
    const folders = await fs.readdir(folderPath, { withFileTypes: true });
    for (const folder of folders) {
      const dirPath = path.join(folderPath, folder.name);
      const dirpathCopy = path.join(folderPathCopy, folder.name);
      if (folder.isDirectory()) {
        await copyDir(dirPath, dirpathCopy);
      } else {
        await fs.copyFile(dirPath, dirpathCopy);
      }
    }
  } catch (error) {
    console.error('Error copy directory:', error);
  }
}
copyDir();
