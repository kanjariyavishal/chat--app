const express =require("express");
const { registerUser } = require("../controller/registeruser");
const {checkEmail} =require("../controller/checkEmail");
const {checkPassword}= require("../controller/checkPassword");
const { userDetails } = require("../controller/userDetails");
const { logout } = require("../controller/logout");
const { updateUserDetails } = require("../controller/updateUserdetails");
const searchUser = require("../controller/searchUser");
const router =express.Router()

//create user
router.post('/register',registerUser);

router.post('/email',checkEmail)
router.post('/password',checkPassword)
router.get('/user-details',userDetails)
router.get('/logout',logout)

router.patch('/update-user',updateUserDetails)
router.post("/search-user",searchUser)
module.exports=router