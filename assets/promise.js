const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'; 
class MyPromise {
    // 构造方法接收一个回调
    constructor(executor) {
      this._status = PENDING; // Promise状态
      this._value = undefined; // return回调的return的值
      this._resolveQueue = []    // then收集的执行成功的回调队列
      this._rejectQueue = []     // then收集的执行失败的回调队列
  
      // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
      let _resolve = (val) => {
        if(this._status !== PENDING) return; // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED;
        this._value =val;
        // 从成功队列里取出回调依次执行
        while(this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      // 实现同resolve
      let _reject = (val) => {
        if(this._status!== PENDING) return; // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = REJECTED;
        this._value =val;
        while(this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(val)
        }
      }
      // new Promise()时立即执行executor,并传入resolve和reject
      executor(_resolve, _reject)
    }
  
    // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
    then(resolveFn, rejectFn) {
// 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
      typeof resolveFn !== 'function' ? resolveFn = value => value:null;
      typeof rejectFn !== 'function' ? rejectFn = reason => {
        throw new Error(reason instanceof Error? reason.message:reason);
      }:null;

      return new MyPromise((resolve,reject) => {
        const fulifilledFn = value => {
          try {
            let result =resolveFn(value);
            result instanceof MyPromise ? result.then(resolve,reject) : resolve(result);
          } catch(error) {
            reject(error)
          }
        }
        const rejectedFn = error => {
          try {
            let result =rejectFn(error);
            result instanceof MyPromise ? result.then(resolve,reject) : resolve(result);
          } catch(error) {
            reject(error)
          }
        }

        switch (this._status) {
          case PENDING:
            this._resolveQueue.push(fulifilledFn);
            this._rejectQueue.push(rejectFn);
            break;
          case FULFILLED :
            fulifilledFn(this._value);
            break;
          case REJECTED :
            rejectFn(this._value);
            break;
        }

      });
    }
  }
const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('result')
    }, 1000);
})
