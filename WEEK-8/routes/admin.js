const { Router } = require("express");

const adminRouter = Router();
// bcrypt , zod , jsonwebtoken
const { adminModel } = require("../db");
const JWT_ADMIN_PASSWORD = "himanshu-admin"
// use different jwt when user logs in and when admin logs in
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



adminRouter.post('/signup',async (req,res)=>{
    const { email,password,firstName,lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,3)
    
    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
        res.json({
            message:"you are signed up!"
        })
    
})
adminRouter.post('/signin',async (req,res)=>{
    const {email,password}= req.body;
    const user = await adminModel.findOne({
        email:email
    });
    const matchedpassword = await bcrypt.compare(password,user.password )
    console.log(matchedpassword)
    if (matchedpassword){
        const token = jwt.sign({
            id:user._id
        },JWT_ADMIN_PASSWORD)
        res.json({
            token:token
        })

    } else{
        res.status(403).send({
            message:"you are fucked bro"
        })
    }

})
adminRouter.get('/course',(req,res)=>{
    res.json({
        message:"you are signed up!"
    })

})
adminRouter.put('/course',(req,res)=>{
    res.json({
        message:"you are signed up!"
    })

})
adminRouter.get('/course/bulk',(req,res)=>{
    res.json({
        message:"you are signed up!"
    })

})

module.exports ={
    adminRouter:adminRouter
}