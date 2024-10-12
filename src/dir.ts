import fs from "fs";
import path from "path";

// Function to get all files in a directory recursively
export const getAllFiles = async (dir: string): Promise<string[]> => {
  let files: string[] = [];

  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively call getAllFiles for subdirectories
      const subFiles = await getAllFiles(fullPath);
      files = files.concat(subFiles);
    } else {
      // If it's a file, add it to the list
      files.push(fullPath);
    }
  }

  return files;
};

// Function to calculate the total size of all files in a directory
export const getTotalSize = async (directoryPath: string): Promise<number> => {
  const arrayOfFiles = await getAllFiles(directoryPath);
  let totalSize = 0;

  for (const filePath of arrayOfFiles) {
    const fileStats = await fs.promises.stat(filePath);
    totalSize += fileStats.size;
  }

  return totalSize;
};
