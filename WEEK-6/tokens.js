const express = require('express')
const app = express()
// function siginHandler(req,res){
     
// }

app.use(express.json())


const users = []
function generateToken(){
    let options=['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
    let token=""
    for(let i = 0;i<32;i++){
        token = token + options[Math.floor(Math.random()* options.length)]
        

    }
    return token;
}

app.post("/signup",function(req,res){
    const username = req.body.username
    const userpassword = req.body.userpassword

    if(users.find(user=> user.username === username)){
        return res.json({
            message: "username already taken"
        })
    }
    users.push({
        username:username,
        password:userpassword
    })
    res.json({
        message: "you are signed in"
    })
    console.log(users)
})

app.post('/signin',function (req,res){
    const username = req.body.username
    const userpassword = req.body.userpassword
    const user=users.find(function(user){
        if(user.username === username){
            return true;
        } else{
            return false;
        }
    })
    if(user){
        const token = generateToken()
        user.token = token
        return res.json({
            token: token

        }),   console.log(users)
    } else{
        res.status(403).send(
           { message: "invalid username or password"}
        )
    }
 
})

app.listen(3000)