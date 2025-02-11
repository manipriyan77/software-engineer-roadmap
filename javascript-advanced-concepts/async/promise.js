const promise = new Promise(function (resolve, reject) {
  resolve('Resolved');
  reject('Rejected');
});

promise.then((data) => console.log(data, 'data')).catch((err) => console.log('err :>> ', err));
