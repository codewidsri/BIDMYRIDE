import express from "express";
import { Register, Login, Logout, SearchVehicles } from "../controller/RiderController.js";
import VerifyRider from "../middlewares/VerifyRider.js"

const router = express.Router()

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/verify').get(VerifyRider, (req, res) => {
    return res.status(200).json({ rider: req.rider })
})
router.route('/searchvehicles').get(SearchVehicles)
router.route('/logout').post(Logout)

export default router;