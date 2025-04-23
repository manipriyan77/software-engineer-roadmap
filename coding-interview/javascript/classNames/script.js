function classNames(...args) {
  let result = [];
  function processItem(item) {
    if (!item) return; // Skip falsy values like null, undefined, false

    if (Array.isArray(item)) {
      item.forEach(processItem); // Recursively process arrays
    } else if (typeof item === "object") {
      for (let key in item) {
        if (item[key]) result.push(key); // Only push truthy keys
      }
    } else {
      result.push(item);
    }
  }

  args.forEach(processItem);
  console.log("result :>> ", result);
  return result.join(" ");
}

// classNames('foo', { bar: true });
classNames(["foo", "bar", "baz"]);
classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "");
