import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import generatetoken from "../utilis/gentok.js"

dotenv.config();

// cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// LOGIN FORM
const Authadmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admindata = await User.findOne({ email });
  console.log(admindata, "the admin data may here");

  if (admindata && admindata.is_Admin === true) {
    const ismatch = await bcrypt.compare(password, admindata.password);
    if (ismatch) {
      console.log(ismatch, "the password of  admin ");
      res.status(201).json({
        admindata,
      });
    }
  }
});

// LOGOUT
const adminlogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "admin have been logout out " });
});

// ADMIN_DASHBOARD
const admindashboard = asyncHandler(async (req, res) => {
  const userData = await User.find({ is_Admin: { $ne: true } })
    .select("-password")
    .sort({ updatedAt: -1 });
  res.status(200).json(userData);
});

// UPDATE USER

const updateuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log("the user data is here ",user);
  if (user) {
      if (user.image && req.file) {
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

// ADD_NEW_USER
const addnewuser = asyncHandler(async (req, res) => {

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
        console.log("user successfully added ");
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELET_USER
const deleteuser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log("for deleting the userId has been founded here", userId);
  const userData = await User.findById(userId);

  if (!userData) {
    res.status(404);
    throw new Error("the matched userId is not founded yet ");
  }

  if (userData.image) {
    const imaginary = userData.image.match(/\/upload\/v\d+\/([^./]+)\./);
    console.log("the imaginary data:", imaginary);
    if (imaginary && imaginary[1]) {
      try {
        await cloudinary.v2.uploader.destroy(imaginary[1]);
      } catch (error) {
        res.status(500);
        throw new Error("Failed to delete image from Cloudinary");
      }
    } else {
      console.log("The imaginary data has not been found");
    }
  }
  await User.deleteOne({ _id: userId });
  console.log("the  userdata has been deleted");
  res.status(200).json({ message: "the user has been successfully deleted " });
});

export {
  Authadmin,
  adminlogout,
  admindashboard,
  updateuser,
  addnewuser,
  deleteuser,
};
