function nearestSmallerElement(arr) {
  let smaller = null;
  let result = [];
  for (let val of A) {
    if (val < smaller) {
      smaller = val;
      result.push(smaller);
    } else {
      result.push(-1);
    }
  }
  return result;
}

nearestSmallerElement([34, 35, 27, 42, 5, 28, 39, 20, 28]);

// -1 34 -1 27 -1 5 28 5 20 