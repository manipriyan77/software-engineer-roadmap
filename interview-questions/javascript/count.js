// Please create a function count(), when called it should return how many times it has
// been called, count.reset() should also implemented.

// count() // 1
// count() // 2
// count() // 3

// count.reset()

// count() // 1
// count() // 2
// count() // 3

function counter() {
  let current = 0;

  const obj = {};

  Object.defineProperty(obj, "count", {
    get() {
      return current++;
    },
    set() {},
    configurable: false,
    enumerable: true,
  });
  return obj;
}

const count = counter();
count();
count();
count();
