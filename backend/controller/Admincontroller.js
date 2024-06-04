import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"

const Authadmin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const admindata = await User.findOne({email})
    console.log(admindata,"the admin data may here")

    if(admindata && admindata.is_Admin === true){
        const ismatch = await bcrypt.compare(password,admindata.password)
        if (ismatch) {
            console.log(ismatch, "the password of  admin ");
            res.status(201).json({
                admindata
            })
        }
    }
})

export {
    Authadmin,
    
}