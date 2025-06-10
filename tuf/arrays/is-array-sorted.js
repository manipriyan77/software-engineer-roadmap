function isArraySorted(arr) {
  let isSorted = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      isSorted = false;
    }
  }
  return isSorted;
}

isArraySorted([1, 2, 3, 6, 5]);
