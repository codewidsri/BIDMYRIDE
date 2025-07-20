import express from 'express'
import { Register, Login, UpdateLocation, ChangeAvailabilty, RetrieveAvailability, Logout, VerifyOTP, UpdateProfile } from "../controller/DriverController.js"
import VerifyDriver from "../middlewares/VerifyDriver.js"

const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/verify').get(VerifyDriver, (req, res) => {
    return res.status(200).json({ driver: req.driver })
})
router.route('/changeavailability').get(VerifyDriver, ChangeAvailabilty)
router.route('/retrieveavailability').get(VerifyDriver, RetrieveAvailability)
router.route('/updatelocation').post(VerifyDriver, UpdateLocation)
router.route('/updateprofile/:id').patch(VerifyDriver, UpdateProfile)
router.route('/verifyotp').post(VerifyDriver, VerifyOTP)
router.route('/logout').post(Logout)

export default router;