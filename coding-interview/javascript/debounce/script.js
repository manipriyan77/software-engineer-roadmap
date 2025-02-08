function debounce(cb, delay = 1000) {
  let timeOut;
  return function (...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const debouncedFun = debounce(() => console.log(1));

debouncedFun();
debouncedFun();
