const express = require('express')
const { UserModel, TodoModel } = require('./db')

const app = express()
app.use(express.json())

const jwt = require('jsonwebtoken')
const JWT_SECRET = "himanshu123"


app.post("/signup", async (req,res)=>{
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email;


    await UserModel.create({
        email:email,
        password:password,
        name:name
    })

    res.json({
        message:"you are signed up"
    })
    
})

app.post("/signin", async (req,res)=>{
    // check if user exists with this email and password exist or not 

    const password = req.body.password
    const email = req.body.email;

    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user)

    if(user){
        console.log({
            id: user._id
        });
        const token = jwt.sign({
            id: user._id
        },JWT_SECRET)
        res.json({
            token: token
        })
    } else{
        res.status(403).json({
            message:"you are not authorised to log in"
        })
    }


})

//authenticated EPs

app.post("/todo",auth,(req,res)=>{
    //
    const userId = req.userId
    const title = req.body.title;
    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId:userId
    })


})

app.post("/todos",auth,async (req,res)=>{
    const userId = req.userId

    const todos = await TodoModel.findOne({
        userId:userId
    })

    res.json({
        todos
    })

})


function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET)

    if(decodedData){
        req.userId= decodedData.id;
        next()
    }else{
        res.status(403).json({
            message:"wrong credentials"
        })
    }
}

app.listen(3000) 