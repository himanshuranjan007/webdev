const express = require("express")
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const { courseRouter } = require("./routes/course")
const {userRouter} = require("./routes/user")
const {adminRouter} = require("./routes/admin")

// using express router

// const Router = express.Router
//or 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)



async function main(){
    await mongoose.connect("mongodb+srv://hr731977:uQC3UZTgJwSeka54@cluster0.vu9hy.mongodb.net/course-db")
    app.listen(3000)
    console.log("connected");
}




main()