const obj = { name: 'Manipriyan' };

// the key will be storead as a string in the object to prove that

obj['name']; //"Manipriyan"

const name = 'name';
obj[name]; //"Manipriyan"

console.log('obj[name] :>> ', obj[name]);

// Properties don't exist in the object will return undefined

const o = {};
// All key in the obj gets stringified
o[1] = 'hello';
o['1'] = 'Hi'; //undefined

console.log('o[1] :>> ', o[1]); // Hi because

// MIXING DATA AND FUNCTIONALITY

const myTri = {
  a: 5,
  b: 7,
  getArea: function () {
    return (this.a + this.b) / 2;
  },
  getHypontenues: function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
};
