import Riders from "../models/Rider.js"
import bcrypt from 'bcrypt';

async function Register(req, res, next) {
    try {
        const {name,email,phone,password,address,location}=req.body
        const existingrider = Riders.findOne({$or: [{ email }, { phone }]})
        if (existingrider) {
            return res.status(400).json({ message: "Email or phone already exists" });
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const newrider = new Riders({
            name,email,phone,password:hashedpassword,address,location
        })
        await newrider.save();
        return res.status(200).json({message: "Rider registered successfully", rider: newrider})
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

async function Login(req,res,next){
    console.log(req.body)
}
export { Register,Login }