Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i));
  }
  return temp;
};
const data = [1, 2, 3].myMap((data, i) => data * 2);

const obj = {
  name: 'Mani',
  myName: this.name,
};
