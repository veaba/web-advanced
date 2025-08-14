---
sidebar: auto
---

# Actix-web

- [Actix-web 官方](https://actix.rs/)

- TODO 这目录重新调整过，乱了。

## 介绍

### Welcome

欢迎使用 Actix

Actix 是开发带有 Rust 的 web 服务的门户，本文档将为你提供指导。

本文档目前主要涉及 `actix-web` 部分，它是先前在 `actix` actor 框架和 [`Tokio`](https://tokio.rs/) 异步 IO 系统之上构建的高级 web 框架。这是从 API 稳定性的角度来看最稳定的部分。

如果你还没有使用 actix-web，最好从[入门指南](https://actix.rs/docs/getting-started)开始。
如果你已经知道自己的方法，并且需要特定的信息，那么你可能需要阅读 [actix-web API 文档](https://docs.rs/actix-web) (或较低级别的 [actix APO=I 文档](https://docs.rs/actix))。

### 什么是 Actix

Actix 是多种集合

Actix 一个集合体，它的基础是一个强大的 `actor` 系统，用于 Rust，而 `actix-web` 系统最初就是在这个系统之上构建的，这是你最有可能使用的。`actix-web` 给你的是一个有趣且快速的 web 开发框架。

我们称 `actix-web` 为一个小型实用的框架。不管是出于什么目的，它都是一个有着一些曲折的微结构。
如果你已经是一个 `Rust` 程序员，你可能会发现自己在家很快，但即使你是来自另一种编程语言，你应该发现 `actix-web` 也很容易使用。

使用 `actix-web` 开发的应用程序将公开包含在本机可执行文件中的 HTTP 服务器。
你可以将它放在另一个 HTTP 服务器 (如 nginx) 后面，也可以按原样提供服务。
即使在完全没有另一个 HTTP 服务器的情况下，`actix-web` 也足够强大，能够提供 `HTTP 1` 和 `http2` 支持以及 `SSL/TLS`，这对于构建准备分发的小型服务非常有用。

最重要的是：`actix-web` 运行在 Rust 1.39 或更高版本上，它可以与稳定的版本一起工作。

## 协议

### Websocket

`Actix-web` 支持带有 `Actix-web- actors` crate 的 WebSockets。可以将请求的 `Payload` 转换为带有 `web::Payload` 的 `ws::Message` 流，然后使用流组合器处理实际消息，但是使用 http `actor` 处理 websocket 通信更简单。

下面是一个简单的 `websocket` echo 服务器示例：

```rust
use actix::{Actor, StreamHandler};
use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;

/// Define http actor
struct MyWs;

impl Actor for MyWs {
    type Context = ws::WebsocketContext<Self>;
}

/// Handler for ws::Message message
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWs {
    fn handle(
        &mut self,
        msg: Result<ws::Message, ws::ProtocolError>,
        ctx: &mut Self::Context,
    ) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(text)) => ctx.text(text),
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            _ => (),
        }
    }
}

async fn index(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let resp = ws::start(MyWs {}, &req, stream);
    println!("{:?}", resp);
    resp
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/ws/", web::get().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

[示例目录](https://github.com/actix/examples/tree/master/websocket/)中提供了一个简单的 websocket echo 服务器示例。

[websocket-chat 目录](https://github.com/actix/examples/tree/master/websocket-chat/)中提供了一个能够通过 websocket 或 tcp 连接进行聊天的示例聊天服务器

### HTTP/2.0

如果可能，`actix-web` 会自动升级到 `HTTP/2.0` 的连接。

#### 谈判

未经事先了解的 tls 上的 _HTTP/2.0_ 协议需要 [tls alpn](https://tools.ietf.org/html/rfc7301)。

目前，只有 `rust-openssl` 有支持。

`alpn` 协商需要启用该功能。启用时，`HttpServer` 提供 `bind_openssl` 方法。

```rust
[dependencies]
actix-web = { version = "2.0", features = ["openssl"] }
actix-rt = "1.0.0"
openssl = { version = "0.10", features = ["v110"] }
use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};

async fn index(_req: HttpRequest) -> impl Responder {
    "Hello."
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // load ssl keys
    // to create a self-signed temporary cert for testing:
    // `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj '/CN=localhost'`
    let mut builder = SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
    builder
        .set_private_key_file("key.pem", SslFiletype::PEM)
        .unwrap();
    builder.set_certificate_chain_file("cert.pem").unwrap();

    HttpServer::new(|| App::new().route("/", web::get().to(index)))
        .bind_openssl("127.0.0.1:8088", builder)?
        .run()
        .await
}
```

不支持升级到 rfc 第 3.2 节中描述的 _HTTP/2.0_ 架构。明文连接和 tls 连接都支持使用先前的知识启动 _HTTP/2_，[rfc 第 3.4 节](https://http2.github.io/http2-spec/#rfc.section.3.4)。

查看 [examples/tls](https://github.com/actix/examples/tree/master/rustls) 以获取具体示例。

## Patterns 模式

### Autoreloading 自动重载

#### 自动重新加载开发服务器

在开发过程中，让 cargo 在更改时自动重新编译代码非常方便。这可以通过使用 `cargo-watch` 来完成。因为 actix 应用程序通常会绑定到端口以侦听传入的 HTTP 请求，所以将其与 `listenfd` crate 和 `systemfd` 实用程序结合起来以确保在应用程序编译和重新加载时套接字保持打开是有意义的。

`systemfd` 将打开一个套接字并将其传递给 `cargo-watch`，后者将监视更改，然后调用编译器并运行 actix 应用程序。actix 应用程序将使用 `listenfd` 来获取 `systemfd` 打开的套接字。

#### 必需的二进制文件

要获得自动重新装载体验，你需要安装 `cargo-watch` 和 `systemfd`。两者都是用铁锈写的，可与 `cargo-install` 一起安装：

```shell
cargo install systemfd cargo-watch
```

#### 代码变更

此外，你需要稍微修改 actix 应用程序，以便它可以拿起 `systemfd` 打开的外部套接字。将 listenfd 依赖项添加到应用程序：

```toml
[dependencies]
listenfd="0.3"
```

然后修改服务器代码以仅调用 `bind` 作为回退：

```rust
use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use listenfd::ListenFd;

async fn index(_req: HttpRequest) -> impl Responder {
    "Hello World!"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| App::new().route("/", web::get().to(index)));

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("127.0.0.1:3000")?
    };

    server.run().await
}
```

#### 运行服务器

要现在运行开发服务器，请调用以下命令：

```shell

systemfd --no-pid -s http::3000 -- cargo watch -x run
```

### Databases 数据库

#### Diesel

目前，Diesel1.0 不支持异步操作，但是可以使用 `Actix` 同步 Actor 系统作为数据库接口 api。

从技术上讲，同步 `Actor` 是 `worker` 风格的 `Actor`。多个同步参与者可以并行运行并处理来自同一队列的消息。同步 `Actor` 在 mpsc 模式下工作。

让我们创建一个简单的数据库 api，它可以将新的用户行插入到 `SQLite` 表中。我们必须定义一个同步参与者和这个参与者将使用的连接。同样的方法也可以用于其他数据库。

```rust
use actix::prelude::*;

struct DbExecutor(SqliteConnection);

impl Actor for DbExecutor {
    type Context = SyncContext<Self>;
}
```

这就是我们 `Actor` 的定义。现在，我们必须定义创建用户消息和响应。

```rust
struct CreateUser {
    name: String,
}

impl Message for CreateUser {
    type Result = Result<User, Error>;
}
```

我们可以向 `DbExecutor` actor 发送 `CreateUser` 消息，结果，我们将收到一个 `User` 模型实例。接下来，我们必须定义此消息的处理程序实现。

```rust
impl Handler<CreateUser> for DbExecutor {
    type Result = Result<User, Error>;

    fn handle(&mut self, msg: CreateUser, _: &mut Self::Context) -> Self::Result {
        use self::schema::users::dsl::*;

        // Create insertion model
        let uuid = format!("{}", uuid::Uuid::new_v4());
        let new_user = models::NewUser {
            id: &uuid,
            name: &msg.name,
        };

        // normal diesel operations
        diesel::insert_into(users)
            .values(&new_user)
            .execute(&self.0)
            .expect("Error inserting person");

        let mut items = users
            .filter(id.eq(&uuid))
            .load::<models::User>(&self.0)
            .expect("Error loading person");

        Ok(items.pop().unwrap())
    }
}
```

就这样！现在，我们可以从任何 http 处理程序或中间件中使用 `DbExecutor` actor。我们只需要启动 `DbExecutor` actors 并将地址存储在 http 处理程序可以访问的状态中。

```rust
/// This is state where we will store *DbExecutor* address.
struct State {
    db: Addr<DbExecutor>,
}

fn main() {
    let sys = actix::System::new("diesel-example");

    // Start 3 parallel db executors
    let addr = SyncArbiter::start(3, || {
        DbExecutor(SqliteConnection::establish("test.db").unwrap())
    });

    // Start http server
    HttpServer::new(move || {
        App::with_state(State { db: addr.clone() })
            .resource("/{name}", |r| r.method(Method::GET).a(index))
    })
    .bind("127.0.0.1:8080")
    .unwrap()
    .start()
    .unwrap();

    println!("Started http server: 127.0.0.1:8080");
    let _ = sys.run();
}
```

我们将在请求处理程序中使用该地址。句柄返回一个未来对象；因此，我们异步接收消息响应。`Route::a()` 必须用于异步处理程序注册。

```rust
/// Async handler
fn index(req: &HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
    let name = &req.match_info()["name"];

    // Send message to `DbExecutor` actor
    req.state()
        .db
        .send(CreateUser {
            name: name.to_owned(),
        })
        .from_err()
        .and_then(|res| match res {
            Ok(user) => Ok(HttpResponse::Ok().json(user)),
            Err(_) => Ok(HttpResponse::InternalServerError().into()),
        })
        .responder()
}
```

[示例目录](https://github.com/actix/examples/tree/master/diesel/)中提供了完整的示例。

有关同步参与者的更多信息可以在 [actix 文档](https://docs.rs/actix/0.7.0/actix/sync/index.html)中找到。

## 图表

### HTTP 服务初始化

#### 体系结构概述

下面是 HttpServer 初始化的示意图，它发生在以下代码上

```rust
#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::to(|| HttpResponse::Ok()))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

![http_server](https://actix.rs/img/diagrams/http_server.svg)

### 连接生命周期

#### 系统结构概述

在服务器开始监听所有套接字之后，`Accept` 和 `Worker` 是两个主循环，负责处理传入的客户端连接。

一旦连接被接受，应用程序级的协议处理就发生在从 `Worker` 派生的特定于协议的 `Dispatcher` 循环中。

请注意，下面的图表仅勾勒了 `happy-path` 的场景

![connection_overview](https://actix.rs/img/diagrams/connection_overview.svg)

更详细地 Accept 循环

![connection_accept](https://actix.rs/img/diagrams/connection_accept.svg)

大多数代码实现位于 `actix-server` 机箱中，用于结构 `Accept`。

更详细的 `Worker` 循环

![connection_worker](https://actix.rs/img/diagrams/connection_worker.svg)

大多数代码实现都位于 `actix-server` crate 的 `Worker` 结构中。

大致的请求循环

![connection_request](https://actix.rs/img/diagrams/connection_request.svg)

请求循环的大多数代码实现位于 `actix-web` 和 `actix-http` 机箱中。

## API 文档

### [actix](https://docs.rs/actix)

### [actix-web](https://docs.rs/actix-web/)
