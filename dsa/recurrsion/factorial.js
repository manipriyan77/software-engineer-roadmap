function factorial(num) {
  if (num === 1) {
    return num;
  }
  console.log("num * factorial(--num) :>> ", num * factorial(--num));
  return num * factorial(num - 1);
}

factorial(3);
