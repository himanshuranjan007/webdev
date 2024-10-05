const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "himanshu1"

const userRouter = Router();
const bcrypt = require("bcrypt")

const { userModel }= require("../db")

const { z } = require("zod")

// auth middlewares 
// hashing the pw using bcrypt

userRouter.post('/signup',async (req,res)=>{
    
    const { email,password,firstName,lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,3)
    
    await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
        res.json({
            message:"you are signed up!"
        })
    
})
userRouter.post('/signin',async (req,res)=>{
    const {email,password}= req.body;
    const user = await userModel.findOne({
        email:email
    });
    const matchedpassword = await bcrypt.compare(password,user.password )
    console.log(matchedpassword)
    if (matchedpassword){
        const token = jwt.sign({
            id:user._id
        },JWT_SECRET)
        res.json({
            token:token
        })

    } else{
        res.status(403).send({
            message:"you are fucked bro"
        })
    }

})
userRouter.get('/purchases',(req,res)=>{
    

})

module.exports ={
    userRouter:userRouter
}