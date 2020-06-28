# Other

## keep-alive

 Http采用的是请求应答的模式，每次请求都要和服务器建立一次链接
 使用keep-alive的时候，使客户端到服务器的链接持续有效，当出现对服务器请求时，避免了建立或重建新的链接
 ![avatar](/assets/keep-alive.jpg)
减少tcp的链接，节省是tcp链接时主机和路由的cpu和内存的开销
响应变快
错误处理更加优雅，不会直接关闭连接，而是report和retry
可能会非常影响性能，因为它在文件被请求之后还保持了不必要的连接很长时间，额外占用了服务端的连接数

连接复用后的包边界问题：
    content-length：
        设置内容长度，说明需要接收多少。
        但是服务器不能预先知道资源大小
    Transfer-Encode：分块编码
        将数据分为一系列数据块，并以一个或多个块发送。
        1，使用transfer-code：chunked之后，报文进行分块，报文改为使用一系列分块进行传输。
        2，每个分块包含十六进制的长度值和数据
        3，最后一个分块的长度值必须为0，表示分块没有数据，实体结束
断开：
    response中设置了keep-aliveTimeout的话，在timeout时间之后会关闭连接。
    connection的close也会关闭

## 浏览器缓存

![avatar](/assets/webCache.jpg)

强缓存：
    Expires：
        Expires是一个HTTP日期，发起请求的时候回和系统时间进行对比，判断是否小于系统时间，小于说明缓存有效，否则失效。会存在缓存有效期不准的情况，优先级最低
    cache-control：
        max-age：有效的时间
        no-cache：不使用强缓存，需要与服务器缓存进行验证
        no-store：禁用缓存，每次都进行请求
        private：私有缓存，中间代理和CDN不能缓存
        public：可以被中间代理和CDN进行缓存
        mus-revalidate：缓存过期前可以使用，过期后，需要向服务器验证
    pragma:
        no-cache:不使用缓存，需要与服务器进行验证
        优先级最高

### 当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性

协商缓存
    ETag/IF-None-Match：值是一串hash码，代表资源的标识符，服务器文件变化的时候他也会随之变化。请求头的If-None-Match和当前文件的hash进行对比判断是否相等，相等：命中缓存
    Last-Modified/If-Modified-Since表示文件的最后修改时间。第一次请求服务端会把资源的最后修改时间放到 Last-Modified 响应头中，第二次发起请求的时候，请求头会带上上一次响应头中的 Last-Modified 的时间，并放到 If-Modified-Since 请求头属性中，服务端根据文件最后一次修改时间和 If-Modified-Since 的值进行比较，如果相等，返回 304 ，并加载浏览器缓存

## 介绍下重绘和回流

渲染过程
![avatar](/assets/渲染.jpg)
1，解析HTML生成DOM树，解析CSS，生成CSSOM树
2，DOM树和CSSOM树结合，生成渲染树
3，根据生成的渲染树
4，根据节点的尺寸和位置，计算生成布局树
5，将树进行渲染到页面上
回流：
    当你获取布局信息的操作的时候，会强制队列刷新
    我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
  
### 优化：
  最小重排和重绘：减少次数，合并操作  
  批量修改：脱离，多次秀爱
  css3硬件加速：使transform、opacity、filter这些动画不发生回流重绘
  对于动画的其他属性可以提升动画的性能
  
## 浏览器和node的事件循环

![avatar](/assets/web%20EventLoop.jpg);

### 浏览器

事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。
案例

