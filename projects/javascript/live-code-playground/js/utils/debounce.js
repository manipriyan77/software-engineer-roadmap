/**
 * Debounce Utility
 * Delays function execution until after a specified wait time has elapsed
 * since the last time it was invoked
 */

export function debounce(func, wait = 300, immediate = false) {
    let timeout;

    return function executedFunction(...args) {
        const context = this;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle Utility
 * Ensures function is called at most once per specified time period
 */
export function throttle(func, limit = 300) {
    let inThrottle;

    return function executedFunction(...args) {
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Promisify setTimeout
 * Converts setTimeout to return a Promise
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Promisify a callback-based function
 * Demonstrates promisification of setTimeout and other callback APIs
 */
export function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };
}

/**
 * Async debounce - returns a promise that resolves with the function result
 */
export function debounceAsync(func, wait = 300) {
    let timeout;
    let promiseResolve;

    return function executedFunction(...args) {
        const context = this;

        return new Promise((resolve) => {
            if (timeout) {
                clearTimeout(timeout);
            }

            promiseResolve = resolve;

            timeout = setTimeout(async () => {
                timeout = null;
                const result = await func.apply(context, args);
                promiseResolve(result);
            }, wait);
        });
    };
}

/**
 * Leading edge debounce
 * Executes immediately on first call, then debounces subsequent calls
 */
export function debounceLeading(func, wait = 300) {
    let timeout;
    let lastRan;

    return function executedFunction(...args) {
        const context = this;

        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (Date.now() - lastRan >= wait) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    };
}

/**
 * Rate limiter using promises
 * Limits the rate of async function execution
 */
export class RateLimiter {
    constructor(maxCalls, timeWindow) {
        this.maxCalls = maxCalls;
        this.timeWindow = timeWindow;
        this.queue = [];
    }

    async execute(fn) {
        const now = Date.now();
        this.queue = this.queue.filter(time => now - time < this.timeWindow);

        if (this.queue.length >= this.maxCalls) {
            const oldestCall = this.queue[0];
            const waitTime = this.timeWindow - (now - oldestCall);
            await delay(waitTime);
            return this.execute(fn);
        }

        this.queue.push(now);
        return fn();
    }
}

export default {
    debounce,
    throttle,
    delay,
    promisify,
    debounceAsync,
    debounceLeading,
    RateLimiter
};
