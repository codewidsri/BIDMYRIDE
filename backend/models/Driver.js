import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
    vehicletype: { type: String, enum: ['bike', 'auto', 'car'], required: true },
    capacity: { type: Number, required: true },
    vehiclenumber: { type: String, required: true },
    isavailable: { type: Boolean, default: false }
}, { timestamps: true })

DriverSchema.index({ location: '2dsphere' })

const Drivers = mongoose.model('Drivers', DriverSchema);

export default Drivers;