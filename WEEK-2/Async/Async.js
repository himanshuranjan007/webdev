// Reading inside of any text file using js 

const fs = require("fs")

// synchronous code , executing line by line 

const contents1 = fs.readFileSync("a.txt","utf-8"); //  first 

const contents2 = fs.readFileSync("b.txt","utf-8"); // second always 


console.log(contents1);
console.log(contents2);
console.log("MOVE ON");

// asynchronous code -- runs based on whatever gets read first not sequentally line by line

const read = function (err,contents) {    
    console.log(contents);
    
}



fs.readFile("a.txt","utf-8", read)   // in synchronous code this should have been read first and loged first but as the a.txt file is large so while this is getting read the other line which is small get logged first 

fs.readFile("b.txt","utf-8", read)


// setTimeout


// setTimeout is another asynchronous function that executes a certain code after some time

function late(){
    console.log("this is a lazy phrase");

    
}


setTimeout(late,1000)

console.log("i am fast bitch ");