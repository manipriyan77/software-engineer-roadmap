var majorityElement = function (nums) {
  let map = new Map();
  let majorityElement = nums[0];
  let maxCount = 0;

  for (let element of nums) {
    let count = (map.get(element) || 0) + 1;
    map.set(element, count);
    if (count > maxCount) {
      majorityElement = element;
      maxCount = count;
    }
  }
  return majorityElement;
};
majorityElement([2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2]);
