/*
Q: Write code that
1. logs hi after 1 second
2. logs hello 3 seconds after step 1
3. logs hello there 5 seconds after step 2
 

*/

function waitTime(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

function log1(){
    console.log("hi");
    return waitTime(3000)
}
function log2(){
    console.log("hello");
    return waitTime(5000)

}
function log3(){
    console.log("hi there");
}


// const s1 = waitTime(1000).then(log1)
// const s2 = waitTime(0).then(log2)
// const s3 = waitTime(0).then(log3)

waitTime(1000).then(log1).then(log2).then(log3)







