function combineArray(arr) {
  let resultObj = {};
  arr.map((val, index) => {
    if (!resultObj[val.type]) {
      resultObj[val.type] = [val];
    } else {
      resultObj[val.type].push(val);
    }
  });
  console.log('resultObj :>> ', resultObj);
  return [resultObj];
}

combineArray([
  { type: 'fruits', value: 'orange' },
  { type: 'fruits', value: 'apple' },
  { type: 'vegetables', value: 'cucumber' },
]);
