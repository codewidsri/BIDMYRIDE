import Drivers from '../models/Driver.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function Register(req, res, next) {
    try {
        const { name, email, phone, password, address, location, vehicletype, vehiclenumber, capacity } = req.body;
        const existingdriver = await Drivers.findOne({ $or: [{ email }, { phone }] })
        if (existingdriver) {
            return res.status(400).json({ message: 'Email or phone number is already exists' })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newdriver = new Drivers({
            name, email, phone, password: hashedpassword, address, location, vehicletype, vehiclenumber, capacity
        })
        console.log("here")
        await newdriver.save();
        return res.status(200).json({ message: "Account Created" })
    } catch (error) {
        return res.status(500).json({ message: "Error occured please try again" });
    }
}

async function Login(req, res, next) {
    try {
        const { email, password } = req.body;
        const existingdriver = await Drivers.findOne({ email })
        if (!existingdriver) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const ismatch = await bcrypt.compare(password, existingdriver.password)
        if (!ismatch) {
            return res.status(401).json({ message: "Invalid Email or password" })
        }
        const token = jwt.sign({ _id: existingdriver._id, email: existingdriver.email, name: existingdriver.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('driver_token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        const driverinfo = {
            _id: existingdriver._id, name: existingdriver.name, email: existingdriver.email
        }
        return res.status(200).json({ message: 'Login successfull', driver: driverinfo })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function ChangeAvailabilty(req, res, next) {
    try {
        const _id = req.driver._id;
        const driver = await Drivers.findById(_id);
        if (!driver) {
            return res.status(401).json({ message: 'driver not found' })
        }

        const updateddriver = await Drivers.findByIdAndUpdate(
            _id,
            { $set: { isavailable: !driver.isavailable } },
            { new: true }
        );

        return res.status(200).json({
            message: "Availability updated successfully",
            isavailable: updateddriver.isavailable,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

function Logout(req, res) {
    try {
        res.clearCookie('driver_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
}

export { Register, Login, ChangeAvailabilty, Logout }