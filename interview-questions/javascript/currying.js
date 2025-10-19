function currying(fn) {
    return function curried(...args) {
        console.log('args,fn:',args.length,fn.length);
        if (args.length >= fn.length) {
            console.log('args:',args);
            return fn.apply(this,args)
        }else{
            return function (...nextArgs){
                console.log('nextArgs:',nextArgs);
                return curried(...args,...nextArgs)
            }
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = currying(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1, 2, 3)); // 6

function multiply(a,b) {
    return a*b
}
console.log('multiply.length:',multiply.length);