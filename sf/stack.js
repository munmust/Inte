function Stack() {
    let item=[];
    this.push=function(element){
        item.push(element);
    }
    this.pop=function(){
        return item.pop();
    }
    this.peek=function(){
        return item[item.length-1];
    }
    this.isEmpty=function(){
        return item.length===0;
    }
    this.size=function(){
        return item.length;
    }
    this.clear=function(){
        item=[];
    }
}
// 进制转换

function baseConverter(decNumber, base){
    var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; 
    while (decNumber > 0){
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
    }
    while (!remStack.isEmpty()){
    baseString += digits[remStack.pop()]; 
    }
    return baseString;
    }

console.log(baseConverter(2,2));