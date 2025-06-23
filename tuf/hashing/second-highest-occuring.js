function secondMostFrequentElement(arr) {
  if (arr.length === 0) return -1; // Edge case: empty array

  // Step 1: Count frequencies
  const frequencyMap = new Map();
  for (const num of arr) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // If all elements are unique, return -1
  // if (frequencyMap.size === arr.length) return -1;

  // Step 2: Find the most frequent element
  let maxFreq = -Infinity;
  let mostFrequentElement = null;
  for (const [key, freq] of frequencyMap) {
    if (freq > maxFreq) {
      maxFreq = freq;
      mostFrequentElement = key;
    }
  }

  // Step 3: Find the second most frequent element
  let secondMaxFreq = -Infinity;
  let secondMostFrequentElement = null;
  for (const [key, freq] of frequencyMap) {
    if (freq < maxFreq && freq > secondMaxFreq) {
      secondMaxFreq = freq;
      secondMostFrequentElement = key;
    } else if (freq === secondMaxFreq && key < secondMostFrequentElement) {
      // If multiple elements have the same frequency, choose the smallest one
      secondMostFrequentElement = key;
    }
  }

  // If no second most frequent element exists, return -1
  return secondMostFrequentElement !== null ? secondMostFrequentElement : -1;
}
