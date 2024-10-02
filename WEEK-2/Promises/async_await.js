// async await -> another version of Promise 


// creating a promise 

function setTimeoutPromisified(duration){
    return new Promise(resolve=>setTimeout(resolve,duration))
}

// now  creating async await fn 

// this fn doesnot look like it is returning promise but indeed it is returning a promise 

// this looks like a synchronous syntax but it isnt
// this is syntactic sugar


async function bitches(){
    await setTimeoutPromisified(1000)
    console.log("hey beyotch!!!");
    
    await setTimeoutPromisified(1000)
    console.log("hey bitch!!!");
    
}
bitches()

console.log("i am first bitch!!!!");