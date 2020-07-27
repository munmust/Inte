function throttle(func, wait, option) {
    const {
        leading,
        trailing
    } = option;
    let timeout, context, args, result, previous = 0;
    let throttled = function () {
        context = this;
        args = arguments;
        let now = new Date().getTime();
        if (!previous && !leading) previous = now;
        let remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && trailing) {
            timeout = setTimeout(function () {
                previous =leading?0:new Date().getTime();
                timeout = null;
                func.apply(context, args);
                if(!timeout)context=args=null;
            }, remaining)
        }
    }
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttle;
}