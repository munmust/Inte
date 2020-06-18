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