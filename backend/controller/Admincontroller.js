import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

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
  const user = await User.findById(req.body._id);
  console.log(user ,"the user data whole",user);
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

// ADD_NEW_USER
const addnewuser = asyncHandler(async (req, res) => {});

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
