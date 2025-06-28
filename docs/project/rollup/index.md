# Rollup

- umd
- iife
- cjs
> rollup src\app.ts --file build.js --format cjs

## cjs

```js
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: true });

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(8080, () => {
  console.log("listen 8080");
});
```

==>

```js
"use strict";

var http = require("http");
var socket_io = require("socket.io");

const httpServer = http.createServer();
const io = new socket_io.Server(httpServer, { cors: true });

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(8080, () => {
  console.log("listen 8080");
});
```

## umd

> 

```js
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: true });

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(8080, () => {
  console.log("listen 8080");
});

```

===>

```js
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('http'), require('socket.io')) :
  typeof define === 'function' && define.amd ? define(['http', 'socket.io'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.http, global.socket_io));
}(this, (function (http, socket_io) { 'use strict';

  const httpServer = http.createServer();
  const io = new socket_io.Server(httpServer, { cors: true });

  io.on("connection", (socket) => {
    console.log(socket.id);
  });

  httpServer.listen(8080, () => {
    console.log("listen 8080");
  });

})));

```

## iife
- 立即执行
> rollup src\app.ts --file build.js --format iife

```js
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: true });

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(8080, () => {
  console.log("listen 8080");
});

```

```js
(function (http, socket_io) {
  'use strict';

  const httpServer = http.createServer();
  const io = new socket_io.Server(httpServer, { cors: true });

  io.on("connection", (socket) => {
    console.log(socket.id);
  });

  httpServer.listen(8080, () => {
    console.log("listen 8080");
  });

}(http, socket_io));

```