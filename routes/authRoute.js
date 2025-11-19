import express from 'express'
import { signUp ,login ,logout, verifyOtp, resendOtp} from '../controller/authController.js'

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.post('/verify-otp',verifyOtp)
router.post("/resent-otp",resendOtp)




export default router