function findMissingInteger(arr) {
    let count =1
    let result=0
    for (let i = 0; i < arr.length; i++) {
        console.log('count:',count);
        if (count === arr[i]) {
            count++
        }else if((arr[i]!== count )&& (i=arr.length)){
            result = count;
        }
    }
    console.log('result:',result);
}


findMissingInteger([3,4,-1,1]);