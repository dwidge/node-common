const fs = require("fs");
const glob = require("glob");
const util = require("util");

const getAllFiles = (src, callback) =>
  util.promisify(glob)(src + "/**/*", callback);

const getTotalSize = async function (directoryPath) {
  const arrayOfFiles = await getAllFiles(directoryPath);

  let totalSize = 0;
  arrayOfFiles.forEach(function (filePath) {
    const fileSize = fs.statSync(filePath).size;
    totalSize += fileSize;
  });
  return totalSize;
};

module.exports = { getAllFiles, getTotalSize };
