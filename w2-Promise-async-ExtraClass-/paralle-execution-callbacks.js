// ### Paralle Execution Callbacks

// Impliment a function 'parallelFileOperation' that returns an array of size 2 with the first index
// containing the contents of the file a.txt in UTF-8 encoding. if 'a.txt' dosent exist, then throw an error.
// the second element of the array contains 1, if the text 'hello!' is successfully written to the file `b.txt`
// and 0 if the write operation fails.

const fs = require('fs')

var ans = []
var count = 0

function parallelFileOperation(){
    
    function readFileFn(err, data){
        if(err){
            throw err
        }
        ans[0] = data
        count++
        if ( count === 2 ){
            console.log(ans)
        }
    }
    
    function writeFileFn(err){
        if (err) {
            ans[1] = 0   
        } else {
            ans[1] = 1
        }
        count++
        if(count === 2){
            console.log(ans)
        }

    }

    fs.readFile('a.txt', 'utf-8', readFileFn)
    fs.writeFile('b.txt','Hello!', 'utf-8', writeFileFn)
}

parallelFileOperation();