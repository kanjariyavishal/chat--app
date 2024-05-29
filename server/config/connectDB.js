const mongoose =require('mongoose')


 async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        const connection =mongoose.connection
        

        connection.on('connected',()=>{
            console.log('connected to db')
        })

        connection.on('erroe',(error)=>{
            console.log('something went wrong in mongodb connection',error)
        })
    }
    catch (error){
        console.log ('something went wrong', error)

    }
 }

 module.exports=connectDB