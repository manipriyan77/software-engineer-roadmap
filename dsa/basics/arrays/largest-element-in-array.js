function findLargest(arr) {
  let maxNumber = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxNumber) {
      maxNumber = arr[i];
    }
  }
  console.log("maxNumber :>> ", maxNumber);
  return maxNumber;
}

findLargest([2, 5, 1, 3, 0]);
