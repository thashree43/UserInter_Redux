import express from "express"
import {Authadmin} from "../controller/Admincontroller.js";
import {adminprotect} from "../middleware/Adminauthmiddleware.js"
const router = express.Router()

router.post('/adminlogin',Authadmin);

export default router