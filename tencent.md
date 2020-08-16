react-router
window的location
    hash
    host：主机名和端口
    hostname：主机名
    完整的href
    pathname：url路径
    port：端口号
    protocol：url协议
    search:查询部分
    reload:重新加载新的文档
    replace：替换
history：
    length：url的数量
    back：加载前一个url
    forword：加载下一个url
    go：指定的url

hashRouter和Router


will-change
    告知浏览器该元素会有那种变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好应对的优化工作。这样可以将一部分复杂的计算工作提前准备好，使页面反应更为快速灵敏

webpack打包速度的优化
    thread-loader之后的loader会在一个单独的进程里执行，加快速度
    exclude和include来配置转译的文件
    cache-loader、bebel-loader中添加缓存：将结果缓存
    DLLPlugin：实现拆分，提高构建速度
    splitChunk：抽离公共代码
loader和plugin
    loader：对模块源码的转换，描述webpack如何处理非js模块并引入
    plugin：在webpack运行的生命周期中，plugin可以在不同的生命周期提供api来优化打包的过程


htpp的格式 方法push
请求方法 请求的地址 http版本
请求报头
主体

http版本 请求状态 
响应报头
响应正文

http：
    请求应答模式
    无状态
http0.9
    只支持GET请求，只支持纯文本内容
http1.0
    支持POST、GET、HEAD命令
    任何格式内容都可以发送
    请求和响应的报文，上面会包括头部，用来描述一些元数据
    可以使用expires和if-modified-since来做缓存
http1.1
    支持了PUt、PATDH、OPTION、DELETE方法
    引入了持久连接，只要tcp默认链接不关闭，可以被多个请求复用，设置connection：keep-alive
    引入了管道机制，在同个tcp中，客户端可以同时发送多个请求
    使用E-Tag，if-none-match控制缓存
    支持断点续传，利用请求头的Range实现
http2.0
    二进制帧：二进制协议，头信息和数据体都是二进制
        报文格式被拆分为一个个二进制帧，头部帧，数据帧，不存在先后关系，不需要排序等待，解决了http对头阻塞的问题
    头部压缩
    服务器推送：允许服务器未经请求，主动向客户端推送资源
    请求优先级：可以设置数据帧的优先级，让服务器优先处理
    多路复用：在一个连接里，客户端和浏览器都可以同时发送多个请求，且不用按照顺序一一对应。解决头部阻塞
        同域名的所有通信都在单个连接上完成
        单个连接可以承载任意数量的双向数据流
        数据另以消息的形式发送，消息由帧组成，帧可以乱序发送，服务器可以根据帧里的id来按顺序组装报文
    
    客户端和服务器之间可以互相发送二进制帧，双向传输的序列称为流，用流来表示tcp上进行的多个数据帧的通信，多路复用

    乱序发送是指不同steamID的值是乱序的，同一个steamID的值是按顺序传输的
    接收方接受到帧之后，将相同的steamID组装成完整的报文
    会根据帧里的字段来控制优先级和流量控制

200 请求成功，包含了请求的资源
202 请求已经接受，但还没进行操作
204 请求已经接受，但是主体没有资源可返回
206 成功返回了请求的部分资源

301：资源永久重定向
302：临时重定向
303：存在另一个url，应使用get'获取资源
304：通过首部来判断，让请求变为有条件的。如果请求的资源最近没有被修改，就返回

400：请求报文语法错误
401：请求需要认证
403：请求被拒绝
404：服务器上没有请求的资源
405：请求的方法不被支持

500：服务器错误
502：网关错误
503：服务器处于停机，无法处理请求


DNS：使用UDP协议：避免使用TCP协议时造成的时延（得到一个IP会进行多次请求，使用TCP每次都会有时延，导致DNS速度缓慢。

keep-alive：
    http的协议是请求-应答模式，使用keep-alive时，客户端到服务器的连接持续有效，避免了重复建立连接
    多个http可以重用同个tcp连接

patch：局部更新
GET POST
GET请求后浏览器会主动缓存  POST不能
get的请求内容在url中，post在请求体中
get会一次性发送报文  post会先发送header部分，如果服务器返回100，发送body部分



http1.1到http2升级需要做什么

 
TS的class和js的区别
react中的
css的模块化
微信用户登录的操作



try catch能不能捕获promise的异常

try catch主要捕获同步函数的异常，try里面的异步方法出现了异常。catch无法捕获 当异步函数抛出异常的时候，对于宏任务而言，执行函数已经进入执行栈，trycatch已经离开了执行栈，上下文环境改变了。trycatch就无法捕获

前端安全：
    XSS：跨站脚本攻击，利用这些恶意脚本可以获取cookie、sessionId等，危害数据的安全
     恶意脚本未经过过滤，与正常的代码混在一起，浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行
     url上的参数也可以进行攻击：uGC、url参数、post参数、referer、cookie都不可信
        注入特殊的js的形式
            srcipt标签形式注入
            拼接数据
            使用javascript：可执行代码：src，href
            onload、onerror、onclick注入不可控代码
        存储型:将恶意代码提交到目标的数据库
               打开网站拉取恶意代码，拼接HTML返回给浏览器
               浏览器执行的时候，恶意代码也被执行
               冒充用户的行为，窃取用户信息，调用目标网站接口执行
        反射型：特殊的URL，其中含有恶意代码
                当打开恶意代码的时候，网站服务端将恶意代码从url中取出，拼接在HTML中返回给浏览器，
                浏览器响应执行
        DOM型：
        提交恶意代码
        浏览器执行恶意代码
        输入过滤
        存前端渲染
        输入长度的控制
        http-only，防止js读取cookie
        验证码
    CSRF：跨站请求伪造
        诱导受害者进入三方网站
        攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
        整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
        跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。
        csrf发生在第三域名，不能修改cookie
        同源策略
            origin
            referer
            设置
        token
        二次cookie：url上也携带cookie，将两个cookie进行对比，看是否一样
        set-cookie：samesite：同站cookie，设置cookie不能作为第三方，任何跨域请求都不能通过

js原型
    js有函数对象和普通对象，对象都有_proto_属性，函数队形才有prototype对象
    每个_proto_等于原型的prototype
    prototype上的constructor指向他的构造函数
    一个实例可以通过_proto_向上查找原型对象上的属性，这样就构成了原型链
