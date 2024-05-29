const { getuserDetailsFromToken } = require("../helper/getuserDetailsFromToken")

async function userDetails(req,res){
    try{
         const token =req.cookies.token||""

         const user =await getuserDetailsFromToken(token)
        return res.status(200).json({
            message:"user details",
            data:user
        })
    }catch(err){
        return res.status(500).json({
            message:err.message||err,
            err:true
        })
    }
}

module.exports={userDetails}