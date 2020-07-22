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

let str="asdfghjkl";
console.log(delChar(str,'s'));