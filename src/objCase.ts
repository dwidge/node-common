import mapKeysDeep from "map-keys-deep/fp";
import { kebabCase, camelCase } from "./changeCase.js";

// Type definition for the object parameter
type AnyObject = { [key: string]: any };

// Function to transform object keys to kebab-case
export const objParamCase = (obj: AnyObject): AnyObject =>
  mapKeysDeep(kebabCase)(obj);

// Function to transform object keys to camelCase
export const objCamelCase = (obj: AnyObject): AnyObject =>
  mapKeysDeep(camelCase)(obj);
