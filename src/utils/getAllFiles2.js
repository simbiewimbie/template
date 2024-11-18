const fs = require('fs');
const path = require('path');

const getFilesRecursively = (directory, foldersOnly) => {
  let fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
        fileNames = fileNames.concat(getFilesRecursively(filePath, foldersOnly));
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      } else if (file.isDirectory()) {
        fileNames = fileNames.concat(getFilesRecursively(filePath, foldersOnly));
      }
    }
  }

  return fileNames;
};

module.exports = (directory, foldersOnly = false) => {
  return getFilesRecursively(directory, foldersOnly);
};