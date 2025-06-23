function sumHighestAndLowestFrequency(arr) {
  if (arr.length === 0) return 0; // Edge case: empty array

  // Step 1: Count frequencies
  const frequencyMap = new Map();
  for (const num of arr) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Step 2: Find the highest and lowest frequencies
  let maxFreq = -Infinity;
  let minFreq = Infinity;
  for (const freq of frequencyMap.values()) {
    if (freq > maxFreq) {
      maxFreq = freq;
    }
    if (freq < minFreq) {
      minFreq = freq;
    }
  }

  // Step 3: Return the sum of highest and lowest frequencies
  return maxFreq + minFreq;
}
