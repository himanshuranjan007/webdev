const express = require('express')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

const { z } =require("zod")

const { UserModel, TodoModel } = require('./db')
const app = express()
app.use(express.json())

const JWT_SECRET = "himanshu123"
//bcrypt for hashing passwords



app.post("/signup", async (req,res)=>{
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(50),
        password: z.string().min(5).max(18)
    })


    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        return res.json({
            message:"enter in correct format",
            error: parsedDataWithSuccess.error
        })
    }

    const name = req.body.name // string
    const password = req.body.password // string, chars,
    const email = req.body.email; // string , @
    const hashedPassword= await bcrypt.hash(password,5)
/**
  {  i need my req.body to strictly look like this 
email:string
password:string
name:string

  }
 */



if(typeof email !== "string" || email.length<5|| !email.includes("@")){
    res.json({
        message:"email incorrect"
    }) // dumb way to validate user input

}
    
    
console.log(hashedPassword)
    /* ---  without input validation ----

  try {
    const hashedPassword= await bcrypt.hash(password,5)


    console.log(hashedPassword)

    await UserModel.create({
        email:email,
        password:hashedPassword,
        name:name
    })

  } catch (error) {
    res.json({
        message:"user already exists"
    })
    errorThrown = true;
  }
  if (!errorThrown){
    res.json({
        message:"you are signed up"
    })
  }
*/    


    await UserModel.create({
        email:email,
        password:hashedPassword,
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

    const response = await UserModel.findOne({
        email:email,
        // password:password cant compare plain passowrd with hashed password
    })

    if(!response){
        res.status(403).json({
            message:"user does not exist"
        })
    }
    const passwordMatch = await bcrypt.compare(password, response.password)

    // console.log(user)

    if(passwordMatch){
        // console.log({
        //     id: user._id
        // });
        const token = jwt.sign({
            id: response._id
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