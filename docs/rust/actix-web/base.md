# 基础

## 入门

让我们编写我们的第一个 `actix-web` 应用程序！

Hello,world!

首先创建一个新的基于二进制的 Cargo 项目并切到新目录：

```cmd
cargo new hello-world
cd hello-world
```

现在，通过 `Cargo.toml` 将 `actix-web` 添加到你的依赖中，包含以下内容：

```toml
[dependencies]
actix-web = "2.0"
```

如果要使用 `#[actix_rt::main]` 宏，必须将 `actix-rt` 添加到依赖项中。现在你的 `cargo.toml` 应该如下所示：

```toml
[dependencies]
actix-web = "2.0"
actix-rt = "1.0"
```

为了实现 web 服务器，我们首先需要创建一个请求处理程序。

请求处理程序是一个异步函数，它接受从请求 (即 `impl FromRequest`) 中提取的零个或多个参数，并返回可转换为 `HttpResponse` (即 `impl Responder`) 的类型：

```rust
use actix_web::{web,App,HttpResponse,HttpServer,Responder};

async fn index()->impl Responder {
   HttpResponse::OK().body("Hello world!")
}

async fn index2() -> impl Responder{
 HttpResponse::OK().body("Hello world again!")
}

```

接下来，创建一个应用程序实例，并使用路径上的应用程序 `route` 和特定的 HTTP 方法注册请求处理程序。
之后，应用程序实例可以与 `HttpServer` 一起用于侦听传入连接。服务器接受一个应该返回应用程序工厂的函数。

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

就这样！现在，用 `cargo run` 编译并运行程序。前往 `http://localhost:8088/` 查看结果。

::: tip Note：
你可以注意到 `#[actix_rt::main]` 属性宏。此宏在 actix 运行时执行标记的异步函数，此宏可以标记和执行任何异步函数。
:::

使用属性宏定义路由

或者，你可以使用宏属性定义路由，这些属性允许你在函数上方指定路由，如下所示：

```rust
use actix_web::get;

#[get("/hello")]

async fn index3()->impl Responder{
  HttpResponse::Ok().body("Hey there!")
}

```

然后可以使用 `service()` 注册路由：

```rust
App::new()
    .service(index3)
```

出于一致性原因，本文档仅使用本页开头显示的显式语法。
但是，如果你更喜欢这种语法，那么你应该在任何时候声明路由时都可以随意使用它，因为它只是语法糖。

