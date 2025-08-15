# V8 引擎

## 相关链接

- [v8 官网](https://v8.dev/docs/)
- [Chromium](https://github.com/chromium/chromium)

## 文档

V8 是 Google 的开源高性能 JavaScript 和 WebAssembly 引擎，用 C++编写。它用于 Chrome 和 Node.js 等。

此文档旨在针对那些希望在应用程序中使用 `V8` 的 C++开发人员，以及对 V8 的设计和性能感兴趣的人。
本文档向您介绍了 `V8`，而其余的文档则向您展示了如何在代码中使用 `V8`，并描述了它的一些设计细节，还提供了一组用于测量 `V8` 性能的 JavaScript 基准。

## 目录

- 从源码构建 `V8`
  - [`V8` 源码检出](/frontend/v8/source-code)
  - [通过 GN 构建](/frontend/v8/build-gn)
  - `ARM/Android` 的交叉编译与调试
  - `iOS` 交叉编译
  - `GUI` 和 `IDE` 安装
- 贡献
  - `V8` 公共 `API` 及其稳定性
  - 成为 `V8` 的提交者
  - 提交者的责任
  - Blink web 测试 (也称布局测试)
  - 评估代码覆盖率
  - 发布进程
  - 设计评审指南
  - 实现和发布 `JavaScript/WebAssembly` 语言特性
  - `WebAssembly` 特性的暂存和装运清单
  - 二分查找算法
  - 端口处理
  - 合并&补丁
  - Node.js 整合构建
  - 报告安全性 bug
  - 在本地运行基准测试
  - 测试
  - 分流 issues
- 调试
  - 用模拟器进行 Arm 调试
  - `ARM/Android` 的交叉编译与调试
  - 用 `GDB` 调试内置代码
  - 通过 `V8` 检查器协议进行调试
  - `GDB JIT` 编译接口集成
  - 调查内存泄漏
  - 堆栈跟踪 API
  - 使用 `D8`
- 嵌入 V8
  - 嵌入 V8 指南
  - 版本号
  - 内置函数
  - i18n 支持
  - 不受信任的代码缓解？
- 高级选项
  - 点火开关？
  - 发动机？
  - 扭矩用户手册？
  - 内置写入扭矩
  - 编写 CSA 内置
  - 添加新的 `WebAssembly` 操作码
- 编写可优化的 JavaScript
  - 使用 `V8` 的基于样本的探查器
  - 在 `V8` 中剖析 Chromium
  - 在 V8 中使用 Linux 性能
  - 跟踪 V8
  - 使用运行时调用统计信息
