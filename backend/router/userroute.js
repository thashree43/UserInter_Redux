import express from 'express';
const router = express.Router();
import { userauth, userregister, userlogout,getuserprofile,updateprofile } from '../controller/userauthcontrol.js';
import { protect } from '../middleware/authmiddleware.js';
router.post('/signup', userregister);
router.post('/auth', userauth);
router.post('/logout',userlogout)
router.get('/profile',protect,getuserprofile)
router.put('/updateprofile',protect,updateprofile)
export default router;
