import mapKeysDeep from "map-keys-deep/fp";
import { kebabCase, camelCase } from "change-case";

export const objParamCase = (obj) => mapKeysDeep(kebabCase)(obj);
export const objCamelCase = (obj) => mapKeysDeep(camelCase)(obj);
