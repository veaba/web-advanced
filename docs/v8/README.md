# V8引擎

## 相关链接
- [v8官网](https://v8.dev/docs/)
- [Chromium](https://github.com/chromium/chromium)

## 文档

V8是Google的开源高性能JavaScript和WebAssembly引擎，用C++编写。它用于Chrome和Node.js等。

此文档旨在针对那些希望在应用程序中使用`V8`的C++开发人员，以及对V8的设计和性能感兴趣的人。
本文档向您介绍了`V8`，而其余的文档则向您展示了如何在代码中使用`V8`，并描述了它的一些设计细节，还提供了一组用于测量`V8`性能的JavaScript基准。


## 目录

- 从源码构建`V8`
    - `V8`源码检出
    - 通过GN构建
    - `ARM/Android`的交叉编译与调试
    - `iOS`交叉编译
    - `GUI`和`IDE`安装
- 贡献 
    - `V8`公共`API`及其稳定性
    - 成为`V8`的提交者
    - 提交者的责任
    - Blink web 测试（也称布局测试）
    - 评估代码覆盖率
    - 发布进程
    - 设计评审指南
    - 实现和发布JavaScript/WebAssembly语言特性
    - WebAssembly特性的暂存和装运清单
    - 二分查找算法
    - 端口处理
    - Merging & patching
    - Node.js integration build
    - Reporting security bugs
    - Running benchmarks locally
    - Testing
    - Triaging issues
- 调试
    - Arm debugging with the simulator
    - Cross-compiling and debugging for ARM/Android
    - Debugging builtins with GDB
    - Debugging over the V8 Inspector Protocol
    - GDB JIT Compilation Interface integration
    - Investigating memory leaks
    - Stack trace API
    - Using D8
- 嵌入V8
    - Guide to embedding V8
    - Version numbers
    - Built-in functions
    - i18n support
    - Untrusted code mitigations
- 高级选项
    - Ignition
    - TurboFan
    - Torque user manual
    - Writing Torque built-ins
    - Writing CSA built-ins
    - Adding a new WebAssembly opcode
- 编写可优化的JavaScript
    - Using V8’s sample-based profiler
    - Profiling Chromium with V8
    - Using Linux perf with V8
    - Tracing V8
    - Using Runtime Call Stats
