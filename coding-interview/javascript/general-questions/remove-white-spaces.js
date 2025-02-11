function removeWhiteSpaces(string) {
  let array = string.split(' ');
  let value = array.join('');
  return value;
}

removeWhiteSpaces('Hello,   World!');
