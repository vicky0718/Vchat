const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");

const router = express.Router();

//create user api
router.post("/register", registerUser);

//check user email
router.post("/email", checkEmail)

//check password
 router.post('/password', checkPassword)

 //login user details
 router.get('/user-details', userDetails)

 //logout the user
 router.get('/logout', logout) //cookie didnt get cleared while checking api endpoint recheck functionality

//update user details
router.post('/update-user', updateUserDetails)
module.exports = router;
