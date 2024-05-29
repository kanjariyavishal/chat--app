const { response } = require("express");
const { getuserDetailsFromToken } = require("../helper/getuserDetailsFromToken");
const userModel = require("../models/UserModel");

async function updateUserDetails(req,res){
     try{
        const token =req.cookies.token||""

        const user =await getuserDetailsFromToken(token)

        const{name,profile_pic}=req.body


        const userUpdate=await userModel.updateOne({_id:user._id},{
            name,
            profile_pic
        })
         const userInformation =await userModel.findById(user._id)
         return res.json({
            message:"user updated successfully",
            data:userInformation,
            success:true
         })     
        }catch(error){
        return res.status(500).json({
            message:error.message||err,
            ree:true,
        })

     }
}

module.exports={updateUserDetails}