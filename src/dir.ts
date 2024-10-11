import fs from "fs";
import { glob } from "glob";
import util from "util";

export const getAllFiles = async (src: string) =>
  (await util.promisify(glob)(src + "/**/*", {})) as string[];

export const getTotalSize = async function (directoryPath: string) {
  const arrayOfFiles = await getAllFiles(directoryPath);
  let totalSize = 0;
  arrayOfFiles.forEach(function (filePath) {
    const fileSize = fs.statSync(filePath).size;
    totalSize += fileSize;
  });
  return totalSize;
};
