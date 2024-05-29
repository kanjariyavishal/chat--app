async function logout(req,res){
    try{
        const cookiwOption={
            http:true,
            secure:true
         }

        return res.cookie('token','',cookiwOption).status(200).json({
            message:"session out",
            success:true
        })
    }catch(err){
        return res.status(500).json({
            message:err.message||err,
            err:true
        })

    }
};


module.exports={logout}