// const counter = makeCounter();
// counter(); // 0
// counter(); // 1
// counter(); // 2

function makeCounter(num = 0) {
  let count = num;
  return function () {
    return count++;
  };
}

const counter = makeCounter();
counter();
counter();
counter();
