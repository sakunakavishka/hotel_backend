import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryitemRoute.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import categoryRouter from './routes/categoryRoute.js'
import roomRouter from './routes/roomRoute.js'

dotenv.config()//find env file and connect

const app = express()

app.use(bodyParser.json())


const connectionString = process.env.MONGO_URL;

//this token decode and midleware seen ekk

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ", "");

if (token){
    jwt.verify(token, process.env.JWT_KEY,(err,decoded)=>{
        if(decoded){
            req.user = decoded;
        }
            next()
        
    });
}else {
    next()
}
})




mongoose.connect(connectionString).then(
    ()=>{
        console.log("connected to the database")
    }
).catch(
    ()=>{
        console.log("connnection failed")
    }
)


app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRouter)
app.use("/api/rooms",roomRouter)



app.get("/",
    (req,res)=>{
         

        console.log("Get request")
        
        res.json ({ 
            car : "BMW",
            massage:"Hi"

         })
    }
)
app.post("/", (req,res)=>{

    const name=req.body.name
    
    const model = req.body.model
        

    const message = "Hi " +name

    const car = "BMW " + model

        console.log("post request")

        res.status(200).json ({ 
            message : message,
            car:car
         })
    }
)



app.listen(5000,(req,res)=>{
    console.log("server is running on port 5000")
}); 

