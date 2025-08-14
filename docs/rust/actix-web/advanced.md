# 高级

## Error 错误

`Actix-web` 使用自己的 `Actix-web::error::error` type 和 `Actix-web::error::ResponseError` 特性从 web 处理程序处理错误。

如果处理程序在还实现 `ResponseError` 特征的结果中返回 `Error` (指一般的 [Rust trait std::Error::Error](https://doc.rust-lang.org/std/error/trait.Error.html))，`actix-web` 将该错误呈现为 HTTP 响应，其对应的 `actix_web::HTTP::StatusCode`，默认情况下生成内部服务器错误：

```rust
pub train ResponseError {
    fn error_response(&self) ->HttpResponse;
    fn status_code(&self) ->StatusCode;
}

```

`Responder` 程序将兼容 `结果` 强制为 HTTP 响应：

```rust
impl<T:Responder,E:Into<Error>> Responder for Result <T,E>
```

上面代码中的 `Error` 是 `actix-web` 的错误定义，任何实现 `ResponseError` 的错误都可以自动转换为一个错误。

`Actix-web` 为一些常见的非 Actix 错误提供 `ResponseError` 实现。例如，如果处理程序以 `io::Error` 响应，则该错误将转换为 `HttpInternalServerError`：

```rust

use std::io;
fn index(req:HttpRequest) ->io::Result<fs::NameFile>{
    Ok(fs::NameFile::open("static/index.html")?)
}
```

请参阅 [actix-web API 文档](https://docs.rs/actix-web/2/actix_web/error/trait.ResponseError.html#foreign-impls)，以获取 `ResponseError` 的外部实现的完整列表。

### 自定义错误响应的示例

下面是 `ResponseError` 的一个实现示例：

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

`ResponseError` 有一个 `error_response()` 的默认实现，它将呈现一个 500 (内部服务器错误)，当上面的 `index` 处理程序执行时，就会发生这种情况。

重写 `error_response()` 以生成更有用的结果：

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

### Error 帮助器

`Actix-web` 提供了一组错误助手函数，这些函数对于从其他错误生成特定的 HTTP 错误代码非常有用。在这里，我们使用 `map_err` 将未实现 `ResponseError` 特性的 `MyError` 转换为 _400_ (错误请求)：

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

有关可用错误帮助程序的完整列表，请参阅 [actix-web 错误模块的 API 文档](https://docs.rs/actix-web/2/actix_web/error/struct.Error.html)。

### 故障兼容

`Actix-web` 提供了与故障库的自动兼容性，因此派生失败的 `错误` 将自动转换为 Actix 错误。请记住，除非你还为这些错误提供了自己的 `error_response()` 实现，否则这些错误将以默认的 _500_ 状态代码呈现。

### 错误日志

Actix 在 `WARN` 日志级别记录所有错误。如果应用程序的日志级别设置为 “`调试`”，并且启用了 `RUST_BACKTRACE`，则也会记录该回溯。这些是可配置的环境变量：

```shell
>> RUST_BACKTRACE=1 RUST_LOG=actix_web=debug cargo run
```

`Error` 类型使用原因的错误回溯 (如果可用)。如果基础故障不提供回溯，则会构造一个新的回溯，指向发生转换的点 (而不是错误的来源)。

### 错误处理的推荐实践

考虑将应用程序产生的错误分成两大类可能是有用的：一类是面向用户的错误，另一类不是面向用户的错误。

前者的一个例子是，我可能使用 failure 指定一个 `UserError` 枚举，该枚举封装了 `ValidationError`，以便在用户发送错误输入时返回：

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

这将完全按照预期操作，因为使用 `display` 定义的错误消息是以用户要读取的明确意图编写的。

然而，对于所有的错误来说，回发错误消息并不可取——在服务器环境中，可能会发生许多错误，我们可能希望在其中向用户隐藏细节。
例如，如果数据库关闭，客户端库开始产生连接超时错误，或者 HTML 模板的格式不正确，并且在呈现时出错。在这些情况下，最好将错误映射到适合用户使用的通用错误。

下面是一个将内部错误映射到带有自定义消息的面向用户的 `InternalError` 的示例：

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

### 错误日志

这是一个使用 `middleware::Logger` 的基本示例：

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

URL 分派提供了一种简单的方法，可以使用简单的模式匹配语言将 URL 映射到处理程序代码。如果其中一个模式匹配与请求关联的路径信息，则调用特定的处理程序对象。

请求处理程序是一个函数，它接受可以从请求 (即 [_impl FromRequest_](https://docs.rs/actix-web/2/actix_web/trait.FromRequest.html)) 提取的零个或多个参数，并返回可以转换为 HttpResponse (即 [_impl Responder_](https://docs.rs/actix-web/2/actix_web/trait.Responder.html)) 的类型。[处理程序](https://actix.rs/docs/handlers/)部分提供了更多信息。

#### 资源配置

资源配置是向应用程序添加新资源的行为。资源有一个名称，它充当用于生成 URL 的标识符。该名称还允许开发人员向现有资源添加路由。
资源也有一个模式，用于与 URL 的 `path` 部分 (scheme 和 port 后面的部分，例如 `URL` 中的 `/foo/bar`) 匹配 `http://localhost:8080/foo/bar?q=value`）。
它与查询部分不匹配 (后面的部分？，例如，`q=value` 在 `http://localhost:8080/foo/bar?q=value`)。

`App::route()` 方法提供了注册路由的简单方法。此方法将单个路由添加到应用程序路由表。此方法接受路径模式、http 方法和处理程序函数。对于同一个路径，可以多次调用 route() 方法，在这种情况下，多个路由为同一个资源路径注册。

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

虽然*App::route()*提供了注册路由的简单方法，但要访问完整的资源配置，必须使用不同的方法。`App::service()` 方法将单个 [resource](https://docs.rs/actix-web/2/actix_web/struct.Resource.html) 添加到应用程序路由表中。此方法接受路径模式、保护和一个或多个路径

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

如果资源不包含任何路由或没有任何匹配的路由，则返回 `NOT FOUND` 的 http 响应。

#### 配置一个路由

资源包含一组路由。每条路线依次有一组 `guards` 和一个处理器。可以使用 `Resource::route()` 方法创建新路由，该方法返回对新路由实例的引用。默认情况下，路由不包含任何保护，因此匹配所有请求，默认处理程序为：`HttpNotFound`。

应用程序根据在资源注册和路由注册期间定义的路由条件路由传入请求。资源匹配它包含的所有路由，其顺序为通过 `Resource::route()` 注册路由的顺序。

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

在本例中，如果 GET 请求包含 `Content-Type` 头，则返回 `HttpResponse::Ok()`，该头的值为 text/plain，路径等于 `/path`。

如果资源无法匹配任何路由，则返回 “`NOT FOUND`” 响应。

`ResourceHandler::route()` 返回路由对象。可以使用类似于生成器的模式配置路由。以下配置方法可用：

- `Route::guard()` - 注册一个新的 guard。每条路线可登记任何数量的守卫。
- `Route::method()` - 注册方法保护程序。每条路线可登记任何数量的守卫。
- `Route::to()` - 为此路由注册处理程序函数。只能注册一个处理程序。通常，处理程序注册是最后一个配置操作。
- `Route::to_async()` - 为此路由注册一个异步处理程序函数。只能注册一个处理程序。处理程序注册是最后一个配置操作。

#### 路由匹配

路由配置的主要目的是根据 URL 路径模式匹配 (或不匹配) 请求的 `path`，`path` 表示请求的 URL 的路径部分。

`actix-web` 做这件事的方式非常简单。当请求进入系统时，对于系统中存在的每个资源配置声明，actix 会根据声明的模式检查请求的路径。
此检查按通过 `App::service()` 方法声明路由的顺序进行。如果找不到资源，则使用默认资源作为匹配的资源。

声明路由配置时，它可能包含路由保护参数。与路由声明关联的所有路由保护必须为 `true`，才能在检查期间将路由配置用于给定请求。
如果提供给路由配置的路由保护参数集中的任何保护在检查期间返回 `false`，则跳过该路由，并继续通过有序的路由集进行路由匹配。

如果任何路由匹配，则停止路由匹配进程并调用与该路由关联的处理程序。如果在用尽所有路由模式后没有匹配的路由，则返回一个 `NOT FOUND` 的响应。

#### 资源模式语法

actix 在 pattern 参数中使用的模式匹配语言的语法很简单。

路由配置中使用的模式可以以斜线字符开头。如果模式不是以斜杠字符开头，则在匹配时会在其前面加上一个隐式斜杠。例如，以下模式是等效的：

```text
{foo}/bar/baz
```

和

```text
/{foo}/bar/baz
```

变量部分 (替换标记) 以 `{identifier}` 的形式指定，这里的意思是 “接受下一个斜杠字符之前的任何字符，并将其用作 `HttpRequest.match_info()` 对象”。

模式中的替换标记与正则表达式 `[^{}/]`+匹配。

`match_info` 是 `Params` 对象，表示根据路由模式从 URL 提取的动态部分。它可用作请求匹配信息。例如，以下模式定义了一个文本段 (`foo`) 和两个替换标记 (`baz` 和 `bar`)：

```text
foo/{baz}/{bar}
```

上述模式将匹配这些 url，并生成以下匹配信息：

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

字面路径 `/foo/biz.html` 将匹配上述路由模式，匹配结果将是 `Params{'name'：'biz'}`。但是，字面路径 `/foo/biz` 将不匹配，因为它在由 `{name}.html` 表示的段末尾不包含字面 `.html` (它只包含 `biz`，而不包含 `biz.html`)。

要捕获这两个片段，可以使用两个替换标记：

```text
foo/{name}.html
```

字面路径 `/foo/biz.html` 将匹配上述路由模式，匹配结果将是 `Params{'name'：'biz'，'ext'：'html'}`。发生这种情况是因为有一个文字部分。(句点) 在两个替换标记 `{name}` 和 `{ext}` 之间。

替换标记可以选择指定一个正则表达式，该正则表达式将用于确定路径段是否应与标记匹配。若要指定替换标记应仅匹配由正则表达式定义的特定字符集，必须使用稍微扩展的替换标记语法形式。
在大括号中，替换标记名后面必须跟一个冒号，然后紧接着是正则表达式。与替换标记 `[^/]+` 关联的默认正则表达式匹配一个或多个不是斜线的字符。例如，在 hood 下，替换标记 `{foo}` 可以更详细地拼写为 `{foo:[^/]+}`。
你可以将其更改为任意正则表达式以匹配任意字符序列，例如 `{foo:\d+}` 以仅匹配数字。

段必须至少包含一个字符才能匹配段替换标记。例如，对于 URL `/abc/`：

- `/abc/{foo}` 不匹配。
- `/{foo}` 匹配。

:::tip Note：
在匹配模式之前，路径将不带引号并解码为有效的 unicode 字符串，表示匹配路径段的值也将不带引号。
:::

例如，以下模式：

```text
foo/{bar}
```

当匹配以下 URL 时：

```text
http://example.com/foo/La%20Pe%C3%B1a
```

匹配字典将如下所示 (值是 URL-decoded)：

```text
Params{'bar': 'La Pe\xf1a'}
```

路径段中的文本字符串应表示提供给 actix 的路径的解码值。你不想在模式中使用 `URL-encoded` 的值。例如，而不是这样：

```text
/Foo%20Bar/{baz}
```

你会想用这样的东西：

```text
/Foo Bar/{baz}
```

有可能得到 “`尾匹配`”。为此，必须使用自定义正则。

```text
foo/{bar}/{tail:.*}
```

上述模式将匹配这些 url，并生成以下匹配信息：

```text
foo/1/2/           -> Params{'bar':'1', 'tail': '2/'}
foo/abc/def/a/b/c  -> Params{'bar':u'abc', 'tail': 'def/a/b/c'}
```

#### Routes 范围

作用域帮助你组织共享公用根路径的路由。可以在作用域内嵌套作用域。

假设你想要组织指向用于查看 “用户” 的端点的路径。这些路径可以包括：

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

你可以从 `HttpRequest::match_info()` 获取变量路径段。路径提取器还可以提取范围级别的变量段。

#### 匹配信息

所有表示匹配路径段的值都可以在 `HttpRequest::match_info` 中找到。可以使用 `Path::get()` 检索特定值。

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

对于路径 “`/a/1/2/`” 的本例，值 v1 和 v2 将解析为 “`1`” 和 “`2`”。

可以从尾部路径参数创建 `PathBuf`。返回的 `PathBuf` 已解码百分比。如果段等于 “..”，则跳过上一段 (如果有)

为安全起见，如果某个段满足以下任何条件，则返回一个 `Err`，指示满足的条件：

- 解码以下任一项开头：`.` (除了 `..`)，`*`
- 解码以下任一项结尾：`:`，`>`，`<`
- 解码包含以下一项：`/`
- 在 Windows 上，解码段包含：‘‘
- 百分比编码导致无效的 UTF8。

由于这些条件，从请求路径参数解析的 `PathBuf` 可以安全地插入或用作路径的后缀，而无需额外检查。

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

Actix 提供类型安全路径信息提取功能。[`路径`](https://docs.rs/actix-web/2/actix_web/dev/struct.Path.html) 提取信息，目的地类型可以定义为几种不同的形式。最简单的方法是使用 `tuple` 类型。
元组中的每个元素必须对应于路径模式中的一个元素。比如：可以将路径模式 `/{id}/{username}/` 与 `Path<(u32，String)>` 类型匹配，但 `路径<(String,String,String)>` 类型将始终失败。

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

还可以将路径模式信息提取到结构，在这种情况下，此结构必须实现 _serde 的_ `反序列化` 特性。

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

#### 生成资源 URL

使用的 [_HttpRequest.url()_](https://docs.rs/actix-web/2/actix_web/struct.HttpRequest.html#method.url_for) 根据资源模式生成 URL 的方法。例如，如果你配置了名为 “`foo`” 且模式为 “`{a}/{b}/{c}`” 的资源，则可以执行以下操作：

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

这将返回类似字符串的内容 `http://example.com/test/1/2/3` (至少在当前协议和主机名暗示 `http://example.com` 网站)。方法返回 url 对象，以便你可以修改此 url (添加查询参数、锚等)。只能为命名资源调用 `url_for()`，否则返回错误。

#### 外部资源

资源是有效的 url，可以注册为外部资源。它们只用于 URL 生成，从不考虑在请求时进行匹配。

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

处理程序在找到正确解析的路径后立即返回。如果启用了所有规范化条件，则规范化条件的顺序为 `1)merge`、`2)merge` 和 append 以及 `3)append`。如果路径至少使用其中一个条件解析，它将重定向到新路径。

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

在本例中，`//resource///` 将被重定向到 `/resource/`。

在本例中，为所有方法注册了路径规范化处理程序，但不应依赖此机制来重定向 `POST` 请求。`NOT FOUND` 斜杠追加的重定向会将 `POST` 请求转换为 `GET`，从而丢失原始请求中的任何 `POST` 数据。

只能为 `GET` 请求注册路径规范化：

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

`web::scope()` 方法允许设置特定的应用程序范围。此作用域表示一个资源前缀，该前缀将作为资源配置添加的所有资源模式的前缀。这可用于帮助在不同的位置装入一组路由，而不是包含的可调用文件的作者想要的位置，同时仍然保持相同的资源名称。

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

在上面的示例中，`show_users` 路由将有一个有效的路由模式 `/users/show` 而不是 `/show`，因为应用程序的作用域将在该模式之前。只有当 URL 路径是 `/users/show`，并且 `HttpRequest.url_for()` 函数是用路由名 `show_users` 调用的，它将生成具有相同路径的 URL。

#### 自定义线路守卫

你可以将保护程序看作一个简单的函数，它接受请求对象引用并返回 `true` 或 `false`。在形式上，[守卫](https://docs.rs/actix-web/2/actix_web/guard/trait.Guard.html)是实现守卫特性的任何对象。Actix 提供了几个谓词，可以检查 api 文档的函数部分。

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

在本例中，只有当请求包含 `Content-Type` 头时，才会调用索引处理程序。

守卫无法访问或修改请求对象，但可以在[请求扩展](https://docs.rs/actix-web/2/actix_web/struct.HttpRequest.html#method.extensions)中存储额外信息。

#### 修改守卫值

通过将任何谓词值包装在 Not 谓词中，可以反转其含义。例如，如果要为除 “GET” 之外的所有方法返回 “METHOD NOT ALLOWED” 响应：

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

`任何` 守卫接受守卫和匹配的列表，如果任何提供的守卫匹配。即：

```text
guard::Any(guard::Get()).or(guard::Post())
```

如果所有提供的守卫都匹配，则全守卫接受守卫和火柴的列表。即：

```text
guard::All(guard::Get()).and(guard::Header("content-type", "plain/text"))
```

#### 更改默认未找到响应

如果在路由表中找不到路径模式或资源找不到匹配的路由，则使用默认资源。找不到默认响应。可以使用 `App::default_service()` 覆盖 `NOT FOUND` 的响应。此方法接受与 `App::service()` 方法的正常资源配置相同的配置函数。

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

`Actix-web` 自动解 `压缩` 有效负载，支持以下编解码器：

- Brotli
- Chunked
- Compress
- Gzip
- Deflate
- Identity
- Trailers
- EncodingExt

如果请求头包含 `Content-Encoding` 头，则根据头值对请求负载进行解压缩。不支持多个编解码器，即：`Content-Encoding`：`br`，`gzip`。

#### JSON Request

json 主体反序列化有几个选项。

第一个选项是使用 Json 提取器。首先，定义一个接受 `Json<T>` 作为参数的处理函数，然后使用 `.to()` 方法注册这个处理程序。还可以通过使用 `serde_json::Value` 作为类型 `T` 来接受任意有效的 json 对象。

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

在下面的示例中，我们将反序列化 `MyObj` 结构。我们需要先加载请求体，然后将 json 反序列化为一个对象。

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

Actix 自动解码分块编码。`web::Payload` 提取程序已包含解码字节流。如果使用支持的压缩编解码器 (`br`、`gzip`、`deflate`) 之一压缩请求负载，则解压缩字节流。

#### 多部分 body

Actix-web 通过一个外部机箱 [Actix multipart](https://crates.io/crates/actix-multipart) 提供多部分流支持。

示例目录中提供了[完整的示例](https://github.com/actix/examples/tree/master/multipart/)。

#### Urlencoded body

`Actix-web` 使用 `web::form` 提取器为 `application/x-www-form-urlencoded` 编码的实体提供支持，该提取器解析为反序列化实例。实例的类型必须实现 serde 的反序列化特性。

`UrlEncoded` future 可以在以下几种情况下解决错误：

- content-type 不是 application/x-www-form-urlencoded
- 传输编码是 `chunked`
- 内容长度大于 256k
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

`HttpRequest` 是 `Bytes` 对象流。它可用于读取请求正文负载。

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

### Responses (响应)

类生成器模式用于构造 `HttpResponse` 的实例，`HttpResponse` 提供了几个返回 `HttpResponseBuilder` 实例的方法，这些方法实现了各种方便的方法来生成响应。

检查[文档](https://docs.rs/actix-web/2/actix_web/dev/struct.HttpResponseBuilder.html)中的类型说明。

方法 `.body`、`.finish` 和 `.json` 完成响应创建并返回构造的 `HttpResponse` 实例，如果在同一个生成器实例上多次调用此方法，则生成器将死机。

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

`Actix-web` 可以使用[压缩中间件](https://docs.rs/actix-web/2/actix_web/middleware/struct.Compress.html)自动压缩有效负载，支持以下编解码器：

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

响应负载根据 `middleware::BodyEncoding` trait 中的编码参数进行压缩。默认情况下，使用 `ContentEncoding::Auto`。如果选择 `ContentEncoding::Auto`，则压缩取决于请求的 `Accept-Encoding` 头。

`ContentEncoding::Identity` 可用于禁用压缩。如果选择了另一个内容编码，则对该编解码器强制执行压缩。

例如，要为单个处理程序启用 `brotli`，请使用 `ContentEncoding::Br`：

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

在这种情况下，我们通过将内容编码设置为 `Identity` 值显式禁用内容压缩：

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

处理已压缩的正文时 (例如，在为资产提供服务时)，请将 `Content-Type` 设置为 `Identity` 以避免压缩已压缩的数据，并手动设置内容编码头：

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

此外，还可以在应用程序级别设置默认内容编码，默认情况下使用 `ContentEncoding::Auto`，这意味着自动内容压缩协商。

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

Json 类型允许使用格式良好的 Json 数据进行响应：只需返回 `Json<T>` 类型的值，其中 T 是要序列化为 `JSON` 的结构类型。类型 `T` 必须实现 serde 的 `序列化` 特性。

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

### Testing (测试)

每个应用程序都应该经过良好的测试。`Actix-web` 提供了执行单元和集成测试的工具。

对于单元测试，`actix-web` 提供了一个请求生成器类型。`TestRequest` 实现了一个类似于 builder 的模式。你可以使用 `to_http_request()` 生成一个 `HttpRequest` 实例，并用它调用处理程序。

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

有几种测试应用程序的方法。`Actix-web` 可用于在真正的 http 服务器中使用特定的处理程序运行应用程序。

`TestRequest::get()`、`TestRequest::post()` 和其他方法可用于向测试服务器发送请求。

要创建用于测试的服务，请使用接受常规 `App` 生成器的 `test::init_service` 方法。

查看 [api 文档](https://docs.rs/actix-web/2/actix_web/test/index.html)以获取更多信息。

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

如果你需要更复杂的应用程序，那么测试应该与创建普通应用程序非常相似。例如，你可能需要初始化应用程序状态。使用 `data` 方法创建 `App` 并附加状态，就像从普通应用程序中一样。

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

如果你需要测试流，那么只需调用 `take_body()` 并将结果 `ResponseBody` 转换为 future 并执行它就足够了，例如测试 `Server Send Events`。

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

`Actix-web` 的中间件系统允许我们为请求/响应处理添加额外的行为。中间件可以钩住一个传入的请求进程，使我们能够修改请求，并停止请求处理以提前返回响应。

中间件还可以连接到响应处理中。

通常，中间件涉及以下操作：

- 预处理请求
- 后处理一个响应
- 修改应用程序状态
- 访问外部服务 (`redis`、日志记录、`sessions`)

中间件为每个 `App`、`scope` 或 `Resource` 注册，并按注册的相反顺序执行。一般来说，中间件是一种实现 `服务特性` 和 `转换特性` 的类型。traits 中的每个方法都有一个默认实现，每个方法都可以立即返回结果或将来的对象。

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

或者，对于简单的用例，可以使用 `wrap_fn` 创建小型的、特别的中间产品：

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

`Actix-web` 提供了一些有用的中间件，如日志、用户会话、压缩等。

#### 记录日志

日志记录是作为一个中间件实现的。通常将日志中间件注册为应用程序的第一个中间件。必须为每个应用程序注册日志中间件。

`Logger` 中间件使用标准的日志箱记录信息。你应该为 actix_web 包启用 logger 以查看访问日志 (`env_logger` 或类似)。

#### 用法

使用指定的 `格式` 创建 `Logger` 中间件。默认 `Logger` 可以使用 `默认` 方法创建，它使用默认格式：

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

#### Format (格式化)

- `%%` 百分号
- `%a` 远程 IP 地址 (如果使用反向代理，则代理的 IP 地址)
- `%t` 开始处理请求的时间
- `%P` 为请求提供服务的子进程 ID
- `%r` 第一行请求
- `%s` 响应状态代码
- `%b` 响应大小 (字节)，包括 HTTP 头
- `%T` 为请求提供服务所需的时间，以秒为单位，浮动小数为。06f 格式
- `%D` 服务请求所用的时间 (毫秒)
- `%{FOO}i` request.headers[‘FOO’]
- `%{FOO}o` response.headers[‘FOO’]
- `%{FOO}e` os.environ[‘FOO’]

#### 默认 Headers

要设置默认响应头，可以使用 `DefaultHeaders` 中间件。如果响应头已包含指定的头，则 `DefaultHeaders` 中间件不设置头。

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

#### 用户 sessions

`Actix-web` 为会话管理提供了一个通用的解决方案。`actix-session` 中间件可以与不同的后端类型一起使用，在不同的后端存储会话数据。

默认情况下，仅实现 cookie 会话后端。可以添加其他后端实现。

`CookieSession` 使用 cookies 作为会话存储。`CookieSessionBackend` 创建的会话限制为存储少于 4000 字节的数据，因为负载必须适合单个 `cookie`。如果会话包含超过 4000 字节，则会生成内部服务器错误。

cookie 的安全策略可以是签名的或私有的。每个都有各自的 `CookieSession` 构造函数。

客户端可以查看签名的 cookie，但不能对其进行修改。客户端既不能查看也不能修改私有 cookie。

构造函数以键作为参数。这是 cookie 会话的私钥-更改此值时，所有会话数据都将丢失。

通常，你创建一个 `SessionStorage` 中间件，并使用特定的后端实现 (例如 `CookieSession`) 对其进行初始化。要访问会话数据，必须使用 `Session` 提取器。此方法返回一个 `session` 对象，该对象允许我们获取或设置会话数据。

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

`ErrorHandlers` 中间件允许我们为响应提供自定义处理程序。

可以使用 `ErrorHandlers::handler()` 方法为特定状态代码注册自定义错误处理程序。你可以修改现有的响应或创建完全新的响应。错误处理程序可以立即返回响应，也可以返回解析为响应的未来。

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

可以使用自定义路径模式和 `NamedFile` 为静态文件提供服务。要匹配路径尾部，可以使用 `[.*]` 正则表达式。

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

要提供来自特定目录和子目录的文件，可以使用 `Files`。`Files` 必须使用 `App::service()` 方法注册，否则将无法为子路径提供服务。

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

默认情况下，子目录的文件列表被禁用。尝试加载目录列表将返回 404 Not Found 响应。要启用文件列表，请使用 [files::show_files_listing()](https://docs.rs/actix-files/0.2/actix_files/struct.Files.html#method.index_file) 方法。

#### 配置

`NameFiles` 可以指定提供文件的各种选项：

- `set_content_disposition` - 用于将文件的 mime 映射到相应内容处理类型的函数
- `use-etag` - 指定是否计算 ETag 并将其包含在标题中。
- `use_last_modified` - 指定是否应使用文件修改的时间戳并将其添加到 `Last-Modified` 的头中。

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
