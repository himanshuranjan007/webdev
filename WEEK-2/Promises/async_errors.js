// promise fn always should have resolve and reject 

// rejects in promises

// lets try reading a file and file doesnt exist in the systm then wht to do 

const fs = require("fs")

function readFileAsync(){
    return new Promise(
        function(resolve,reject){
            fs.readFile("aa.txt","utf-8", function(err,data){
                if (err){
                    reject("File Not Found")
                }
                else{
                    resolve(data);
                }
            }
        )
        }
    )
}

readFileAsync()
.then(function(e){
    console.log("Files have been Read" + e);
})
.catch(function(e){
    console.log(e);
})


// errors in callback or setTimeout

//settimeout never rejects



