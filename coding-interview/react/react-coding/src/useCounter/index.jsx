import React, { useState, useCallback } from "react";

const useCounter = (initalValue = 0) => {
  const [count, setCount] = useState(initalValue);

  const increment = useCallback(() => setCount(count + 1), []);
  const decrement = useCallback(() => setCount(count - 1), []);
  const reset = useCallback(() => setCount(initalValue), [initalValue]);

  return {
    count,
    setCount,
    increment,
    decrement,
    reset,
  };
};

export default useCounter;
