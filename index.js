import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryitemRoute.js'
import jwt from 'jsonwebtoken'


const app = express()
app.use(bodyParser.json())


const connectionString ="mongodb+srv://tester2:321@cluster0.mxx4eom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//this token decode and midleware seen ekk

app.use((req,res,next)=>{

    const token = req.header("Autherization")?.replace("Bearer","")

if (token !=null){
    jwt.verify(token,"secret",(err,decoded)=>{
        if(decoded != null){
            req.user = decoded
            next()
        }else{
            next()
        }
    })
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

