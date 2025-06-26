function sumOfNNumbers(n) {
  let result = 0;
  if (n === 1) {
    return 1;
  }
  return result + sumOfNNumbers(n - 1);
}
