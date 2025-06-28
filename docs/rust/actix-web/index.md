---
sidebar: auto
---

# Actix-web

- [Actix-web官方](https://actix.rs/)

## 介绍

### Welcome

<h3>欢迎使用Actix</h3>

Actix 是开发带有 Rust 的 web 服务的门户，本文档将为你提供指导。

本文档目前主要涉及`actix-web`部分，它是先前在`actix` actor 框架和[`Tokio`](https://tokio.rs/) 异步 IO 系统之上构建的高级 web 框架。这是从 API 稳定性的角度来看最稳定的部分。

如果你还没有使用 actix-web，最好从[入门指南](https://actix.rs/docs/getting-started)开始。
如果你已经知道自己的方法，并且需要特定的信息，那么你可能需要阅读 [actix-web API 文档](https://docs.rs/actix-web)（或较低级别的 [actix APO=I 文档](https://docs.rs/actix)）。

### 什么是 Actix

<h3>Acitx 是多种集合</h3>

Actix 一个集合体，它的基础是一个强大的`actor`系统，用于 Rust，而`actix-web`系统最初就是在这个系统之上构建的，这是你最有可能使用的。`actix-web`给你的是一个有趣且快速的 web 开发框架。

我们称`actix-web`为一个小型实用的框架。不管是出于什么目的，它都是一个有着一些曲折的微结构。
如果你已经是一个 `Rust` 程序员，你可能会发现自己在家很快，但即使你是来自另一种编程语言，你应该发现`actix-web`也很容易使用。

使用`actix-web`开发的应用程序将公开包含在本机可执行文件中的 HTTP 服务器。
你可以将它放在另一个 HTTP 服务器（如 nginx）后面，也可以按原样提供服务。
即使在完全没有另一个 HTTP 服务器的情况下，`actix-web`也足够强大，能够提供 `HTTP 1 `和 `http2` 支持以及 `SSL/TLS`，这对于构建准备分发的小型服务非常有用。

最重要的是：`actix-web`运行在 Rust 1.39 或更高版本上，它可以与稳定的版本一起工作。

### 安装

<h3>安装Rust</h3>

因为`actix-web`是一个 Rust 框架，所以你需要 Rust 来开始使用它。如果你还没有，我们建议你使用`rustup`来管理你的 Rust 安装。

官方的 Rust 指南有一个很好的开始部分。我们目前至少需要 Rust1.39，所以请确保你运行`rustup update`以获得最新和最新的 Rust 版本。
特别是本指南将假设你实际运行 Rust 1.39 或更高版本。

<h3>安装actix-web</h3>

多亏了 Rust 的`cargo`管理器，你不需要显式地安装`actix-web`。相信它，就解放你自己了。对于不太可能使用 `actix-web` 开发版本的情况，可以直接依赖 git 存储库。

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

#### 潜入

这里有两条路可以走，你可以按照指南进行操作，或者如果你非常不耐烦，你可能希望查看我们广泛的示例存储库并运行包含的示例。例如，下面是如何运行的基本示例：

```cmd
git clone https://github.com/actix/examples
cd examples/basics
cargo run
```

## 基础

### 入门

让我们编写我们的第一个`actix-web`应用程序！

<h3>Hello,world!</h3>

首先创建一个新的基于二进制的 Cargo 项目并切到新目录：

```cmd
cargo new hello-world
cd hello-world
```

现在，通过`Cargo.toml`将`actix-web`添加到你的依赖中，包含以下内容：

```toml
[dependencies]
actix-web = "2.0"
```

如果要使用 `#[actix_rt::main]`宏，必须将`actix-rt`添加到依赖项中。现在你的`cargo.toml`应该如下所示：

```toml
[dependencies]
actix-web = "2.0"
actix-rt = "1.0"
```

为了实现 web 服务器，我们首先需要创建一个请求处理程序。

请求处理程序是一个异步函数，它接受从请求（即`impl FromRequest`）中提取的零个或多个参数，并返回可转换为`HttpResponse`（即`impl Responder`）的类型：

```rust
use actix_web::{web,App,HttpResponse,HttpServer,Responder};

async fn index()->impl Responder {
   HttpResponse::OK().body("Hello world!")
}

async fn index2() -> impl Responder{
 HttpResponse::OK().body("Hello world again!")
}

```

接下来，创建一个应用程序实例，并使用路径上的应用程序`route`和特定的 HTTP 方法注册请求处理程序。
之后，应用程序实例可以与`HttpServer`一起用于侦听传入连接。服务器接受一个应该返回应用程序工厂的函数。

```rust
#[actix_rt::main]
async fn main() ->std::io::Result<()>{
   HttpServer::new (||{
    App:new()
        .route("/",web::get().to(index))
        .route("/again",web::get().to(index2))
   })
    .bind("127.0.0.1:8088")?
    .run()
    .await()
}
```

就这样！现在，用`cargo run`编译并运行程序。前往`http://localhost:8088/`查看结果。

::: tip Note:
你可以注意到`#[actix_rt::main]`属性宏。此宏在 actix 运行时执行标记的异步函数，此宏可以标记和执行任何异步函数。
:::

<h3>使用属性宏定义路由</h3>

或者，你可以使用宏属性定义路由，这些属性允许你在函数上方指定路由，如下所示：

```rust
use actix_web::get;

#[get("/hello")]

async fn index3()->impl Responder{
  HttpResponse::Ok().body("Hey there!")
}

```

然后可以使用`service()`注册路由：

```rust
App::new()
    .service(index3)
```

出于一致性原因，本文档仅使用本页开头显示的显式语法。
但是，如果你更喜欢这种语法，那么你应该在任何时候声明路由时都可以随意使用它，因为它只是语法糖。

要了解更多信息，请参阅[actix-web-codegen](https://docs.rs/actix-web-codegen/)。

<h3>自动重载</h3>

如果需要，可以在开发期间自动重新加载服务器，该服务器根据需要重新编译。
这是不必要的，但它使快速原型更方便，因为你可以看到变化立即保存。要了解如何实现这一点，请查看[autoreload 模式](https://actix.rs/docs/autoreload/)。

### Application

<h3>写一个应用程序</h3>

`actix-web`提供各种原语来构建带有 Rust 的 web 服务器和应用程序。它提供路由、中间件、请求的预处理、响应的后处理等功能。

所有`actix-web`服务器都是围绕`App`实例构建的。它用于注册资源和中间产品的路由。它还存储同一范围内所有处理程序共享的应用程序状态。

应用程序的`scope`充当所有路由的命名空间，即特定应用程序作用域的所有路由都具有相同的 url 路径前缀。
应用程序前缀始终包含前导`“/”`斜线。如果提供的前缀不包含前导斜杠，则会自动插入。前缀应该由值路径段组成。

对于具有 scope`/app`的应用程序，具有`/app`、`/app/`或`/app/test`路径的任何请求都将匹配；但是，路径`/application`将不匹配

```rust
use actix_web::{web, App, Responder, HttpServer};

async fn index() -> impl Responder {
    "Hello world!"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            web::scope("/app").route("/index.html", web::get().to(index)),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

在本例中，带有`/app`前缀和`index.html`索引资源已创建。此资源可通过`/app/index.html` url。

有关详细信息，请查看[URL Dispatch](/rust/actix-web/#url-dispatch)部分。

<h3>State(状态)</h3>

应用程序状态与同一范围内的所有路由和资源共享。状态可以通过`web::Data<T>`提取器访问，其中`T`是状态类型。`State`也可用于中间期间。

让我们编写一个简单的应用程序，并将应用程序名称存储在以下状态：

```rust

use actix_web::{web,App,HttpServer};
use std::sync::Mutex;

// 此结构表示状态

struct AppState {
  app_name: String
}
async fn index(data:Data<AppState>) ->String {
    let app_name = &data.app_name; // 获取app_name
    format!("Hello {}!",app_name)  // 响应app_name
}

```

并在初始化应用程序时传入状态，然后启动应用程序：

```rust
#[actix_rt::main]
async fn main()->std::io::Result<()>{
   HttpServer::new(||{
        App::new()
            .data(AppState {
                app_name:String::from("Actix-web"),
            })
            .route("/",web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}

```

可以在应用程序中注册任意数量的状态类型。

<h3>Shared Mutable State(状态)</h3>

`HttpServer` 接受应用程序工厂，而不是应用程序实例。Http 服务器为每个线程构造一个应用程序实例，因此必须多次构造应用程序数据。如果要在不同线程之间共享数据，则应使用可共享对象，例如 Send+Sync。

在内部，`web::Data`使用 Arc。因此，为了避免双圆弧，我们应该在使用`App::App_Data()`注册数据之前创建数据。

在下面的示例中，我们将编写一个具有可变共享状态的应用程序。首先，我们定义状态并创建处理程序：

```rust
use actix_web::{web}
struct AppStateWithCounter {
    counter:Mutex<i32>  // 互斥锁对于跨线程安全地进行变异是必要的
}

async fn index(data:web::Data<AppStateWithCounter>) -> String {
    let mut counter =data.counter.lock().unwrap(); // 获取counter的互斥锁
    *counter +=1; // MutexGuard内的访问计数器
    format!("Request number :{}",counter) // 响应counter
}
```

并在应用程序中注册数据：

```rust
#[actix_rt::main]

async fn main() ->std::io:Result<()>{
    let counter =web::Data::new(AppStateWithCounter {
        counter:Mutex::new(0)
    })

    HttpServer::new(move || {
        // move counter into the closure
        App::new()
            .app_data(counter.clone())   // 注册创建的数据
            .route("/",web::get().to(index))
    })
    .bind("127.0.0.1:8089")?
    .run()
    .await
}
```

<h3>使用应用程序范围组合应用程序</h3>

`web::scope()`方法允许设置特定的应用程序前缀。此作用域表示资源前缀，该前缀将作为资源配置添加的所有资源模式的前缀。
这可用于帮助将一组路由装载到不同的位置，而不是包含的可调用文件的作者想要的位置，同时仍然保持相同的资源名称。

比如：

```rust
async fn show_users()->String{
    format!("Hello")
}
#[actix_rt::main]
async fn main(){
    App::new()
        .service(
            web::scope("/users")
                .route("/show",web::get().to(show_users)))
}

```

在上面的示例中，show_users 路由将具有`/users/show`而不是/show 的有效路由模式，因为应用程序的 scope 参数将位于该模式的前面。只有当 URL 路径是/users/show，并且当`HttpRequest.url_for`函数是用路由名 show_users 调用的，它将生成具有相同路径的 URL。

<h3>应用程序保护和虚拟主机</h3>

你可以将保护程序看作一个简单的函数，它接受请求对象引用并返回 true 或 false。在形式上，守卫是实现守卫特性的任何对象。`actix-web`提供了几个防护，可以查看 api 文档的[函数部分](https://docs.rs/actix-web/2/actix_web/guard/index.html#functions)。

提供的保护之一是`Header`，它可以用作基于请求头信息的应用程序筛选器。

```rust
#[actix_rt::main]

async fn main() -> std::io::Result<()>{
    HttpServer::new(||{
        App::new()
            .service(
                web::scope("/")
                    .guard(guard::Header("Host","www.rust-lang.org"))
                    .route("",web::to(||HttpResponse::Ok().body("www"))),
            )
            .service(
                web::scope("/")
                    .guard(guard::Header("Host","user.rust-lang.org"))
                    .route("",web::to(||HttpResponse::Ok().body("user"))),
            )
            .route("/",web::to(||HttpResponse::Ok()))
    })
    .bind("127.0.0.1:8083")?
    .run()
    .await
}
```

<h3>配置</h3>

为了简单性和可重用性，`App`和`web::Scope`都提供了`configure`方法。此函数可用于将配置部分移动到不同的模块甚至库。例如，一些资源的配置可以移动到不同的模块。

```rust
use actix_web::{web,App,HttpResponse,HttpServer};

// 此功能可以位于不同的模块中

fn scoped_config(cfg:&mut web::ServiceConfig){
    cfg.service(
        web::resource("/test")
        .route(web::get().to(||HttpResponse::Ok().body("test")))
        .route(web::head().to(||HttpResponse::MethodNotAllowed())),
    )
}

// 此功能可以位于不同的模块中

fn config(cfg:&mut web::ServiceConfig){
    cfg.service(
        web::resource("/app")
            .route(web::get().to(||HttpResponse::Ok().body("app")))
            .route(web::head().to(||HttpResponse::MethodNotAllowed()))

    )
}

#[actix_rt::main]
async fn main()->std::io::Result<()>{
    HttpServer::new(||{
        App::new()
            .configure(config)
            .service(web::scope("/api").configure(scoped_config))
            .route("/",web::get().to(||HttpResponse::Ok().body("/")))
    })
    .bind("127.0.0.1:8084")?
    .run()
    .await
}
```

上述示例的结果是：

```txt
/         -> "/"
/app      -> "app"
/api/test -> "test"

```

每个[`ServiceConfig`](https://docs.rs/actix-web/2/actix_web/web/struct.ServiceConfig.html)都可以拥有自己的`data`、`routes`和`service`。

### Server

[HttpServer](https://docs.rs/actix-web/2/actix_web/struct.HttpServer.html)类型负责为 http 请求提供服务

`HttpServe`r 接受应用程序工厂作为参数，应用程序工厂必须具有`Send`+`Sync`边界。在 _“多线程”_ 部分中详细介绍。

若要绑定到特定的套接字地址，必须使用 bind()，并且可以多次调用它。若要绑定 ssl 套接字，应使用`bind_openssl()`或`bind_rustls()`。要运行 http 服务器，请使用`httpServer::run()`方法。

```rust

use actix_web::{web, App, HttpResponse, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route("/", web::get().to(|| HttpResponse::Ok()))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

`run()`方法返回[`Server`](https://docs.rs/actix-web/2/actix_web/dev/struct.Server.html)类型的实例。服务器类型的方法可用于管理 http 服务器

- `pause()` - 暂停接受传入连接
- `resume()` - 继续接受传入连接
- `stop()` - 停止传入连接处理，停止所有 worker 并退出

下面的示例演示如何在单独的线程中启动 http 服务器。

```rust
use actix_rt::System;
use actix_web::{web, App, HttpResponse, HttpServer};
use std::sync::mpsc;
use std::thread;

#[actix_rt::main]
async fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let sys = System::new("http-server");

        let srv = HttpServer::new(|| {
            App::new().route("/", web::get().to(|| HttpResponse::Ok()))
        })
        .bind("127.0.0.1:8088")?
        .shutdown_timeout(60) // <-将关机超时设置为60秒
        .run();

        let _ = tx.send(srv);
        sys.run()
    });

    let srv = rx.recv().unwrap();

    // 暂停接受新连接
    srv.pause().await;
    // 继续接受新连接
    srv.resume().await;
    // 关停服务器
    srv.stop(true).await;
}

```

#### 多线程

HttpServer`会自动启动一些http工作进程，默认情况下，这个数目等于系统中逻辑cpu的数目。这个数字可以用`HttpServer::workers()`方法覆盖。

```rust
use actix_web::{web, App, HttpResponse, HttpServer};

#[actix_rt::main]
async fn main() {
    HttpServer::new(|| {
        App::new().route("/", web::get().to(|| HttpResponse::Ok()))
    })
    .workers(4); // <- Start 4 workers
}
```

创建工作线程后，它们各自接收一个单独的应用程序实例来处理请求。应用程序状态不在线程之间共享，处理程序可以自由地操作其状态副本，而不涉及并发问题。

应用程序状态不需要`send`或`sync`，但应用程序工厂必须是`send`+`sync`。

要在工作线程之间共享状态，请使用`Arc`。一旦引入共享和同步，就应该特别小心。在许多情况下，由于锁定共享状态以进行修改，会无意中引入性能成本。

在某些情况下，可以使用更有效的锁定策略来降低这些成本，例如使用`读/写锁`而不是互斥锁来实现非排他锁定，但是性能最高的实现往往是根本不发生锁定的实现。

由于每个工作线程按顺序处理其请求，因此阻止当前线程的处理程序将导致当前工作线程停止处理新请求：

```rust
fn my_handler() -> impl Responder {
    std::thread::sleep(Duration::from_secs(5)); // <-- 坏习惯！将导致当前工作线程挂起！
    "response"
}

```

因此，任何长的、非 cpu 限制的操作（如 I/O、数据库操作等）都应表示为未来函数或异步函数。异步处理程序由工作线程并发执行，因此不会阻止执行：

```rust
async fn my_handler() -> impl Responder {
    tokio::time::delay_for(Duration::from_secs(5)).await; // <-- OK! 工作线程将在此处理其他请求
    "response"
}
```

同样的限制也适用于提取器。当处理程序函数接收到实现`FromRequest`的参数，并且该实现阻塞当前线程时，工作线程将在运行处理程序时阻塞。出于这个原因，在实现提取器时必须特别注意，而且在需要时也应该异步实现提取器。

#### SSL

ssl 服务器有两个特性：`rustls`和`openssl`。`rustls`特性用于`rustls`集成，`openssl`用于`openssl`。

```toml
[dependencies]
actix-web = { version = "2.0", features = ["openssl"] }
openssl = { version="0.10" }
```

```rust

use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};

async fn index(_req: HttpRequest) -> impl Responder {
    "Welcome!"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // load ssl keys
    // to create a self-signed temporary cert for testing:
    // `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj '/CN=localhost'`
    let mut builder =
        SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
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

::: tip Note:
the HTTP/2.0 protocol requires tls alpn. At the moment, only openssl has alpn support. For a full example, check out [examples/openssl](https://github.com/actix/examples/blob/master/openssl).
:::

创建`key.pem`以及`cert.pem`使用命令。填写你自己的主题

```shell

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem \
  -days 365 -sha256 -subj "/C=CN/ST=Fujian/L=Xiamen/O=TVlinux/OU=Org/CN=muro.lxd"

```

要删除密码，请复制`nopass.pem`到`cert.pem`

```shell
openssl rsa -in key.pem -out nopass.pem
```

#### Keep-Alive

Actix 可以在保持活动连接上等待请求。

_`keep-alive`_ 连接行为由服务器设置定义。

- `75`, `Some(75)`, `KeepAlive::Timeout(75)` - 启用 75 秒*keep alive*计时器
- `None` or `KeepAlive::Disabled` - 禁用 _keep alive_
- `KeepAlive::Tcp(75)` - 使用`SO_KEEPALIVE` socket 选项

```rust
use actix_web::{web,App,HttpReesponse,HttpServer};

#[actix_rt::main]

async fn main() -> std::io::Result<()>{
    let one =HttpServer::new(||{
        App::new().route("/",web::get().to(||HttpResponse::Ok()))
    })
    .keep_alive(75); // 设置keep-alive 75s
    let _three =HttpServer::new(||{
        App::new().route("/",web::get().to(||HttpResponse::Ok()))
    })
    .keep_alive(None);  // 禁用keep-alive
    one.bind("127.0.0.1:8088")?
    .run().await
}
```

如果选择了上面的第一个选项，那么将根据响应的连接类型计算保持活动状态。默认情况下，未定义`HttpResponse::connection_type`。在这种情况下，keep alive 由请求的 http 版本定义。

对于 HTTP/1.0，*keep alive*处于关闭状态；对于 HTTP/1.1 和 HTTP/2.0，*keep alive*处于打开状态。

可以使用`HttpResponseBuilder::Connection_type()`方法更改连接类型。

```rust

use actix_web::{http,HttpRequest,HttpResponse};

async fn index(req:HttpRequest)->HttpResponse {

    HttpResponse::Ok()
        .connection_type(http::ConnectionType::Close()) // 关闭连接
        .force_close()  // 替代方法
        .finish()
}
```

#### 平滑关闭

`HttpServer`支持正常关机。在收到停止信号后，工作人员有一定的时间来完成服务请求。
超时后仍活着的工人将被强制放弃。默认情况下，关闭超时设置为 30 秒。可以使用`HttpServer::shutdown_timeout()`方法更改此参数。

你可以使用服务器地址向服务器发送停止消息，并指定是否要正常关机, `start()`方法返回服务器的地址。

`HttpServer`处理多个操作系统信号。*CTRL-C*可用于所有操作系统，其他信号可用于 unix 系统。

- _SIGINT_ - 强制关闭 workers
- _SIGTERM_ - 平滑关闭 workers
- _SIGQUIT_ - 强制关闭 workers

可以使用`HttpServer::disable_signals()`方法禁用信号处理

### Handler(处理器)

请求处理程序是一个异步函数，它接受可以从请求（即[_impl FromRequest_](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html)）提取的零个或多个参数，并返回可以转换为 HttpResponse（即 [_impl Responder_](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)）的类型。

请求处理分两个阶段进行。首先调用处理程序对象，返回实现[`*Responder*`](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)特性的任何对象。然后，对返回的对象调用`respond_to()`，将其自身转换为`HttpResponse`或`Error`。

默认情况下，actix-web 为某些标准类型（如&'static str、String 等）提供响应程序实现。

有关实现的完整列表，请查看[_Responder_](https://docs.rs/actix-web/2/actix_web/trait.Responder.html#foreign-impls) 文档。

有效处理程序示例：

```rust
async fn index(req:HttpRequest) -> &'static str{
    "Hello world!"
}

```

```rust
async fn index(req:HttpRequest) -> String{
    "Hello world!".to_owned()
}

```

你还可以更改签名以返回`impl Responder`，如果涉及到更复杂的类型，则该签名可以正常工作。

```rust

async fn index(req:HttpRequest) ->impl Responder {
    Bytes::from_static(b"Hello world")
}
```

```rust

async fn index(req: HttpRequest) -> Box<Future<Item=HttpResponse, Error=Error>> {
    ...
}
```

#### 定制响应类型

若要直接从处理程序函数返回自定义类型，该类型需要实现`Responder`特性。

让我们为序列化为`application/json`响应的自定义类型创建一个响应：

```rust
use actix_web::{Error,HttpRequest,HttpResponse,Responder};
use serde::Serialize;
use futures::future::{ready, Ready};

#[derive(Serialize)]
struct MyObj {
    name: &'static str,
}

// Responder
impl Responder for MyObj {
    type Error = Error;
    type Future = Ready<Result<HttpResponse, Error>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        // Create response and set content type
        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

async fn index() ->impl Responder{
    MyObj {name:"Hello user"}
}

```

#### 流式响应体

响应体可以异步生成。在这种情况下，body 必须实现流特征 `Stream<Item=Bytes，Error=Error>`，即：

```rust
use actix_web::{web, App, HttpServer, Error, HttpResponse};
use bytes::Bytes;
use futures::stream::once;
use futures::future::ok;

async fn index() -> HttpResponse {
    let body = once(ok::<_, Error>(Bytes::from_static(b"test")));

    HttpResponse::Ok()
        .content_type("application/json")
        .streaming(body)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/async", web::to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

#### 不同的返回类型（任意一种）

有时，你需要返回不同类型的响应。例如，可以进行错误检查并返回错误、返回异步响应或任何需要两种不同类型的结果。

在这种情况下，[两种](https://docs.rs/actix-web/2/actix_web/enum.Either.html)类型都可以使用。允许将两个不同的响应程序类型合并为一个类型。

```rust

use actix_web::{Either, Error, HttpResponse};

type RegisterResult = Either<HttpResponse, Result<&'static str, Error>>;

fn index() -> RegisterResult {
    if is_a_variant() {
        // <- choose variant A
        Either::A(HttpResponse::BadRequest().body("Bad data"))
    } else {
        // <- variant B
        Either::B(Ok("Hello!"))
    }
}
```

### Extractors(提取器)

`Actix-web`为类型安全的请求信息访问提供了一个称为提取器的工具（即 impl FromRequest）。默认情况下，`actix-web`提供了几个提取器实现。

提取器可以作为处理程序函数的参数访问。`Actix-web`支持每个处理函数最多 10 个提取器，参数的位置无关紧要。

```rust
async fn index(){
    path :web::Path<(String,String)>,
    json:web::Json(MyInfo),
} -> impl Responder {
    format!("{} {} {} {}",path.0,path.1,path.id,json.username)
}
```

#### Path

[`*Path*`](https://docs.rs/actix-web/2/actix_web/dev/struct.Path.html)提供可以从请求路径提取的信息。可以反序列化路径中的任何变量段。

例如，对于为`/users/{userid}/{friend}`路径注册的资源，可以反序列化两个段：`userid`和`friend`。这些段可以被提取到`tuple`中，即`Path<（u32，String）>`或任何实现*serde* crate`反序列化`特性的结构中。

```rust
use actix_web::{web, Result};

/// extract path info from "/users/{userid}/{friend}" url
/// {userid} -  - deserializes to a u32
/// {friend} - deserializes to a String
async fn index(info: web::Path<(u32, String)>) -> Result<String> {
    Ok(format!("Welcome {}, userid {}!", info.1, info.0))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| {
        App::new().route(
            "/users/{userid}/{friend}", // <- define path parameters
            web::get().to(index),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

还可以将路径信息提取到实现*serde*`反序列化`特性的特定类型。下面是一个使用*serde*而不是*tuple*类型的等效示例。

```rust
use actix_web::{web, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    userid: u32,
    friend: String,
}

/// extract path info using serde
async fn index(info: web::Path<Info>) -> Result<String> {
    Ok(format!("Welcome {}, userid {}!", info.friend, info.userid))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| {
        App::new().route(
            "/users/{userid}/{friend}", // <- define path parameters
            web::get().to(index),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

还可以按名称`get`或`query`路径参数请求:

```rust
async fn index(req: HttpRequest) -> Result<String> {
    let name: String =
        req.match_info().get("friend").unwrap().parse().unwrap();
    let userid: i32 = req.match_info().query("userid").parse().unwrap();

    Ok(format!("Welcome {}, userid {}!", name, userid))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| {
        App::new().route(
            "/users/{userid}/{friend}", // <- define path parameters
            web::get().to(index),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

#### Query

[*`查询`*](https://docs.rs/actix-web/2/actix_web/web/struct.Query.html) 类型为请求的查询参数提供提取功能。下面使用的是*serde_urlencoded*`crate`

```rust

use actix_web::web;
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

// this handler get called only if the request's query contains `username` field
async fn index(info: web::Query<Info>) -> String {
    format!("Welcome {}!", info.username)
}

```
#### Json

[*Json*](https://docs.rs/actix-web/2/actix_web/web/struct.Json.html) 允许将请求体反序列化为结构。要从请求体中提取类型化信息，类型`T`必须实现*serde*的`反序列化`特性。

```rust
use actix_web::{web, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

/// deserialize `Info` from request's body
async fn index(info: web::Json<Info>) -> Result<String> {
    Ok(format!("Welcome {}!", info.username))
}

```

一些提取器提供了配置提取过程的方法。用于配置的Json提取器[*JsonConfig*](https://docs.rs/actix-web/2/actix_web/web/struct.JsonConfig.html)类型。要配置提取器，请将其配置对象传递给资源的`.data()`方法。如果是Json提取器，则返回*JsonConfig*。你可以配置json负载的最大大小以及自定义错误处理程序函数。

下面的示例将负载大小限制为4kb，并使用自定义错误处理程序。

```rust
use actix_web::{error, web, FromRequest, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

/// deserialize `Info` from request's body, max payload size is 4kb
async fn index(info: web::Json<Info>) -> impl Responder {
    format!("Welcome {}!", info.username)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| {
        App::new().service(
            web::resource("/")
                // change json extractor configuration
                .app_data(web::Json::<Info>::configure(|cfg| {
                    cfg.limit(4096).error_handler(|err, _req| {
                        // create custom error response
                        error::InternalError::from_response(
                            err,
                            HttpResponse::Conflict().finish(),
                        )
                        .into()
                    })
                }))
                .route(web::post().to(index)),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```


#### Form

目前，只支持url编码的表单。url编码的正文可以提取到特定类型。此类型必须实现*serde* crate 的`反序列化`特性。


[*FormConfig*](https://docs.rs/actix-web/2/actix_web/web/struct.FormConfig.html) 允许配置提取过程。

```rust
use actix_web::{web, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct FormData {
    username: String,
}

/// extract form data using serde
/// this handler gets called only if the content type is *x-www-form-urlencoded*
/// and the content of the request could be deserialized to a `FormData` struct
async fn index(form: web::Form<FormData>) -> Result<String> {
    Ok(format!("Welcome {}!", form.username))
}
```

#### Other

`Actix-web`还提供了其他几个提取器：

- [*Data*](https://docs.rs/actix-web/2/actix_web/web/struct.Data.html) - 如果需要访问应用程序状态。
- `HttpRequest` - 本身是一个提取器，它返回self，以防需要访问请求。
- `String` - 你可以将请求的负载转换为`String`,[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-2) 在文档字符串中可用。
- `bytes::Bytes` -你可以将请求的负载转换为`Bytes`,[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-4)在文档字符串中可用。
- `Payload` -你可以访问请求的有效负载,[示例](https://docs.rs/actix-web/2/actix_web/web/struct.Payload.html)


#### 应用程序状态提取器

使用`web::Data`提取器可以从处理程序访问应用程序状态；但是，可以将状态作为只读引用访问。如果需要对状态的可变访问，则必须实现它。


::: waring 小心
actix会创建应用程序状态和处理程序的多个副本。它为每个线程创建一个副本。
:::

以下是存储已处理请求数的处理程序示例:

```rust
use actix_web::{web, Responder};
use std::cell::Cell;

#[derive(Clone)]
struct AppState {
    count: Cell<i32>,
}

async fn show_count(data: web::Data<AppState>) -> impl Responder {
    format!("count: {}", data.count.get())
}

async fn add_one(data: web::Data<AppState>) -> impl Responder {
    let count = data.count.get();
    data.count.set(count + 1);

    format!("count: {}", data.count.get())
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    let data = AppState {
        count: Cell::new(0),
    };

    HttpServer::new(move || {
        App::new()
            .data(data.clone())
            .route("/", web::to(show_count))
            .route("/add", web::to(add_one))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}

```

尽管此处理程序可以工作，但`self.0`将根据线程数和每个线程处理的请求数而有所不同。正确的实现将使用`Arc`和`AtomicUsize`

```rust
use actix_web::{web, Responder};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

#[derive(Clone)]
struct AppState {
    count: Arc<AtomicUsize>,
}

async fn show_count(data: web::Data<AppState>) -> impl Responder {
    format!("count: {}", data.count.load(Ordering::Relaxed))
}

async fn add_one(data: web::Data<AppState>) -> impl Responder {
    data.count.fetch_add(1, Ordering::Relaxed);

    format!("count: {}", data.count.load(Ordering::Relaxed))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    let data = AppState {
        count: Arc::new(AtomicUsize::new(0)),
    };

    HttpServer::new(move || {
        App::new()
            .data(data.clone())
            .route("/", web::to(show_count))
            .route("/add", web::to(add_one))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

注意同步原语，如`Mutex`或`RwLock`,`actix-web`框架异步处理请求。通过阻塞线程执行，所有并发请求处理进程都将阻塞。如果需要从多个线程共享或更新某些状态，请考虑使用tokio同步原语。

## 高级

### Error 错误

`Actix-web`使用自己的`Actix-web::error::error` type和`Actix-web::error::ResponseError`特性从web处理程序处理错误。

如果处理程序在还实现`ResponseError`特征的结果中返回`Error`（指一般的[Rust trait std::Error::Error](https://doc.rust-lang.org/std/error/trait.Error.html)），`actix-web`将该错误呈现为HTTP响应，其对应的`actix_web::HTTP::StatusCode`，默认情况下生成内部服务器错误：

```rust
pub train ResponseError {
    fn error_response(&self) ->HttpResponse;
    fn status_code(&self) ->StatusCode;
}

```

`Responder`程序将兼容`结果`强制为HTTP响应：

```rust
impl<T:Responder,E:Into<Error>> Responder for Result <T,E>
```

上面代码中的`Error`是`actix-web`的错误定义，任何实现`ResponseError`的错误都可以自动转换为一个错误。

`Actix-web`为一些常见的非Actix错误提供`ResponseError`实现。例如，如果处理程序以`io::Error`响应，则该错误将转换为`HttpInternalServerError`：

```rust

use std::io;
fn index(req:HttpRequest) ->io::Result<fs::NameFile>{
    Ok(fs::NameFile::open("static/index.html")?)
}
```
请参阅[actix-web API文档](https://docs.rs/actix-web/2/actix_web/error/trait.ResponseError.html#foreign-impls)，以获取`ResponseError`的外部实现的完整列表。

#### 自定义错误响应的示例

下面是`ResponseError`的一个实现示例：

```rust
use actix_web::{error,Result};
use failure::Fail;

#[derive](Fail,Debug)
#[fail(display="my error")]

struct MyError{
    name:&'static str,
}

// 对`error_response()` 方法使用默认实现

async fn index()->Result<&'static str,MyError>{
    Err(MyError {name:"test"})
}
```

`ResponseError`有一个`error_response()`的默认实现，它将呈现一个500（内部服务器错误），当上面的`index`处理程序执行时，就会发生这种情况。

重写`error_response()`以生成更有用的结果：

```rust
use actix_http::ResonderBuilder;
use actix_web::{error,http::header,http::StatusCode,HttpResponse};
use failure::Fail;

#[derive(Fail,Debug)]

enum MyError{
    #[fail(display="internal error")]
    InternalError,
    #[fail(display="bad request")]
    BadClientData,
    #[fail(display="timeout")]
    Timeout,
}

impl error::ResponseError for MyError{
    fn error_response(&self) -> HttpResponse {
        ResponseBuilder::new(self.status_code())
            .set_header(header::CONTENT_TYPE,"text/html;charset=utf-8")
            .body(self.to_string())
    }
    fn status_code(&self)->StatusCode{
        match *self{
            MyError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            MyError::BadClientData => StatusCode::BAD_REQUEST,
            MyError::Timeout => StatusCode::GATEWAY_TIMEOUT,
        }
    }
}

async fn index()->Result<&'static str,MyError>{
    Err(MyError::BadClientData)
}
```

#### Error帮助器

`Actix-web`提供了一组错误助手函数，这些函数对于从其他错误生成特定的HTTP错误代码非常有用。在这里，我们使用`map_err`将未实现`ResponseError`特性的`MyError`转换为 *400* （错误请求）：

```rust
use actix_web::{error,Result};

#[derive(Debug)]

struct MyError {
    name:&'static str,
}

async fn index()->Result<&'static str> {
    let result:Result<&'static str,MyError>=Err(MyError{name:"test Error!"});
    Ok(result.map_errz(|e|error::ErrorBadRequest(e.name))?)
}

```

有关可用错误帮助程序的完整列表，请参阅[actix-web错误模块的API文档](https://docs.rs/actix-web/2/actix_web/error/struct.Error.html)。



#### 故障兼容

`Actix-web`提供了与故障库的自动兼容性，因此派生失败的`错误`将自动转换为Actix错误。请记住，除非你还为这些错误提供了自己的`error_response()`实现，否则这些错误将以默认的*500*状态代码呈现。

#### 错误日志

Actix在`WARN`日志级别记录所有错误。如果应用程序的日志级别设置为“`调试`”，并且启用了`RUST_BACKTRACE`，则也会记录该回溯。这些是可配置的环境变量：

```shell
>> RUST_BACKTRACE=1 RUST_LOG=actix_web=debug cargo run
```

`Error`类型使用原因的错误回溯（如果可用）。如果基础故障不提供回溯，则会构造一个新的回溯，指向发生转换的点（而不是错误的来源）。


#### 错误处理的推荐实践

考虑将应用程序产生的错误分成两大类可能是有用的：一类是面向用户的错误，另一类不是面向用户的错误。


前者的一个例子是，我可能使用failure指定一个`UserError`枚举，该枚举封装了`ValidationError`，以便在用户发送错误输入时返回：

```rust
use actix_http::ResponseBuilder;
use actix_web::{error,http::header,http::StatusCode,HttpResponse};
use failure::Fail;

#[derive(Fail,Debug)]

enum UserError {
    #[fail(display ="Validation error on field:{}",field)]
    ValidationError(field:String)
}   

impl error::ResponseError for UserError {
     fn error_response(&self) -> HttpResponse {
        ResponseBuilder::new(self.status_code())
            .set_header(header::CONTENT_TYPE, "text/html; charset=utf-8")
            .body(self.to_string())
    }
    fn status_code(&self) -> StatusCode {
        match *self {
            UserError::ValidationError { .. } => StatusCode::BAD_REQUEST,
        }
    }
}


```

这将完全按照预期操作，因为使用`display`定义的错误消息是以用户要读取的明确意图编写的。

然而，对于所有的错误来说，回发错误消息并不可取——在服务器环境中，可能会发生许多错误，我们可能希望在其中向用户隐藏细节。
例如，如果数据库关闭，客户端库开始产生连接超时错误，或者HTML模板的格式不正确，并且在呈现时出错。在这些情况下，最好将错误映射到适合用户使用的通用错误。

下面是一个将内部错误映射到带有自定义消息的面向用户的`InternalError`的示例：

```rust
use actix_http::ResponseBuilder;
use actix_web::{error, http::header, http::StatusCode, HttpResponse};
use failure::Fail;

#[derive(Fail, Debug)]
enum UserError {
    #[fail(display = "An internal error occurred. Please try again later.")]
    InternalError,
}

impl error::ResponseError for UserError {
    fn error_response(&self) -> HttpResponse {
        ResponseBuilder::new(self.status_code())
            .set_header(header::CONTENT_TYPE, "text/html; charset=utf-8")
            .body(self.to_string())
    }
    fn status_code(&self) -> StatusCode {
        match *self {
            UserError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

async fn index() -> Result<&'static str, UserError> {
    do_thing_that_failes().map_err(|_e| UserError::InternalError)?;
    Ok("success!")
}
```

通过将错误分为面向用户的错误和不面向用户的错误，我们可以确保不会意外地将用户暴露在应用程序内部抛出的错误中，而这些错误是他们不想看到的。

#### 错误日志

这是一个使用`middleware::Logger`的基本示例：

```rust
use actix_web::{error, Result};
use failure::Fail;
use log::debug;

#[derive(Fail, Debug)]
#[fail(display = "my error")]
pub struct MyError {
    name: &'static str,
}

// Use default implementation for `error_response()` method
impl error::ResponseError for MyError {}

async fn index() -> Result<&'static str, MyError> {
    let err = MyError { name: "test error" };
    debug!("{}", err);
    Err(err)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{middleware::Logger, web, App, HttpServer};

    std::env::set_var("RUST_LOG", "my_errors=debug,actix_web=info");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .route("/", web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

### URL Dispatch

URL分派提供了一种简单的方法，可以使用简单的模式匹配语言将URL映射到处理程序代码。如果其中一个模式匹配与请求关联的路径信息，则调用特定的处理程序对象。

请求处理程序是一个函数，它接受可以从请求（即[*impl FromRequest*](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html)）提取的零个或多个参数，并返回可以转换为HttpResponse（即[*impl Responder*](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)）的类型。[处理程序](https://actix.rs/docs/handlers/)部分提供了更多信息。

#### 资源配置

资源配置是向应用程序添加新资源的行为。资源有一个名称，它充当用于生成URL的标识符。该名称还允许开发人员向现有资源添加路由。
资源也有一个模式，用于与URL的`path`部分（scheme和port后面的部分，例如`URL`中的`/foo/bar`）匹配`http://localhost:8080/foo/bar?q=value`）。
它与查询部分不匹配（后面的部分？，例如，`q=value`在 `http://localhost:8080/foo/bar?q=value`）。

`App::route()`方法提供了注册路由的简单方法。此方法将单个路由添加到应用程序路由表。此方法接受路径模式、http方法和处理程序函数。对于同一个路径，可以多次调用route()方法，在这种情况下，多个路由为同一个资源路径注册。

```rust
use actix_web::{web,App,HttpResponse,HttpServer};

async fn index()->HttpResponse {
    HttpResponse::Ok().body("Hello")
}

#[actix_rt::main]
async fn main() ->std::io::Result<()>{
    HttpServer::new(||{
        App::new()
            .route("/",web::get().to(index))
            .route("/user",web::post().to(index))
    })
    .bind("127.0.0.1:8084")?
    .await
}

```

虽然*App::route()*提供了注册路由的简单方法，但要访问完整的资源配置，必须使用不同的方法。`App::service()`方法将单个[resource](https://docs.rs/actix-web/2/actix_web/struct.Resource.html)添加到应用程序路由表中。此方法接受路径模式、保护和一个或多个路径

```rust
use actix_web::{guard,web,App,HttpResponse};

fn index()->HttpResponse{
    HttpResponse::Ok().body("Hello!")
}

pub fn main(){
    App::new()
    .service(web::resource("/prefix").to(index))
    .service(
        .name("user_detail")
        .guard(guard::Header("content-type","application/json"))
        .route(web::get().to(||HttpResponse::Ok()))
        .route(web::put().to(||HttpResponse::Ok()))
    )
}

```

如果资源不包含任何路由或没有任何匹配的路由，则返回`NOT FOUND`的http响应。


#### 配置一个路由

资源包含一组路由。每条路线依次有一组`guards`和一个处理器。可以使用`Resource::route()`方法创建新路由，该方法返回对新路由实例的引用。默认情况下，路由不包含任何保护，因此匹配所有请求，默认处理程序为：`HttpNotFound`。

应用程序根据在资源注册和路由注册期间定义的路由条件路由传入请求。资源匹配它包含的所有路由，其顺序为通过`Resource::route()`注册路由的顺序。

一个路由可以包含任意数量的守卫，但只能包含一个处理程序。

```rust
App::new().service(
    web::resource("/path").route(
        web::route()
            .guard(guard::Get())
            .guard(gurad::Header("content-type","text/plain"))
            .to(||HttpResponse::Ok()),
    )
)
```

在本例中，如果GET请求包含`Content-Type`头，则返回`HttpResponse::Ok()`，该头的值为text/plain，路径等于`/path`。

如果资源无法匹配任何路由，则返回“`NOT FOUND`”响应。

`ResourceHandler::route()`返回路由对象。可以使用类似于生成器的模式配置路由。以下配置方法可用：

- `Route::guard()`      - 注册一个新的guard。每条路线可登记任何数量的守卫。
- `Route::method()`     - 注册方法保护程序。每条路线可登记任何数量的守卫。
- `Route::to()`         - 为此路由注册处理程序函数。只能注册一个处理程序。通常，处理程序注册是最后一个配置操作。
- `Route::to_async()`   - 为此路由注册一个异步处理程序函数。只能注册一个处理程序。处理程序注册是最后一个配置操作。


#### 路由匹配

路由配置的主要目的是根据URL路径模式匹配（或不匹配）请求的`path`,`path`表示请求的URL的路径部分。

`actix-web` 做这件事的方式非常简单。当请求进入系统时，对于系统中存在的每个资源配置声明，actix会根据声明的模式检查请求的路径。
此检查按通过`App::service()`方法声明路由的顺序进行。如果找不到资源，则使用默认资源作为匹配的资源。

声明路由配置时，它可能包含路由保护参数。与路由声明关联的所有路由保护必须为`true`，才能在检查期间将路由配置用于给定请求。
如果提供给路由配置的路由保护参数集中的任何保护在检查期间返回`false`，则跳过该路由，并继续通过有序的路由集进行路由匹配。

如果任何路由匹配，则停止路由匹配进程并调用与该路由关联的处理程序。如果在用尽所有路由模式后没有匹配的路由，则返回一个`NOT FOUND`的响应。

#### 资源模式语法

actix在pattern参数中使用的模式匹配语言的语法很简单。

路由配置中使用的模式可以以斜线字符开头。如果模式不是以斜杠字符开头，则在匹配时会在其前面加上一个隐式斜杠。例如，以下模式是等效的：

```text
{foo}/bar/baz
```

和

```text
/{foo}/bar/baz
```

变量部分（替换标记）以`{identifier}`的形式指定，这里的意思是“接受下一个斜杠字符之前的任何字符，并将其用作`HttpRequest.match_info()`对象”。

模式中的替换标记与正则表达式`[^{}/]`+匹配。

`match_info`是`Params`对象，表示根据路由模式从URL提取的动态部分。它可用作请求匹配信息. 例如，以下模式定义了一个文本段（`foo`）和两个替换标记（`baz`和`bar`）：

```text
foo/{baz}/{bar}
```

上述模式将匹配这些url，并生成以下匹配信息：

```text
foo/1/2        -> Params {'baz':'1', 'bar':'2'}
foo/abc/def    -> Params {'baz':'abc', 'bar':'def'}
```

但是，它与以下模式不匹配：

```text
foo/1/2/        -> No match (trailing slash)
bar/abc/def     -> First segment literal mismatch
```

段中段替换标记的匹配将只完成到模式中段中的第一个非字母数字字符。因此，例如，如果使用此路由模式：

```text
foo/{name}.html
```

字面路径`/foo/biz.html`将匹配上述路由模式，匹配结果将是`Params{'name'：'biz'}`。但是，字面路径 `/foo/biz`将不匹配，因为它在由`{name}.html`表示的段末尾不包含字面 `.html`（它只包含`biz`，而不包含`biz.html`).

要捕获这两个片段，可以使用两个替换标记：

```text
foo/{name}.html
```
字面路径`/foo/biz.html`将匹配上述路由模式，匹配结果将是`Params{'name'：'biz'，'ext'：'html'}`。发生这种情况是因为有一个文字部分。（句点）在两个替换标记`{name}`和`{ext}`之间。

替换标记可以选择指定一个正则表达式，该正则表达式将用于确定路径段是否应与标记匹配。若要指定替换标记应仅匹配由正则表达式定义的特定字符集，必须使用稍微扩展的替换标记语法形式。
在大括号中，替换标记名后面必须跟一个冒号，然后紧接着是正则表达式。与替换标记`[^/]+`关联的默认正则表达式匹配一个或多个不是斜线的字符。例如，在hood下，替换标记`{foo}`可以更详细地拼写为`{foo:[^/]+}`。
你可以将其更改为任意正则表达式以匹配任意字符序列，例如`{foo:\d+}`以仅匹配数字。

段必须至少包含一个字符才能匹配段替换标记。例如，对于URL`/abc/`：

- `/abc/{foo}` 不匹配。
- `/{foo}` 匹配。

:::tip Note:
在匹配模式之前，路径将不带引号并解码为有效的unicode字符串，表示匹配路径段的值也将不带引号。
:::

例如，以下模式：

```text
foo/{bar}
```

当匹配以下URL时：


```text
http://example.com/foo/La%20Pe%C3%B1a
```
匹配字典将如下所示（值是URL-decoded）：

```text
Params{'bar': 'La Pe\xf1a'}
```

路径段中的文本字符串应表示提供给actix的路径的解码值。你不想在模式中使用`URL-encoded`的值。例如，而不是这样：

```text
/Foo%20Bar/{baz}
```

你会想用这样的东西：

```text
/Foo Bar/{baz}
```

有可能得到“`尾匹配`”。为此，必须使用自定义正则。

```text
foo/{bar}/{tail:.*}
```

上述模式将匹配这些url，并生成以下匹配信息：

```text
foo/1/2/           -> Params{'bar':'1', 'tail': '2/'}
foo/abc/def/a/b/c  -> Params{'bar':u'abc', 'tail': 'def/a/b/c'}
```


#### Routes范围

作用域帮助你组织共享公用根路径的路由。可以在作用域内嵌套作用域。

假设你想要组织指向用于查看“用户”的端点的路径。这些路径可以包括：

- `/users`
- `/users/show`
- `/users/show/{id}`

这些路径的作用域布局如下所示

```rust
async fn show_users() -> HttpResponse {
    HttpResponse::Ok().body("Show users")
}

async fn user_detail(path: web::Path<(u32,)>) -> HttpResponse {
    HttpResponse::Ok().body(format!("User detail: {}", path.0))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            web::scope("/users")
                .route("/show", web::get().to(show_users))
                .route("/show/{id}", web::get().to(user_detail)),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

局部路径可以包含变量路径段作为资源。与非工作路径一致。

你可以从`HttpRequest::match_info()`获取变量路径段。路径提取器还可以提取范围级别的变量段。


#### 匹配信息

所有表示匹配路径段的值都可以在`HttpRequest::match_info`中找到。可以使用`Path::get()`检索特定值。

```rust
use actix_web::{HttpRequest, HttpResponse, Result};

async fn index(req: HttpRequest) -> Result<String> {
    let v1: u8 = req.match_info().get("v1").unwrap().parse().unwrap();
    let v2: u8 = req.match_info().query("v2").parse().unwrap();
    let (v3, v4): (u8, u8) = req.match_info().load().unwrap();
    Ok(format!("Values {} {} {} {}", v1, v2, v3, v4))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .route("/a/{v1}/{v2}/", web::get().to(index))
            .route("", web::get().to(|| HttpResponse::Ok()))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

对于路径“`/a/1/2/`”的本例，值v1和v2将解析为“`1`”和“`2`”。

可以从尾部路径参数创建`PathBuf`。返回的`PathBuf`已解码百分比。如果段等于“..”，则跳过上一段（如果有）

为安全起见，如果某个段满足以下任何条件，则返回一个`Err`，指示满足的条件：

- 解码以下任一项开头：`. `(除了 `..`),` *`
- 解码以下任一项结尾：`:`,`>`,`<`
- 解码包含以下一项：`/`
- 在Windows上，解码段包含:‘'
- 百分比编码导致无效的UTF8。

由于这些条件，从请求路径参数解析的`PathBuf`可以安全地插入或用作路径的后缀，而无需额外检查。

```rust
use actix_web::{HttpRequest, Result};
use std::path::PathBuf;

async fn index(req: HttpRequest) -> Result<String> {
    let path: PathBuf = req.match_info().query("tail").parse().unwrap();
    Ok(format!("Path {:?}", path))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| App::new().route(r"/a/{tail:.*}", web::get().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

#### 路径信息抽取器

Actix提供类型安全路径信息提取功能。[`路径`](https://docs.rs/actix-web/2/actix_web/dev/struct.Path.html) 提取信息，目的地类型可以定义为几种不同的形式。最简单的方法是使用`tuple`类型。
元组中的每个元素必须对应于路径模式中的一个元素。比如：可以将路径模式`/{id}/{username}/`与`Path<(u32，String)>`类型匹配，但`路径<(String,String,String)>`类型将始终失败。

```rust
use actix_web::{web,Result};

async fn index(info::web::Path<(String,u32)>) ->Result<String>{
    Ok(format!("Welcome {} ！ id:{}",info.0,info.1))
}

#[actix_rt::main]
async fn main() ->std::io::Result<()>{
    use actix_web::{App,HttpServer};

    HttpServer::new(||{
        App::new()
            .route("/{username}/{id}/index.html",
                web::get().to(index)
            )
    })
    .bind("127.0.0.1:8085")?
    .run()
    .await
}
```

还可以将路径模式信息提取到结构,在这种情况下，此结构必须实现*serde的*`反序列化`特性。

```rust
use actix_web::{web, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

// extract path info using serde
async fn index(info: web::Path<Info>) -> Result<String> {
    Ok(format!("Welcome {}!", info.username))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| {
        App::new().route(
            "/{username}/index.html", // <- define path parameters
            web::get().to(index),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

[查询](https://docs.rs/actix-web/2/actix_web/web/struct.Query.html)为请求查询参数提供类似的功能。

#### 生成资源URL

使用的[*HttpRequest.url()*](https://docs.rs/actix-web/2/actix_web/struct.HttpRequest.html#method.url_for) 根据资源模式生成URL的方法。例如，如果你配置了名为“`foo`”且模式为“`{a}/{b}/{c}`”的资源，则可以执行以下操作：

```rust
use actix_web::{guard, http::header, HttpRequest, HttpResponse, Result};

async fn index(req: HttpRequest) -> Result<HttpResponse> {
    let url = req.url_for("foo", &["1", "2", "3"])?; // <- 为"foo"资源生成url

    Ok(HttpResponse::Found()
        .header(header::LOCATION, url.as_str())
        .finish())
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .service(
                web::resource("/test/{a}/{b}/{c}")
                    .name("foo") // <- set resource name, then it could be used in `url_for`
                    .guard(guard::Get())
                    .to(|| HttpResponse::Ok()),
            )
            .route("/test/", web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

这将返回类似字符串的内容`http://example.com/test/1/2/3`（至少在当前协议和主机名暗示`http://example.com`网站). 方法返回url对象，以便你可以修改此url（添加查询参数、锚等）。只能为命名资源调用`url_for()`，否则返回错误。


#### 外部资源

资源是有效的url，可以注册为外部资源。它们只用于URL生成，从不考虑在请求时进行匹配。

```rust
use actix_web::{HttpRequest, Responder};

async fn index(req: HttpRequest) -> impl Responder {
    let url = req.url_for("youtube", &["oHg5SJYRHA0"]).unwrap();
    assert_eq!(url.as_str(), "https://youtube.com/watch/oHg5SJYRHA0");

    url.into_string()
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .external_resource("youtube", "https://youtube.com/watch/{video_id}")
            .route("/", actix_web::web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```



#### 路径规范化和重定向到斜线附加路由

规范化意味着：

- 在路径中添加尾随斜杠。
- 将多个斜线替换为一个斜线。

处理程序在找到正确解析的路径后立即返回。如果启用了所有规范化条件，则规范化条件的顺序为`1)merge`、`2)merge`和append以及`3)append`。如果路径至少使用其中一个条件解析，它将重定向到新路径。

```rust
use actix_web::{middleware, HttpResponse};

async fn index() -> HttpResponse {
    HttpResponse::Ok().body("Hello")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::NormalizePath)
            .route("/resource/", web::to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

在本例中，`//resource///`将被重定向到`/resource/`。

在本例中，为所有方法注册了路径规范化处理程序，但不应依赖此机制来重定向`POST`请求。`NOT FOUND`斜杠追加的重定向会将`POST`请求转换为`GET`，从而丢失原始请求中的任何`POST`数据。

只能为`GET`请求注册路径规范化：

```rust
use actix_web::{http::Method, middleware, web, App, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::NormalizePath)
            .route("/resource/", web::get().to(index))
            .default_service(web::route().method(Method::GET))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```
#### 使用应用程序前缀组合应用程序

`web::scope()`方法允许设置特定的应用程序范围。此作用域表示一个资源前缀，该前缀将作为资源配置添加的所有资源模式的前缀。这可用于帮助在不同的位置装入一组路由，而不是包含的可调用文件的作者想要的位置，同时仍然保持相同的资源名称。

例如：

```rust
async fn show_users() -> HttpResponse {
    HttpResponse::Ok().body("Show users")
}

async fn user_detail(path: web::Path<(u32,)>) -> HttpResponse {
    HttpResponse::Ok().body(format!("User detail: {}", path.0))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            web::scope("/users")
                .route("/show", web::get().to(show_users))
                .route("/show/{id}", web::get().to(user_detail)),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

在上面的示例中，`show_users`路由将有一个有效的路由模式`/users/show`而不是`/show`，因为应用程序的作用域将在该模式之前。只有当URL路径是`/users/show`，并且`HttpRequest.url_for()`函数是用路由名`show_users`调用的，它将生成具有相同路径的URL。


#### 自定义线路守卫

你可以将保护程序看作一个简单的函数，它接受请求对象引用并返回`true`或`false`。在形式上，[守卫](https://docs.rs/actix-web/2/actix_web/guard/trait.Guard.html) 是实现守卫特性的任何对象。Actix提供了几个谓词，可以检查api文档的函数部分。

下面是一个简单的保护程序，用于检查请求是否包含特定的头：


```rust
use actix_web::{dev::RequestHead, guard::Guard, http, HttpResponse};

struct ContentTypeHeader;

impl Guard for ContentTypeHeader {
    fn check(&self, req: &RequestHead) -> bool {
        req.headers().contains_key(http::header::CONTENT_TYPE)
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new().route(
            "/",
            web::route()
                .guard(ContentTypeHeader)
                .to(|| HttpResponse::Ok()),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```


在本例中，只有当请求包含`Content-Type`头时，才会调用索引处理程序。

守卫无法访问或修改请求对象，但可以在[请求扩展](https://docs.rs/actix-web/2/actix_web/struct.HttpRequest.html#method.extensions)中存储额外信息。


#### 修改守卫值

通过将任何谓词值包装在Not谓词中，可以反转其含义。例如，如果要为除“GET”之外的所有方法返回“METHOD NOT ALLOWED”响应：

```rust

use actix_web::{guard, web, App, HttpResponse, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route(
            "/",
            web::route()
                .guard(guard::Not(guard::Get()))
                .to(|| HttpResponse::MethodNotAllowed()),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}

```

`任何`守卫接受守卫和匹配的列表，如果任何提供的守卫匹配。即：

```text
guard::Any(guard::Get()).or(guard::Post())
```

如果所有提供的守卫都匹配，则全守卫接受守卫和火柴的列表。即：

```text
guard::All(guard::Get()).and(guard::Header("content-type", "plain/text"))
```
#### 更改默认未找到响应

如果在路由表中找不到路径模式或资源找不到匹配的路由，则使用默认资源。找不到默认响应。可以使用`App::default_service()`覆盖`NOT FOUND`的响应。此方法接受与`App::service()`方法的正常资源配置相同的配置函数。

```rust
#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(web::resource("/").route(web::get().to(index)))
            .default_service(
                web::route()
                    .guard(guard::Not(guard::Get()))
                    .to(|| HttpResponse::MethodNotAllowed()),
            )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

### Requests 请求
#### 内容编码

`Actix-web`自动解`压缩`有效负载，支持以下编解码器：

- Brotli
- Chunked
- Compress
- Gzip
- Deflate
- Identity
- Trailers
- EncodingExt

如果请求头包含`Content-Encoding`头，则根据头值对请求负载进行解压缩。不支持多个编解码器，即：`Content-Encoding`：`br`，`gzip`。

#### JSON Request

json主体反序列化有几个选项。

第一个选项是使用Json提取器。首先，定义一个接受`Json<T>`作为参数的处理函数，然后使用`.to()`方法注册这个处理程序。还可以通过使用`serde_json::Value`作为类型`T`来接受任意有效的json对象。

```rust
use actix_web::{web, App, HttpServer, Result};
use serde::Deserialize;

#[derive(Deserialize)]
struct Info {
    username: String,
}

/// extract `Info` using serde
async fn index(info: web::Json<Info>) -> Result<String> {
    Ok(format!("Welcome {}!", info.username))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::post().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

你还可以手动将负载加载到内存中，然后对其进行反序列化。

在下面的示例中，我们将反序列化`MyObj`结构。我们需要先加载请求体，然后将json反序列化为一个对象。

```rust
use actix_web::{error, web, App, Error, HttpResponse};
use bytes::BytesMut;
use futures::StreamExt;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Serialize, Deserialize)]
struct MyObj {
    name: String,
    number: i32,
}

const MAX_SIZE: usize = 262_144; // max payload size is 256k

async fn index_manual(mut payload: web::Payload) -> Result<HttpResponse, Error> {
    // payload is a stream of Bytes objects
    let mut body = BytesMut::new();
    while let Some(chunk) = payload.next().await {
        let chunk = chunk?;
        // limit max size of in-memory payload
        if (body.len() + chunk.len()) > MAX_SIZE {
            return Err(error::ErrorBadRequest("overflow"));
        }
        body.extend_from_slice(&chunk);
    }

    // body is loaded, now we can deserialize serde-json
    let obj = serde_json::from_slice::<MyObj>(&body)?;
    Ok(HttpResponse::Ok().json(obj)) // <- send response
}
```

示例目录中提供了这两个选项的[完整示例](https://github.com/actix/examples/tree/master/json/)。

#### 分块传输编码

Actix自动解码分块编码。`web::Payload`提取程序已包含解码字节流。如果使用支持的压缩编解码器（`br`、`gzip`、`deflate`）之一压缩请求负载，则解压缩字节流。

#### 多部分body

Actix-web通过一个外部机箱[Actix multipart](https://crates.io/crates/actix-multipart)提供多部分流支持。

示例目录中提供了[完整的示例](https://github.com/actix/examples/tree/master/multipart/)。

#### Urlencoded body

`Actix-web`使用`web::form`提取器为`application/x-www-form-urlencoded`编码的实体提供支持，该提取器解析为反序列化实例。实例的类型必须实现serde的反序列化特性。

`UrlEncoded` future可以在以下几种情况下解决错误：

- content-type 不是 application/x-www-form-urlencoded
- 传输编码是`chunked`
- 内容长度大于256k
- 有效负载因错误而终止。

```rust
use actix_web::{web, HttpResponse};
use serde::Deserialize;

#[derive(Deserialize)]
struct FormData {
    username: String,
}

async fn index(form: web::Form<FormData>) -> HttpResponse {
    HttpResponse::Ok().body(format!("username: {}", form.username))
}
```

#### Streaming 请求

`HttpRequest`是`Bytes`对象流。它可用于读取请求正文负载。

在下面的示例中，我们逐块读取和打印请求负载：

```rust
use actix_web::{web, Error, HttpResponse};
use futures::StreamExt;

async fn index(mut body: web::Payload) -> Result<HttpResponse, Error> {
    let mut bytes = web::BytesMut::new();
    while let Some(item) = body.next().await {
        let item = item?;
        println!("Chunk: {:?}", &item);
        bytes.extend_from_slice(&item);
    }

    Ok(HttpResponse::Ok().finish())
}
```
### Responses(响应)

类生成器模式用于构造`HttpResponse`的实例, `HttpResponse`提供了几个返回`HttpResponseBuilder`实例的方法，这些方法实现了各种方便的方法来生成响应。

检查[文档](https://docs.rs/actix-web/2/actix_web/dev/struct.HttpResponseBuilder.html)中的类型说明。

方法`.body`、`.finish`和`.json`完成响应创建并返回构造的`HttpResponse`实例，如果在同一个生成器实例上多次调用此方法，则生成器将死机。

```rust
use actix_web::HttpResponse;

async fn index() ->HttpResponse{
    HttpResponse::Ok()
        .content_type("text/plain")
        .header("X-Hdr","sample")
        .body("data")
}
```

#### 内容编码

`Actix-web`可以使用[压缩中间件](https://docs.rs/actix-web/2/actix_web/middleware/struct.Compress.html)自动压缩有效负载,支持以下编解码器：

- Brotli
- Gzip
- Deflate
- Identity

```rust
use actix_web::{middleware, HttpResponse};

async fn index_br() -> HttpResponse {
    HttpResponse::Ok().body("data")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::default())
            .route("/", web::get().to(index_br))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

响应负载根据`middleware::BodyEncoding` trait中的编码参数进行压缩。默认情况下，使用`ContentEncoding::Auto`。如果选择`ContentEncoding::Auto`，则压缩取决于请求的`Accept-Encoding`头。

`ContentEncoding::Identity`可用于禁用压缩。如果选择了另一个内容编码，则对该编解码器强制执行压缩。

例如，要为单个处理程序启用`brotli`，请使用`ContentEncoding::Br`：

```rust
use actix_web::{http::ContentEncoding, dev::BodyEncoding, HttpResponse};

async fn index_br() -> HttpResponse {
    HttpResponse::Ok()
        .encoding(ContentEncoding::Br)
        .body("data")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{middleware, web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::default())
            .route("/", web::get().to(index_br))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

或者对于整个应用程序：

```rust
use actix_web::{http::ContentEncoding, dev::BodyEncoding, HttpResponse};

async fn index_br() -> HttpResponse {
    HttpResponse::Ok().body("data")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{middleware, web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::new(ContentEncoding::Br))
            .route("/", web::get().to(index_br))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

在这种情况下，我们通过将内容编码设置为`Identity`值显式禁用内容压缩：

```rust
use actix_web::{
    http::ContentEncoding, middleware, dev::BodyEncoding, HttpResponse,
};

async fn index() -> HttpResponse {
    HttpResponse::Ok()
        // v- disable compression
        .encoding(ContentEncoding::Identity)
        .body("data")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::default())
            .route("/", web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

处理已压缩的正文时（例如，在为资产提供服务时），请将`Content-Type`设置为`Identity`以避免压缩已压缩的数据，并手动设置内容编码头：

```rust
use actix_web::{
    http::ContentEncoding, middleware, dev::BodyEncoding, HttpResponse,
};

static HELLO_WORLD: &[u8] = &[
    0x1f, 0x8b, 0x08, 0x00, 0xa2, 0x30, 0x10, 0x5c, 0x00, 0x03, 0xcb, 0x48, 0xcd, 0xc9,
    0xc9, 0x57, 0x28, 0xcf, 0x2f, 0xca, 0x49, 0xe1, 0x02, 0x00, 0x2d, 0x3b, 0x08, 0xaf,
    0x0c, 0x00, 0x00, 0x00,
];

async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .encoding(ContentEncoding::Identity)
        .header("content-encoding", "gzip")
        .body(HELLO_WORLD)
}
```

此外，还可以在应用程序级别设置默认内容编码，默认情况下使用`ContentEncoding::Auto`，这意味着自动内容压缩协商。

```rust
use actix_web::{http::ContentEncoding, middleware, HttpResponse};

async fn index() -> HttpResponse {
    HttpResponse::Ok().body("data")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::new(ContentEncoding::Br))
            .route("/", web::get().to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

#### JSON Response

Json类型允许使用格式良好的Json数据进行响应：只需返回`Json<T>`类型的值，其中T是要序列化为`JSON`的结构类型。类型`T`必须实现serde的`序列化`特性。

```rust

use actix_web::{web, HttpResponse, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct MyObj {
    name: String,
}

async fn index(obj: web::Path<MyObj>) -> Result<HttpResponse> {
    Ok(HttpResponse::Ok().json(MyObj {
        name: obj.name.to_string(),
    }))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    HttpServer::new(|| App::new().route(r"/a/{name}", web::get().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

### Testing(测试)

每个应用程序都应该经过良好的测试。`Actix-web`提供了执行单元和集成测试的工具。

对于单元测试，`actix-web`提供了一个请求生成器类型。`TestRequest`实现了一个类似于builder的模式。你可以使用`to_http_request()`生成一个`HttpRequest`实例，并用它调用处理程序。

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::test;

    #[actix_rt::test]
    async fn test_index_ok() {
        let req = test::TestRequest::with_header("content-type", "text/plain").to_http_request();
        let resp = index(req).await;
        assert_eq!(resp.status(), http::StatusCode::OK);
    }

    #[actix_rt::test]
    async fn test_index_not_ok() {
        let req = test::TestRequest::default().to_http_request();
        let resp = index(req).await;
        assert_eq!(resp.status(), http::StatusCode::BAD_REQUEST);
    }
}
```

#### 集成测试

有几种测试应用程序的方法。`Actix-web`可用于在真正的http服务器中使用特定的处理程序运行应用程序。

`TestRequest::get()`、`TestRequest::post()`和其他方法可用于向测试服务器发送请求。

要创建用于测试的服务，请使用接受常规`App`生成器的`test::init_service`方法。

查看[api文档](https://docs.rs/actix-web/2/actix_web/test/index.html)以获取更多信息。

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, web, App};

    #[actix_rt::test]
    async fn test_index_get() {
        let mut app = test::init_service(App::new().route("/", web::get().to(index))).await;
        let req = test::TestRequest::with_header("content-type", "text/plain").to_request();
        let resp = test::call_service(&mut app, req).await;
        assert!(resp.status().is_success());
    }

    #[actix_rt::test]
    async fn test_index_post() {
        let mut app = test::init_service(App::new().route("/", web::get().to(index))).await;
        let req = test::TestRequest::post().uri("/").to_request();
        let resp = test::call_service(&mut app, req).await;
        assert!(resp.status().is_client_error());
    }
}
```

如果你需要更复杂的应用程序，那么测试应该与创建普通应用程序非常相似。例如，你可能需要初始化应用程序状态。使用`data`方法创建`App`并附加状态，就像从普通应用程序中一样。

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, web, App};

    #[actix_rt::test]
    async fn test_index_get() {
        let mut app = test::init_service(
            App::new()
                .data(AppState { count: 4 })
                .route("/", web::get().to(index)),
        ).await;
        let req = test::TestRequest::get().uri("/").to_request();
        let resp: AppState = test::read_response_json(&mut app, req).await;

        assert_eq!(resp.count, 4);
    }
}
```

#### 流响应测试

如果你需要测试流，那么只需调用`take_body()`并将结果`ResponseBody`转换为future并执行它就足够了，例如测试`Server Send Events`。

```rust
use std::task::Poll;
use bytes::Bytes;
use futures::stream::poll_fn;

use actix_web::http::{ContentEncoding, StatusCode};
use actix_web::{web, http, App, Error, HttpRequest, HttpResponse};

async fn sse(_req: HttpRequest) -> HttpResponse {
    let mut counter: usize = 5;

    // yields `data: N` where N in [5; 1]
    let server_events = poll_fn(move |_cx| -> Poll<Option<Result<Bytes, Error>>> {
        if counter == 0 {
            return Poll::Ready(None);
        }
        let payload = format!("data: {}\n\n", counter);
        counter -= 1;
        Poll::Ready(Some(Ok(Bytes::from(payload))))
    });

    HttpResponse::build(StatusCode::OK)
        .set_header(http::header::CONTENT_TYPE, "text/event-stream")
        .set_header(
            http::header::CONTENT_ENCODING,
            ContentEncoding::Identity.as_str(),
        )
        .streaming(server_events)
}

pub fn main() {
    App::new().route("/", web::get().to(sse));
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_rt;

    use futures_util::stream::StreamExt;
    use futures_util::stream::TryStreamExt;

    use actix_web::{test, web, App};

    #[actix_rt::test]
    async fn test_stream() {
        let mut app = test::init_service(App::new().route("/", web::get().to(sse))).await;
        let req = test::TestRequest::get().to_request();

        let mut resp = test::call_service(&mut app, req).await;
        assert!(resp.status().is_success());

        // first chunk
        let (bytes, mut resp) = resp.take_body().into_future().await;
        assert_eq!(bytes.unwrap().unwrap(), Bytes::from_static(b"data: 5\n\n"));

        // second chunk
        let (bytes, mut resp) = resp.take_body().into_future().await;
        assert_eq!(bytes.unwrap().unwrap(), Bytes::from_static(b"data: 4\n\n"));

        // remaining part
        let bytes = test::load_stream(resp.take_body().into_stream()).await;
        assert_eq!(bytes.unwrap(), Bytes::from_static(b"data: 3\n\ndata: 2\n\ndata: 1\n\n"));
    }
}
```

### Middleware 中间器件

`Actix-web`的中间件系统允许我们为请求/响应处理添加额外的行为。中间件可以钩住一个传入的请求进程，使我们能够修改请求，并停止请求处理以提前返回响应。

中间件还可以连接到响应处理中。

通常，中间件涉及以下操作：

- 预处理请求
- 后处理一个响应
- 修改应用程序状态
- 访问外部服务（`redis`、日志记录、`sessions`）

中间件为每个`App`、`scope`或`Resource`注册，并按注册的相反顺序执行。一般来说，中间件是一种实现`服务特性`和`转换特性`的类型。traits中的每个方法都有一个默认实现，每个方法都可以立即返回结果或将来的对象。

下面演示如何创建一个简单的中间件：

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

use actix_service::{Service, Transform};
use actix_web::{dev::ServiceRequest, dev::ServiceResponse, Error};
use futures::future::{ok, Ready};
use futures::Future;

// There are two steps in middleware processing.
// 1. Middleware initialization, middleware factory gets called with
//    next service in chain as parameter.
// 2. Middleware's call method gets called with normal request.
pub struct SayHi;

// Middleware factory is `Transform` trait from actix-service crate
// `S` - type of the next service
// `B` - type of response's body
impl<S, B> Transform<S> for SayHi
where
    S: Service<Request = ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = SayHiMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(SayHiMiddleware { service })
    }
}

pub struct SayHiMiddleware<S> {
    service: S,
}

impl<S, B> Service for SayHiMiddleware<S>
where
    S: Service<Request = ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Request = ServiceRequest;
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>>>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&mut self, req: ServiceRequest) -> Self::Future {
        println!("Hi from start. You requested: {}", req.path());

        let fut = self.service.call(req);

        Box::pin(async move {
            let res = fut.await?;

            println!("Hi from response");
            Ok(res)
        })
    }
}
```

或者，对于简单的用例，可以使用`wrap_fn`创建小型的、特别的中间产品：

```rust
use actix_service::Service;
use actix_web::{web, App};
use futures::future::FutureExt;

#[actix_rt::main]
async fn main() {
    let app = App::new()
        .wrap_fn(|req, srv| {
            println!("Hi from start. You requested: {}", req.path());
            srv.call(req).map(|res| {
                println!("Hi from response");
                res
            })
        })
        .route(
            "/index.html",
            web::get().to(|| async {
                "Hello, middleware!"
            }),
        );
}
```

`Actix-web`提供了一些有用的中间件，如日志、用户会话、压缩等。

#### 记录日志

日志记录是作为一个中间件实现的。通常将日志中间件注册为应用程序的第一个中间件。必须为每个应用程序注册日志中间件。

`Logger`中间件使用标准的日志箱记录信息。你应该为actix_web包启用logger以查看访问日志（`env_logger`或类似）。

#### 用法

使用指定的`格式`创建`Logger`中间件。默认`Logger`可以使用`默认`方法创建，它使用默认格式：

```rust
 %a %t "%r" %s %b "%{Referer}i" "%{User-Agent}i" %T
```

```rust
use actix_web::middleware::Logger;
use env_logger::Env;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{App, HttpServer};

    env_logger::from_env(Env::default().default_filter_or("info")).init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

以下是默认日志记录格式的示例：

```text
INFO:actix_web::middleware::logger: 127.0.0.1:59934 [02/Dec/2017:00:21:43 -0800] "GET / HTTP/1.1" 302 0 "-" "curl/7.54.0" 0.000397
INFO:actix_web::middleware::logger: 127.0.0.1:59947 [02/Dec/2017:00:22:40 -0800] "GET /index.html HTTP/1.1" 200 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0" 0.000646
```

#### Format(格式化)

- `%%` 百分号
- `%a` 远程IP地址 (如果使用反向代理，则代理的IP地址)
- `%t` 开始处理请求的时间
- `%P` 为请求提供服务的子进程ID
- `%r` 第一行请求
- `%s` 响应状态代码
- `%b` 响应大小（字节），包括HTTP头
- `%T` 为请求提供服务所需的时间，以秒为单位，浮动小数为.06f格式
- `%D` 服务请求所用的时间（毫秒）
- `%{FOO}i` request.headers[‘FOO’]
- `%{FOO}o` response.headers[‘FOO’]
- `%{FOO}e` os.environ[‘FOO’]

#### 默认Headers

要设置默认响应头，可以使用`DefaultHeaders`中间件。如果响应头已包含指定的头，则`DefaultHeaders`中间件不设置头。

```rust
use actix_web::{http, middleware, HttpResponse};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.2"))
            .service(
                web::resource("/test")
                    .route(web::get().to(|| HttpResponse::Ok()))
                    .route(
                        web::method(http::Method::HEAD)
                            .to(|| HttpResponse::MethodNotAllowed()),
                    ),
            )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

#### 用户sessions

`Actix-web`为会话管理提供了一个通用的解决方案。`actix-session`中间件可以与不同的后端类型一起使用，在不同的后端存储会话数据。

默认情况下，仅实现cookie会话后端。可以添加其他后端实现。

`CookieSession`使用cookies作为会话存储。`CookieSessionBackend`创建的会话限制为存储少于4000字节的数据，因为负载必须适合单个`cookie`。如果会话包含超过4000字节，则会生成内部服务器错误。

cookie的安全策略可以是签名的或私有的。每个都有各自的`CookieSession`构造函数。

客户端可以查看签名的cookie，但不能对其进行修改。客户端既不能查看也不能修改私有cookie。

构造函数以键作为参数。这是cookie会话的私钥-更改此值时，所有会话数据都将丢失。

通常，你创建一个`SessionStorage`中间件，并使用特定的后端实现（例如`CookieSession`）对其进行初始化。要访问会话数据，必须使用`Session`提取器。此方法返回一个`session`对象，该对象允许我们获取或设置会话数据。

```rust
use actix_session::{CookieSession, Session};
use actix_web::{web, App, Error, HttpResponse, HttpServer};

async fn index(session: Session) -> Result<HttpResponse, Error> {
    // access session data
    if let Some(count) = session.get::<i32>("counter")? {
        session.set("counter", count + 1)?;
    } else {
        session.set("counter", 1)?;
    }

    Ok(HttpResponse::Ok().body(format!(
        "Count is {:?}!",
        session.get::<i32>("counter")?.unwrap()
    )))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(
                CookieSession::signed(&[0; 32]) // <- create cookie based session middleware
                    .secure(false),
            )
            .service(web::resource("/").to(index))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

#### 错误处理

`ErrorHandlers`中间件允许我们为响应提供自定义处理程序。

可以使用`ErrorHandlers::handler()`方法为特定状态代码注册自定义错误处理程序。你可以修改现有的响应或创建完全新的响应。错误处理程序可以立即返回响应，也可以返回解析为响应的未来。

```rust
use actix_web::middleware::errhandlers::{ErrorHandlerResponse, ErrorHandlers};
use actix_web::{dev, http, HttpResponse, Result};

fn render_500<B>(mut res: dev::ServiceResponse<B>) -> Result<ErrorHandlerResponse<B>> {
    res.response_mut().headers_mut().insert(
        http::header::CONTENT_TYPE,
        http::HeaderValue::from_static("Error"),
    );
    Ok(ErrorHandlerResponse::Response(res))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| {
        App::new()
            .wrap(
                ErrorHandlers::new()
                    .handler(http::StatusCode::INTERNAL_SERVER_ERROR, render_500),
            )
            .service(
                web::resource("/test")
                    .route(web::get().to(|| HttpResponse::Ok()))
                    .route(web::head().to(|| HttpResponse::MethodNotAllowed())),
            )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```
### Static Files 静态文件

#### 单个文件

可以使用自定义路径模式和`NamedFile`为静态文件提供服务。要匹配路径尾部，可以使用`[.*]`正则表达式。

```rust
use actix_files::NamedFile;
use actix_web::{HttpRequest, Result};
use std::path::PathBuf;

async fn index(req: HttpRequest) -> Result<NamedFile> {
    let path: PathBuf = req.match_info().query("filename").parse().unwrap();
    Ok(NamedFile::open(path)?)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    use actix_web::{web, App, HttpServer};

    HttpServer::new(|| App::new().route("/{filename:.*}", web::get().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```
#### 目录

要提供来自特定目录和子目录的文件，可以使用`Files`。`Files`必须使用`App::service()`方法注册，否则将无法为子路径提供服务。

```rust
use actix_files as fs;
use actix_web::{App, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(fs::Files::new("/static", ".").show_files_listing())
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```

默认情况下，子目录的文件列表被禁用。尝试加载目录列表将返回404 Not Found响应。要启用文件列表，请使用[files::show_files_listing()](https://docs.rs/actix-files/0.2/actix_files/struct.Files.html#method.index_file)方法。

#### 配置

`NemeFiles` 可以指定提供文件的各种选项：

- `set_content_disposition` - 用于将文件的mime映射到相应内容处理类型的函数
- `use-etag`                - 指定是否计算ETag并将其包含在标题中。
- `use_last_modified`       - 指定是否应使用文件修改的时间戳并将其添加到`Last-Modified`的头中。

以上所有方法都是可选的，并提供了最佳的默认值，但是可以自定义其中任何一个方法。

```rust
use actix_files as fs;
use actix_web::http::header::{ContentDisposition, DispositionType};
use actix_web::{web, App, Error, HttpRequest, HttpServer};

async fn index(req: HttpRequest) -> Result<fs::NamedFile, Error> {
    let path: std::path::PathBuf = req.match_info().query("filename").parse().unwrap();
    let file = fs::NamedFile::open(path)?;
    Ok(file
        .use_last_modified(true)
        .set_content_disposition(ContentDisposition {
            disposition: DispositionType::Attachment,
            parameters: vec![],
        }))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/{filename:.*}", web::get().to(index)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
```

该配置还可以应用于目录服务：

```rust
use actix_files as fs;
use actix_web::{App, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            fs::Files::new("/static", ".")
                .show_files_listing()
                .use_last_modified(true),
        )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
```
## 协议

### Websocket

`Actix-web`支持带有`Actix-web- actors` crate的WebSockets。可以将请求的`Payload`转换为带有`web::Payload`的`ws::Message`流，然后使用流组合器处理实际消息，但是使用http `actor`处理websocket通信更简单。

下面是一个简单的`websocket` echo服务器示例：

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

[示例目录](https://github.com/actix/examples/tree/master/websocket/)中提供了一个简单的websocket echo服务器示例。

[websocket-chat 目录](https://github.com/actix/examples/tree/master/websocket-chat/)中提供了一个能够通过websocket或tcp连接进行聊天的示例聊天服务器

### HTTP/2.0

如果可能，`actix-web`会自动升级到`HTTP/2.0`的连接。

#### 谈判

未经事先了解的tls上的*HTTP/2.0*协议需要[tls alpn](https://tools.ietf.org/html/rfc7301)。

目前，只有`rust-openssl`有支持。

`alpn`协商需要启用该功能。启用时，`HttpServer`提供`bind_openssl`方法。

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

不支持升级到rfc第3.2节中描述的*HTTP/2.0*架构。明文连接和tls连接都支持使用先前的知识启动*HTTP/2*，[rfc第3.4节](https://http2.github.io/http2-spec/#rfc.section.3.4)。

查看[examples/tls](https://github.com/actix/examples/tree/master/rustls) 以获取具体示例。

## Patterns 模式

### Autoreloading 自动重载

#### 自动重新加载开发服务器

在开发过程中，让cargo在更改时自动重新编译代码非常方便。这可以通过使用`cargo-watch`来完成。因为actix应用程序通常会绑定到端口以侦听传入的HTTP请求，所以将其与`listenfd` crate和`systemfd`实用程序结合起来以确保在应用程序编译和重新加载时套接字保持打开是有意义的。

`systemfd`将打开一个套接字并将其传递给`cargo-watch`，后者将监视更改，然后调用编译器并运行actix应用程序。actix应用程序将使用`listenfd`来获取`systemfd`打开的套接字。

#### 必需的二进制文件

要获得自动重新装载体验，你需要安装`cargo-watch`和`systemfd`。两者都是用铁锈写的，可与`cargo-install`一起安装：

```shell
cargo install systemfd cargo-watch
```

#### 代码变更

此外，你需要稍微修改actix应用程序，以便它可以拿起`systemfd`打开的外部套接字。将listenfd依赖项添加到应用程序：

```toml
[dependencies]
listenfd="0.3"
```

然后修改服务器代码以仅调用`bind`作为回退：

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

目前，Diesel1.0不支持异步操作，但是可以使用`Actix` 同步Actor系统作为数据库接口api。

从技术上讲，同步`Actor`是`worker`风格的`Actor`。多个同步参与者可以并行运行并处理来自同一队列的消息。同步`Actor`在mpsc模式下工作。

让我们创建一个简单的数据库api，它可以将新的用户行插入到`SQLite`表中。我们必须定义一个同步参与者和这个参与者将使用的连接。同样的方法也可以用于其他数据库。

```rust
use actix::prelude::*;

struct DbExecutor(SqliteConnection);

impl Actor for DbExecutor {
    type Context = SyncContext<Self>;
}
```
这就是我们`Actor`的定义。现在，我们必须定义创建用户消息和响应。

```rust
struct CreateUser {
    name: String,
}

impl Message for CreateUser {
    type Result = Result<User, Error>;
}
```

我们可以向`DbExecutor` actor发送`CreateUser`消息，结果，我们将收到一个`User`模型实例。接下来，我们必须定义此消息的处理程序实现。

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

就这样！现在，我们可以从任何http处理程序或中间件中使用`DbExecutor` actor。我们只需要启动`DbExecutor` actors并将地址存储在http处理程序可以访问的状态中。

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

我们将在请求处理程序中使用该地址。句柄返回一个未来对象；因此，我们异步接收消息响应。`Route::a()`必须用于异步处理程序注册。

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

有关同步参与者的更多信息可以在[actix文档](https://docs.rs/actix/0.7.0/actix/sync/index.html)中找到。


## 图表

### HTTP 服务初始化

#### 体系结构概述

下面是HttpServer初始化的示意图，它发生在以下代码上

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
![](https://actix.rs/img/diagrams/http_server.svg)


### 连接生命周期

#### 体系结构概述

在服务器开始监听所有套接字之后，`Accept`和`Worker`是两个主循环，负责处理传入的客户端连接。

一旦连接被接受，应用程序级的协议处理就发生在从`Worker`派生的特定于协议的`Dispatcher`循环中。

请注意，下面的图表仅勾勒了`happy-path`的场景

![](https://actix.rs/img/diagrams/connection_overview.svg)

更详细地Accept循环

![](https://actix.rs/img/diagrams/connection_accept.svg)

大多数代码实现位于`actix-server`机箱中，用于结构`Accept`。

更详细的`Worker`循环

![](https://actix.rs/img/diagrams/connection_worker.svg)

大多数代码实现都位于`actix-server` crate 的 `Worker`结构中。

大致的请求循环

![](https://actix.rs/img/diagrams/connection_request.svg)

请求循环的大多数代码实现位于`actix-web`和`actix-http`机箱中。


## API 文档

### [actix](https://docs.rs/actix)

### [actix-web](https://docs.rs/actix-web/)
