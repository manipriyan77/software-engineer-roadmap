function arrayFlatten(arr) {
  let result = [];
  function flatten(item) {
    if (Array.isArray(item)) {
      item.forEach(flatten); // Recursively process elements
    } else {
      result.push(item);
    }
  }
  flatten(arr);
  return result;
}

arrayFlatten([
  [1, 2],
  [3, 4],
]);
