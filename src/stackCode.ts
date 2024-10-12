import { camelCase } from "./changeCase.js";

export const stackCode = ({ stack } = new Error(), root = "controllers") =>
  stack
    ?.match(new RegExp(root + `[/\\\\]([^.]+).js:([^:]+):`))
    ?.slice(1, 3)
    ?.map((s) => camelCase(s))
    ?.join("-");
