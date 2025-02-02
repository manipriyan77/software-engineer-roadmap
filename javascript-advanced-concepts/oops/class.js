class Triangle {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }
  getArea() {
    return (this.base * this.height) / 2;
  }
}

const newTri = new Triangle();
newTri.base = 5;
newTri.height = 7;
console.log('newTri.getArea() :>> ', newTri.getArea());

class ShyTriangle extends Triangle {
  describe() {
    return 'runs and hides';
  }
}

const newShy = new ShyTriangle(7, 7);
console.log('newShy :>> ', newShy);

class ColorTriangle extends Triangle {
  constructor(a, b, color) {
    super(a, b);
    this.color = color;
  }
  getColor() {
    return this.color;
  }
}

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static isHuman = true;
}

const newHuman = new Human('John', 30);
console.log('newHuman :>> ', newHuman.isHuman); //Undefined because isHuman is static property which is not accessible by instance
console.log('Human.isHuman :>> ', Human.isHuman); //true

// Geeters
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

// Setters
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  set radius(value) {
    if (value < 0) {
      throw new Error('Negative radius is not allowed');
    } else {
      this._radius = value;
    }
  }
}

const circle = new Circle(-4);

// public field
class Square {
  name;
  constructor(length) {
    this.length = length;
  }
}

// Private field

class Rectangle {
  #length;
  #getArea() {
    return this.#length * this.#length;
  }
  constructor(length) {
    this.#length = length;
  }
  get getArea() {
    return this.#getArea();
  }
}

const rect = new Rectangle(5);
// console.log('rect.#length :>> ', rect.#length); //SyntaxError: Private field '#length' must be declared in an enclosing class
console.log('rect.#getArea() :>> ', rect.getArea);
