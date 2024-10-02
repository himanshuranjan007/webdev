/* 
Promise class
💡
Calling a promise is easy, defining your own promise is where things get hard
 
A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are used to handle asynchronous operations more effectively than traditional callback functions, providing a cleaner and more manageable way to deal with code that executes asynchronously, such as API calls, file I/O, or timers.


promisified version of setTimeout(callback,5000)         below

------------------------------------++++--------


function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve , ms))
}


function callback(){
    console.log("after 4s , printed");
}


setTimeoutPromisified(4000).then(callback)

----------------------------------------------
*/

const fs = require("fs")


function readFilePromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

function scanFile(){
    const read = function (err,contents) {    
        console.log(contents);
        
    }
    return fs.readFile("c.txt","utf-8",read)


}

readFilePromisified(3000).then(scanFile)