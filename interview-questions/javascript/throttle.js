function throttle(func,delay) {
    let lastRan;
    let lastFunc;
    return function(...args) {
        let context= this
        if (!lastRan){
            func.apply(context, args);
            lastRan= Date.now();
        }else{
            clearTimeout(lastFunc)
            lastFunc=setTimeout(()=>{
                if ((Date.now() - lastFunc) > delay){
                    func.apply(context, args);
                    lastRan= Date.now();
                }
            },delay-(Date.now()-lastRan));
        }
    }
}

function onScroll() {
    console.log('Scroll event fired at', new Date().toLocaleTimeString());
}

// Limit the scroll function to run at most once every 1 second
const throttledScroll = throttle(onScroll, 1000);

window.addEventListener('scroll', throttledScroll);