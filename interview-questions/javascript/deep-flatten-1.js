function deepFlatten(arr,depth=1) {
    let result=[];
    for (let item of arr){
        if (Array.isArray(item)){
            result.push(...deepFlatten(item,depth-1));
        }else{
            result.push(item);
        }
    }
    return result;
}