function debounce(func, wait, option) {
  let timeout, result;
  const { immediate }=option;
  let debounced = function () {
    let context = this;
    let arg=arguments;
    if(timeout)clearTimeout(timeout);
    if(immediate){
      let callNow=!timeout;
      timeout=setTimeout(function(){
        timeout=null;
      },wait);
      if(callNow) result=func.apply(context,arg)
    }else{
      timeout=setTimeout(function(){
        func.apply(context,arg);
      },wait);
    }
  }
  debounced.cancel=function(){
    clearTimeout(timeout);
    timeout=null;
  }
  return debounced;
}
function debounce2(func){
  let result;
  return function(){
    cancelAnimationFrame(result);
    result=requestAnimationFrame();
  }
}