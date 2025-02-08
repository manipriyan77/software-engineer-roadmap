/* Given an array arr[] of size n, the task is to rearrange it in alternate positive and negative manner without changing the relative order of positive and negative numbers. In case of extra positive/negative numbers, they appear at the end of the array.
Note: The rearranged array should start with a positive number and 0 (zero) should be considered as a positive number.
Examples: 
Input:  arr[] = {1, 2, 3, -4, -1, 4}
Output: arr[] = {1, -4, 2, -1, 3, 4}
Input:  arr[] = {-5, -2, 5, 2, 4, 7, 1, 8, 0, -8}
Output: arr[] = {-5, 5, -2, 2, -8, 4, 7, 1, 8, 0} */

function arraySwap(arr) {
  let positive = [];
  let negative = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 0) {
      positive.push(arr[i]);
    } else {
      negative.push(arr[i]);
    }
  }
  let j = 0;
  let k = 0;
  let i = 0;

  while (i < positive.length && j < negative.length) {
    arr[k++] = positive[i++];
    arr[k++] = negative[j++];
  }

  while (i < positive.length) {
    arr[k++] = positive[i++];
  }

  while (j < negative.length) {
    arr[k++] = negative[j++];
  }
  return arr;
}

const result = arraySwap([-5, 5, -2, 2, -8, 4, 7, 1, 8, 0 - 8, -7, -5, -1]);
console.log('result :>> ', result);
