function deepOmit(obj, keysToOmit) {
  if (Array.isArray(obj)) {
    return obj.map((item) => (typeof item === 'object' ? deepOmit(item, keysToOmit) : item));
  } else if (typeof obj === 'object' && obj !== null) {
    let newObj = {};
    for (let key in obj) {
      if (!keysToOmit.includes(key)) {
        newObj[key] = deepOmit(obj[key], keysToOmit);
      }
    }
    return newObj;
  }
  console.log('obj :>> ', obj);
  return obj; // Return primitive values as is
}

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
console.log(deepOmit(obj, ['b', 'e']));
