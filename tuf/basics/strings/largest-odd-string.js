// Given a string s, representing a large integer, the task is to return the largest-valued odd integer (as a string)
// that is a substring of the given string s.
// The number returned should not have leading zero's. But the given input string may have leading zero.

function largestOddNumberString(s) {
  let ind = -1;
  let i;
  for (i = s.length; i >= 0; i--) {
    if ((s[i] - "0") % 2 === 1) {
      ind = i;
      break;
    }
  }
  i = 0;
  while (i < ind && s[i] === "0") {
    i++;
  }
  console.log(" s.substring(i, ind) :>> ",i, s.substring(i, ind + 1));
  return s.substring(i, ind + 1);
}

largestOddNumberString("0214638");
