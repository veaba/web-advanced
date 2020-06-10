---
sidebar: auto
---

# Actix-web

- [Actix-web官方](https://actix.rs/)

## 介绍

### Welcome

<h3>欢迎使用Actix</h3>

Actix 是开发带有 Rust 的 web 服务的门户，本文档将为您提供指导。

本文档目前主要涉及`actix-web`部分，它是先前在`actix` actor 框架和[`Tokio`](https://tokio.rs/) 异步 IO 系统之上构建的高级 web 框架。这是从 API 稳定性的角度来看最稳定的部分。

如果你还没有使用 actix-web，最好从[入门指南](https://actix.rs/docs/getting-started)开始。
如果你已经知道自己的方法，并且需要特定的信息，那么您可能需要阅读 [actix-web API 文档](https://docs.rs/actix-web)（或较低级别的 [actix APO=I 文档](https://docs.rs/actix)）。

### 什么是 Actix

<h3>Acitx 是多态的</h3>

Actix 是一些东西。它的基础是一个强大的角色系统，用于 Rust，而`actix-web`系统最初就是在这个系统之上构建的。这是你最有可能使用的。`actix-web`给你的是一个有趣且快速的 web 开发框架。

我们称`actix-web`为一个小型实用的框架。不管是出于什么目的，它都是一个有着一些曲折的微结构。
如果你已经是一个 Rust 程序员，你可能会发现自己在家很快，但即使你是来自另一种编程语言，你应该发现`actix-web`很容易拿起。

使用`actix-web`开发的应用程序将公开包含在本机可执行文件中的 HTTP 服务器。
您可以将它放在另一个 HTTP 服务器（如 nginx）后面，也可以按原样提供服务。
即使在完全没有另一个 HTTP 服务器的情况下，`actix-web`也足够强大，能够提供 HTTP 1 和 htp2 支持以及 SSL/TLS。这对于构建准备分发的小型服务非常有用。

最重要的是：`actix-web`运行在 Rust 1.39 或更高版本上，它可以与稳定的版本一起工作。

### 安装

<h3>安装Rust</h3>

因为`actix-web`是一个 Rust 框架，所以您需要 Rust 来开始使用它。如果您还没有，我们建议您使用`rustup`来管理您的 Rust 安装。

官方的 Rust 指南有一个很好的开始部分。我们目前至少需要 Rust1.39，所以请确保您运行`rustup update`以获得最新和最新的 Rust 版本。特别是本指南将假设您实际运行 Rust 1.39 或更高版本。

<h3>安装actix-web</h3>

多亏了 Rust 的`cargo`管理器，您不需要显式地安装`actix-web`。相信它，你就可以走了。对于不太可能使用 actix-web 开发版本的情况，可以直接依赖 git 存储库。

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

<h3>潜入</h3>

这里有两条路可以走。您可以按照指南进行操作，或者如果您非常不耐烦，您可能希望查看我们广泛的示例存储库并运行包含的示例。例如，下面是如何运行包含的基本示例：

```cmd
git clone https://github.com/actix/examples
cd examples/basics
cargo run
```

## 基础

### 入门

让我们编写我们的第一个`actix-web`应用程序！

<h3>Hello,world!</h3>

首先创建一个新的基于二进制的 Cargo 项目并切换到新目录：

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
您可以注意到`#[actix_rt::main]`属性宏。此宏在 actix 运行时执行标记的异步函数。此宏可以标记和执行任何异步函数。
:::

<h3>使用属性宏定义路由</h3>

或者，您可以使用宏属性定义路由，这些属性允许您在函数上方指定路由，如下所示：

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
但是，如果您更喜欢这种语法，那么您应该在任何时候声明路由时都可以随意使用它，因为它只是语法糖。

要了解更多信息，请参阅[actix-web-codegen](https://docs.rs/actix-web-codegen/)。

<h3>自动重载</h3>

如果需要，可以在开发期间自动重新加载服务器，该服务器根据需要重新编译。
这是不必要的，但它使快速原型更方便，因为您可以看到变化立即保存。要了解如何实现这一点，请查看[autoreload 模式](https://actix.rs/docs/autoreload/)。

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

您可以使用服务器地址向服务器发送停止消息，并指定是否要正常关机, `start()`方法返回服务器的地址。

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

您还可以更改签名以返回`impl Responder`，如果涉及到更复杂的类型，则该签名可以正常工作。

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

一些提取器提供了配置提取过程的方法。用于配置的Json提取器[*JsonConfig*](https://docs.rs/actix-web/2/actix_web/web/struct.JsonConfig.html)类型。要配置提取器，请将其配置对象传递给资源的`.data()`方法。如果是Json提取器，则返回*JsonConfig*。您可以配置json负载的最大大小以及自定义错误处理程序函数。

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
- `String` - 您可以将请求的负载转换为`String`,[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-2) 在文档字符串中可用。
- `bytes::Bytes` -您可以将请求的负载转换为`Bytes`,[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-4)在文档字符串中可用。
- `Payload` -您可以访问请求的有效负载,[示例](https://docs.rs/actix-web/2/actix_web/web/struct.Payload.html)


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

- `Route::guard()`      - 注册一个新的guard。每条路线可登记任何数量的警卫。
- `Route::method()`     - 注册方法保护程序。每条路线可登记任何数量的警卫。
- `Route::to()`         - 为此路由注册处理程序函数。只能注册一个处理程序。通常，处理程序注册是最后一个配置操作。
- `Route::to_async()`   - 为此路由注册一个异步处理程序函数。只能注册一个处理程序。处理程序注册是最后一个配置操作。


#### 路由匹配

路由配置的主要目的是根据URL路径模式匹配（或不匹配）请求的`path`,`path`表示请求的URL的路径部分。

actix web做这件事的方式非常简单。当请求进入系统时，对于系统中存在的每个资源配置声明，actix会根据声明的模式检查请求的路径。
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
您可以将其更改为任意正则表达式以匹配任意字符序列，例如`{foo:\d+}`以仅匹配数字。

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

路径段中的文本字符串应表示提供给actix的路径的解码值。您不想在模式中使用`URL-encoded`的值。例如，而不是这样：

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

作用域帮助您组织共享公用根路径的路由。可以在作用域内嵌套作用域。

假设您想要组织指向用于查看“用户”的端点的路径。这些路径可以包括：

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

您可以从`HttpRequest::match_info()`获取变量路径段。路径提取器还可以提取范围级别的变量段。


#### 匹配信息

所有表示匹配路径段的值都可以在`HttpRequest：：match_info`中找到。可以使用`Path::get()`检索特定值。

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

#### 生成资源URL

#### 外部资源

#### 路径规范化和重定向到斜线附加路由

#### 使用应用程序前缀组合应用程序

#### 自定义线路守卫

#### 修改守卫值

#### 更改默认未找到响应


### Requests 请求

### Responses 响应

### Testing 测试

### Middleware 中间器件

### Static Files 静态文件

## 协议

### Websocket

### HTTP/2.0

## Patterns 模式

### Autoreloading 自动重载

### Databases 数据库

## 图表

### HTTP 服务初始化

### 连接生命周期

## API 文档

### [actix](https://docs.rs/actix)

### [actix-web](https://docs.rs/actix-web/)
