function countDown(number) {
  if (number === 0) {
    return number;
  }
  console.log("numnber :>> ", number);
  countDown(--number);
}

countDown(7);
