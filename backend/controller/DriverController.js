import Drivers from '../models/Driver.js'
import bcrypt from 'bcrypt'

async function Register(req, res, next) {
    try {
        console.log(req.body)
        const { name, email, phone, password, address, location, vehicletype, vehiclenumber, capacity } = req.body;
        const existingdriver = await Drivers.findOne({$or:[{email},{phone}]})
        if (existingdriver) {
            return res.status(400).json({message :'Email or phone number is already exists'})
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newdriver = new Drivers({
            name,email,phone,password:hashedpassword,address,location,vehicletype,vehiclenumber,capacity
        })
        await newdriver.save()
        return res.status(200).json({ message: "Account Created" })
    } catch (error) {
        return res.status(500).json({ message: "Error occured please try again" });
    }
}

async function Login(req, res, next) {
    console.log(req.body)
}

export { Register, Login }