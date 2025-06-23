function arrayProduct(arr) {
  if (arr.length === 1) {
    return arr;
  }
  return arr[0] * arrayProduct(arr.slice(1));
}

console.log(arrayProduct([1, 2, 3, 4]));
