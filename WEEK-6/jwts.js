const express =require('express')
const app = express()
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'randomhimanshuranjan'
app.use(express.json())             
const users = []


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
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        // user.token = token not needed as we are not storing token in user object anymore 
        return res.json({
            token: token

        })
    } else{
        res.status(403).send(
           { message: "invalid username or password"}
        )
    }
    console.log(users)
 
})
app.get('/me',function(req,res){ 
    const token = req.headers.token
    const decodedInformation = jwt.verify(token,JWT_SECRET)// {username:himanshuranjan}
    const username = decodedInformation.username

    let foundUser = users.find(u=>u.username == username)

    // const user = users.find(u=>u.token == token)
    if(foundUser){
        res.send({
            username: foundUser.username,
            password:foundUser.password
        })
    } else{
        res.status(403).send({
            message: "invalid token"
        })
    }
})
app.listen(3000)