```javascript

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

#### 第一轮事件循环流程分析如下

- 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
- 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
- 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
- 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
- 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。
| 宏任务Event Queue | 微任务Event Queue |
| ------ | ------|
| setTimeout1 | process1 |
| setTimeout2 | then1 |
- 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
- 我们发现了process1和then1两个微任务。
- 执行process1,输出6。
- 执行then1，输出8。

#### 好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从setTimeout1宏任务开始

- 首先输出2。接下来遇到了process.nextTick()，同样将其分发到微任务Event Queue中，记为process2。new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2。

| 宏任务Event Queue | 微任务Event Queue |
| ------ | ------|
| setTimeout2 | process2 |
|  | then2 |

- 第二轮事件循环宏任务结束，我们发现有process2和then2两个微任务可以执行。
- 输出3。
- 输出5。
- 第二轮事件循环结束，第二轮输出2，4，3，5。
- 第三轮事件循环开始，此时只剩setTimeout2了，执行。
- 直接输出9。
- 将process.nextTick()分发到微任务Event Queue中。记为process3。
- 直接执行new Promise，输出11。
- 将then分发到微任务Event Queue中，记为then3。

| 宏任务Event Queue | 微任务Event Queue |
| ------ | ------|
|  | process3 |
|  | then3 |

- 第三轮事件循环宏任务执行结束，执行两个微任务process3和then3。
- 输出10。
- 输出12。
- 第三轮事件循环结束，第三轮输出9，11，10，12。
- 整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12

### Node

![avatar](/assets/nodeEventLoop.png);

V8引擎解析js脚本
解析后的代码调用node api
libuv库负责node api的执行，将任务分配到不同的线程，形成一个Event Loop，以异步的方式将任务的执行结果返回给v8引擎
v8引擎将结果返回给用户

![avatar](/assets/nodeEventLoop2.png);

顺序：轮询阶段（pool）-->检查（check）-->关闭事件回调阶段（close callbacks）-->定时器检测阶段（timer）-->I/O事件回调阶段-->闲置阶段（idle，prepare）-->轮询-->......


- polll阶段：获取新的I\O事件，适当条件下node将阻塞在这里
- check阶段：执行setImmediate（）的回调
- close callback：执行socket的close事件回调
- timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
- I\O callbacks：处理一些上一轮循环中少数未执行的I\O回调
- idle，prepare阶段：node内部使用

#### timer

timer阶段会执行setTimeout和setInterval回调，并且由poll控制。定时器的时机不是精准的时间，只是尽快执行

#### poll

1，回到timer阶段执行回调
2，执行I\O回调
    如果没有设定timer的话
        1，有setImmediate回调需要执行；poll会停止并进入check阶段执行回调
        2，没有setImmediate回调需要执行，会等待回调被加入到队列中并立即执行回调，会有一个超时时间设置防止一直等待下去。

#### check

check阶段 setImmediate回调会被加入到check队列中


```javascript
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2

```

- 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出start end，并将2个timer依次放入timer队列）,会先去执行微任务（这点跟浏览器端的一样），所以打印出promise3
- 然后进入timers阶段，执行timer1的回调函数，打印timer1，并将promise.then回调放入microtask队列，同样的步骤执行timer2，打印timer2；这点跟浏览器端相差比较大，timers阶段有几个setTimeout/setInterval都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务

#### Micro Macro

Node端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。
常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。

#### setTimeout与setImmediate

setImmediate 设计在poll阶段完成时执行，即check阶段；
setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行，但它在timer阶段执行
当二者在异步i/o callback内部调用时，总是先执行setImmediate，再执行setTimeout

#### process.nextTick

独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行

#### 浏览器和node的区别

浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。

## node进程和线程

### 进程

系统资源分配好调度的基本单位，是线程的容器，资源分配的最小单位。启动一个实例和服务都是开启一个进程。多进程是进程的fork，fork出来的进程有自己的独立空间地址和数据线。进程无法互相访问，建立IPC（进程间通信[管道、信号量、消息队列、共享空间]）才能访问

### 线程

线程是操作系统进行运算调度的最小单位，一个线程隶属一个进程，一个进程有多个线程

## XSS和csrf

### XSS

跨站脚本攻击，攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。
1，反射型
    简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站
2，存储型
    把用户输入的数据 "存储" 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。
3，基于DOM
    通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击

#### 防范

- HttpOnly防止劫持cookie
- 检查输入
  
```javascript
  const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
}

```

- 检查输出
  输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击。例如利用 sanitize-html 对输出内容进行有规则的过滤之后再输出到页面中

### CSRF

    跨站请求伪造
