import express from "express"
import {Authadmin,adminlogout,admindashboard,updateuser,addnewuser,deleteuser} from "../controller/Admincontroller.js";
import {adminprotect} from "../middleware/Adminauthmiddleware.js"
const router = express.Router()
import upload from "../middleware/multter.js";


router.post('/adminlogin',Authadmin);
router.post("/adminlogout",adminlogout)
router.route('/userslist').get(adminprotect,admindashboard).post(adminprotect,upload.single('image'),addnewuser)
router.delete('/userslist/:userId',adminprotect,deleteuser)

router.put('/updateuser/:id', adminprotect, upload.single('image'), updateuser);
export default router