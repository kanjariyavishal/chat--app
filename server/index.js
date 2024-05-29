 const express =require("express")
 const cors =require("cors")
 require('dotenv').config()
const connectDB=require('./config/connectDB')
const {app,server}=require('./socket/index')

const cookiesParser=require('cookie-parser')
 //const app =express()
 app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true,
  
 }))
app.use(express.json())

app.use(cookiesParser())
 const PORT=process.env.PORT||8080

 app.get('/',(req,res)=>{
    res.json({
        message:"servere running at "+PORT
    })
 })

const router=require('./router/index')
app.use('/api/',router)
  connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at port"+PORT)
     })
  })
 