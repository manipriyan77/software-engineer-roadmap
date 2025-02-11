Array.prototype.myReverse = function () {
  let result = [];
  for (let i = this.length - 1; i >= 0; i--) {
    result.push(this[i]);
  }
  console.log('result :>> ', result);
  return result;
};

[1, 2, 3, 4].myReverse();
