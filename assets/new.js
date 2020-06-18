function New(func) {
    let res = {};
    if (func.prototype !== null) {
        // 进行proto的链接
        res._proto_ = func.prototype;
    }
    // 使this指向新创建的对象
    let ret = func.apply(res, Array.prototype.slice.call(args, 1));
    // 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用
    if ((typeof ret === "object") || typeof ret === "function" && ret !== null) {
        return ret;
    }
    return res;
}
function NewPro(func,...args){
    this.obj={};
    Object.setPrototypeOf(this.obj, Con.prototype);
    let ret=func.apply(this.obj,args);
    if ((typeof ret === "object") || typeof ret === "function" && ret !== null) {
        return ret;
    }
    return this.obj;
}