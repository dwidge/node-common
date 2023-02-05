# @dwidge/node-common

Useful functions for NodeJS.

## Installation

`npm install @dwidge/node-common`

## Usage

```js
const { create } = require("@dwidge/node-common/s3");
const s3 = create({ endpoint: "localhost:9000" });
```

```js
const cron = require("@dwidge/node-common/cron");
await cron(
  [
    {
      name: "JobA",
      cron: "*/1 * * * *",
      startup: true,
      test: () => console.log("Running JobA..."),
    },
  ],
  { startup: false, logError: console.log }
);
```

## License

Copyright DWJ 2023.  
Distributed under the Boost Software License, Version 1.0.  
https://www.boost.org/LICENSE_1_0.txt
