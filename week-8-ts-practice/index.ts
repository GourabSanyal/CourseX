 
type Input = (number | string)[];

function getFirstElement(arr : Input) :(string | number ){
  return arr[0]
}

let a = getFirstElement(["one", "two", "three"])
let ans = getFirstElement([1,2,3,4])
console.log(ans)
console.log(a)