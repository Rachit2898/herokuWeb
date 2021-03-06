const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config({ path: "../config/config.env" });

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }
        const _id = payload.id
        User.findById(_id).then(userdata=>{
          req.user = userdata
            next()
        })
        
        
    })
});


