function sortAndRemoveDuplicate(arr) {
  let result = [];
  let idFrequency = {};
  for (let i = 0; i < arr.length; i++) {
    if (!idFrequency[arr[i].id]) {
      idFrequency[arr[i].id] = 1;
      result.push(arr[i]);
    } else {
      idFrequency[arr[i].id] = idFrequency[arr[i].id] + 1;
    }
  }
  result.sort((a, b) => a.id - b.id);
  return result;
}

const resut = sortAndRemoveDuplicate([
  { name: 'abc', id: 2 },
  { name: 'abc', id: 2 },
  { name: 'abds', id: 1 },
  { name: 'abfsc', id: 3 },
]);
