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
for(let i=0;i<100;i++){
    console.log(RandomArr([],5,2,32));
}

/**
 * 数组扁平化、去重、排序
 * 
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