要了解更多信息，请参阅 [actix-web-codegen](https://docs.rs/actix-web-codegen/)。

自动重载

如果需要，可以在开发期间自动重新加载服务器，该服务器根据需要重新编译。
这是不必要的，但它使快速原型更方便，因为你可以看到变化立即保存。要了解如何实现这一点，请查看 [autoreload 模式](https://actix.rs/docs/autoreload/)。

## Application

写一个应用程序

`actix-web` 提供各种原语来构建带有 Rust 的 web 服务器和应用程序。它提供路由、中间件、请求的预处理、响应的后处理等功能。

所有 `actix-web` 服务器都是围绕 `App` 实例构建的。它用于注册资源和中间产品的路由。它还存储同一范围内所有处理程序共享的应用程序状态。

应用程序的 `scope` 充当所有路由的命名空间，即特定应用程序作用域的所有路由都具有相同的 url 路径前缀。
应用程序前缀始终包含前导 `“/”` 斜线。如果提供的前缀不包含前导斜杠，则会自动插入。前缀应该由值路径段组成。

对于具有 scope `/app` 的应用程序，具有 `/app`、`/app/` 或 `/app/test` 路径的任何请求都将匹配；但是，路径 `/application` 将不匹配

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

在本例中，带有 `/app` 前缀和 `index.html` 索引资源已创建。此资源可通过 `/app/index.html` url。

有关详细信息，请查看 [URL Dispatch](/rust/actix-web/#url-dispatch) 部分。

State(状态)

应用程序状态与同一范围内的所有路由和资源共享。状态可以通过 `web::Data<T>` 提取器访问，其中 `T` 是状态类型。`State` 也可用于中间期间。

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

Shared Mutable State(状态)

`HttpServer` 接受应用程序工厂，而不是应用程序实例。Http 服务器为每个线程构造一个应用程序实例，因此必须多次构造应用程序数据。如果要在不同线程之间共享数据，则应使用可共享对象，例如 Send+Sync。

在内部，`web::Data` 使用 Arc。因此，为了避免双圆弧，我们应该在使用 `App::App_Data()` 注册数据之前创建数据。

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

使用应用程序范围组合应用程序

`web::scope()` 方法允许设置特定的应用程序前缀。此作用域表示资源前缀，该前缀将作为资源配置添加的所有资源模式的前缀。
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

在上面的示例中，show_users 路由将具有 `/users/show` 而不是/show 的有效路由模式，因为应用程序的 scope 参数将位于该模式的前面。只有当 URL 路径是/users/show，并且当 `HttpRequest.url_for` 函数是用路由名 show_users 调用的，它将生成具有相同路径的 URL。

应用程序保护和虚拟主机

你可以将保护程序看作一个简单的函数，它接受请求对象引用并返回 true 或 false。在形式上，守卫是实现守卫特性的任何对象。`actix-web` 提供了几个防护，可以查看 api 文档的[函数部分](https://docs.rs/actix-web/2/actix_web/guard/index.html#functions)。

提供的保护之一是 `Header`，它可以用作基于请求头信息的应用程序筛选器。

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

配置

为了简单性和可重用性，`App` 和 `web::Scope` 都提供了 `configure` 方法。此函数可用于将配置部分移动到不同的模块甚至库。例如，一些资源的配置可以移动到不同的模块。

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

每个 [`ServiceConfig`](https://docs.rs/actix-web/2/actix_web/web/struct.ServiceConfig.html) 都可以拥有自己的 `data`、`routes` 和 `service`。

## Server

[HttpServer](https://docs.rs/actix-web/2/actix_web/struct.HttpServer.html) 类型负责为 http 请求提供服务

`HttpServe` r 接受应用程序工厂作为参数，应用程序工厂必须具有 `Send`+`Sync` 边界。在 _“多线程”_ 部分中详细介绍。

若要绑定到特定的套接字地址，必须使用 bind()，并且可以多次调用它。若要绑定 ssl 套接字，应使用 `bind_openssl()` 或 `bind_rustls()`。要运行 http 服务器，请使用 `httpServer::run()` 方法。

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

`run()` 方法返回 [`Server`](https://docs.rs/actix-web/2/actix_web/dev/struct.Server.html) 类型的实例。服务器类型的方法可用于管理 http 服务器

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

### 多线程

HttpServer `会自动启动一些http工作进程，默认情况下，这个数目等于系统中逻辑cpu的数目。这个数字可以用` HttpServer::workers()`方法覆盖。

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

应用程序状态不需要 `send` 或 `sync`，但应用程序工厂必须是 `send`+`sync`。

要在工作线程之间共享状态，请使用 `Arc`。一旦引入共享和同步，就应该特别小心。在许多情况下，由于锁定共享状态以进行修改，会无意中引入性能成本。

在某些情况下，可以使用更有效的锁定策略来降低这些成本，例如使用 `读/写锁` 而不是互斥锁来实现非排他锁定，但是性能最高的实现往往是根本不发生锁定的实现。

由于每个工作线程按顺序处理其请求，因此阻止当前线程的处理程序将导致当前工作线程停止处理新请求：

```rust
fn my_handler() -> impl Responder {
    std::thread::sleep(Duration::from_secs(5)); // <-- 坏习惯！将导致当前工作线程挂起！
    "response"
}

```

因此，任何长的、非 cpu 限制的操作 (如 I/O、数据库操作等) 都应表示为未来函数或异步函数。异步处理程序由工作线程并发执行，因此不会阻止执行：

```rust
async fn my_handler() -> impl Responder {
    tokio::time::delay_for(Duration::from_secs(5)).await; // <-- OK! 工作线程将在此处理其他请求
    "response"
}
```

同样的限制也适用于提取器。当处理程序函数接收到实现 `FromRequest` 的参数，并且该实现阻塞当前线程时，工作线程将在运行处理程序时阻塞。出于这个原因，在实现提取器时必须特别注意，而且在需要时也应该异步实现提取器。

### SSL

ssl 服务器有两个特性：`rustls` 和 `openssl`。`rustls` 特性用于 `rustls` 集成，`openssl` 用于 `openssl`。

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

创建 `key.pem` 以及 `cert.pem` 使用命令。填写你自己的主题

```shell

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem \
  -days 365 -sha256 -subj "/C=CN/ST=Fujian/L=Xiamen/O=TVlinux/OU=Org/CN=muro.lxd"

```

要删除密码，请复制 `nopass.pem` 到 `cert.pem`

```shell
openssl rsa -in key.pem -out nopass.pem
```

### Keep-Alive

Actix 可以在保持活动连接上等待请求。

_`keep-alive`_ 连接行为由服务器设置定义。

- `75`，`Some(75)`，`KeepAlive::Timeout(75)` - 启用 75 秒 _keep alive_ 计时器
- `None` or `KeepAlive::Disabled` - 禁用 _keep alive_
- `KeepAlive::Tcp(75)` - 使用 `SO_KEEPALIVE` socket 选项

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

如果选择了上面的第一个选项，那么将根据响应的连接类型计算保持活动状态。默认情况下，未定义 `HttpResponse::connection_type`。在这种情况下，keep alive 由请求的 http 版本定义。

对于 HTTP/1.0，_keep alive_ 处于关闭状态；对于 HTTP/1.1 和 HTTP/2.0，_keep alive_ 处于打开状态。

可以使用 `HttpResponseBuilder::Connection_type()` 方法更改连接类型。

```rust

use actix_web::{http,HttpRequest,HttpResponse};

async fn index(req:HttpRequest)->HttpResponse {

    HttpResponse::Ok()
        .connection_type(http::ConnectionType::Close()) // 关闭连接
        .force_close()  // 替代方法
        .finish()
}
```

### 平滑关闭

`HttpServer` 支持正常关机。在收到停止信号后，工作人员有一定的时间来完成服务请求。
超时后仍活着的工人将被强制放弃。默认情况下，关闭超时设置为 30 秒。可以使用 `HttpServer::shutdown_timeout()` 方法更改此参数。

你可以使用服务器地址向服务器发送停止消息，并指定是否要正常关机，`start()` 方法返回服务器的地址。

`HttpServer` 处理多个操作系统信号。_CTRL-C_ 可用于所有操作系统，其他信号可用于 unix 系统。

- _SIGINT_ - 强制关闭 workers
- _SIGTERM_ - 平滑关闭 workers
- _SIGQUIT_ - 强制关闭 workers

可以使用 `HttpServer::disable_signals()` 方法禁用信号处理

### Handler (处理器)

请求处理程序是一个异步函数，它接受可以从请求 (即 [_impl FromRequest_](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html)) 提取的零个或多个参数，并返回可以转换为 HttpResponse (即 [_impl Responder_](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)) 的类型。

请求处理分两个阶段进行。首先调用处理程序对象，返回实现 [`*Responder*`](https://docs.rs/actix-web/2/actix_web/trait.Responder.html) 特性的任何对象。然后，对返回的对象调用 `respond_to()`，将其自身转换为 `HttpResponse` 或 `Error`。

默认情况下，actix-web 为某些标准类型 (如&‘static str、String 等) 提供响应程序实现。

有关实现的完整列表，请查看 [_Responder_](https://docs.rs/actix-web/2/actix_web/trait.Responder.html#foreign-impls) 文档。

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

你还可以更改签名以返回 `impl Responder`，如果涉及到更复杂的类型，则该签名可以正常工作。

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

### 定制响应类型

若要直接从处理程序函数返回自定义类型，该类型需要实现 `Responder` 特性。

让我们为序列化为 `application/json` 响应的自定义类型创建一个响应：

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

### 流式响应体

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

### 不同的返回类型 (任意一种)

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

### Extractors (提取器)

`Actix-web` 为类型安全的请求信息访问提供了一个称为提取器的工具 (即 impl FromRequest)。默认情况下，`actix-web` 提供了几个提取器实现。

提取器可以作为处理程序函数的参数访问。`Actix-web` 支持每个处理函数最多 10 个提取器，参数的位置无关紧要。

```rust
async fn index(){
    path :web::Path<(String,String)>,
    json:web::Json(MyInfo),
} -> impl Responder {
    format!("{} {} {} {}",path.0,path.1,path.id,json.username)
}
```

### Path

[`*Path*`](https://docs.rs/actix-web/2/actix_web/dev/struct.Path.html) 提供可以从请求路径提取的信息。可以反序列化路径中的任何变量段。

例如，对于为 `/users/{userid}/{friend}` 路径注册的资源，可以反序列化两个段：`userid` 和 `friend`。这些段可以被提取到 `tuple` 中，即 `Path<（u32，String）>` 或任何实现 _serde_ crate `反序列化` 特性的结构中。

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

还可以将路径信息提取到实现 _serde_ `反序列化` 特性的特定类型。下面是一个使用 _serde_ 而不是 _tuple_ 类型的等效示例。

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

还可以按名称 `get` 或 `query` 路径参数请求：

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

### Query

[_`查询`_](https://docs.rs/actix-web/2/actix_web/web/struct.Query.html) 类型为请求的查询参数提供提取功能。下面使用的是 _serde_urlencoded_ `crate`

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

### Json

[_Json_](https://docs.rs/actix-web/2/actix_web/web/struct.Json.html) 允许将请求体反序列化为结构。要从请求体中提取类型化信息，类型 `T` 必须实现 _serde_ 的 `反序列化` 特性。

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

一些提取器提供了配置提取过程的方法。用于配置的 Json 提取器 [_JsonConfig_](https://docs.rs/actix-web/2/actix_web/web/struct.JsonConfig.html) 类型。要配置提取器，请将其配置对象传递给资源的 `.data()` 方法。如果是 Json 提取器，则返回 _JsonConfig_。你可以配置 json 负载的最大大小以及自定义错误处理程序函数。

下面的示例将负载大小限制为 4kb，并使用自定义错误处理程序。

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

### Form

目前，只支持 url 编码的表单。url 编码的正文可以提取到特定类型。此类型必须实现 _serde_ crate 的 `反序列化` 特性。

[_FormConfig_](https://docs.rs/actix-web/2/actix_web/web/struct.FormConfig.html) 允许配置提取过程。

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

### Other

`Actix-web` 还提供了其他几个提取器：

- [_Data_](https://docs.rs/actix-web/2/actix_web/web/struct.Data.html) - 如果需要访问应用程序状态。
- `HttpRequest` - 本身是一个提取器，它返回 self，以防需要访问请求。
- `String` - 你可以将请求的负载转换为 `String`，[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-2)在文档字符串中可用。
- `bytes::Bytes` -你可以将请求的负载转换为 `Bytes`，[示例](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html#example-4)在文档字符串中可用。
- `Payload` -你可以访问请求的有效负载，[示例](https://docs.rs/actix-web/2/actix_web/web/struct.Payload.html)

### 应用程序状态提取器

使用 `web::Data` 提取器可以从处理程序访问应用程序状态；但是，可以将状态作为只读引用访问。如果需要对状态的可变访问，则必须实现它。

::: waring 小心
actix 会创建应用程序状态和处理程序的多个副本。它为每个线程创建一个副本。
:::

以下是存储已处理请求数的处理程序示例：

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

尽管此处理程序可以工作，但 `self.0` 将根据线程数和每个线程处理的请求数而有所不同。正确的实现将使用 `Arc` 和 `AtomicUsize`

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

注意同步原语，如 `Mutex` 或 `RwLock`，`actix-web` 框架异步处理请求。通过阻塞线程执行，所有并发请求处理进程都将阻塞。如果需要从多个线程共享或更新某些状态，请考虑使用 tokio 同步原语。
