import Riders from "../models/Rider.js";
import Drivers from "../models/Driver.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Rides from "../models/Ride.js";

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
        res.cookie('rider_token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        const riderinfo = {
            _id: existingrider._id, name: existingrider.name, email: existingrider.email, phone: existingrider.phone, address: existingrider.address
        }
        return res.status(200).json({ message: 'Login successfull', rider: riderinfo })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function UpdateLocation(req, res, next) {
    try {
        const { lat, lng } = req.body
        const _id = req.rider._id;
        const rider = await Riders.findById(_id);
        if (!rider) {
            return res.status(401).json({ message: 'rider not found' })
        }
        const updatedrider = await Riders.findByIdAndUpdate(
            _id,
            {
                $set: {
                    location: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    }
                }
            },
            { new: true }
        )
        return res.status(200).json({ message: "live location was updated" })
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
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
                _id: 1
            }
        );
        if (!nearbyDrivers) {
            return res.status(401).json({ message: "No available drivers" })
        }
        return res.status(200).json({ drivers: nearbyDrivers });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function BookRide(req, res, next) {
    try {
        const { riderid, driverid, pickup, dropoff, pickupcoords, dropoffcoords, distance, fare, vehicle, vehiclenumber } = req.body;
        const otp = Math.floor(1000 + Math.random() * 9000);
        const newride = new Rides({
            riderId: riderid, driverId: driverid, pickup, dropoff, pickupCoords: pickupcoords, dropoffCoords: dropoffcoords, distance, fare, vehicletype: vehicle, vehiclenumber, otp, ridestatus: 'confirmed'
        })
        await newride.save();
        return res.status(201).json({ message: 'ride booked', ride: newride })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function CompleteRide(req, res, next) {
    try {
        const ride = await Rides.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ridestatus: "completed"
                }
            },
            { new: true, runValidators: true }
        )
        if (!ride) {
            return res.status(400).json({ message: "Ride was Not Initialised" })
        }
        return res.status(200).json({ message: "Ride Completed" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function UpdateProfile(req, res, next) {
    try {
        const rider = await Riders.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address
                }
            },
            { new: true, runValidators: true }
        );
        if (!rider) {
            return res.status(404).json({ message: "Rider not found" })
        }
        const riderinfo = {
            _id: rider._id, name: rider.name, email: rider.email, phone: rider.phone, address: rider.address
        }
        const token = jwt.sign({ _id: rider._id, email: rider.email, name: rider.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('rider_token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return res.status(201).json({ message: 'Rider Profile Updated', rider: riderinfo })
    } catch (error) {
        return res.status(500).json({ message: error.message })
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
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { Register, Login, UpdateLocation, SearchVehicles, BookRide, CompleteRide, UpdateProfile, Logout }