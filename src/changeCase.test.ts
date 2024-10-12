import assert from "assert";
import { describe, it } from "node:test";
import { kebabCase, camelCase } from "./changeCase.js";

describe("changeCase", () => {
  describe("kebabCase", () => {
    it("should convert camelCase to kebab-case", () => {
      assert.strictEqual(kebabCase("helloWorld"), "hello-world");
    });

    it("should convert PascalCase to kebab-case", () => {
      assert.strictEqual(kebabCase("HelloWorld"), "hello-world");
    });

    it("should convert space-separated words to kebab-case", () => {
      assert.strictEqual(kebabCase("Hello World"), "hello-world");
    });

    it("should convert underscore_separated words to kebab-case", () => {
      assert.strictEqual(kebabCase("Hello_World"), "hello-world");
    });

    it("should handle already kebab-case strings", () => {
      assert.strictEqual(kebabCase("hello-world"), "hello-world");
    });

    it("should handle strings with multiple spaces or underscores", () => {
      assert.strictEqual(kebabCase("Hello    World"), "hello-world");
      assert.strictEqual(kebabCase("Hello___World"), "hello-world");
    });

    it("should convert a single word to lowercase", () => {
      assert.strictEqual(kebabCase("HELLO"), "hello");
    });
  });

  describe("camelCase", () => {
    it("should convert kebab-case to camelCase", () => {
      assert.strictEqual(camelCase("hello-world"), "helloWorld");
    });

    it("should convert space-separated words to camelCase", () => {
      assert.strictEqual(camelCase("hello world"), "helloWorld");
    });

    it("should convert underscore_separated words to camelCase", () => {
      assert.strictEqual(camelCase("hello_world"), "helloWorld");
    });

    it("should handle already camelCase strings", () => {
      assert.strictEqual(camelCase("helloWorld"), "helloWorld");
    });

    it("should handle PascalCase and convert to camelCase", () => {
      assert.strictEqual(camelCase("HelloWorld"), "helloWorld");
    });

    it("should handle strings with multiple separators", () => {
      assert.strictEqual(camelCase("hello--world"), "helloWorld");
      assert.strictEqual(camelCase("hello__world"), "helloWorld");
      assert.strictEqual(camelCase("hello    world"), "helloWorld");
    });

    it("should handle empty strings", () => {
      assert.strictEqual(camelCase(""), "");
    });

    it("should handle strings with a single word", () => {
      assert.strictEqual(camelCase("hello"), "hello");
    });
  });
});
