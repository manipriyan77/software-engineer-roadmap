// Find the contiguous subarray within an array, A of length N which has the largest sum.

// Example Input
//  1:
// A = [1, 2, 3, 4, -10]
// Input 2:
// A = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
//
//
// Output 1:
// 10
// Output 2:
// 6
//
// Explanation 1:
// The subarray [1, 2, 3, 4] has the maximum possible sum of 10.
// Explanation 2:
// The subarray [4,-1,2,1] has the maximum possible sum of 6.


// Kadane's Algorithm [-ve sum subarrays are excluded]

function maxNumberOfNumbers(arr) {
    let answer=-Infinity;
    let sum =0
    for (let i=0;i<arr.length;i++){
        sum = arr[i]+sum
        if (sum>answer){
            answer=sum
        }
        if (sum<0){
            sum=0
        }

    }
    return answer
}
maxNumberOfNumbers([-2, 1, -3, 4, -1, 2, 1, -5, 4])