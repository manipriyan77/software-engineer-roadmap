// You are given a large integer represented as an integer array digits,
// where each digit[i] is the ith digit of the integer. The digits are ordered from the most significant to
// the least significant in left-to-right order. The large integer does not contain any leading 0's.

// Increment the large integer by one and return the resulting array of digits.

 

// Example 1:

// Input: digits = [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents integer 123.
// Incrementing by one gives 123 + 1 = 124.
// Thus, the result should be [1,2,4].
// Example 2:

// Input: digits = [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents integer 4321.
// Incrementing by one gives 4321 + 1 = 4322.
// Thus, the  result should be [4,3,2,2].


function addOneToNumber(arr) {
    let arrayToNumbers = BigInt(arr.join(""))
    console.log('typeof:', (arrayToNumbers+1n).toString().split("").map((val)=>parseInt((val))));
    return (arrayToNumbers+1n).toString().split("").map((val)=>parseInt((val)))
}

function addOneToNumberForLoopSolution(arr) {
    for (let i = arr.length-1; i >=0; i--) {
        if (arr[i] <9) {
            arr[i]++
            return arr
        }
        arr[i]=0;
    }
    arr.unshift(1);
    return arr;
}
addOneToNumberForLoopSolution([9,9,9])

addOneToNumber([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]);
