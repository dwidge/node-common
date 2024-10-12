import assert from "assert";
import fs from "fs";
import { after, before, describe, test } from "node:test";
import path from "path";
import { getTotalSize } from "./dir.js";

// Create a temporary test directory and file paths
const testDir = path.join("tmp/testDir");
const testFile1 = path.join(testDir, "file1.txt");
const testFile2 = path.join(testDir, "file2.txt");

describe("getTotalSize", () => {
  // Set up the test environment before running tests
  before(() => {
    // Create the test directory and files
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fs.writeFileSync(testFile1, "Hello World"); // 11 bytes
    fs.writeFileSync(testFile2, "Node.js testing"); // 15 bytes
  });

  // Clean up the test environment after running tests
  after(() => {
    // Remove test files and directory
    if (fs.existsSync(testFile1)) {
      fs.unlinkSync(testFile1);
    }
    if (fs.existsSync(testFile2)) {
      fs.unlinkSync(testFile2);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  test("should correctly calculate the total size of files in the directory", async () => {
    const totalSize = await getTotalSize(testDir);
    assert.strictEqual(totalSize, 26); // 11 bytes + 15 bytes = 26 bytes
  });

  test("should return 0 if the directory is empty", async () => {
    const emptyDir = path.join("tmp/emptyDir");

    // Create an empty test directory
    if (!fs.existsSync(emptyDir)) {
      fs.mkdirSync(emptyDir, { recursive: true });
    }

    const totalSize = await getTotalSize(emptyDir);
    assert.strictEqual(totalSize, 0);

    // Clean up the empty test directory
    if (fs.existsSync(emptyDir)) {
      fs.rmdirSync(emptyDir);
    }
  });
});
