const userModel = require("../models/UserModel")

async function checkEmail(req,res){
    try{
        const{email}=req.body

        const checkEmail=await userModel.findOne({email}).select("-password")

        if(!checkEmail){
            return res.json({
                message:"User Not Exit",
                err:true,
            })
        }
        return res.status(200).json({
            message:"email id verify",
            success:true,
            data:checkEmail
        })

    }catch(err){
        return res.status(500).json({
            message:err.message||err,
            success:false,
            error:true
        })

    }
}

module.exports={checkEmail}