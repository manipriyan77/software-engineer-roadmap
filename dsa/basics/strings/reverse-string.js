function reverseString(str) {
  let arr = str.split('');

  let start = 0,
    end = arr.length - 1;

  // Until the string is reversed
  while (start < end) {
    // Swap the characters at start and end
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    // Move the pointers towards the center
    start++;
    end--;
  }
  return arr.join('');
}

reverseString('Mani');
