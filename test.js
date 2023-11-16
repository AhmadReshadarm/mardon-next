// const number = 100;

// for (let i = 2; i <= number; i++) {
//   if (number % i === 0 || number % 2) {
//     // console.log(i);
//   } else {
//     console.log(i);
//   }
// }
function* Prime(number) {
  const infinit = !number && number !== 0;
  const re = /^.?$|^(..+?)\1+$/;
  let actual = 1;

  while (infinit || number--) {
    if (!re.test('1'.repeat(actual)) == true) yield actual;
    actual++;
  }
}

let [...primers] = Prime(1000); //Example
console.log(primers);
