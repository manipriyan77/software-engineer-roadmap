function objectFlatten(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object') {
        objectFlatten(obj[key], newKey, result);
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((data, index) => objectFlatten(data, `${newKey}.${index}`, result));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

const data = {
  user: {
    name: 'Alice',
    address: { city: 'NY', zip: '10001' },
    skills: { frontend: ['JS', 'React'], backend: ['Mongo', 'Java'] },
  },
};

console.log(objectFlatten(data));
