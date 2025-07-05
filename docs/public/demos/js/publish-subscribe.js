// 所有一切都在对象中完成
const eventEmitter = {};

// 缓存列表，调度中心
eventEmitter.list = {};

// on 方法添加fn 缓存 ==> 订阅者注册事件到调度中心
// 订阅处理
eventEmitter.on = function(eventName, fn) {
  eventEmitter.list[eventName]
    ? eventEmitter.list[eventName].push(fn)
    : (eventEmitter.list[eventName] = [fn]);

  console.log("订阅事件==>list", eventEmitter.list);
};

// 发布者发布事件到调度中心，调度中心执行代码
eventEmitter.emit = function(...args) {
  console.log("arg=>", args);
  const list = eventEmitter.list;
  const eventName = args[0];
  const publishContent = args[args.length - 1];

  if (list[eventName]) {
    const fns = list[eventName];
    for (let i = 0; i < fns.length; i++) {
      fns[i].call(this, publishContent);
    }
  }
};

// off 取消订阅
eventEmitter.off = function() {
  eventEmitter.list = [];
};

function user1(content) {
  console.log("user1 subscribe=>", content);
}

// 订阅

eventEmitter.on("art", user1);

eventEmitter.emit("art", "ddd");
