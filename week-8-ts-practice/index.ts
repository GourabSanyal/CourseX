// function getFirstElement<G>(arr: G[]): G {
//   return arr[0];
// }

// let a = getFirstElement<string>(["one", "two", "three"]);
// let ans = getFirstElement<number>([1, 2, 3, 4]);
// console.log(ans);
// console.log(a);

function swap<T>(a : T, b: T): [T, T] {
    return [b,a]
}

let ans = swap(3,4)
console.log(ans)