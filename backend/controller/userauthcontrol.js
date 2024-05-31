import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"
import generatetoken from "../utilis/gentok.js";
import bcrypt from "bcryptjs"

// login form 

const userauth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
        const isMatch = await bcrypt.compare(password, userData.password);
        
        if (isMatch) {
            generatetoken(res, userData._id); 
            res.status(201).json({ message: 'Login successfully' });
        } else {
            res.status(401).json({ message: "Incorrect password" }); 
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" }); 
    }
});



// register form 
const userregister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Add logs to check the values of name, email, and password
    console.log("Received user data:", { name, email, password });

    // Check if all required fields are present
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please provide name, email, and password" });
        return;
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400); // 400 Bad Request is more appropriate for a user already existing
        throw new Error("User already exists");
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: passwordHash,
        });
const userpassword = user.password
console.log(userpassword,"the user password may occur here ");
        await user.save();
        if (user) {
            generatetoken(res, user._id);
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(401);
            throw new Error("Invalid details");
        }
    } catch (error) {
        // Catch any errors that occur during hashing
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// logout 
const userlogout =asyncHandler(async(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'user have been logout '})
})

// profile viewing
const getuserprofile = asyncHandler(async(req,res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,

    }
    res.status(200).json(user)
})

const updateprofile = asyncHandler(async(req,res)=>{
    const userdata = await User.findById(req.user._id)

    if (userdata) {
        userdata.name = req.body.name || userdata.name
        userdata.email = req.body.email || userdata.email

        if (req.body.password) {
            userdata.password=req.body.password

        }
        const updated = await userdata.save()
        res.status(200).json({
            _id:updated._id,
            name:updated.name,
            email:updated.email
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})

export {
    userauth,
    userregister,
    userlogout,
    getuserprofile,
    updateprofile
}