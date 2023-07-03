// ### Array map with callbacks

// Impliment an function 'mapArray' which that takes ana array and a callback function as an argument, 'mapArray' should apply the callback function to each element of the array and return a new array with the modified values

var arr= [2,4,6,4]
var arr2 = []

function callback(val){
    val = val + 1
    return val
}

function mapArray(arr, callback) {
    return arr.map((val) => callback(val)) 
}

var res = mapArray(arr, callback)
console.log(res);