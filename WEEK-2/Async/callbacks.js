// Reading inside of any text file using js 

const fs = require("fs")

// synchronous code , executing line by line 

const contents1 = fs.readFileSync("a.txt","utf-8"); //  first 

const contents2 = fs.readFileSync("b.txt","utf-8"); // second always 


console.log(contents1);
console.log(contents2);




