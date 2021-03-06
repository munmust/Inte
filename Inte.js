/**
 *  用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
 */
function Fun(arr){
    arr=arr||[];
    if(arr.length===5){
        return arr;
    }
    let num=Math.floor(Math.random()*31)+2;
    if(arr.indexOf(num)===-1){
        arr.push(num);
    }
    return Fun(arr);
}
function RandomArr(arr,len,min,max){
    arr=Array.isArray(arr)?arr:[];
    if(len<1)return [];
    if(arr.length===len)return arr;
        const num=Math.floor(Math.random()*(+max - +min+1))+ +min;
    if(!arr.includes(num))arr.push(num);
    return RandomArr(arr,len,min,max);
}


/**
*   去除字符串中最后一个指定的字符
*/

function delChar(str,char){
    return str.split('').reverse().join('').replace(char, '').split('').reverse().join('');
};

function delChars(str,char) {
    let reg=new RegExp(`${char}(?=([^${char}]*)$)`);
    str.replace(reg,'');
}

/**
 * 数组扁平化、去重、排序
 * 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
function solution(arr){
    return (Array.from(new Set(arr.flat(4)))).sort((a,b)=>a-b);
}
function flat1(arr) {
    return arr.reduce(function(prev,next){
        return prev.concat(Array.isArray(next)?flat1(next):next);
    },[])
}
function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr));

/**
 * 编写一个函数计算多个数组的交集
 * 要求：
 * 输出结果中的每个元素一定是唯一的
 */
function getInterSection(...arrs){
    return Array.from(new Set(arrs.reduce((result,arr)=>{
        return arr.filter(item=>result.includes(item));
    })))
}
console.log(getInterSection([1],[1,2,5],[1,56,67]));

/**
 *    写一个方法把下划线命名转成大驼峰命名
 */
function changeStr(str){
    if(str.split('_').length==1)return;
    return str.split('_').reduce((a,b)=>{
      return a.substr(0,1).toUpperCase() + a.substr(1)+b.substr(0,1).toUpperCase() + b.substr(1)
    })
 }
// 存在问题
//  function changeStr2(str){
//      str=str.replace(/(\w)/,(match,$1)=>`${$1.toUpperCase()}`)
//      while(str.match(/_[a-z]/)){
//          str.replace(/(\w)(_)(\w)/,(match,$1,$2,$3)=>`${$1}${$3.toUpperCase()}`)
//      }
//      return str;
//  }
console.log(changeStr2('a_c_def'));


/**
 * 实现一个 sleep 函数，比如 sleep(1000) 
 * 意味着等待1000毫秒，
 * 从 Promise、Generator、Async/Await 等角度实现
 */
const PromiseSleep=(time)=>{
    return new Promise(resolve=>setTimeout(resolve,time));
}
PromiseSleep(1000).then(()=>{
    XXX
});
const GeneratorSleep=(time)=>{
    function* gen(){
        yield new Promise(resolve=>setTimeout(()=>{resolve()},time));
    }
    return gen().next().value;
}
GeneratorSleep(1000).then(()=>{
    XXX
})
const AsyncSleep=(time)=>{
    await new Promise(resolve=>setTimeout(resolve,time));
    XXX
}
AsyncSleep(1000);
