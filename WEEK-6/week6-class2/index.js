const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "kirat123123";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", logger, function(req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })

    // we should check if a user with this username already exists

    res.json({
        message: "You are signed in"
    })
})

app.post("/signin", logger, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return 
    } else {
        const token = jwt.sign({
            username:username
        }, JWT_SECRET);
        // res.header("jwt", token);

        // res.header("random", "harkirat");

        res.json({
            token: token
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get('/me',function(req,res){ 
    const token = req.headers.token
    const decodedData = jwt.verify("token",JWT_SECRET)
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

    const user = users.find(u=>u.token === token)
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
app.listen(3000);