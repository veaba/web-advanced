## fs

> 不建议在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。这样做会引入竞争条件，因为其他进程可能会在两个调用之间更改文件的状态。相反，用户代码应该直接打开、读取或写入文件，并处理在文件无法访问时引发的错误。

- `.unlink()` 删除文件异步

```js
const fs = require('fs');
fs.unlink('./tmp/hello.js', (err) => {
  if (err) throw err;
  console.log('删除成功');
});
```

- `.unlinkSync()` 删除文件，同步

```js
const fs = require('fs');
try {
  fs.unlinkSync('./tmp/hello.js');
  console.log('删除成功');
} catch (err) {
  console.log(err, '删除失败');
}
```

- `.rename()`

```js
fs.rename('./tmp/hello.js', './tmp/world.js', (err) => {
  if (err) throw err;
  console.log('rename done');
});
```

- `.open()` 完成操作后，需要关闭描述符，否则可能导致内存泄漏
  - `wx` flag
  - `r`

线程池

> 除了 fs.FSWatcher() 和显式同步的方法之外，都使用了 `libuv` 线程池，这对于某些应用程序可能会产生其他负面性能问题，详见 http://nodejs.cn/api/cli.html#cli_uv_threadpool_size_size

- `fs.FSWatcher()`
  > 成功调用一个 fs.watch 方法都会返回一个新的 fs.FSWatcher 对象
- `fs.access(path,[.mode],callback)`
- `fs.Dirent` 类
  - `.dirent.isBlockDevice()` boolean

```js
const fs = require('fs');
fs.open('./tmp/hello.js', 'r', (err, fd) => {
  if (err) throw err;
  fs.fstat(fd, (err1, stat) => {
    if (err1) throw err1;
    //文件属性
    console.log(stat);

    //关闭文件描述符
    fs.close(fd, (errC) => {
      if (errC) throw errC;
      console.loh('关闭');
    });
  });
});
```

- `fs.ReadStream` 类
- `fs.WriteSteam` 类
- `fs.Stats` 类
  - `fs.stat()`

```js
fs.stat('./tmp/world.js', (err, stats) => {
  if (err) throw err;
  conosle.log(stats);
});
```

- `fs.lsate()`
- `.fstat`

```js
fs.fstat(fd, (err1, stat) => {
  if (err1) throw err1;
  //文件属性
  console.log(stat);
  //关闭文件描述符
  fs.close(fd, (errC) => {
    if (errC) throw errC;
    console.log('关闭');
  });
});
```

- `fs.close()`
- `fs.appendFile(path,data[,options],callback)`
  > 异步地将数据追加到文件中，如果文件不存在，则创建该文件，`data` 可以使字符串或者 `Buffer`

```js
fs.appendFile('/tmp.append.txt', 'hello world append file for node.js fs.appendFile function' + new Date(), (err) => {
  if (err) throw err;
});
```

> 异步方法，顺序无法保证

```js
fs.rename('./tmp/hello.js', './tmp/world.js', (err) => {
  if (err) throw err;
  console.log('rename done');
});
//stat可能在rename 之前，
fs.stat('./tmp/world.js', (err, stats) => {
  if (err) throw err;
  conosle.log(stats);
});
```

> 方法时，在回调内部
