function highestOccuringElementUsingObject(arr) {
  let occuringFrequency = {};
  let maxOccured = 0;
  for (let i = 0; i < arr.length; i++) {
    if (occuringFrequency[arr[i]]) {
      occuringFrequency[arr[i]] = occuringFrequency[arr[i]] + 1;
    } else {
      occuringFrequency[arr[i]] = 1;
    }
  }
  for (let key in occuringFrequency) {
    if (occuringFrequency[key] > maxOccured) {
      maxOccured = key;
    }
  }
  return maxOccured;
}

highestOccuringElementUsingObject([1, 2, 324, 5, 4, 4, 5, 5, 5, 5, 5]);

function highestOccuringElementUsingMap(arr) {
  let maxOccured = 0;
  let element = arr[0];
  let mapFrequency = new Map();
  for (let i = 0; i < arr.length; i++) {
    mapFrequency.set(arr[i], (mapFrequency.get(arr[i]) || 0) + 1);
  }

  for (let [key, frequencyCount] of mapFrequency) {
    if (frequencyCount > maxOccured) {
      maxOccured = frequencyCount;
      element = key;
    } else if (frequencyCount === maxOccured) {
      element = Math.min(key, element);
    }
    console.log('key :>> ', key);
  }
  console.log('element :>> ', element);
  return element;
}

highestOccuringElementUsingMap([2, 4, 1]);
