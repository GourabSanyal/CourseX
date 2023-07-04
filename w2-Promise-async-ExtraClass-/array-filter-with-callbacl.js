// ###  Array filter with callback
// write a function 'filtreArray' that takes an array and a callback function as arguments. 'filterArray' should filter the elements of the array based on the condition specified by the callback function and return a new array with the filtered elements.

function lessThanFour(val){
    if (val < 4){
        return true
    } else{
        return false
    }
}

function filterArray(arr, callback){
    return arr.filter((element) => callback(element))
}

arr = [1,2,4,6,3, 10, 87, 8, 0]


function testCase(func, inputs, expextedValues) {
    
    //   assert: func is a function that accepts single aruments
    //          inputs is an array where inputs[i] ios a value to
    //          be passed in the function
    //
    //          expectedValues is an array where expectedVAlues[i] is the expewcted output of the function

    var flag = true
    
    for( var i=0; i < inputs.lenght; i++){
        // INV: func(inputs[i]) == expectedValues[k], 0 <= k <= i-1
        if (func(...inputs[i]) !== expextedValues[i]){
            flag = false
            break
        }
    }

    // tests
    // assert: flag is true if func(inputes[i]) === expectedValues[i]
    //          (0 <= i < inputs.length)
    
    return flag
}

inputsArray = [
    [[1,3,56,7], lessThanFour],
    [[1,3,5,2], lessThanFour],
]

expextedValues = [
    [1,3],
    [1,3,2]
]

// var res = filterArray(arr, lessThanFour)
// console.log(res);

console.log(testCase(filterArray,inputsArray, expextedValues));
