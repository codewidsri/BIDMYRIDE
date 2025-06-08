import express from 'express'
import { Register, Login, UpdateLocation, ChangeAvailabilty, Logout } from "../controller/DriverController.js"
import VerifyDriver from "../middlewares/VerifyDriver.js"

const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/verify').get(VerifyDriver, (req, res) => {
    return res.status(200).json({ driver: req.driver })
})
router.route('/changeavailability').get(VerifyDriver, ChangeAvailabilty)
router.route('/updatelocation').post(VerifyDriver, UpdateLocation)
router.route('/logout').post(Logout)

export default router;