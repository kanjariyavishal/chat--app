const UserModel=require('../models/UserModel');
const bcryptjs=require('bcryptjs')






async function registerUser(req,res){
   try{
    const{name,email,password,profile_pic}=req.body
    const checkEmail =await UserModel.findOne({email})

    if(checkEmail){
        return res.status(400).json({
            message:"email alredy exsist",
            error:true,
        })
    }
    //pass into hash password
    const salt=await bcryptjs.genSalt(10)
    const hashpassword=await bcryptjs.hash(password,salt)

    const payload={
        name,
        email,
        password:hashpassword,
        profile_pic
    }


    const user =new UserModel(payload)

    const usersave =await user.save()
    return res.status(201).json({
        message:"user created successfully",
        data:usersave,
        success:true
    })
   }
   catch(error){
    return res.status(500).json({
        message:error.message||error,
        error:true
    })
   }
}

module.exports={registerUser}