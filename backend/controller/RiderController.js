import Riders from "../models/Rider.js";
import Drivers from "../models/Driver.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

async function Register(req, res, next) {
    try {
        const { name, email, phone, password, address, location } = req.body
        const existingrider = await Riders.findOne({ $or: [{ email }, { phone }] })
        if (existingrider) {
            return res.status(400).json({ message: "Email or phone number already exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const newrider = new Riders({
            name, email, phone, password: hashedpassword, address, location
        })
        await newrider.save();
        return res.status(200).json({ message: "Account Created" })
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

async function Login(req, res, next) {
    try {
        const { email, password } = req.body;
        const existingrider = await Riders.findOne({ email })
        if (!existingrider) {
            return res.status(401).json({ message: "Invalid Email or password" })
        }
        const ismatch = await bcrypt.compare(password, existingrider.password)
        if (!ismatch) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const token = jwt.sign({ _id: existingrider._id, email: existingrider.email, name: existingrider.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('rider_token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        const riderinfo = {
            _id: existingrider._id, name: existingrider.name, email: existingrider.email
        }
        return res.status(200).json({ message: 'Login successfull', rider: riderinfo })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function SearchVehicles(req, res, next) {
    try {
        const { vehicle } = req.query;
        const pickupCoords = {
            lat: parseFloat(req.query['pickupCoords[lat]']),
            lng: parseFloat(req.query['pickupCoords[lng]']),
        };

        if (!pickupCoords.lat || !pickupCoords.lng || !vehicle) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const nearbyDrivers = await Drivers.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [pickupCoords.lng, pickupCoords.lat], // Note: [lng, lat]
                    },
                    $maxDistance: 2000, // 2km in meters
                },
            },
            vehicletype: vehicle,
            isavailable: true,
        },
            {
                name: 1,
                phone: 1,
                vehiclenumber: 1,
                capacity: 1,
                "location.coordinates": 1,
                _id: 0
            }
        );
        if(!nearbyDrivers){
            return res.status(401).json({message:"No available drivers"})
        }
        return res.status(200).json({ drivers: nearbyDrivers });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

function Logout(req, res) {
    try {
        res.clearCookie('rider_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
}

export { Register, Login, SearchVehicles, Logout }