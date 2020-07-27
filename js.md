## ['1', '2', '3'].map(parseInt)

map(call,index,array);
parseInt(string,[radix]);
实际情况
['1', '2', '3'].map((item,index)=>{
    return parseInt(item,index);
})
出现： parseInt('1', 0) // 1
      parseInt('2', 1) // NaN
      parseInt('3', 2) // NaN, 3 不是二进制
例子：['10','10','10','10','10'].map(parseInt);// [10, NaN, 2, 3, 4]

## ES5/ES6 的继承除了写法以外还有什么区别？

    ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。
    class的子类可以通过_proto_寻址到父类，可以继承
class的一些特征
1，class 声明会提升，但不会初始化赋值
2，class 声明内部会启用严格模式
3，class 的所有方法（包括静态方法和实例方法）都是不可枚举的
4，class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用
5，class 内部无法重写类名

## setTimeout、Promise、Async/Await的区别

setTimeout是一个定时器，他的回调函数会被推入宏任务队列，在任务栈为空的时候执行。promise其实是一个同步的立即执行函数，但是如果在里面执行reject和resolve的时候是异步的，会将then和cath的方法放到微任务队列中，当宏任务执行完，去执行微任务。async其实是生成器加上promise来实现的，async里的会立即执行，但会等待await里的内容完成才会继续执行其他内容。后面的内容会放入微任务队列中。

## Object.prototype.toString.call()、instanceOf和Array.isArray

Object.prototype.toString.call()：
    常用于判断浏览器内置对象时
    返回 [Object key];
    使用call或apply改变toString的执行上下文

```
    Object.prototype.toString.call('An') // "[object String]"
    Object.prototype.toString.call(1) // "[object Number]"
    Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
    Object.prototype.toString.call(null) // "[object Null]"
    Object.prototype.toString.call(undefined) // "[object Undefined]"
    Object.prototype.toString.call(function(){}) // "[object Function]"
    Object.prototype.toString.call({name: 'An'}) // "[object Object]"
```
instanceOf
    判断对象的原型链中是不是能够找到类型的prototype（原型）
```
function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightProto) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
```
### array.isArray();
    判断对象是不是数组
    可以检测出iframes

