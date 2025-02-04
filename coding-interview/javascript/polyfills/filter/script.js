let value = [1, 2, 3].filter((data) => {
  return data < 3;
});

Array.prototype.myFilter = function (cb) {
  let newData = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      newData.push(this[i]);
    }
  }
  return newData;
};

['a', 'a', 'b', 'c'].myFilter((data) => {
  return data !== 'a';
});
