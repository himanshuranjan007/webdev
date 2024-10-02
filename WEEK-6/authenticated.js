// creating an authenticated endpoint
// /me


// slides->  https://petal-estimate-4e9.notion.site/Creating-an-express-app-a01ad6db6d544d2b84fd1ff5bd057abe

const express = require('express')
const app = express()
app.use(express.json())

// global variable as an array acting as database
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
app.get('/me',function(req,res){ 
    const token = req.headers.token
    
    // using loop iteration
    
    // let foundUser =null;
    // for(let i =0;i<users.length;i++){
    //     if(users[i].token == token){
    //         foundUser=users[i]
    //     }
    // }

    // if(foundUser){
    //     res.json({
    //         username:foundUser.username,
    //         password:foundUser.password
    //     })
    // }else{
    //     res.json({
    //         message:"token invalid"
    //     })
    // }

    // using find()

    const user = users.find(u=>u.token == token)
    if(user){
        res.send({
            username: user.username,
            password:user.password
        })
    } else{
        res.status(403).send({
            message: "invalid token"
        })
    }
})
app.listen(3000)