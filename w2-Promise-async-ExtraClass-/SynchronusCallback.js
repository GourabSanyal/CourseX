// ### Synchronus callback

//  Write a function 'higherOrder' that takes a callback as an argument.
// Inside 'higerOrder', call the callback function synchronusly

function callback(){
    console.log('callback called')
}

function higherOrder(callback){
    callback()
}

// what is a callback function?
// what is the diff between callback function and a normal function?
// what is the diff between a higher order function and callback function?