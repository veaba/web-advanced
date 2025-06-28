# 安装

安装 Rust

因为 `actix-web` 是一个 Rust 框架，所以你需要 Rust 来开始使用它。如果你还没有，我们建议你使用 `rustup` 来管理你的 Rust 安装。

官方的 Rust 指南有一个很好的开始部分。我们目前至少需要 Rust1.39，所以请确保你运行 `rustup update` 以获得最新和最新的 Rust 版本。
特别是本指南将假设你实际运行 Rust 1.39 或更高版本。

安装 actix-web

多亏了 Rust 的 `cargo` 管理器，你不需要显式地安装 `actix-web`。相信它，就解放你自己了。对于不太可能使用 `actix-web` 开发版本的情况，可以直接依赖 git 存储库。

发行版本：

```toml
[dependencies]
actix-web = "2.0"
```

开发版本：

```toml
[dependencies]
actix-web = { git = "https://github.com/actix/actix-web" }
```

## 潜入

这里有两条路可以走，你可以按照指南进行操作，或者如果你非常不耐烦，你可能希望查看我们广泛的示例存储库并运行包含的示例。例如，下面是如何运行的基本示例：

```cmd
git clone https://github.com/actix/examples
cd examples/basics
cargo run
```
