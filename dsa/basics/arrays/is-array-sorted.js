function isSortedArray(arr) {
  let isSorted = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      isSorted = false;
    }
  }
  console.log("isSorted :>> ", isSorted);
  return isSorted;
}

isSortedArray([1, 2, 3, 4, 5]);
