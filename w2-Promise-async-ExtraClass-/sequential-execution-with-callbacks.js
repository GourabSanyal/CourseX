// ### Sequential execution with callbacks

// create a function series that sequentially does the following

// 1. read the contetn fo a file 'a.txt. with utf-8
// 2. Wait for 3 seconds
// 3. Write the contents of a.txt in b.txt
// 4 Remove any extra space from 'a.txt.
// 5. Delete the contents of a.txt
// 6.. delete the contents of 'b.txt'


const fs = require("fs");

function series(){
    fs.readFile('a.txt', 'utf-8', waitCallBack)
}

function waitCallBack(err, data){
    // assert: data is content of 'a.txt.

    function writeCallback(){
        fs.writeFile('b.txt', data, removeSpace)
    }

    function removeSpace(err){
        newStr = data.replace(/\s+g/, '')

        fs.writeFile('a.txt', newStr, 'utf-8', deleteA)
    }

    setTimeout(writeCallback, 3000)
}

function deleteA(err){
    fs.writeFile('a.txt','', 'utf-8', deleteB)
}

function deleteB(err){
    fs.writeFile('b.txt', '', 'utf-8', finalCallback)
}

function finalCallback(err){
    console.log('Success')
}

series()