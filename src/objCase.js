const mapKeysDeep = require("map-keys-deep/fp");
const { paramCase, camelCase } = require("change-case");

exports.objParamCase = (obj) => mapKeysDeep(paramCase)(obj);
exports.objCamelCase = (obj) => mapKeysDeep(camelCase)(obj);
