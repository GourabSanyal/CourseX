// ###  Array filter with callback
// write a function 'filtreArray' that takes an array and a callback function as arguments. 'filterArray' should filter the elements of the array based on the condition specified by the callback function and return a new array with the filtered elements.

function filterArray(arr, callback){
    return arr.filter((element) => callback(element))
}

arr = [1,2,4,6,3, 10, 87, 8, 0]

function lessThanFour(val){
    if (val < 4){
        return val
    }
}

var res = filterArray(arr, lessThanFour)
console.log(res);

