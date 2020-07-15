function mySymbol(obj) {
  // 不要问我为什么这么写，我也不知道就感觉这样nb
  let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
      // 牛逼也要严谨
  if (obj.hasOwnProperty(unique)) {
      return mySymbol(obj) //递归调用
  } else {
      return unique
  }
}
Function.prototype.myApply = function(context) {
  context = context||window;
  let fn = mySymbol(context);
  context[fn] = this;
  let arg = [...arguments].slice(1); 
  context[fn](...arg) ;
  delete context[fn] ;

}
let Person = {
  name: 'Tom',
  say(age) {
      console.log(this)
      console.log(`我叫${this.name}我今年${age}`)
  }
}

Person1 = {
  name: 'Tom1'
}

Person.say.myApply(Person1,18)//我叫Tom1我今年18