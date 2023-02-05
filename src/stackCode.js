const { headerCase } = require("change-case");

const stackCode = ({ stack } = new Error(), root = "controllers") =>
  stack
    .match(new RegExp(root + `[/\\\\]([^.]+).js:([^:]+):`))
    ?.slice(1, 3)
    ?.map((s) => headerCase(s))
    ?.join("-");

module.exports = stackCode;
