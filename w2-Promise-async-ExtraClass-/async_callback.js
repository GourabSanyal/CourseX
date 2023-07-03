//  ### Asynch Callbacl
// Write a function 'higherOrderAsync' thta takes a callback as an argument. Inside 'higherOrderAsync', call the callback fucntion asynchronously using setTimeout after a delay of n seconds, where n is current day of the month according to UTC time ( 1 <= n <= 31)

function callback(){
    console.log("Callbcak called")
}

function getDayOfMonth(){
    // assert:  date contains the current date info as 
    //          a date obj
    var today = new Date()
    return today.getUTCDate()
}

function higherOrderAsync(callback) {
    setTimeout(callback, getDayOfMonth() * 100)
}

// console.log(getDayOfMonth())
higherOrderAsync(callback)

//  what is setTimeout?
// is setTimeout async?
// how to use setTimeout to solve this problem?
        // setTimeout( functionRef, delay )