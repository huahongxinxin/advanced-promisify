# advanced-promisify

Converts callback-based functions or methods to Promise-based functions or methods.

## Install

Install with [npm](https://npmjs.org/package/advanced-promisify)

```bash
npm install advanced-promisify
```

## Example

```js
"use strict";

// Declare variables
const promisify = require("advanced-promisify");
const fs = require("fs");

// Convert the stat function
const stat = promisify.fn(fs.stat);

// Now usable as a promise!
stat("example.txt").then(function (stats) {
    console.log("Got stats", stats);
}).catch(function (err) {
    console.error("Yikes!", err);
});
```

## Promisify method
```js
"use strict";

// Declare variables
const promisify = require("advanced-promisify");
const redisClient = require("redis").createClient(6379, "localhost");

// Convert the redisClient object
promisify.obj(redisClient);

// Send commands to redis and get a promise back
redisClient.$hkeys("hash key")
    .then(function (err, replies) {
        client.quit();
    });
```

## Promisify all methods in a class
```js
"use strict";

// Declare variables
const promisify = require("advanced-promisify");
const RedisClient = require("redis").RedisClient;

// Convert the RedisClient class
promisify.cls(RedisClient);

const redisClient = new RedisClient(6379, "localhost");

// Send commands to redis and get a promise back
redisClient.$hkeys("hash key")
    .then(function (err, replies) {
        client.quit();
    });
```

## Tests
```bash
$ npm run test
```

Published under the [MIT License](http://opensource.org/licenses/MIT).