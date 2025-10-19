// Given an array arr of size n, the task is to find the sum of all the elements in the array.
// Examples:
// Input: n=5, arr = [1,2,3,4,5]
// Output: 15
// Explanation: Sum of all the elements is 1+2+3+4+5 = 15

function sumOfElements(arr){
    let sum =0
    for(let i=0;i<arr.length;i++){
        sum+=arr[i]
    }
    return sum
}
sumOfElements([1,2,3,4,5])