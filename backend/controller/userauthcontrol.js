import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"
import generatetoken from "../utilis/gentok.js";
import bcrypt from "bcryptjs"
import cloudinary from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// login form 

const userauth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
        const isMatch = await bcrypt.compare(password, userData.password);
        
        if (isMatch) {
           const accesstoken =  generatetoken(res, userData._id); 
           console.log(accesstoken,"accesstoken may here");
            res.status(201).json({
                name:userData.name,
                email:userData.email,
                image:userData.image,
                message:"Login Successfull"
            });
        } else {
            res.status(401).json({ message: "Incorrect password" }); 
        }
    } else {
        res.status(401).json({ message: "Invalid email or password" }); 
    }
});



// register form 
// const userregister = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

//     console.log("Received user data:", { name, email, password });

//     // Check if all required fields are present
//     if (!name || !email || !password) {
//         res.status(400).json({ message: "Please provide name, email, and password" });
//         return;
//     }

//     const userExist = await User.findOne({ email });

//     if (userExist) {
//         res.status(400); 
//         throw new Error("User already exists");
//     }

//     try {
//         const passwordHash = await bcrypt.hash(password, 10);

//         const user = new User({
//             name,
//             email,
//             password: passwordHash,
//             image:profileImage
//         });
//         const userpassword = user.password
//         console.log(userpassword,"the user password may occur here ");
//         await user.save();
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             image: user.image,
//           });
//         if (user) {
//             const regtoken = generatetoken(res, user._id);
//             console.log(regtoken,"register token may here ");
//             res.status(201).json({ message: 'User registered successfully' });
//         } else {
//             res.status(401);
//             throw new Error("Invalid details");
//         }
//     } catch (error) {
//         // Catch any errors that occur during hashing
//         console.error("Error during user registration:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

const userregister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let profileImage = '';


    console.log("Received user data:", { name, email, password });


    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash,"the hashed password may here ");
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log("the result of the cloudinary ",result );
            profileImage = result.secure_url
        }
        const user = new User({
            name,
            email,
            password: passwordHash,
            image: profileImage,
        });

        await user.save();

        const regtoken = generatetoken(res, user._id);
        console.log(regtoken, "register token may here");

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
        });

    } catch (error) {
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
        image:req.user.image
    }
    res.status(200).json(user)
})

const updateprofile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        if (user.image) {
            const imageId = user.image.match(/\/upload\/v\d+\/([^./]+)\./);
            if (imageId && imageId[1]) {
                await cloudinary.uploader.destroy(imageId[1]);
            }
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            user.image = result.secure_url;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


export {
    userauth,
    userregister,
    userlogout,
    getuserprofile,
    updateprofile
}