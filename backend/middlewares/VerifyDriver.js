import jwt, { decode } from 'jsonwebtoken'
import Drivers from '../models/Driver.js';

async function VerifyDriver(req, res, next) {
    const token = req.cookies.driver_token;
    if (!token) {
        return res.status(401).json({ message: 'token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const checkdriver = await Drivers.findById(decoded._id);
        if (!checkdriver) {
            return res.status(401).json({ message: 'Driver not found' })
        }
        req.driver = {
            _id: decoded._id,
            email: decoded.email,
            name: decoded.name,
            isavailable : checkdriver.isavailable
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired rider token" });
    }
}

export default VerifyDriver;