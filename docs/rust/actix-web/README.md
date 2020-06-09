---
sidebar: auto
---

# Actix-web

## 介绍

### Welcome

<h3>欢迎使用Actix</h3>

Actix是开发带有Rust的web服务的门户，本文档将为您提供指导。

本文档目前主要涉及`actix-web`部分，它是先前在`actix` actor框架和[`Tokio`](https://tokio.rs/) 异步IO系统之上构建的高级web框架。这是从API稳定性的角度来看最稳定的部分。

如果你还没有使用actix-web，最好从[入门指南](https://actix.rs/docs/getting-started)开始。
如果你已经知道自己的方法，并且需要特定的信息，那么您可能需要阅读 [actix-web API文档](https://docs.rs/actix-web)（或较低级别的 [actix APO=I文档](https://docs.rs/actix)）。

### 什么是Actix

<h3>Acitx 是多态的</h3>

Actix是一些东西。它的基础是一个强大的角色系统，用于Rust，而`actix-web`系统最初就是在这个系统之上构建的。这是你最有可能使用的。`actix-web`给你的是一个有趣且快速的web开发框架。

我们称`actix-web`为一个小型实用的框架。不管是出于什么目的，它都是一个有着一些曲折的微结构。
如果你已经是一个Rust程序员，你可能会发现自己在家很快，但即使你是来自另一种编程语言，你应该发现`actix-web`很容易拿起。

使用`actix-web`开发的应用程序将公开包含在本机可执行文件中的HTTP服务器。
您可以将它放在另一个HTTP服务器（如nginx）后面，也可以按原样提供服务。
即使在完全没有另一个HTTP服务器的情况下，`actix-web`也足够强大，能够提供HTTP 1和htp2支持以及SSL/TLS。这对于构建准备分发的小型服务非常有用。

最重要的是：`actix-web`运行在Rust 1.39或更高版本上，它可以与稳定的版本一起工作。


### 安装

<h3>安装Rust</h3>

因为`actix-web`是一个Rust框架，所以您需要Rust来开始使用它。如果您还没有，我们建议您使用`rustup`来管理您的Rust安装。

官方的Rust指南有一个很好的开始部分。我们目前至少需要Rust1.39，所以请确保您运行`rustup update`以获得最新和最新的Rust版本。特别是本指南将假设您实际运行Rust 1.39或更高版本。

<h3>安装actix-web</h3>

多亏了Rust的`cargo`管理器，您不需要显式地安装`actix-web`。相信它，你就可以走了。对于不太可能使用actix-web开发版本的情况，可以直接依赖git存储库。

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

首先创建一个新的基于二进制的Cargo项目并切换到新目录：

```cmd
cargo new hello-world
cd hello-world
```
现在，通过`Cargo.toml`将`actix-web`添加到你的依赖中，包含以下内容：

```toml
[dependencies]
actix-web = "2.0"
```

如果要使用 `#[actix_rt：：main]`宏，必须将`actix-rt`添加到依赖项中。现在你的`cargo.toml`应该如下所示：
```toml
[dependencies]
actix-web = "2.0"
actix-rt = "1.0"
```

为了实现web服务器，我们首先需要创建一个请求处理程序。

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

接下来，创建一个应用程序实例，并使用路径上的应用程序`route`和特定的HTTP方法注册请求处理程序。
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
您可以注意到`#[actix_rt：：main]`属性宏。此宏在actix运行时执行标记的异步函数。此宏可以标记和执行任何异步函数。
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
这是不必要的，但它使快速原型更方便，因为您可以看到变化立即保存。要了解如何实现这一点，请查看[autoreload模式](https://actix.rs/docs/autoreload/)。


### Application
<h3>写一个应用程序</h3>

`actix-web`提供各种原语来构建带有Rust的web服务器和应用程序。它提供路由、中间件、请求的预处理、响应的后处理等功能。

所有`actix-web`服务器都是围绕`App`实例构建的。它用于注册资源和中间产品的路由。它还存储同一范围内所有处理程序共享的应用程序状态。

应用程序的`scope`充当所有路由的命名空间，即特定应用程序作用域的所有路由都具有相同的url路径前缀。
应用程序前缀始终包含前导`“/”`斜线。如果提供的前缀不包含前导斜杠，则会自动插入。前缀应该由值路径段组成。

对于具有scope`/app`的应用程序，具有`/app`、`/app/`或`/app/test`路径的任何请求都将匹配；但是，路径`/application`将不匹配

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

`HttpServer` 接受应用程序工厂，而不是应用程序实例。Http服务器为每个线程构造一个应用程序实例，因此必须多次构造应用程序数据。如果要在不同线程之间共享数据，则应使用可共享对象，例如Send+Sync。

在内部，`web::Data`使用Arc。因此，为了避免双圆弧，我们应该在使用`App::App_Data()`注册数据之前创建数据。

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
在上面的示例中，show_users路由将具有`/users/show`而不是/show的有效路由模式，因为应用程序的scope参数将位于该模式的前面。只有当URL路径是/users/show，并且当`HttpRequest.url_for`函数是用路由名show_users调用的，它将生成具有相同路径的URL。

<h3>应用程序保护和虚拟主机</h3>

你可以将保护程序看作一个简单的函数，它接受请求对象引用并返回true或false。在形式上，守卫是实现守卫特性的任何对象。`actix-web`提供了几个防护，可以查看api文档的[函数部分](https://docs.rs/actix-web/2/actix_web/guard/index.html#functions)。

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

[HttpServer](https://docs.rs/actix-web/2/actix_web/struct.HttpServer.html)类型负责为http请求提供服务

`HttpServe`r接受应用程序工厂作为参数，应用程序工厂必须具有`Send`+`Sync`边界。在 *“多线程”* 部分中详细介绍。

若要绑定到特定的套接字地址，必须使用bind()，并且可以多次调用它。若要绑定ssl套接字，应使用`bind_openssl()`或`bind_rustls()`。要运行http服务器，请使用`httpServer::run()`方法。


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

`run()`方法返回[`Server`](https://docs.rs/actix-web/2/actix_web/dev/struct.Server.html)类型的实例。服务器类型的方法可用于管理http服务器


- `pause()`  - 暂停接受传入连接
- `resume()` - 继续接受传入连接
- `stop()`   - 停止传入连接处理，停止所有worker并退出

下面的示例演示如何在单独的线程中启动http服务器。

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

因此，任何长的、非cpu限制的操作（如I/O、数据库操作等）都应表示为未来函数或异步函数。异步处理程序由工作线程并发执行，因此不会阻止执行：

```rust
async fn my_handler() -> impl Responder {
    tokio::time::delay_for(Duration::from_secs(5)).await; // <-- OK! 工作线程将在此处理其他请求
    "response"
}
```

同样的限制也适用于提取器。当处理程序函数接收到实现`FromRequest`的参数，并且该实现阻塞当前线程时，工作线程将在运行处理程序时阻塞。出于这个原因，在实现提取器时必须特别注意，而且在需要时也应该异步实现提取器。


#### SSL

ssl服务器有两个特性：`rustls`和`openssl`。`rustls`特性用于`rustls`集成，`openssl`用于`openssl`。

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

Actix可以在保持活动连接上等待请求。

*`keep-alive`* 连接行为由服务器设置定义。

- `75`, `Some(75)`, `KeepAlive::Timeout(75)` - 启用75秒*keep alive*计时器
- `None` or `KeepAlive::Disabled` - 禁用 *keep alive*
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

如果选择了上面的第一个选项，那么将根据响应的连接类型计算保持活动状态。默认情况下，未定义`HttpResponse::connection_type`。在这种情况下，keep alive由请求的http版本定义。

对于HTTP/1.0，*keep alive*处于关闭状态；对于HTTP/1.1和HTTP/2.0，*keep alive*处于打开状态。

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
超时后仍活着的工人将被强制放弃。默认情况下，关闭超时设置为30秒。可以使用`HttpServer::shutdown_timeout()`方法更改此参数。

您可以使用服务器地址向服务器发送停止消息，并指定是否要正常关机, `start()`方法返回服务器的地址。

`HttpServer`处理多个操作系统信号。*CTRL-C*可用于所有操作系统，其他信号可用于unix系统。

- *SIGINT*      - 强制关闭workers
- *SIGTERM*     - 平滑关闭workers
- *SIGQUIT*     - 强制关闭workers

可以使用`HttpServer：：disable_signals()`方法禁用信号处理

### Handler(处理器)

请求处理程序是一个异步函数，它接受可以从请求（即[*impl FromRequest*](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html)）提取的零个或多个参数，并返回可以转换为HttpResponse（即 [*impl Responder*](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)）的类型。

请求处理分两个阶段进行。首先调用处理程序对象，返回实现[`*Responder*`](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)特性的任何对象。然后，对返回的对象调用`respond_to()`，将其自身转换为`HttpResponse`或`Error`。

默认情况下，actix-web为某些标准类型（如&'static str、String等）提供响应程序实现。

有关实现的完整列表，请查看[*Responder*](https://docs.rs/actix-web/2/actix_web/trait.Responder.html#foreign-impls) 文档。

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

响应体可以异步生成。在这种情况下，body必须实现流特征 `Stream<Item=Bytes，Error=Error>`，即：

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
### 提取器

## 高级

### Error 错误
### URL Dispatch
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

## API文档

### [actix](https://docs.rs/actix)
### [actix-web](https://docs.rs/actix-web/)
