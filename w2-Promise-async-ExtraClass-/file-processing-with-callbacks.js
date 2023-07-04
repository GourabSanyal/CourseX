// ### File processing with callbacks

// Write a function 'readFileCallback', that takes a filename and a callback function
// 'readFileCallback' should read the contents of the file synchronously
//  and pass the data to the callback function

const { log } = require('console')
var fs = require('fs')

function logFileData(err, data){
    console.log(data);
}

function readFileCallback(fileName, callback){
    fs.readFile('a.txt', 'utf-8', callback)
}

readFileCallback('a.txt', logFileData)